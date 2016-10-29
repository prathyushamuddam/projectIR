'use strict';

angular.module('eyeAware')
.controller('summary', function ($scope, $cookieStore, $location, $filter, $timeout, http, shared) {

    if (! $cookieStore.get('email')) {
        // cookie is not set, user not logged in
        $location.path('/login');
    }
    else {
        
        // add loading indicator until page is loaded
        $scope.loading = true;

        // disable all controls until page is loaded
        $('#applyBtn').addClass("disableBtn");
        $('#calender').addClass("disableBtn");

        // function to generate calender
        $scope.generateCalender = function (datesObject, selectedDate) {

            var dataString = JSON.stringify(datesObject);
            $('#applyBtn').addClass("disableBtn");

            $('#calender').DatePicker({
                flat: true,
                date: selectedDate,
                current: selectedDate,
                format: 'd/m/Y',
                calendars: 1,
                mode: 'single',
                onRender: function (date) {

                    // pull year, month and date out of calender date objects
                    var year = date.getFullYear();
                    var month = date.getMonth() + 1;
                    if (month < 10) {
                        var month = '0' + month;
                    }
                    var day = date.getDate();
                    if (day < 10) {
                        var day = '0' + day;
                    }
                    var calenderDate = day + '/' + month + '/' + year;
                    var tempDateObject = JSON.parse(dataString);

                    // check if any dates have data in them
                    var checkDate = tempDateObject.indexOf(calenderDate);
                    if (checkDate > -1) {
                        var disable = false;
                    }
                    else {
                        var disable = true;
                    }

                    // return whether or not a date needs to be disabled
                    return {
                        disabled: disable,
                        className: disable ? 'datepickerSpecial' : false
                    }
                },
                onChange: function (date) {
                    // remove disabled class to buttons
                    $('#applyBtn').removeClass("disableBtn");
                    $scope.selectedCalenderDates = date;
                },
                starts: 1
            });

        }

        // function to get new summary
        $scope.generateNewSummary = function () {

            // disable all controls
            $('#applyBtn').addClass("disableBtn");
            $('#calender').addClass("disableBtn");

            var getSummaryParameters = {
                userId: $cookieStore.get('userId'),
                date: $scope.selectedCalenderDates
            }
            http.async('/getSummary', getSummaryParameters).then(function (data) {

                $scope.summaryData = data;
                $scope.generateSummary();

                // activate controls again
                $('#calender').removeClass("disableBtn");

            })

        }

        // function to generate summary
        $scope.generateSummary = function () {

            // format the date
            $scope.date = parseInt($scope.summaryData.date.substring(0, 2));
            if ($scope.date == 1) {
                $scope.dateString = 'st';
            }
            else if ($scope.date == 2) {
                $scope.dateString = 'nd';
            }
            else if ($scope.date == 3) {
                $scope.dateString = 'rd';
            }
            else if ($scope.date > 3) {
                $scope.dateString = 'th';
            }

            // format the month
            $scope.month = parseInt($scope.summaryData.date.substring(3, 5));
            var calenderMonths = {
                1: 'jan',
                2: 'feb',
                3: 'mar',
                4: 'apr',
                5: 'may',
                6: 'jun',
                7: 'jul',
                8: 'aug',
                9: 'sep',
                10: 'oct',
                11: 'nov',
                12: 'dec',
            }
            $scope.monthString = calenderMonths[$scope.month];

            // format keyframe images
            $scope.keyframes = $scope.summaryData.keyframeList;

            // create gridster grid of keyframe images
            $(".gridster ul").gridster({
                widget_margins: [9.4, 9.4],
                widget_base_dimensions: [150, 150],
                extra_cols: 6,
                max_cols: 6
            });
            var gridster = $(".gridster ul").gridster().data('gridster');
            gridster.disable();
            gridster.remove_all_widgets();
            for (var i = 0; i < $scope.keyframes.length; i++) {

                if ($scope.keyframes[i].imagesCount < 50) {
                    var eventX = 1;
                    var eventY = 1;
                }
                else if ($scope.keyframes[i].imagesCount > 50 && $scope.keyframes[i].imagesCount < 100) {
                    var eventX = 2;
                    var eventY = 1;
                }
                else if ($scope.keyframes[i].imagesCount > 100) {
                    var eventX = 2;
                    var eventY = 2;
                }

                var keyframeStart = $scope.keyframes[i].startTime.substring(0, 5);
                gridster.add_widget('<li style="background-image: url(' + $scope.keyframes[i].keyframe + ')"><div class="keyframeTime">' + keyframeStart + '</div></li>', eventX, eventY);

            }

            // remove loading gif
            $scope.loading = false;

        }

        // login, retrieve user profile and generate default lifelog with color events
        var loginParameters = {
            email: $cookieStore.get('email'),
            password: $cookieStore.get('password')
        }
        http.async('/Login', loginParameters).then(function (data) {

            // store user id in cookie and retrieve user data sates
            $cookieStore.put('userId', data.id);
            $scope.availableDates = data.Dates;
            $scope.defaultDates = $scope.availableDates.slice(0, 1);
            $scope.defaultCalenderDates = $scope.availableDates.slice(0, 1);

            // generate user profile
            $scope.userProfile = {
                fname: data.fname,
                lname: data.lname,
                email: data.email,
                birthday: data.birthday,
                height: data.height,
                weight: data.weight
            }
            $scope.profilePic = { 'background-image': 'url(' + data.profileimage + ')' }

            // populate lifelogger control
            $scope.username = data.fname + ' ' + data.lname;

            // generate calender
            $scope.generateCalender($scope.availableDates, $scope.defaultCalenderDates[0]);

            // get lifelog data with last 10 days on app launch
            var datesString = '';
            for (var i = 0; i < $scope.defaultDates.length; i++) {
                datesString = datesString + $scope.defaultDates[i] + ','
            }
            var getSummaryParameters = {
                userId: $cookieStore.get('userId'),
                date: $scope.defaultDates[0]
            }
            http.async('/getSummary', getSummaryParameters).then(function (data) {

                $scope.summaryData = data;
                $scope.generateSummary();

                // activate controls 
                $('#calender').removeClass("disableBtn");
                $('.controlInputs').removeClass("disableBtn");

            })

        })

    }

});
