'use strict'
/* globals describe beforeEach inject spyOn it expect */

describe('eha.counter', function () {
  var scope
  var html
  var counter
  var counterScope
  var ehaCounter

  beforeEach(module('eha.counter.directive', 'eha.counter.template'))
  beforeEach(inject(function ($compile, $rootScope, _ehaCounter_) {
    // create a scope
    scope = $rootScope.$new()
    scope.counterResult = ''
    // set our view html.
    html = '<eha-counter bind="counterResult"></eha-counter>'
    counter = $compile(html)(scope)
    scope.$apply()
    // retrieve the counter's isolated scope.
    counterScope = counter.scope().$$childHead
    ehaCounter = _ehaCounter_.$get()
    spyOn(ehaCounter, 'increment')
    spyOn(ehaCounter, 'decrement')
  }))

  it('should have a increment and decrement button', function () {
    expect(counter.find('button').length).toBe(2)
  })

  it('should have a single input field', function () {
    expect(counter.find('input').length).toBe(1)
  })

  it('should have a numeric input field', function () {
    var counterInputField = counter.find('input').eq(0)
    expect(counterInputField.attr('type')).toBe('number')
  })

  it('should count from zero on inital decrement', function () {
    expect(counterScope.count).toBe('')
    counterScope.count = counterScope.decrementTouch()
    expect(counterScope.count).toBe(0)
  })

  it('should count from zero when decrementing non-numeric input', function () {
    counterScope.count = '44HJJ56'
    expect(counterScope.count).not.toBe(0)
    counterScope.count = counterScope.decrementTouch()
    expect(counterScope.count).toBe(0)
  })

  it('should not decrement less than zero', function () {
    counterScope.count = 0
    counterScope.count = counterScope.decrementTouch()
    expect(counterScope.count).not.toBeLessThan(0)
  })

  it('should decrement pre-initalised counts', function () {
    var initialValue = 4335
    counterScope.count = initialValue
    var res = counterScope.decrementTouch()
    counterScope.count = res
    expect(counterScope.count).toBeLessThan(initialValue)
  })

  it('should count from one when incrementing non-numeric input', function () {
    counterScope.count = '44HJJ56'
    var res = counterScope.incrementTouch()
    counterScope.count = res
    expect(counterScope.count).toBe(1)
  })

  it('should increment count', function () {
    var initialValue = 0
    counterScope.count = initialValue
    counterScope.count = counterScope.incrementTouch()
    var expected = initialValue + 1
    expect(counterScope.count).toBe(expected)
  })

  it('should call increment callback', function () {
    expect(ehaCounter.increment).not.toHaveBeenCalled()
    counterScope.incrementTouch()
    expect(ehaCounter.increment).toHaveBeenCalled()
  })

  it('should call decrement callback', function () {
    expect(ehaCounter.decrement).not.toHaveBeenCalled()
    counterScope.decrementTouch()
    expect(ehaCounter.decrement).toHaveBeenCalled()
  })
})
