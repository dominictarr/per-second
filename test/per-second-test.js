var PerSecond = require('../')
  , it = require('it-is').style('colour')
  , EventEmitter = require('events').EventEmitter

exports ['api'] = function (test) {

  var ps = new PerSecond ({}, 100,3)

  it(ps).has({
      event: it.function()
    , rate: it.function()
    , stop: it.function()
    , start: it.function()
    , __window: it.function()
  })

  test.done()
}

exports ['count'] = function (test) {

  var ps = new PerSecond ({}, 100,3)
    , called = 0

  ps.on('stats',function (stats){
    it(stats).has({
      one: {
        sum: 3
      , values: {length: 3}
      }
    })
    test.done()
  })

  ps.event('one')
  ps.event('one')
  ps.event('one')

  ps.__window()
}

exports ['rate'] = function  (test) {

  var ps = new PerSecond ({}, 100,3)
    , called = 0

  console.log('rate')
  tickFor(function () {
    ps.rate('rate')
  }, 10, 100, function () {
    ps.__window()
  })

  ps.on('stats', function (stats) {
    it(stats).has({
      rate: {
        mean: it.between(50, 150)
      }
    })
    console.log(stats, stats.rate. stdDev)
    test.done()  
  })
}

//*/

function tickFor(funx, tickLength, ticks, done) {
  var interval =
  setInterval(function () {
    console.log('.')
    try{ funx() } catch (err) {
      clearInterval(interval)
      throw (err)
    }
    if(!ticks --) {
    console.log('!')
      clearInterval(interval)
      if('function' === typeof done)
        done()
    }
  }, tickLength)
}

exports ['automatic windows'] = function (test) {
  var ps = new PerSecond ({}, 100, 3)
    , called = 0
  ps.start()
  console.log('rate')
  
  tickFor(function () {
    ps.rate('rate', Math.random())
  }, 10, 20)

  ps.on('stats', function (stats) {
    it(++called).equal(1)
    console.log(stats, stats.rate. stdDev)
    ps.stop()
    it(stats).has({
      rate: {
        mean: it.between(25, 175)
      }
    })
    test.done()
  })
}
//*/
//if(!module.parent) require('asynct').test(module)