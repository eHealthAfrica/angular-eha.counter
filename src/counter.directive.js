;(function () {
  'use strict'
  /**
   * @ngdoc directive
   * @name ehaCounter
   * @module eha.counter
   */
  var ngModule = angular.module('eha.counter.directive', [])

  ngModule.provider('ehaCounter', function () {
    this.increment = angular.noop
    this.decrement = angular.noop
    this.$get = function () {
      return this
    }
  })

  ngModule.directive('ehaCounter', function (ehaCounter) {
    return {
      restrict: 'E',
      templateUrl: function (element, attrs) {
        return attrs.templateUrl || 'templates/counter.template.tpl.html'
      },
      scope: {
        count: '=bind',
        change: '=onchange'
      },
      link: function (scope, element) {
        var counterBtnList = element.find('button')
        var minusBtnElem = counterBtnList.eq(0)
        var plusBtnElem = counterBtnList.eq(1)

        function isInvalid (value) {
          return (isNaN(value) || value === '' || value < 1)
        }
        scope.incrementTouch = function (count) {
          var res = isInvalid(count) ? 1 : (parseInt(count, 10) + 1)
          ehaCounter.increment(res)
          return res
        }

        scope.decrementTouch = function (count) {
          var res = isInvalid(count) ? 0 : (parseInt(count, 10) - 1)
          ehaCounter.decrement(res)
          return res
        }

        element.on('$destroy', function () {
          plusBtnElem.off('click')
          minusBtnElem.off('click')
        })
      }
    }
  })

  // Check for and export to commonjs environment
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = ngModule
  }
})()
