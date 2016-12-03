'use strict'

const assert = require('assert')
const http = require('http')
const fs = require('fs-extra')
const path = require('path')
const Router = require('impress-router')
const _ = require('lodash')
const METHODS = require('methods')
const compose = require('koa-compose')

module.exports = function routing(home) {
  const router = new Router()

  let controllers = fs.readdirSync(home + '/controllers')
  controllers = controllers.filter(name => {
    if (!/Controller.js$/.test(name)) return false

    const s = fs.statSync(`${ home }/controllers/${ name }`)
    if (s.isDirectory()) return false

    return true
  })
  controllers = controllers.map(name => path.basename(name, '.js'))

  const registry = {}
  for (let name of controllers) {
    registry[name] = require(`${ home }/controllers/${ name }`)
  }
  console.log(registry)

  const def = require(home + '/routes')
  for (let name in def) {
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

    let val = def[name]
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


    let handler = registry[controller] && registry[controller][action]
    console.log(controller, action)
    if (!handler) {
      console.warn(`can't bind route ${ path } to unknown action ${ val }`)
      continue
    }

    if (Array.isArray(handler)) handler = compose(handler)
    router[method](path, handler)
  }

  return router
}