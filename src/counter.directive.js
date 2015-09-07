;(function () {
  'use strict'
  /**
   * @ngdoc directive
   * @name ehaCounter
   * @module eha.counter
   */
  var ngModule = angular.module('eha.counter.directive', [])

  ngModule.directive('ehaCounter', function () {
    return {
      restrict: 'E',
      templateUrl: function (element, attrs) {
        return attrs.templateUrl || 'templates/counter.template.tpl.html'
      },
      scope: {
        count: '=bind',
        change: '=onchange',
        name: '=name'
      },
      link: function (scope, element) {
        var counterBtnList = element.find('button')
        var minusBtnElem = counterBtnList.eq(0)
        var plusBtnElem = counterBtnList.eq(1)

        function isInvalid (value) {
          return (isNaN(value) || value === '' || value < 1)
        }
        scope.incrementTouch = function (count) {
          return isInvalid(count) ? 1 : (parseInt(count, 10) + 1)
        }

        scope.decrementTouch = function (count) {
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
