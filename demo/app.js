'use strict'

const routing = require('../')

const app = module.exports = new(require('koa'))

app.use(routing(__dirname + '/api'))

if (require.main === module) {
  app.listen(9000, function() {
    console.log(`http://localhost:${ this.address().port }`)
  })
}