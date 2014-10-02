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
      .when('/archives', {
        templateUrl: 'views/list.html'
      })
      .otherwise({
        redirectTo: '/'
      });
  })
  .controller('defaultCtrl', function($scope) {

    $scope.hunches = [
      { 
        content: 'I think xxx is a good idea.',
        date: 1
      },
      { 
        content: 'Another idea',
        date: 3
      },
      { 
        content: 'Bad-ass ideas!',
        date: 2
      }, 
    ];

    $scope.predicate = 'date';


    $scope.addNewHunch = function(newItem) {
      $scope.hunches.push({
        content: newItem.content
      })
      console.log($scope.hunches);
    }
  })
