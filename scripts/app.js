'use strict';

angular.module('eyeAware', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute'
])
  .config(function ($routeProvider) {
      $routeProvider
    .when('/', {
        templateUrl: 'views/landing.html',
        controller: 'landing'
    })
    .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'login'
    })
    .when('/sign-up', {
        templateUrl: 'views/sign-up.html',
        controller: 'sign-up'
    })
    .when('/lifelog', {
        templateUrl: 'views/lifelog.html',
        controller: 'lifelog'
    })
    .when('/light', {
        templateUrl: 'views/light.html',
        controller: 'light'
    })
    .when('/GSR', {
        templateUrl: 'views/gsr.html',
        controller: 'gsr'
    })
    .when('/BPM', {
        templateUrl: 'views/bpm.html',
        controller: 'bpm'
    })
    .when('/google-glass', {
        templateUrl: 'views/google-glass.html',
        controller: 'google-glass'
    })
    .when('/summary', {
        templateUrl: 'views/summary.html',
        controller: 'summary'
    })
    .when('/concept-validation', {
        templateUrl: 'views/concept-validation.html',
        controller: 'concept-validation'
    })
    .when('/science-gallery/:id', {
        templateUrl: 'views/science-gallery.html',
        controller: 'science-gallery'
    })
    .otherwise({
    redirectTo: '/'
    });
  });