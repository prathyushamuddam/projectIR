$(document).ready(function(){
	
	$("#register-form").validate({
		submitHandler : function(form) {
		    $('#submit_btn').attr('disabled','disabled');
			$('#submit_btn').button('loading');
			form.submit();
		},
		rules : {
			name : {
				required : true
			},
			password : {
				required : true
			},
			confirm_password : {
				required : true,
				equalTo: "#password"
			},
			info_need : {
				required : true
			}
		},
		messages : {
			name : {
				required : "Please enter name"
			},
			password : {
				required : "Please enter password"
			},
			confirm_password : {
				required : "Please enter password confirmation",
				equalTo: "Password and password confirmation don't match"
			},
			info_need : {
				required : "Please enter information needs"
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