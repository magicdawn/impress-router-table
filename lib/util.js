'use strict'

/**
 * Module dependencies
 */

const assert = require('assert')

/**
 * find the policy name in the registry
 * based on `controller` & `action`
 */

exports.getPolicyName = (policy, controller, action) => {
  if (!policy) return

  const sub = policy[controller]
  if (!sub) return
  assert(typeof sub === 'object', `expect an object in the policy config for ${ controller }`)

  const name = sub[action] || sub['*']
  assert(typeof name === 'string', `expect a string in the policy config for ${ controller }.${ action }`)
  return name
}