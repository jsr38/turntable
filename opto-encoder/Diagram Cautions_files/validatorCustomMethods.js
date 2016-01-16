/**
 *JQuery Validator custom methods.
 */
$.validator.addMethod("checkSecurityAnswer",
	function (value, element, params){
		var resultQuestion = true;
		var resultAnswer = false;
		var question = $("#"+params[0]).val().substring(0, $("#"+params[0]).val().length-1);
		question = question.replace(/'s/g , "");
	    var questionArray = question.toUpperCase().split(" ");
	    var answerArray = value.split(" ");
	    resultAnswer =  /^[&-\w\s]+$/g.test(value);
		for (var i = 0; i < answerArray.length; i++) { 
		    if ($.inArray(answerArray[i].toUpperCase(), questionArray) >= 0) {
		    	resultQuestion =  false; 
		    	break;
		    }
		}
		if(resultQuestion && resultAnswer){
			return true;
		}
		else{
			return  false; 
		}  
	}, 
	"Please use: alphabets, numerals, space, hyphen, underscore or &. The answer must NOT contain any words from the security question."
);

$.validator.addMethod("dateNotInFuture",
    function(value, element) {
		var now = new Date();
		var entered = new Date(value);			
		if (entered > now) {				
			return false;		
		}			
        return true;
    },
    "Date cannot be in the future"
);

$.validator.addMethod("modelSelected",
    function(value, element, params) {									
		if (value !== "-1" && $("#" + params[0]).val().length > 0) {
			return true;
		}		
		return false;
    },
    "Please select a valid model"
);

$.validator.addMethod("validateZipcodeOnly", 
	function (value, element, params){
		var result = false;
		
		$.ajax({
	        url: params[0],
	        type: "POST",
	        async: false,
	        cache: false,
	        data: {
	        	"zipcode" : params[1]
	    	},       
	        success: function(msg)
	        {
	        	result = (msg === "true");
	        }    	
		});
		return  result;
	}, 
	"Invalid zip code"
);

$.validator.addMethod("phoneFormat", 
	function (value, element, params) {    		
		phone_number = value.replace(/\s+/g, "");        
		return phone_number.length == 10;
	}, 
	"Please specify a valid phone number"
);

$.validator.addMethod("selectRequired",
	function(value, element) {    		
		if (value !== "-1") {
			return true;
		}		
		return false;
    },
    "This field is required"
);

$.validator.addMethod("lettersOnly",
	function(value, element) {
		return this.optional(element) || /^[a-z\s]+$/ig.test(value);
	}, 
	"Please enter letters and spaces only"
);

$.validator.addMethod("alphanumericOnly", 
	function(value, element) {
		return this.optional(element) || /^[\w\s]+$/ig.test(value);
	}, 
	"Please enter alphanumeric characters only"
); 

$.validator.addMethod("phoneUS",
	function (phone_number, element) {
    	phone_number = phone_number.replace(/\s+/g, "");
    	return this.optional(element) || phone_number.length > 9 && phone_number.match(/^(\+?1-?)?(\([2-9]\d{2}\)|[2-9]\d{2})-?[2-9]\d{2}-?\d{4}$/);
	},
	"Please specify a valid phone number"
);

$.validator.addMethod("emailFormat", 
	function (value, element){
		return this.optional(element) || /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,})(\]?)+$/ig.test(value);	
	},
	"Email address format is not valid"
);

$.validator.addMethod("checkEmailAddress", 
	function (value, element, params){
		var result = null;
		
		$.ajax({
	        url: params[0],
	        type: "POST",
	        async: false,
	        data: {"email" : value}
		}).done(function (retdata, statusText, xhr) {
			if (xhr.status == 200) {
				result = false;		    	
			} else if (xhr.status == 204) {
				result = true;
			} 
        }).fail(function (data, textStatus) { 
        	alert("Error checking the email address");
        });		
		return  result;
	},
	"Email address is not available. Please either login with this email address or enter a different email address"
);

