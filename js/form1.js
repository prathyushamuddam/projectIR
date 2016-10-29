var checkboxVoice = document.getElementById('useVoiceSearch');
var checkboxVoiceNo = document.getElementById('useVoiceSearchNo');
var checkboxComputer = document.getElementById('useComputer');
var checkboxComputerNo = document.getElementById('useComputerNo');
var checkboxMic = document.getElementById('externalMic');
var checkboxMicNo = document.getElementById('externalMicNo');
var div = document.getElementById('toHide');
var age = document.getElementById('age');

checkboxVoice.onclick = function () {
	if (checkboxVoice.checked == true)
	{
		div.style.display = 'inline';
		if(checkboxVoiceNo.checked == true)
			checkboxVoiceNo.checked=false;
	}
	else	
	{
		div.style.display = 'none';
	}
		
};

checkboxVoiceNo.onclick = function () {
	if(checkboxVoiceNo.checked == true)
	{
		if(checkboxVoice.checked == true)
		{
			checkboxVoice.checked=false;
			div.style.display = 'none';
		}
			
	}
};

checkboxComputer.onclick = function () {
	if (checkboxComputer.checked == true)
	{
		if (checkboxComputerNo.checked == true)
			checkboxComputerNo.checked = false;
	}
};

checkboxComputerNo.onclick = function () {
	if (checkboxComputerNo.checked == true)
	{
		if (checkboxComputer.checked == true)
			checkboxComputer.checked = false;
	}
};

checkboxMic.onclick = function () {
	if (checkboxMic.checked == true)
	{
		if (checkboxMicNo.checked == true)
			checkboxMicNo.checked = false;
	}
};

checkboxMicNo.onclick = function () {
	if (checkboxMicNo.checked == true)
	{
		if (checkboxMic.checked == true)
			checkboxMic.checked = false;
	}
};



$(document).ready(function(){
	
	$("#register-form").validate({
		submitHandler : function(form) {
		    $('#submit_btn').attr('disabled','disabled');
			$('#submit_btn').button('loading');
			form.submit();
		},
		rules : {
			age : {
				required : true,
				number : true
			},
			profession : {
				required : true,
			}
		},
		messages : {
			age : {
				required : "Please enter your age"
			},
			profession : {
				required : "Please enter your profession",
			}
		},
		errorPlacement : function(error, element) {
			$(element).closest('div').find('.help-block').html(error.html());
		},
		highlight : function(element) {
			$(element).closest('div').removeClass('has-success').addClass('has-error');
		},
		unhighlight: function(element, errorClass, validClass) {
			 $(element).closest('div').removeClass('has-error').addClass('has-success');
			 $(element).closest('div').find('.help-block').html('');
		}
	});
	
	
});

