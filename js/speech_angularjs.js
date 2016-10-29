(function() {
  'use strict';

  var _app;

  _app = angular.module('jonniespratley.angularWebSpeechDirective', []);

  _app.service('jsSpeechFactory', [
    '$rootScope', function($rootScope) {
      var first_char, jsSpeechFactory, one_line, two_line;
      two_line = /\n\n/g;
      one_line = /\n/g;
      first_char = /\S/;
      return jsSpeechFactory = {
        icons: {
          start: 'imgs/mic.gif',
          recording: 'imgs/mic-animate.gif',
          blocked: 'imgs/mic-slash.gif'
        },
        messages: {
          info_speak_now: 'Speak now...',
          info_stop: 'Proccessing your voice...',
          info_no_speech: 'No Speech was detected. You may need to adjust your <a href="//support.google.com/chrome/bin/answer.py?hl=en&amp;answer=1407892">microphone settings</a>.',
          info_no_mic: 'No microphone was found. Ensure that a microphone is installed.',
          info_blocked: 'Permission to use microphone is blocked. To change, go to <a href="chrome://settings/contentExceptions#media-stream">chrome://settings/contentExceptions#media-stream</a>.',
          info_denied: 'Permission to use microphone was denied.',
          info_setup: '',
          info_upgrade: 'Web Speech API is not supported by this browser. Upgrade to <a href="//www.google.com/chrome" target="_blank">Chrome</a> version 25 or later.',
          info_allow: 'Click the "Allow" button above to enable your microphone.'
        },
        linebreak: function(s) {
          return s.replace(two_line, "<p></p>").replace(one_line, "<br>");
        },
        capitalize: function(s) {
          return s.replace(first_char, function(m) {
            return m.toUpperCase();
          });
        }
      };
    }
  ]);

  _app.directive('jsSpeech', [
    'jsSpeechFactory', function(jsSpeechFactory) {
      return {
        restrict: 'AE',
        replace: true,
        transclude: true,
        require: '^ngModel',
        scope: {
          ngModel: '='
        }, 
template: "<div class=\"jsSpeechFactory-container\"> \
				<div class=\"center aligned column\"> \
					<button  \
						style='margin-top: 7px'  \
						type='button' \
						id='startButton' \
						onclick=\"startButton(event)\" \
						href=\"\" \
						class=\"jsSpeechFactory-btn ui green submit button\" \
						ng-click=\"toggleStartStop()\">Start</button> \
					<input name=\"sqcollection\" type=\"textbox\" id=\"textbox1\" class=\"ui center search-control\" ng-model=\"ngModel.value\"/> \
					<p class=\"text-muted jsSpeechFactory-hint\" ng-bind-html-unsafe=\"speech.msg\"></p>\
				</div>\
			</div>",
        link: function(scope, element, attrs, ngModel) {
          var $scope, init, onresult, onstart, recognition, recognizing, reset, safeApply, setIcon, setMsg, upgrade, addWquery, addSquery;
          $scope = scope;
          recognizing = false;
          recognition = null;
          $scope.speech = {
            msg: jsSpeechFactory.messages.info_setup,
            icon: jsSpeechFactory.icons.start,
            recognizing: false
          };
          scope.$watch('ngModel', function(newVal, oldVal) {
            return console.log(newVal);
          }, true);
          safeApply = function(fn) {
            var phase;
            phase = scope.$root.$$phase;
            if (phase === "$apply" || phase === "$digest") {
              if (fn && (typeof fn === "function")) {
                return fn();
              }
            } else {
              return scope.$apply(fn);
            }
          };
          setMsg = function(msg) {
            return safeApply(function() {
              return $scope.speech.msg = jsSpeechFactory.messages[msg];
            });
          };
          setIcon = function(icon) {
            return safeApply(function() {
              return $scope.speech.icon = jsSpeechFactory.icons[icon];
            });
          };
          init = function() {
            reset();
            if ('webkitSpeechRecognition' in window) {
              recognition = new webkitSpeechRecognition();
              recognition.continuous = true;
			  recognition.lang = "en";
              recognition.interimResults = true;
              recognition.onerror = onerror;
              recognition.onend = reset;
              recognition.onresult = onresult;
              return recognition.onstart = onstart;
            } else {
              recognition = {};
              return upgrade();
            }
          };
          upgrade = function() {
            setMsg('info_upgrade');
            return setIcon('blocked');
          };
          onstart = function(event) {
            var onerror;
            setIcon('recording');
            setMsg('info_speak_now');
            console.log('onstart', event);
            return onerror = function(event, message) {
              console.log('onerror', event, message);
              switch (event.error) {
                case "not-allowed":
                  return setMsg('info_blocked');
                case "no-speech":
                  return setMsg('info_no_speech');
                case "service-not-allowed":
                  return setMsg('info_denied');
                default:
                  return console.log(event);
              }
            };
          };
          onresult = function(event) {
            var i, result, resultIndex, trans, _results;
            setIcon('recording');
            setMsg('info_speak_now');
            resultIndex = event.resultIndex;
            trans = '';
            i = resultIndex;
            _results = [];
            while (i < event.results.length) {
              result = event.results[i][0];
              trans = jsSpeechFactory.capitalize(result.transcript);
              safeApply(function() {
                $scope.ngModel.interimResults = trans;
                return $scope.ngModel.value = trans;
              });
              if (event.results[i].isFinal) {
                safeApply(function() {
                  return $scope.ngModel.value = trans;
                });
              }
              _results.push(++i);
            }
            return _results;
          };
          reset = function(event) {
            console.log('reset', event);
            $scope.speech.recognizing = false;
            setIcon('start');
            setMsg('info_setup');
            return $scope.abort = function() {
              return $scope.toggleStartStop();
            };
          };
          $scope.toggleStartStop = function() {
            if ($scope.speech.recognizing) {
              recognition.stop();
              return reset();
            } else {
              recognition.start();
              $scope.speech.recognizing = true;
              return setIcon('blocked');
            }
          };
          //
          $scope.save = function(){
			//alert("SAVING files");
            $http.post('/Cl/saveJson.php',speech.value).then(function(){
              
            })
			
          }
          return init();
        }
      };
    }
  ]);

}).call(this);
