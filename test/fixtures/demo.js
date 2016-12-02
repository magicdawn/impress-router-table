'use strict'

const routing = require('../../')

const app = new(require('koa'))

app.use(routing(__dirname))

app.listen(9000, function() {
  console.log(`http://localhost:${ this.address().port }`)
})