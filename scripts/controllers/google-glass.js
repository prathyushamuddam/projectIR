'use strict';

angular.module('eyeAware')
.controller('google-glass', function ($scope, $cookieStore, $timeout, http) {

    if (! $cookieStore.get('email')) {
        // cookie is not set, user not logged in
        $location.path('/login');
    }
    else {

        // parameters for web service
        var POST = {
            // no parameters 
        }

        $scope.getGGImages = function () {
            http.async('/GetGoogleGlassImages', POST).then(function (data) {
                $scope.googleglass = data;
            });
        }

        $scope.repeatFunction = function () {
            $timeout(function () {
                $scope.getGGImages();
                $scope.repeatFunction();
            }, 180000);
        }

        $scope.getGGImages();
        $scope.repeatFunction();

    }

});


