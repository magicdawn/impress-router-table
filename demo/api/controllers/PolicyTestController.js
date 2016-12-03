'use strict'

module.exports = {
  // '*'
  common: ctx => ctx.body = 'output by controller',
  foo: ctx => ctx.body = 'foo',
}