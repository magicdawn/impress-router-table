'use strict'

const routing = require('../')

const app = new(require('koa'))

app.use(routing(__dirname + '/api'))

app.listen(9000, function() {
  console.log(`http://localhost:${ this.address().port }`)
})