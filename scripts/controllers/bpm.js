'use strict';

angular.module('eyeAware')
.controller('bpm', function ($scope, $cookieStore, $location, $filter, http) {

    if (! $cookieStore.get('email')) {
        // cookie is not set, user not logged in
        $location.path('/login');
    }
    else {

        // add loading indicator for http call
        $scope.loading = true;

        // disable all controls until page loads
        $('#applyBtn').addClass("disableBtn");
        $('#clearBtn').addClass("disableBtn");
        $('#calender').addClass("disableBtn");
        $('.controlInputs').addClass("disableBtn");

        // function to create ticks for 24 hour time measure
        $scope.getTicks = function (n) {
            return new Array(n);
        };

        // function to detect if date is within daylight savings time
        Date.prototype.stdTimezoneOffset = function () {
            var jan = new Date(this.getFullYear(), 0, 1);
            var jul = new Date(this.getFullYear(), 6, 1);
            return Math.max(jan.getTimezoneOffset(), jul.getTimezoneOffset());
        }
        Date.prototype.dst = function () {
            return this.getTimezoneOffset() < this.stdTimezoneOffset();
        }

        // function to examine lifelog in summary
        $scope.examineLife = function (obj, index) {

            var past = obj[index - 1];
            var present = obj[index];
            var future = obj[index + 1];
            var minsToExamine = new Array();

            minsToExamine.push(past);
            minsToExamine.push(present);
            minsToExamine.push(future);

            $scope.examine = new Array();

            var getBPMImagesParams = {
                BPMEventId: present.id
            }
            http.async('/getBPMImages', getBPMImagesParams).then(function (data) {

                for (var i = 0; i < data.length; i++) {
                    $scope.examine[i] = {
                        path: data[i].path,
                        date: minsToExamine[i].date,
                        bpm: minsToExamine[i].heart,
                        color: minsToExamine[i].color
                    };
                }

            })

        }

        // function to clear calender
        $scope.clearCalender = function () {
            // clear calender
            $('#calender').DatePickerClear();
            // add disabled class to buttons
            $('#clearBtn').addClass("disableBtn");
            $('#applyBtn').addClass("disableBtn");
        }

        // function to generate calender
        $scope.generateCalender = function (datesObject, selectedDates) {

            var dataString = JSON.stringify(datesObject);
            $('#applyBtn').addClass("disableBtn");

            $('#calender').DatePicker({
                flat: true,
                date: selectedDates,
                current: datesObject[0],
                format: 'd/m/Y',
                calendars: 1,
                mode: 'multiple',
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
                    $('#clearBtn').removeClass("disableBtn");
                    $('#applyBtn').removeClass("disableBtn");
                    $scope.selectedCalenderDates = date;
                },
                starts: 1
            });

        }

        // function to generate bpm events
        $scope.generateBPMEvents = function () {

            // assign each bpm reading a color code
            var colors = {
                0: '#fdeee7', // lowest bpm reading
                1: '#fae6dc',
                2: '#f5d7bc',
                3: '#f5c899',
                4: '#f5ac75',
                5: '#f57856',
                6: '#f53d3d',
                7: '#e62735',
                8: '#d2152e',
                9: '#a50021'  // highest bpm reading
            }

            // hard code divisions for heart rate
            var divisions = {
                0: 50, // lowest bpm reading
                1: 65,
                2: 80,
                3: 95,
                4: 110,
                5: 125,
                6: 140,
                7: 155,
                8: 170,
                9: 185  // highest bpm reading
            }

            // loop through all images for each color code
            for (var i = 0; i < 10; i++) {

                // create ranges for color codes
                var prev = divisions[i];
                var next = divisions[i + 1];            

                for (var j = 0; j < $scope.lifelogData.length; j++) {

                    // assign color to specific bpm code
                    if ($scope.lifelogData[j].heart > prev && $scope.lifelogData[j].heart <= next) {
                        $scope.lifelogData[j].color = colors[i];
                    }

                    // if last division, make everything above it final color code
                    if (i == 9) {
                        if ($scope.lifelogData[j].heart > prev) {
                            $scope.lifelogData[j].color = colors[i];
                        }
                    }

                    // format date to javascript date object under new key called 'timestamp'
                    var day = $scope.lifelogData[j].date.substring(0, 2);
                    var month = $scope.lifelogData[j].date.substring(3, 5);
                    var year = $scope.lifelogData[j].date.substring(6, 10);
                    var minute = $scope.lifelogData[j].date.substring(14, 16);
                    var hour = parseInt($scope.lifelogData[j].date.substring(11, 13));
                    var AMPM = $scope.lifelogData[j].date.substring(17, 19);
                    if (AMPM == "PM" && hour < 12) hour = hour + 12;
                    if (AMPM == "AM" && hour == 12) hour = hour - 12;
                    if (hour < 10) hour = "0" + hour;
                    var dateString = year + '-' + month + '-' + day + 'T' + hour + ':' + minute + ':00';
                    $scope.lifelogData[j].timestamp = new Date(dateString);

                    // subtract one hour if inside daylight savings time
                    var checkDST = $scope.lifelogData[j].timestamp;
                    if (checkDST.dst()) {
                        var newDateString = Date.UTC(year, month, day, hour, minute, '00');
                        $scope.lifelogData[j].timestamp = new Date(newDateString);
                    }

                }

            }

            // order data by timestamp
            $scope.sortedData = $filter('orderBy')($scope.lifelogData, 'timestamp');

            // create new array for each day of data
            $scope.days = [];

            // start counter for number of days
            var d = 0;
            $scope.days[d] = [];

            // get first date of data
            var date = $scope.sortedData[0].timestamp.getDate();

            // loop through and organise data into days
            for (var i = 0; i < $scope.sortedData.length; i++) {

                // if the date changes, create a new day entry in days array
                if (date != $scope.sortedData[i].timestamp.getDate()) {
                    d++;
                    $scope.days[d] = [];
                    var date = $scope.sortedData[i].timestamp.getDate();

                    // if more than one image per minute, take first image in minute only
                    if ($scope.sortedData[i - 1].timestamp.getMinutes() != $scope.sortedData[i].timestamp.getMinutes()) {
                        $scope.days[d].push($scope.sortedData[i]);
                    }

                }
                else {
                    if (i > 0) {
                        // if more than one image per minute, take first image in minute only
                        if ($scope.sortedData[i - 1].timestamp.getMinutes() != $scope.sortedData[i].timestamp.getMinutes()) {
                            $scope.days[d].push($scope.sortedData[i]);
                        }
                    }
                    else {
                        $scope.days[d].push($scope.sortedData[i]);
                    }

                }

            }

            // get all possible times
            $scope.allTimes = [];
            for (var h = 0; h < 24; h++) {
                for (var m = 0; m < 60; m++) {
                    var time = h + ':' + m;
                    $scope.allTimes.push(time);
                }
            }

            // loop through each day of data
            for (var d = 0; d < $scope.days.length; d++) {

                // create new array in loop containing all times
                $scope.times = $scope.allTimes;

                // get all the times that have data
                $scope.usedTimes = [];
                for (var i = 0; i < $scope.days[d].length; i++) {

                    // get year, month and date for timestamp creation later
                    $scope.year = $scope.days[d][i].timestamp.getFullYear();
                    $scope.month = $scope.days[d][i].timestamp.getMonth() + 1;
                    if ($scope.month < 10) {
                        $scope.month = '0' + $scope.month;
                    }
                    $scope.date = $scope.days[d][i].timestamp.getDate();
                    if ($scope.date < 10) {
                        $scope.date = '0' + $scope.date;
                    }

                    // get hour and minute to find out which minutes have data
                    var hour = $scope.days[d][i].timestamp.getUTCHours();
                    var minute = $scope.days[d][i].timestamp.getMinutes();
                    var timeWithData = hour + ':' + minute;
                    $scope.usedTimes.push(timeWithData);

                }

                // remove used times from all times
                $scope.times = $scope.times.filter(function (e) {
                    return $scope.usedTimes.indexOf(e) < 0;
                });

                // push all unused times into series from above
                for (var i = 0; i < $scope.times.length; i++) {

                    // correctly format time so can order by timestamp
                    var string = $scope.times[i];
                    var split = string.split(':');
                    var hour = split[0];
                    if (hour < 10) {
                        hour = '0' + hour;
                    }
                    var minute = split[1];
                    if (minute < 10) {
                        minute = '0' + minute;
                    }
                    var dateString = $scope.year + '-' + $scope.month + '-' + $scope.date + 'T' + hour + ':' + minute + ':00';

                    var humanReadableDate = (new Date(dateString).toUTCString()).substring(0, 17);

                    // push black color code to series for empty time and order by timestamp
                    $scope.days[d].push({
                        color: '#ffffff',
                        timestamp: new Date(dateString),
                        cursorType: 'default'
                    })

                }

                $scope.days[d] = $filter('orderBy')($scope.days[d], 'timestamp');

            }

            // activate controls and remove loading gif 
            $('#clearBtn').removeClass("disableBtn");
            $('#calender').removeClass("disableBtn");
            $('.controlInputs').removeClass("disableBtn");
            $scope.loading = false;

        }

        // function to generate new lifelog
        $scope.generateNewLifelog = function () {

            $scope.loading = true;

            // disable all controls and reset concept filter
            $('#applyBtn').addClass("disableBtn");
            $('#clearBtn').addClass("disableBtn");
            $('#calender').addClass("disableBtn");
            $('.controlInputs').addClass("disableBtn");

            // generate human-readbale dates for day labels 
            $scope.humanDates = new Array();
            for (var i = 0; i < $scope.selectedCalenderDates.length; i++) {
                var day = $scope.selectedCalenderDates[i].substring(0, 2);
                var month = parseInt($scope.selectedCalenderDates[i].substring(3, 5)) - 1;
                var year = $scope.selectedCalenderDates[i].substring(6, 10);
                var dateMilliseconds = Date.UTC(year, month, day, '00', '00', '00');
                var newDate = new Date(dateMilliseconds);
                $scope.humanDates.push({
                    date: newDate.toUTCString().substring(0, 17),
                    dateOrder: dateMilliseconds
                });
            }
            $scope.humanDates = $filter('orderBy')($scope.humanDates, 'dateOrder');

            // get lifelog data with new calender dates
            var datesString = '';
            for (var i = 0; i < $scope.selectedCalenderDates.length; i++) {
                datesString = datesString + $scope.selectedCalenderDates[i] + ','
            }
            var getGSREventsParameters = {
                userid: $cookieStore.get('userId'),
                dates: datesString
            }
            http.async('/getBPMEvents ', getGSREventsParameters).then(function (data) {

                $scope.lifelogData = data;
                $scope.generateBPMEvents();

            })

        }

        // login, retrieve user profile and generate default lifelog with color events
        var loginParameters = {
            email: $cookieStore.get('email'),
            password: $cookieStore.get('password')
        }
        http.async('/Login', loginParameters).then(function (data) {

            // store user id in cookie
            $cookieStore.put('userId', data.id);

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

            // get dares with GSR data
            var getGSRDatesParameters = {
                userid: $cookieStore.get('userId')
            }
            http.async('/getBPMDates ', getGSRDatesParameters).then(function (data) {

                $scope.availableDates = data;
                $scope.defaultDates = $scope.availableDates.slice(0, 10);
                $scope.defaultCalenderDates = $scope.availableDates.slice(0, 10);

                // generate calender
                $scope.generateCalender($scope.availableDates, $scope.defaultCalenderDates);

                // generate human-readbale dates for day labels 
                $scope.humanDates = new Array();
                for (var i = 0; i < $scope.defaultDates.length; i++) {
                    var day = $scope.defaultDates[i].substring(0, 2);
                    var month = parseInt($scope.defaultDates[i].substring(3, 5)) - 1;
                    var year = $scope.defaultDates[i].substring(6, 10);
                    var dateMilliseconds = Date.UTC(year, month, day, '00', '00', '00');
                    var newDate = new Date(dateMilliseconds);
                    $scope.humanDates.push({
                        date: newDate.toUTCString().substring(0, 17),
                        dateOrder: dateMilliseconds
                    });
                }
                $scope.humanDates = $filter('orderBy')($scope.humanDates, 'dateOrder');

                // get lifelog data with last 10 days on app launch
                var datesString = '';
                for (var i = 0; i < $scope.defaultDates.length; i++) {
                    datesString = datesString + $scope.defaultDates[i] + ','
                }
                var getGSREventsParameters = {
                    userid: $cookieStore.get('userId'),
                    dates: datesString
                }
                http.async('/getBPMEvents ', getGSREventsParameters).then(function (data) {

                    $scope.lifelogData = data;
                    $scope.generateBPMEvents();

                })

            })

        })

    }  

});
