'use strict'

const assert = require('assert')
const fs = require('fs-extra')
const path = require('path')
const Router = require('impress-router')
const _ = require('lodash')
const METHODS = require('methods')
const compose = require('koa-compose')
const debug = require('debug')('impress:table:index')
const LocalUtil = require('./lib/util.js')

module.exports = function routing(home) {
  const router = new Router()

  /**
   * config
   */

  let routes = require(home + '/routes')
  let policy
  try {
    policy = require(home + '/policy')
  } catch (e) {
    // noop
  }

  /**
   * registry
   */

  const controllerRegistry = {}
  const policyRegistry = {}
  let list

  list = fs.readdirSync(home + '/controllers')
  list = list.filter(name => {
    if (!/Controller.js$/.test(name)) return false
    const s = fs.statSync(`${ home }/controllers/${ name }`)
    if (s.isDirectory()) return false
    if (_.startsWith(s, '_')) return false
    return true
  })
  list = list.map(name => path.basename(name, path.extname(name)))
  for (let name of list) {
    controllerRegistry[name] = require(`${ home }/controllers/${ name }`)
  }

  if (policy && fs.existsSync(`${ home }/policies`)) {
    list = fs.readdirSync(`${ home }/policies`)
    list = list.filter(name => {
      const s = fs.statSync(`${ home }/policies/${ name }`)
      if (s.isDirectory()) return false
      if (_.startsWith(s, '_')) return false
      return true
    })
    list = list.map(name => path.basename(name, path.extname(name)))
    for (let name of list) {
      policyRegistry[name] = require(`${ home }/policies/${ name }`)
    }
  }

  /**
   * setup explicit routes
   */

  for (let name in routes) {
    const arr = name.split(/ +/)
    const path = arr.pop()
    let method = arr.pop() || 'all'
    method = method.toLowerCase()

    assert(path, 'path can not be empty')
    if (!_.startsWith(path, '/')) {
      throw new Error('path must startsWith `/`')
    }
    if (!(method === 'all' || ~METHODS.indexOf(method))) {
      throw new Error(`method not supported`)
    }

    let val = routes[name]
    let controller, action
    if (typeof val === 'object') {
      controller = val.controller
      action = val.action
    } else {
      let arr = val.split('.')
      controller = arr[0]
      action = arr[1]
    }
    assert(controller, 'controller can not be empty')
    assert(action, 'action can not be empty')

    // bind
    bind(method, path, controller, action)
  }

  /**
   * setup action routes
   */

  for (let controller in controllerRegistry) {
    for (let action in controllerRegistry[controller]) {
      const controllerName = controller.replace(/controller$/i, '')
      bind('all', `/${ controllerName }/${ action }`, controller, action)
    }
  }

  /**
   * bind path to controller & action
   */

  function bind(method, path, controller, action) {
    let handler = controllerRegistry[controller] && controllerRegistry[controller][action]
    if (!handler) {
      console.warn(`can't bind route ${ path } to unknown action ${ controller }.${ action }`)
      return
    }
    if (Array.isArray(handler)) handler = compose(handler)

    const policyName = LocalUtil.getPolicyName(policy, controller, action)
    let currentPolicy
    if (policyName) currentPolicy = policyRegistry[policyName]
    if (currentPolicy && Array.isArray(currentPolicy)) currentPolicy = compose(currentPolicy)

    if (currentPolicy) {
      router[method](path, currentPolicy, handler)
    } else {
      router[method](path, handler)
    }
  }

  return router
}