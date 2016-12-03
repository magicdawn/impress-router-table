'use strict'

const request = require('supertest')
const routing = require('../')
const app = require('./demo/app')

describe('It works', function() {
  it('explicit route, with controller.action', function(done) {
    request(app.listen())
      .get('/app/api/v1/explicit')
      .end((err, res) => {
        res.text.should.equal('explicit')
        done(err)
      })
  })

  it('explicit route, with controller & action prop', function(done) {
    request(app.listen())
      .get('/app/api/v1/explicit2')
      .end((err, res) => {
        res.text.should.equal('explicit')
        done(err)
      })
  })

  it('explicit route, default method = all', function(done) {
    request(app.listen())
      .get('/app/api/v1/explicit3')
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

describe('Routing error', function() {
  it('bad path', function() {
    try {
      routing(__dirname + '/fixtures/badPath')
    } catch (e) {
      e.should.be.ok()
      e.message.should.match(/path must startsWith `\/`/)
    }
  })

  it('bad method', function() {
    try {
      routing(__dirname + '/fixtures/badMethod')
    } catch (e) {
      e.should.be.ok()
      e.message.should.match(/method foo not supported/)
    }
  })
})