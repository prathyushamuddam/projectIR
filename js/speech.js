/**
 * Created by Tintin on 19/05/2015.
 */
// PostBlob method uses XHR2 and FormData to submit
// recorded blob to the PHP server
function PostBlob(blob, fileType, fileName) {
    // FormData
    var formData = new FormData();
    formData.append(fileType + '-filename', fileName);
    formData.append(fileType + '-blob', blob);

    // progress-bar
    var hr = document.createElement('hr');
    container.appendChild(hr);
    var strong = document.createElement('strong');
    strong.id = 'percentage';
    //strong.innerHTML = fileType + ' upload progress: ';
    container.appendChild(strong);
    
    //container.appendChild(progress);

    // POST the Blob using XHR2
    xhr('save.php', formData, percentage, function(fileURL) {
       
    });
}

//var progress = document.createElement('progress');
//var record = document.getElementById('record');
//var stop = document.getElementById('stop');
var deleteFiles = document.getElementById('delete');
var username = document.getElementById('username');

var audio = document.querySelector('audio');

var recordVideo = document.getElementById('record-video');
var preview = document.getElementById('preview');

var container = document.getElementById('container');



var fileNumberInput = document.getElementById('fileNumber');


// if you want to record only audio on chrome
// then simply set "isFirefox=true"
var isFirefox =  true;//!!navigator.GetUserMedia;

var recordAudio, recordVideo;
var recording = false;

var fileNameInput = document.getElementById('filename');
var fileName;

var filenumber = fileNumberInput.value;


function startButton(event) {

	// Stopping the recording
    if(recording)
	{
		recording = false;
		preview.src = '';
	
		
		fileName = fileNameInput.value + filenumber.toString();
		document.getElementById("filenames").value=document.getElementById("filenames").value + fileName+";";
		filenumber++;
		
		if (!isFirefox) {
			recordAudio.stopRecording(function() {
				PostBlob(recordAudio.getBlob(), 'audio', fileName + '.wav');
			});
		} else {
			recordAudio.stopRecording(function(url) {
				preview.src = url;
				PostBlob(recordAudio.getBlob(), 'audio', fileName + '.wav');
			});
		}
		
		$('#ASR').val($('#ASR').val()+$('#textbox1').val()+";");
	}
	else
	{
		$('#textbox1').val('');
		recording = true;
		//record.disabled = true;
		navigator.getUserMedia({
			audio: true
			// video: false
		}, function(stream) {
			preview.src = window.URL.createObjectURL(stream);
			
			var rate = 16000
			if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
				rate = 44000;
			}
			else
				preview.play();

			// var legalBufferValues = [256, 512, 1024, 2048, 4096, 8192, 16384];
			// sample-rates in at least the range 22050 to 96000.
			recordAudio = RecordRTC(stream, {
				type:"audio",
				bufferSize: 16384,
				sampleRate: rate,
				onAudioProcessStarted: function() {
					if (!isFirefox) {
						recordVideo.startRecording();
					}
				}
			});

			if (isFirefox) {
				recordAudio.startRecording();
			}

			if (!isFirefox) {
				recordVideo = RecordRTC(stream, {
					type: 'video'
				});
				recordAudio.startRecording();
			}

			stop.disabled = false;
		}, function(error) {
			alert(JSON.stringify(error, null, '\t'));
		});
		
		//record.disabled = false;
		//stop.disabled = true;
	}
};

/*
record.onclick = function() {
	$('#textbox1').val('');
    record.disabled = true;
    navigator.getUserMedia({
        audio: true
        // video: false
    }, function(stream) {
        preview.src = window.URL.createObjectURL(stream);
        preview.play();

        // var legalBufferValues = [256, 512, 1024, 2048, 4096, 8192, 16384];
        // sample-rates in at least the range 22050 to 96000.
        recordAudio = RecordRTC(stream, {
			type:"audio",
            bufferSize: 16384,
            sampleRate: 16000,
            onAudioProcessStarted: function() {
                if (!isFirefox) {
                    recordVideo.startRecording();
                }
            }
        });

        if (isFirefox) {
            recordAudio.startRecording();
        }

        if (!isFirefox) {
            recordVideo = RecordRTC(stream, {
                type: 'video'
            });
            recordAudio.startRecording();
        }

        stop.disabled = false;
    }, function(error) {
        alert(JSON.stringify(error, null, '\t'));
    });
};
*/

/*
stop.onclick = function() {
    record.disabled = false;
    stop.disabled = true;

    preview.src = '';
	
	filenumber = fileNumberInput.value;
    fileName = fileNameInput.value + filenumber.toString();

    if (!isFirefox) {
		
        recordAudio.stopRecording(function() {
            PostBlob(recordAudio.getBlob(), 'audio', fileName + '.wav');
        });
    } else {
        recordAudio.stopRecording(function(url) {
            preview.src = url;
            PostBlob(recordAudio.getBlob(), 'audio', fileName + '.wav');
        });
    }
// this is the key area for video for hidden the video area
    if (!isFirefox) {
        // recordVideo.stopRecording(function() {
        //     PostBlob(recordVideo.getBlob(), 'video', fileName + '.webm');
        // });
    }

    //deleteFiles.disabled = false;
};
*/

/*deleteFiles.onclick = function() {
    deleteAudioVideoFiles();
};*/

function setFlag() {
	// insert DB flag == 1
}

function deleteAudioVideoFiles() {
    //deleteFiles.disabled = true;
    if (!fileName) return;
    var formData = new FormData();
    formData.append('delete-file', fileName);
    xhr('delete.php', formData, null, null, function(response) {
        console.log(response);
    });
    fileName = null;
    container.innerHTML = '';
}

function xhr(url, data, percentage, callback) {
    var request = new XMLHttpRequest();
    request.onreadystatechange = function() {
        if (request.readyState == 4 && request.status == 200) {
            callback(request.responseText);
        }
    };

    if (url.indexOf('delete.php') == -1) {
        request.upload.onloadstart = function() {
            //percentage.innerHTML = 'Upload started...';
        };

        request.upload.onprogress = function(event) {
            //progress.max = event.total;
            //progress.value = event.loaded;
            //percentage.innerHTML = 'Upload Progress ' + Math.round(event.loaded / event.total * 100) + "%";
        };

        request.upload.onload = function() {
            //percentage.innerHTML = 'File saved!';
        };
    }

    request.open('POST', url);
    request.send(data);
	//deleteAudioVideoFiles();
}

window.onbeforeunload = function() {
    if (!!fileName) {
        //deleteAudioVideoFiles();
        //return 'It seems that you\'ve not deleted audio/video files from the server.';
    }
};



//var event = new Event('build');
//document.getElementById("test").addEventListener('build', test(), true);

function sendTest() {
	/*
	var evt = new CustomEvent();
	evt.initEvent();
	document.getElementById("test").dispatchEvent(evt);
	*/
	$.ajax({
		 url: "spoken.php",
		 type: 'POST',
		 data: $.param({
			 mode: 'test',
			 })
		 });
	
}










