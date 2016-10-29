'use strict';

angular.module('eyeAware')
  .controller('sign-up', function ($scope, $cookieStore, $location) {

    if ($cookieStore.get('email')) {
        // cookie is not set, user not logged in
        $location.path('/lifelog');
    }

    // hide feedback until form is submitted
    $scope.validate = false;

    // submit form and toggle feedback 
    $scope.submitSignUp = function (user) {

        $scope.validate = true;

        if ($scope.signUpForm.$valid == false) {
            alert('Not all inputs filled!');
            console.log("Sign up failed!");
        }
        else if ($scope.user.email1 != $scope.user.email2) {
            alert("Your email addresses do not match.");
            console.log("Sign up failed!");
        }
        else if ($scope.user.password1 != $scope.user.password2) {
            alert("Your passwords do not match.");
            console.log("Sign up failed!");
        }
        else {

            $scope.userDetails = angular.copy(user);
            user.fname = '';
            user.lname = '';
            user.email1 = '';
            user.email2 = '';
            user.message = '';
            alert('Thank you! Your application has been recieved.');
            //console.log($scope.userDetails);

            $.ajax({
                type: "POST",
                url: "https://mandrillapp.com/api/1.0/messages/send.json",
                data: {
                    "key": "LqGvOZAPFNxI9QdJURxAZg",
                    "message": {
                        "from_email": $scope.userDetails.email1,
                        "to": [{
                            "email": "pda@computing.dcu.ie"
                        }],
                        "autotext": "true",
                        "subject": "This is an EyeAware email from " + $scope.userDetails.fname + ' ' + $scope.userDetails.lname,
                        "html": $scope.userDetails.message
                    }
                }
            }).done(function (response) {
                console.log(response);
            });

            $location.path('/redirect');

        }
         
    }

  });
