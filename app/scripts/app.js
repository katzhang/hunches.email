'use strict';

/**
 * @ngdoc overview
 * @name hunchesEmailApp
 * @description
 * # hunchesEmailApp
 *
 * Main module of the application.
 */
angular
  .module('hunchesEmailApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/get-started', {
        templateUrl: 'views/form.html',
        controller: 'AboutCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  })
  .controller('defaultCtrl', function($scope) {

    $scope.hunches = [
      {content: 'I think xxx is a good idea.'}
    ]


    $scope.addNewHunch = function(newItem) {
      $scope.hunches.push({
        content: newItem.content
      })
      console.log($scope.hunches);
    }
  })