$.validator.addMethod("passwordFormat", 
	function(value, element) {
		return /^((?=.*\d)(?=.*[A-z]).{8,30})+$/g.test(value);	
	}, "Please Enter Valid Password. Use Alphabets, Numerals, @ ! # $ % * - . _ ~"
);

$.validator.addMethod("equalToEmail",
		function(value, element) {
			return ($("#email").val() === value);
		}, "The Verify Email address you entered did not match your Email address. Type your Email address in the Verify Email address field and try again."
	);

$.validator.addMethod("equalToPassword",
		function(value, element) {
			return ($("#password").val() === value);
		}, "The Verify Password you entered did not match your Password. Type your Password in the Verify Password field and try again."
	);

$.validator.addMethod("validateStreetAddress", 
	function(value, element, params) {
		if(value.trim().length > 0){
			if(element.getAttribute("data-suggest-address")){
				if (element.getAttribute("data-suggest-address").trim() !== value.trim()) {
					element.value = element.getAttribute("data-suggest-address");
					element.style.backgroundColor = "#99c2eb";
					element.style.color = "white";
				} else {
					element.style.backgroundColor = "transparent";
					element.style.color = "#555";
				}			
				return true;
			} else {
				element.style.backgroundColor = "transparent";
				element.style.color = "#555";
				return false;
			}
		} else {
			element.style.backgroundColor = "transparent";
			element.style.color = "#555";
			return true;
		}		
	}, 
	"Invalid street address"
);		

$.validator.addMethod("validateSuiteApartment",
	function(value, element, params) {
		if(value.trim().length > 0){ 
			if(element.getAttribute("data-suggest-suite-apartment") !== null && element.getAttribute("data-suggest-suite-apartment") !== ""){
				if(element.getAttribute("data-suggest-suite-apartment").trim() !== value.trim()){
					element.value = element.getAttribute("data-suggest-suite-apartment");
					element.style.backgroundColor = "#99c2eb";
					element.style.color = "white";
				} else {
					element.style.backgroundColor = "transparent";
					element.style.color = "#555";
				}	
			} else {
				element.value = "";
				element.style.backgroundColor = "#99c2eb";
				element.style.color = "white";
			}							
			return true;
		} else {
			element.style.backgroundColor = "transparent";
			element.style.color = "#555";
			return true;
		}		
	}, 
	"Invalid suite / apartment number"
); 

$.validator.addMethod("validateCity",
	function(value, element, params) {
		if(value.trim().length > 0){
			if(element.getAttribute("data-suggest-city")){
				if(element.getAttribute("data-suggest-city").trim() !== value.trim()){
					element.value = element.getAttribute("data-suggest-city");
					element.style.backgroundColor = "#99c2eb";
					element.style.color = "white";
				}else {
					element.style.backgroundColor = "transparent";
					element.style.color = "#555";
				}
				return true;
			}else {
				element.style.backgroundColor = "transparent";
				element.style.color = "#555";
				return false;
			}
		} else {
			element.style.backgroundColor = "transparent";
			element.style.color = "#555";
			return true;
		}		
	}, 
	"Invalid city"
); 

$.validator.addMethod("validateState",
	function(value, element, params) {
		if(value.trim().length > 0 && value.trim() !== "-1"){
			if(element.getAttribute("data-suggest-state-code")){
				if(element.getAttribute("data-suggest-state-code").trim().split("-")[1] !== value.trim()){
					element.value = element.getAttribute("data-suggest-state-code").split("-")[1];
					$(element).selectpicker("refresh");
					$(element).selectpicker("render");
					$('[data-id="' + element.id + '"]').css("backgroundColor", "#99c2eb");
					$('[data-id="' + element.id + '"]').css("color", "white");
				}else {
					$('[data-id="' + element.id + '"]').css("backgroundColor", "transparent");
					$('[data-id="' + element.id + '"]').css("color", "#555");
				}
				return true;
			}else {			
				$(element).selectpicker("refresh");
				$(element).selectpicker("render");
				$('[data-id="' + element.id + '"]').css("backgroundColor", "transparent");
				$('[data-id="' + element.id + '"]').css("color", "#555");
				return false;
			}
		} else {
			element.style.backgroundColor = "transparent";
			element.style.color = "#555";
			return true;
		}		
	}, 
	"Invalid state"
);

