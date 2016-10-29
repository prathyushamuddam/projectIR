angular.module('eyeAware')
.service('http', function ($http, shared) {

    var url = 'http://eyeaware.computing.dcu.ie/UIWebService.asmx';

    var http = {

        async: function (webService, arguments) {

            var promise = $http({
                method: "POST",
                url: url + webService,
                dataType: "json",
                data: arguments
            })
            .then(function (response) {
                var stringToObject = angular.fromJson(response.data.d);
                return stringToObject;
            });

            return promise;

        }


    };

    return http;

});