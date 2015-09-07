;(function () {
  'use strict'

  var ngModule = angular.module('eha.counter', [
    'eha.counter.directive',
    'eha.counter.template'
  ])

  // Check for and export to commonjs environment
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = ngModule
  }
})()
