angular.module('eyeAware')
  .service('shared', function ($http) {

      var sharedObject = {};

      return {
          getShared: function () {
              return sharedObject;
          },
          setShared: function (value) {
              sharedObject = value;
          }
      };

});