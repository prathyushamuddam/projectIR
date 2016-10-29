'use strict';

angular.module('eyeAware')
  .controller('landing', function ($scope, $cookieStore, $location, http) {
    
      if ($cookieStore.get('email')) {
          // cookie is not set, user not logged in
          $location.path('/summary');
      }

  });