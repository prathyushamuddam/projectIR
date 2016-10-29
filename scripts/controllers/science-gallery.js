'use strict';

angular.module('eyeAware')
.controller('science-gallery', function ($scope, $filter, $window, $routeParams, http) {

    var id = $routeParams.id

    // add loading indicator until page is loaded
    $scope.loading = true;

    // pull user id from URL
    var loginParameters = {
        userid: id
    }
    http.async('/getImageList', loginParameters).then(function (data) {

        // assign data to scope
        $scope.days = data.reverse();

        // find out how many days there are in the data
        var numberOfDays = $scope.days.length;

        // remove loading indicator
        $scope.loading = false;

        // function to create ticks for 24 hour time measure
        $scope.getTicks = function (n) {
            return new Array(n);
        };

        // function to select random images and examine them
        $scope.randomThumbnail = function () {
            var parentIndex = Math.floor(Math.random() * numberOfDays);
            var childIndex = Math.floor(Math.random() * 1440);
            var object = $scope.days[parentIndex].Minutes[childIndex];
            var randomTime = Math.floor(Math.random() * 5000) + 1000;
            if (object.Images.length != 0) {
                if (object.Images[0].IsPrivate != 'True') {
                    setTimeout(function () {
                        $scope.examine(object, parentIndex, childIndex);
                        $scope.randomThumbnail();
                    }, randomTime);
                }
                else {
                    $scope.randomThumbnail();
                }
            }
            else {
                $scope.randomThumbnail();
            }
        }

        // function to examine image by fading in a thumbnail
        $scope.examine = function (data, parent, child) {
            var id = String(parent) + String(child);
            var position = $('#' + id).offset();
            $('#SGDemo').append('<div id="SG' + id + '" class="SGThumbnail"></div>');
            $('#SG' + id).css('top', Math.round(position.top) + 'px');
            $('#SG' + id).css('left', Math.round(position.left) + 'px');
            $('#SG' + id).css('background-image', 'url(' + data.Images[0].path + ')');
            $('#SG' + id).fadeTo(3000, 1.0, function () {
                setTimeout(function () {
                    $('#SG' + id).fadeTo(3000, 0, function () {
                        $('#SG' + id).remove();
                    });
                }, 7500);
            });
        }

        // start randomiser function to examine images
        $scope.randomThumbnail();

    });

});