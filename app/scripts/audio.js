$('document').ready(function() {
    'use strict';
    var AudioContext = window.AudioContext || window.webkitAudioContext;
    var context = new AudioContext();
    var source;

    function loadNoise() {
        source = context.createBufferSource();
        var request = new XMLHttpRequest();
        request.open('GET', 'media/pinknoise.mp3', true);
        request.responseType = 'arraybuffer';
        request.onload = function() {
            var audioData = request.response;

            context.decodeAudioData(audioData, function(buffer) {
                var myBuffer = buffer;
                source.buffer = myBuffer;
                source.connect(context.destination);
                source.loop = true;
            },

              function(e){'Error with decoding audio data' + e.err;});
        };
        request.send();
    }

    function startNoise() {
        source.start(0);
    }
   
    function stopNoise() {
        if (source) {
            source.stop(0);
            loadNoise();
        }
    }

    loadNoise();

    $('#stopped').click(function() {
        var $self = $(this);
        if ($self.text() === 'Click here to sleep') {
            $self.text('Click here to wake');
            try {
                    startNoise();
                }
            catch(e) {
                console.log(e);
            }
            
        } else {
            $self.text('Click here to sleep');
            stopNoise();
        }
    });

});