$.validator.addMethod("validateZipCode",
	function(value, element, params) {
		if(value.trim().length > 0){
				if(element.getAttribute("data-suggest-zip-code")){
					if(String(element.getAttribute("data-suggest-zip-code").trim()) !== value.trim()){
						element.value = element.getAttribute("data-suggest-zip-code");
						element.style.backgroundColor = "#99c2eb";
						element.style.color = "white";
					}else {
						element.style.backgroundColor = "transparent";
						element.style.color = "#555";
					}			
					return true;
				}else {
					element.style.backgroundColor = "transparent";
					element.style.color = "#555";
					return false;
				}
		} else {
			element.style.backgroundColor = "transparent";
			element.style.color = "#555";
			return true;
		}		
	}, 
	"Invalid zip code"
);	
 
 // Function used to populate the address input"s data attributes with the web service suggested values.
function populateValidatedFullAddress(argUrl, argParams) {
	$("#" + argParams[0]).removeAttr("data-suggest-address");
	$("#" + argParams[1]).removeAttr("data-suggest-suite-apartment");
	$("#" + argParams[2]).removeAttr("data-suggest-city");
	$("#" + argParams[3]).removeAttr("data-suggest-state-code");
	$("#" + argParams[4]).removeAttr("data-suggest-zip-code");
	
	 $.ajax({
		url : argUrl,
		type : "POST",
		datatype : "json",
		async : false,
		cache : false,
		data : {
			"address" : 		$("#" + argParams[0]).val(),
			"suiteApartment" :  $("#" + argParams[1]).val(),
			"city" : 			$("#" + argParams[2]).val(),
			"stateCode" : 		$("#" + argParams[3]).val(),
			"zipCode" : 		$("#" + argParams[4]).val()
		}
	}).done(function(data) {		
		if(data.faultOrStatusCode !== "S00000" || data.faultOrStatusCode !== "S80000"){			
			if (data.address !== "") {
				$("#" + argParams[0]).attr("data-suggest-address", data.address);
			} 
			if (data.suiteApartment !== "") {
				$("#" + argParams[1]).attr("data-suggest-suite-apartment", data.suiteApartment);
			}
			if (data.city !== "") {
				$("#" + argParams[2]).attr("data-suggest-city", data.city);
			}
			if (data.stateCode !== "") {
				$("#" + argParams[3]).attr("data-suggest-state-code", data.stateCode);
			}
			if (data.zipCode !== "") {
				var closestForm = $("#" + argParams[4]).closest('form').attr('id');
				if(closestForm == 'shipping-form' || closestForm == 'billing-form'){
					var arr = data.zipCode.split('-');
					$("#" + argParams[4]).attr("data-suggest-zip-code",	arr[0]);
				}else {
					$("#" + argParams[4]).attr("data-suggest-zip-code",	data.zipCode);
				}				
			}
		}
	}).fail(function(data, textStatus) {
		alert("Error retrieving validated address");
	});
}

$.validator.addMethod("atLeastOneNewsletter", function() {
	if($('input:checkbox').is(':checked')){
		return true;
	}else{
		return false;
	}
}, 
"Please select at least one newsletter"
);

$.validator.addMethod("verifyOptOutEmail", function(value, element) {
	if(element.getAttribute("data-registered-email") == value.trim()){
		return true;
	}else{
		return false;
	}		
}, 
"Please enter your registered email address."
);

