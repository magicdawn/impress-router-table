'use strict'

module.exports = {
  explicit: ctx => ctx.body = 'explicit',

  actionRoute: ctx => ctx.body = 'actionRoute',
}