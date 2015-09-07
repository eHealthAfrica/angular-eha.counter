;(function () {
  'use strict'
  /**
   * @ngdoc directive
   * @name ehaCounter
   * @module eha.counter
   */
  var ngModule = angular.module('eha.counter.directive', [
  ])

  ngModule.directive('ehaCounter', function () {
    return {
      restrict: 'E',
      templateUrl: 'views/templates/counter.html',
      scope: {
        count: '=bind',
        change: '=onchange',
        name: '=name'
      },
      link: function (scope, element) {
        var DURATION_MILLI_SECONDS = 50
        var counterBtnList = element.find('button')
        var minusBtnElem = counterBtnList.eq(0)
        var plusBtnElem = counterBtnList.eq(1)

        function isInvalid (value) {
          return (isNaN(value) || value === '' || value < 1)
        }
        scope.incrementTouch = function (count) {
          notificationService.vibrate(DURATION_MILLI_SECONDS)
          return isInvalid(count) ? 1 : (parseInt(count, 10) + 1)
        }

        scope.decrementTouch = function (count) {
          notificationService.vibrate(DURATION_MILLI_SECONDS)
          return isInvalid(count) ? 0 : (parseInt(count, 10) - 1)
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
