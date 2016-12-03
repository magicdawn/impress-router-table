'use strict'

module.exports = (ctx, next) => {
  if (!ctx.req.user) {
    ctx.body = 'not authed'
    return
  }

  return next()
}