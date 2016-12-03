'use strict'

const app = require('../demo/app')
const request = require('supertest')

describe('It works', function() {
  it('explicit route', function(done) {
    request(app.listen())
      .get('/app/api/v1/explicit')
      .end((err, res) => {
        res.text.should.equal('explicit')
        done(err)
      })
  })

  it('action route', function(done) {
    request(app.listen())
      .get('/routeTest/actionRoute')
      .end((err, res) => {
        res.text.should.equal('actionRoute')
        done(err)
      })
  })

  it('controller common policy', function(done) {
    request(app.listen())
      .get('/policyTest/common')
      .end((err, res) => {
        res.text.should.equal('auth')
        done(err)
      })
  })

  it('controller action explicit policy', function(done) {
    request(app.listen())
      .get('/policyTest/foo')
      .end((err, res) => {
        res.text.should.equal('bar')
        done(err)
      })
  })
})