'use strict'

module.exports = (ctx, next) => {
  if (!ctx.req.user) {
    ctx.body = 'auth'
    return
  }

  return next()
}