$(document).ready(function()
{
	
	$('#search-content').hide();
	$('#help-content').hide();
	$( "#textbox1" ).focus();
	$('#help').click(function()
	{
		if(!$('#help-content').is(":visible"))
		{
			console.log("HIDDEN");
			$('#help-content').show();
		}
		else
		{
			console.log("NOT HIDDEN");
			$('#help-content').hide();
		}
			
	});
	
	$( "#search" ).click(function() 
	{  
		$("#search-content").show();
		$("#results_1").empty();    
		$("#results_21").empty();    
		$("#results_31").empty();    
		
		var keyword=$( "#textbox1" ).val();
		
		/* OLD VERSION
			$.getJSON("http://boston.lti.cs.cmu.edu/Services/clueweb12/lemur.cgi?x=false&q=" + keyword,function(data)
			{        
				
				$.each(data.results, function(i,item)
				{                  
					$("#results_1").append("<a href =" +  item.url + " target='_blank'><h4 class='ui header red'>"+  item.title +  "</h4></a> <br />")
					$("#results_1").append("<a href =" +  item.url + " target='_blank'>" + "<span class=url>"+ item.url + "</span> </a> <br /> ")
					$("#results_1").append("<span class=intro>" + item.kwic + "</span> <br />")
					$("#results_1").append("<br />")
					
					
				});                         
			});
		
		*/
			$.ajax({
			  url: "http://boston.lti.cs.cmu.edu/Services/clueweb12/lemur.cgi?x=false&q=" + keyword,
			  type: 'GET',
			  dataType: 'json',
			  success: 	function(data)
						{        
							$.each(data.results, function(i,item)
							{                  
								$("#results_1").append("<a href =" +  item.url + " target='_blank'><h4 class='ui header red'>"+  item.title +  "</h4></a> <br />")
								$("#results_1").append("<a href =" +  item.url + " target='_blank'>" + "<span class=url>"+ item.url + "</span> </a> <br /> ")
								$("#results_1").append("<span class=intro>" + item.kwic + "</span> <br />")
								$("#results_1").append("<br />")
							});                         
						},
			  beforeSend: setHeader
			});
			
			function setHeader(xhr) {
				xhr.setRequestHeader('username', 'dcu-jones');
				xhr.setRequestHeader('password', 'weSEEyou-DCU');
			}
		
		
		/*
		$.ajax({
			// The 'type' property sets the HTTP method.
			// A value of 'PUT' or 'DELETE' will trigger a preflight request.
			type: 'GET',

			// The URL to make the request to.
			url: "http://boston.lti.cs.cmu.edu/Services/clueweb12/lemur.cgi?x=false&q=" + keyword,

			// The 'contentType' property sets the 'Content-Type' header.
			// The JQuery default for this property is
			// 'application/x-www-form-urlencoded; charset=UTF-8', which does not trigger
			// a preflight. If you set this value to anything other than
			// application/x-www-form-urlencoded, multipart/form-data, or text/plain,
			// you will trigger a preflight request.
			contentType: 'text/plain',

			xhrFields: {
				// The 'xhrFields' property sets additional fields on the XMLHttpRequest.
				// This can be used to set the 'withCredentials' property.
				// Set the value to 'true' if you'd like to pass cookies to the server.
				// If this is enabled, your server must respond with the header
				// 'Access-Control-Allow-Credentials: true'.
				withCredentials: false
			},

			headers: {
				// Set any custom headers here.
				// If you set any non-simple headers, your server must include these
				// headers in the 'Access-Control-Allow-Headers' response header.
				'username': 'dcu-jones',
				'password': 'weSEEyou-DCU'
			},

			success:	function(data)
						{        
							
							$.each(data.results, function(i,item)
							{                  
								$("#results_1").append("<a href =" +  item.url + " target='_blank'><h4 class='ui header red'>"+  item.title +  "</h4></a> <br />")
								$("#results_1").append("<a href =" +  item.url + " target='_blank'>" + "<span class=url>"+ item.url + "</span> </a> <br /> ")
								$("#results_1").append("<span class=intro>" + item.kwic + "</span> <br />")
								$("#results_1").append("<br />")
								
								
							});                         
						},

			error: function() {
				// Here's where you handle an error response.
				// Note that if the error was due to a CORS issue,
				// this function will still fire, but there won't be any additional
				// information about the error.
			}
		});
		
		*/
		
		
		
		
		
		
		
		
		
		
		
		
		$.getJSON("http://www.faroo.com/api?q=" + keyword + "&start=1&l=en&src=news&f=json&key=Tf9@y14AptkXcnmoTCxyt@UDFCs_",function(data)
		{        
			
			$.each(data.results, function(i,item)
			{                  
				$("#results_21").append("<a href =" +  item.url + " target='_blank'><h4 class='ui header red'>"+  item.title +  "</h4></a> <br />")
				$("#results_21").append("<a href =" +  item.url + " target='_blank'>" + "<span class=url>"+ item.url + "</span> </a> <br /> ")
				$("#results_21").append("<span class=intro>" + item.kwic + "</span> <br />")
				$("#results_21").append("<br />")
				
			});
			
		});
		$.getJSON("http://www.faroo.com/api?q=&start=1&length=10&l=en&src=news&f=json&key=Tf9@y14AptkXcnmoTCxyt@UDFCs_",function(data)
		{        
			
			$.each(data.results, function(i,item)
			{                  
				$("#results_31").append("<p><a href =" +  item.url + " target='_blank'>"+  item.title +  "</a></p>")
				//$("#results3_31").append("<br />")
				
			});
			
			});                                 
		
		
	});
	
});

