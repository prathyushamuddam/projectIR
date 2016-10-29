'use strict';

angular.module('eyeAware')
.controller('concept-validation', function ($scope, $cookieStore, $location, $filter, http) {

    if (! $cookieStore.get('email')) {
        // cookie is not set, user not logged in
        $location.path('/login');
    }
    else {

        // add loading indicator until page is loaded
        $scope.loading = true;

        // start counter for correct concepts count
        $scope.correctConceptCount = 0;

        // get new image for concept validation
        $scope.getConceptValidation = function () {
            // login and retrieve user id
            var loginParameters = {
                email: $cookieStore.get('email'),
                password: $cookieStore.get('password')
            }
            http.async('/Login', loginParameters).then(function (data) {

                $cookieStore.put('userId', data.id);

                // get first concepts for validation
                var getValidationParameters = {
                    userId: $cookieStore.get('userId')
                }
                http.async('/getConceptValidation', getValidationParameters).then(function (data) {

                    $scope.data = data;
                    $scope.oldConcepts = data.Concepts;
                    $scope.newConcepts = new Array();
                    $scope.loading = false;

                })

            });
        }

        // add concept to new list
        $scope.pushToNew = function (id) {
            $('#' + id).css("background-color", "#22c476");
            var notClicked = true;
            for (var i = 0; i < $scope.newConcepts.length; i++) {
                if (id == $scope.newConcepts[i].id) {
                    var notClicked = false;
                }
            }
            if (notClicked == true) {
                for (var j = 0; j < $scope.oldConcepts.length; j++) {
                    if (id == $scope.oldConcepts[j].id) {
                        $scope.newConcepts.push($scope.oldConcepts[j]);
                        $scope.correctConceptCount = $scope.newConcepts.length;
                    }
                }
            }
            else {
                $scope.removeFromNew(id);
            }
        }

        // remove concept from new list
        $scope.removeFromNew = function (id) {
            $('#' + id).css("background-color", "#e74c3c");
            for (var i = 0; i < $scope.newConcepts.length; i++) {
                if (id == $scope.newConcepts[i].id) {
                    $scope.newConcepts.splice(i, 1);
                    $scope.correctConceptCount = $scope.newConcepts.length;
                }
            }
        }

        // submit concept validation
        $scope.submitConceptValidation = function () {

            $scope.loading = true;

            var conceptIdString = '';
            for (var i = 0; i < $scope.newConcepts.length; i++) {
                conceptIdString = conceptIdString + ',' + $scope.newConcepts[i].id;
            }
            conceptIdString = conceptIdString.substring(1);

            // get new concepts for image to submit
            var putConceptValidationParameters = {
                userId: $cookieStore.get('userId'),
                imageId: $scope.data.imageId,
                conceptIds: conceptIdString
            }
            http.async('/putConceptValidation', putConceptValidationParameters).then(function (data) {
                $scope.correctConceptCount = 0;
                $scope.getConceptValidation();
            })

        }

        // add key events to keyboard keys 1-5
        $('html').bind('keypress', function (e) {

            var code = e.keyCode || e.which;
            if (code == 13 || code == 32) {
                $scope.submitConceptValidation();
            }
            else {
                if (code == 49) { var id = $scope.oldConcepts[0].id; }
                if (code == 50) { var id = $scope.oldConcepts[1].id; }
                if (code == 51) { var id = $scope.oldConcepts[2].id; }
                if (code == 52) { var id = $scope.oldConcepts[3].id; }
                if (code == 53) { var id = $scope.oldConcepts[4].id; }
                $scope.$apply(function () {
                    $scope.pushToNew(id);
                })
            }

        });

        $scope.getConceptValidation();

    }  

});
