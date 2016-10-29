(function() {
  var app;

  app = angular.module("plunker", ["jonniespratley.angularWebSpeechDirective"]);

  app.controller("MainCtrl", function($scope) {
    $scope.home = {
      title: "Search",
      body: "Spoken and written queries collections."
    };
    return $scope.speech = {
      maxResults: 25,
      continuous: true,
      interimResults: true
    };
  });

}).call(this);
