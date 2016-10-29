'use strict';

angular.module('eyeAware')
.controller('lifelog', function ($scope, $cookieStore, $location, $filter, $timeout, http, shared) {

    if (! $cookieStore.get('email')) {
        // cookie is not set, user not logged in
        $location.path('/login');
    }
    else {
        
        // add loading indicator until page is loaded
        $scope.loading = true;

        // disable all controls until page is loaded
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

        // function to show event overlay
        var fadeTimer;
        $scope.showEvent = function (id) {
            if (id != null) {
                fadeTimer = setTimeout(function () {
                    if ($('#w' + id).width() < 200) {
                        var wrapperWidth = $('#w' + id).width() / 2;
                        var overlayWidth = $('#o' + id).width() / 2;
                        var left = (((overlayWidth - wrapperWidth) - 2) * -1);
                        $('#o' + id).css("left", left);
                    }

                    $("#o" + id).stop().fadeIn("slow", function () {
                        // animation complete
                    });
                }, 300);
            }
        }

        // function to hide event overlay
        $scope.hideEvent = function (id) {
            clearTimeout(fadeTimer);
            if (id != null) {
                $("#o" + id).stop().fadeOut("fast", function () {
                    // animation complete
                });
            }
        }

        // function to show event exploration overlay
        $scope.showOverlay = false;
        $scope.showLoading = false;
        $scope.exploreEvent = function (id) {
            if (id != null) {
                $scope.showOverlay = true;
                $scope.showLoading = true;
                var POST = { eventID: id }
                http.async('/GetEventImages ', POST).then(function (data) {
                    $scope.showLoading = false;
                    $scope.eventObject = data;
                });
            }
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

        // function to generate color events
        $scope.generateColorEvents = function () {

            // clone object 
            $scope.days = JSON.parse(JSON.stringify($scope.cleanData));

            // loop through scope data
            for (var i = 0; i < $scope.days.length; i++) {

                $scope.days[i].NoDataEvents = new Array();

                for (var j = 0; j < $scope.days[i].Events.length; j++) {

                    // format start date to javascript date object
                    var day = $scope.days[i].Events[j].startdate.substring(0, 2);
                    var month = $scope.days[i].Events[j].startdate.substring(3, 5);
                    var year = $scope.days[i].Events[j].startdate.substring(6, 10);
                    var minute = $scope.days[i].Events[j].startdate.substring(14, 16);
                    var hour = parseInt($scope.days[i].Events[j].startdate.substring(11, 13));
                    var AMPM = $scope.days[i].Events[j].startdate.substring(17, 19);
                    if (AMPM == "PM" && hour < 12) hour = hour + 12;
                    if (AMPM == "AM" && hour == 12) hour = hour - 12;
                    if (hour < 10) hour = "0" + hour;
                    var startDateString = Date.UTC(year, month, day, hour, minute, '00');
                    $scope.days[i].Events[j].startdateJS = new Date(startDateString);
                    var startMilliseconds = Date.parse($scope.days[i].Events[j].startdateJS);

                    // subtract one hour if inside daylight savings time
                    var checkDST = $scope.days[i].Events[j].startdateJS;
                    if (checkDST.dst()) {
                        var startDateString = (Date.UTC(year, month, day, hour, minute, '00') - 3600000);
                        $scope.days[i].Events[j].startdateJS = new Date(startDateString);
                        var startMilliseconds = Date.parse($scope.days[i].Events[j].startdateJS);
                    }

                    // format end date to javascript date object
                    var day = $scope.days[i].Events[j].enddate.substring(0, 2);
                    var month = $scope.days[i].Events[j].enddate.substring(3, 5);
                    var year = $scope.days[i].Events[j].enddate.substring(6, 10);
                    var minute = $scope.days[i].Events[j].enddate.substring(14, 16);
                    var hour = parseInt($scope.days[i].Events[j].enddate.substring(11, 13));
                    var AMPM = $scope.days[i].Events[j].enddate.substring(17, 19);
                    if (AMPM == "PM" && hour < 12) hour = hour + 12;
                    if (AMPM == "AM" && hour == 12) hour = hour - 12;
                    if (hour < 10) hour = "0" + hour;
                    var endDateString = Date.UTC(year, month, day, hour, minute, '00');
                    $scope.days[i].Events[j].enddateJS = new Date(endDateString);
                    var endMilliseconds = Date.parse($scope.days[i].Events[j].enddateJS);

                    // subtract one hour if inside daylight savings time
                    var checkDST = $scope.days[i].Events[j].enddateJS;
                    if (checkDST.dst()) {
                        var endDateString = (Date.UTC(year, month, day, hour, minute, '00') - 3600000);
                        $scope.days[i].Events[j].enddateJS = new Date(endDateString);
                        var endMilliseconds = Date.parse($scope.days[i].Events[j].enddateJS);
                    }

                    // establish how long event is in minutes
                    var eventLength = ((endMilliseconds - startMilliseconds) / 1000) / 60;
                    $scope.days[i].Events[j].eventLength = eventLength;

                    //adjust heart rate if it exists 
                    if ($scope.days[i].Events[j].heartrateavg != 'N/A') {
                        var bpm = $scope.days[i].Events[j].heartrateavg;
                        $scope.days[i].Events[j].heartrateavg = Math.round(bpm * 10) / 10;
                    }

                    //adjust pointer style for events with data
                    $scope.days[i].Events[j].cursorType = 'pointer';

                    // create human readable time strings for interface display
                    $scope.days[i].Events[j].startString = (($scope.days[i].Events[j].startdateJS).toTimeString()).substring(0, 5);
                    $scope.days[i].Events[j].endString = (($scope.days[i].Events[j].enddateJS).toTimeString()).substring(0, 5);

                    // if it is the first event in a day
                    if (j == 0) {

                        var newDay = new Date(startDateString);
                        var startOfDay = (newDay).setHours(0, 0, 0, 0);

                        var firstEventEndTime = endMilliseconds;

                        // adjust for daylight savings
                        if (newDay.getMonth() + 1 == 10 && newDay.getDate() == 26) {
                            var noDataLength = (((startMilliseconds - startOfDay) / 1000) / 60) - 60;
                        }
                        else if (newDay.getMonth() + 1 == 3 && newDay.getDate() == 30) {
                            var noDataLength = (((startMilliseconds - startOfDay) / 1000) / 60) - 60;
                        }
                        else {
                            var noDataLength = ((startMilliseconds - startOfDay) / 1000) / 60;
                        }

                        if (noDataLength != 0) {
                            $scope.days[i].NoDataEvents.push({
                                dominantcolor: '#ffffff',
                                eventLength: noDataLength,
                                startdateJS: new Date(startOfDay),
                                enddateJS: new Date(startMilliseconds),
                                id: null
                            });
                        }

                    }
                        // if it is the last event in a day
                    else if (j == $scope.days[i].Events.length - 1) {

                        var newDay = new Date(endDateString);
                        var endOfDay = (newDay).setHours(23, 59, 0, 0);
                        var noDataLength = ((endOfDay - endMilliseconds) / 1000) / 60;

                        if (noDataLength != 0) {
                            $scope.days[i].NoDataEvents.push({
                                dominantcolor: '#ffffff',
                                eventLength: noDataLength,
                                startdateJS: new Date(endMilliseconds),
                                enddateJS: new Date(endOfDay),
                                id: null
                            });
                        }

                    }
                        // if it is any other event in the day
                    else {

                        // format next start date to javascript date object
                        var day = $scope.days[i].Events[j + 1].startdate.substring(0, 2);
                        var month = $scope.days[i].Events[j + 1].startdate.substring(3, 5);
                        var year = $scope.days[i].Events[j + 1].startdate.substring(6, 10);
                        var minute = $scope.days[i].Events[j + 1].startdate.substring(14, 16);
                        var hour = parseInt($scope.days[i].Events[j + 1].startdate.substring(11, 13));
                        var AMPM = $scope.days[i].Events[j + 1].startdate.substring(17, 19);
                        if (AMPM == "PM" && hour < 12) hour = hour + 12;
                        if (AMPM == "AM" && hour == 12) hour = hour - 12;
                        if (hour < 10) hour = "0" + hour;
                        var startDateString = Date.UTC(year, month, day, hour, minute, '00');
                        var nextStartMilliseconds = startDateString;

                        // subtract one hour if inside daylight savings time
                        var checkDST = $scope.days[i].Events[j].startdateJS;
                        if (checkDST.dst()) {
                            var startDateString = (Date.UTC(year, month, day, hour, minute, '00') - 3600000);
                            var nextStartMilliseconds = startDateString;
                        }

                        if (j == 1) {

                            var noDataLength = ((startMilliseconds - firstEventEndTime) / 1000) / 60;
                            if (noDataLength != 0) {
                                $scope.days[i].NoDataEvents.push({
                                    dominantcolor: '#ffffff',
                                    eventLength: noDataLength,
                                    startdateJS: new Date(firstEventEndTime),
                                    enddateJS: new Date(startMilliseconds),
                                    id: null
                                });
                            }
                        }
                        else {

                            var noDataLength = ((nextStartMilliseconds - endMilliseconds) / 1000) / 60;
                            if (noDataLength != 0) {
                                $scope.days[i].NoDataEvents.push({
                                    dominantcolor: '#ffffff',
                                    eventLength: noDataLength,
                                    startdateJS: new Date(endMilliseconds),
                                    enddateJS: new Date(nextStartMilliseconds),
                                    id: null
                                });
                            }

                        }

                    }

                }

            }

            // push empty events to data and order by date then remove temp object
            for (var i = 0; i < $scope.days.length; i++) {
                for (var j = 0; j < $scope.days[i].NoDataEvents.length ; j++) {
                    $scope.days[i].Events.push($scope.days[i].NoDataEvents[j]);
                }
                delete $scope.days[i].NoDataEvents;
                $scope.days[i].Events = $filter('orderBy')($scope.days[i].Events, 'startdateJS');
            }

            //add total event minutes to each day object (make sure each day fits container 100%)
            for (var i = 0; i < $scope.days.length; i++) {
                var dayTotal = 0;
                for (var j = 0; j < $scope.days[i].Events.length; j++) {
                    dayTotal = dayTotal + $scope.days[i].Events[j].eventLength;
                }
                $scope.days[i].dayTotal = dayTotal;
            }

            // remove loading gif
            $scope.loading = false;

            // activate controls 
            $('#clearBtn').removeClass("disableBtn");
            $('#calender').removeClass("disableBtn");
            $('.controlInputs').removeClass("disableBtn");

            /*
            // testing function
            var d = 8;
            var total = 0;
            for (var i = 0; i < $scope.days[d].Events.length; i++) {
                total = total + $scope.days[d].Events[i].eventLength;
                console.log('Event No. ' + i);
                console.log('Event No. ' + $scope.days[d].Events[i].id);
                console.log('START: ' + $scope.days[d].Events[i].startdateJS);
                console.log('END: ' + $scope.days[d].Events[i].enddateJS);
                console.log(Math.floor(($scope.days[d].Events[i].eventLength) / 60) + ' hrs ' + ($scope.days[d].Events[i].eventLength) % 60 + ' mins');
                var eventType = 'EVENT';
                if ($scope.days[d].Events[i].dominantcolor == '#ea36e4') {
                    var eventType = 'NO EVENT';
                }
                console.log('Event Type: ' + eventType)
                console.log('----------------------------------------------------');
                if (i == $scope.days[d].Events.length - 1) {
                    console.log(total);
                }
            }
            */

        }

        // function to generate new lifelog
        $scope.generateNewLifelog = function () {

            $scope.loading = true;

            // disable all controls and reset concept filter
            $('#applyBtn').addClass("disableBtn");
            $('#clearBtn').addClass("disableBtn");
            $('#calender').addClass("disableBtn");
            $('.controlInputs').addClass("disableBtn");
            $scope.conceptsFilter = 'all';

            // get lifelog data with new calender dates
            var datesString = '';
            for (var i = 0; i < $scope.selectedCalenderDates.length; i++) {
                datesString = datesString + $scope.selectedCalenderDates[i] + ','
            }
            var getEventsParameters = {
                userId: $cookieStore.get('userId'),
                dates: datesString
            }
            http.async('/GetColorEvents', getEventsParameters).then(function (data) {

                // order data by date
                for (var i = 0; i < data.length; i++) {
                    var day = data[i].date.substring(0, 2);
                    var month = parseInt(data[i].date.substring(3, 5)) - 1;
                    var year = data[i].date.substring(6, 10);
                    var dateString = Date.UTC(year, month, day, '00', '00', '00');
                    var newDate = new Date(dateString);
                    data[i].dateJS = newDate;
                    data[i].dateString = (newDate.toUTCString()).substring(0, 17);
                }
                var orderedData = $filter('orderBy')(data, 'dateJS');
                $scope.cleanData = orderedData

                // generate color events
                $scope.generateColorEvents();

            });

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
            $scope.defaultDates = $scope.availableDates.slice(0, 10);
            $scope.defaultCalenderDates = $scope.availableDates.slice(0, 10);

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
            $scope.generateCalender($scope.availableDates, $scope.defaultCalenderDates);

            // get lifelog data with last 10 days on app launch
            var datesString = '';
            for (var i = 0; i < $scope.defaultDates.length; i++) {
                datesString = datesString + $scope.defaultDates[i] + ','
            }
            var getEventsParameters = {
                userId: $cookieStore.get('userId'),
                dates: datesString
            }
            http.async('/GetColorEvents', getEventsParameters).then(function (data) {

                // order data by date
                for (var i = 0; i < data.length; i++) {
                    var day = data[i].date.substring(0, 2);
                    var month = parseInt(data[i].date.substring(3, 5)) - 1;
                    var year = data[i].date.substring(6, 10);
                    var dateString = Date.UTC(year, month, day, '00', '00', '00');
                    var newDate = new Date(dateString);
                    data[i].dateJS = newDate;
                    data[i].dateString = (newDate.toUTCString()).substring(0, 17);
                }
                var orderedData = $filter('orderBy')(data, 'dateJS');
                $scope.cleanData = orderedData

                // generate color events
                $scope.generateColorEvents();

            });

        })

        // watch concept model for concept filtering 
        var loadingCollection = true;
        $scope.conceptsFilter = 'all';
        $scope.$watchCollection('conceptsFilter', function () {
            if (loadingCollection) {
                $timeout(function () { loadingCollection = false; });
            }
            else {
                if ($scope.conceptsFilter == 'all') {
                    $scope.generateColorEvents();
                }
                else {
                    for (var i = 0; i < $scope.days.length; i++) {
                        for (var j = 0; j < $scope.days[i].Events.length; j++) {
                            // reset detected concepts counter for each event
                            var conceptDetected = 0;
                            if ($scope.days[i].Events[j].Concepts != undefined) {
                                for (var k = 0; k < $scope.days[i].Events[j].Concepts.length; k++) {
                                    // hard coded concepts for TV/Screen
                                    var conceptStrings = [
                                        'desktop computer',
                                        'monitor',
                                        'oscilloscope, scope, cathode-ray oscilloscope, CRO',
                                        'screen, CRT screen',
                                        'television, television system',
                                        'web site, website, internet site, site',
                                        'laptop, laptop computer',
                                        'typewriter keyboard',
                                        'notebook, notebook computer',
                                        'mouse, computer mouse',
                                        'hand-held computer, hand-held microcomputer',
                                        'home theater, home theatre',
                                        'cinema, movie theater, movie theatre, movie house, picture palace',
                                        'cellular telephone, cellular phone, cellphone, cell, mobile phone'
                                    ]                                    
                                    for (var l = 0; l < conceptStrings.length; l++) {

                                        if ($scope.days[i].Events[j].Concepts[k].name == conceptStrings[l]) {
                                            // concept detected, add to counter
                                            conceptDetected++;
                                        }

                                        if (l == conceptStrings.length - 1) {
                                            if (conceptDetected == 0) {
                                                $scope.days[i].Events[j].dominantcolor = '#ffffff';
                                                $scope.days[i].Events[j].cursorType = 'default';
                                                $scope.days[i].Events[j].id = null;
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }

            }
        }, true);

    }

});
