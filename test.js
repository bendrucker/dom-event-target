'use strict'

var test = require('tape')
var spy = require('sinon').spy
var EventTarget = require('./')

test(function (t) {
  var target = new EventTarget()
  var callback = spy()

  target.addEventListener('e', callback)
  target.send('e', 'foo', 'bar')
  t.equal(callback.callCount, 1, 'calls callback')
  t.deepEqual(callback.firstCall.args, ['foo', 'bar'], 'calls with args')
  t.equal(callback.firstCall.thisValue, target, 'calls on target')

  callback.reset()
  target.removeEventListener('e')
  target.send('e')
  t.equal(callback.callCount, 1, 'ignores bad removeEventListener args')

  callback.reset()
  target.removeEventListener('e', callback)
  target.send('e')
  t.equal(callback.callCount, 0, 'removes event by name + callback')

  target.addEventListener('foo')
  t.doesNotThrow(target.send.bind(target, 'foo'), 'ignores bad addEventListener args')

  t.end()
})
