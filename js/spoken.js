function addmsg(type, msg){
	// USELESS
	/* Simple helper to add a div.
		type is the name of a CSS class (old/new/error).
	msg is the contents of the div */
	$("#messages").append(
	"<div class='msg "+ type +"'>"+ msg +"</div>"
	);
}

function waitForMsg(){
	/* This requests the url "longPoll.php"
	When it complete (or errors)*/
	$.ajax({
		type: "GET",
		url: "longPoll.php",
		
		async: true, /* If set to non-async, browser shows page as "Loading.."*/
		cache: false,
		timeout:50000, /* Timeout in ms */
		
		success: function(data){ /* called when request to barge.php completes */
			//addmsg("new", data);  Add response to a .msg div (with the "new" class)
			
			if (data==1 && $('#poll').val()==0)
			{
				
				startButton(event); // Recording
				angular.element(document.getElementById('startButton')).scope().toggleStartStop();
				
								
				/*  POST content to database 
					var data = "content=2";
					
					$.ajax({
						type: "POST",
						url: "action.php",
						data: data,
						cache: true,
						success: function(html){
						}  
					});
				*/
				
				$('#poll').val(1);
			}
			else if (data==0 && $('#poll').val()==1)
			{
				
				startButton(event); // Recording
				angular.element(document.getElementById('startButton')).scope().toggleStartStop();
				
								
				/*  POST content to database 
					var data = "content=0";
					
					$.ajax({
						type: "POST",
						url: "action.php",
						data: data,
						cache: true,
						success: function(html){
						}  
					});
				*/
				
				$('#poll').val(0);
			}
			
			setTimeout(
			waitForMsg, /* Request next message */
			500 /* ..after 0.5 seconds */
			);
		},
		error: function(XMLHttpRequest, textStatus, errorThrown){
			addmsg("error", textStatus + " (" + errorThrown + ")");
			setTimeout(
			waitForMsg, /* Try again after.. */
			15000); /* milliseconds (15seconds) */
		}
	});
};

/*
	function sendTest() {
	$.ajax({
	url: "msgsrv.php",
	type: 'POST',
	data: $.param({
	mode: 'test',
	})
	});
	};
*/


$(document).ready(function(){
	waitForMsg(); // Start the inital request 
});

// TO TEST
$(function() {
	$("#setflag").click(function() {
		var flagvalue = $("#flagValue").val();
		var data = "content="+flagvalue;

		$.ajax({
			type: "POST",
			url: "action.php",
			data: data,
			cache: true,
			success: function(html){
				$("#messages").after(html);
			}  
		});
		if ($("#flagValue").val()==0)
			$("#flagValue").val(1);
		else
			$("#flagValue").val(0);
		
		return false;
	});
});


















