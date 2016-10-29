(function() {
  var jsSpeechFactory,
    __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  jsSpeechFactory = (function() {
    var createInstance, getInstance;

    jsSpeechFactory.instance = null;

    jsSpeechFactory.prototype.icons = {
      start: 'http://goo.gl/dBS39a',
      recording: 'http://goo.gl/7JLqdm',
      blocked: 'http://goo.gl/j8MZhD'
    };

    jsSpeechFactory.prototype.messages = {
      info_speak_now: 'Speak now.',
      info_stop: 'Proccessing your voice...',
      info_no_speech: 'No Speech was detected. You may need to adjust your <a href="//support.google.com/chrome/bin/answer.py?hl=en&amp;answer=1407892">microphone settings</a>.',
      info_no_mic: 'No microphone was found. Ensure that a microphone is installed.',
      info_blocked: 'Permission to use microphone is blocked. To change, go to <a href="chrome://settings/contentExceptions#media-stream">chrome://settings/contentExceptions#media-stream</a>.',
      info_denied: 'Permission to use microphone was denied.',
      info_setup: 'Click on the microphone icon to enable Web Speech.',
      info_upgrade: 'Web Speech API is not supported by this browser. Upgrade to <a href="//www.google.com/chrome">Chrome</a> version 25 or later.',
      info_allow: 'Click the "Allow" button above to enable your microphone.'
    };

    function jsSpeechFactory(options) {
      this.options = options;
      getInstance();
    }

    createInstance = function() {
      __indexOf.call(window, 'webkitSpeechRecognition') >= 0;
      return new webkitSpeechRecognition();
    };

    getInstance = function() {
      if (!this.instance) {
        return createInstance();
      } else {
        return this.instance;
      }
    };

    return jsSpeechFactory;

  })();

}).call(this);
