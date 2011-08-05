var EventEmitter = require('events').EventEmitter
  , Stats = require ('statistics')
module.exports = PerSecond

function PerSecond (events, wLength, windows) {
  this.__events = events
  this.stats = {}
  var self = this
    , interval

  this.__last = Date.now()
  this.stop = function () {
    clearInterval(interval)
    interval = null
  }
  this.start = function () {
    this.__last = Date.now()
    if (!interval)
    interval = setInterval(function () {
      console.log('WINDOW')
      self.__window()
    }, wLength)
  }
  this.__window = function () { //force the calcs at the end of the window. exposed for testing
    this.emit('stats', this.stats)        
  }
}

PerSecond.prototype = new EventEmitter ()

PerSecond.prototype.event = 
  function (name, value) {
    var stats = 
      this.stats[name] = 
        this.stats[name] || new Stats()
    stats.value(value == null ? 1 : value)
  }
PerSecond.prototype.rate = 
  function (name, value, now, last) {
    value = value == null ? 1 : value 
    now = now || Date.now()
    last = last || this.__last
    this.event(name, value * (1000 / (now - last)))
    this.__last = now
  }