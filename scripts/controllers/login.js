'use strict';

angular.module('eyeAware')
.controller('login', function ($scope, $cookieStore, $location, http, shared) {

    $cookieStore.remove('email');
    $cookieStore.remove('password');

    // hide feedback until form is submitted
    $scope.validate = false;

    $scope.btnText = 'Submit'

    // submit form and toggle feedback 
    $scope.submitLogin = function (user) {

        $scope.validate = true;

        if ($scope.loginForm.$valid == true) {
            // if form is valid add to scope
            $scope.userDetails = angular.copy(user);
            $scope.userDetails.dates = '';
            $scope.btnText = 'Logging in...'

            // perform http call to validate credentials
            http.async('/Login ', $scope.userDetails).then(function (data) {

                if (jQuery.isEmptyObject(data) == false) {

                    //shared.setShared(data);
                    $cookieStore.put('email', $scope.userDetails.email);
                    $cookieStore.put('password', $scope.userDetails.password);
                    $location.path('/summary');

                }
                else {
                    $scope.btnText = 'Submit'
                    alert('Invalid email or password');
                }

            })

        }
         
    }

});