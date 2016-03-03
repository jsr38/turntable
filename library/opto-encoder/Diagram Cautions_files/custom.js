// In here should go any custom js that is not delivered to us as part of the wireframes
// This way the file 'main.js' will always contain an exact copy of the wireframe js file and can be safely overwritten in case of updates
// without losing any custom js that is added by the portlet developers

// Here the defaults are configured for the jQuery validation plugin that we are using for form validation
// Any customization can be done in the specific js file for each portlet if needed
var formValidationDefaults = {
	errorClass: 'cf-error',
	validClass: 'cf-valid',
	onfocusout: false,
	onkeyup: false,
	onclick: false,
	focusInvalid: false
};

$(document).ready(function() {
	
//	var textBlock = $('.ribbon p');
//	var maxWords = 160;
//
//	textBlock.each(function(){
//
//			var textArr = $(this).html().trim().split(/\s+/);
//			var wordCount = textArr.length;
//
//			if (wordCount > maxWords) {
//					text_less = textArr.slice(0, maxWords).join(" ");
//					text_more = textArr.slice(maxWords, wordCount).join(" ");
//			}
//			else return;
//
//			$(this).html(
//					text_less + '<span> .... </span><a href="#" class="blockExpand"><i class="fa fa-angle-double-right"></i></a>'+
//					'<span style="display:none;">'+ text_more +' <a href="#" class="blockCollapse"><i class="fa fa-angle-double-left"></i></a></span>'
//			);
//	});
//	
//	$('a.blockExpand', textBlock).click(function(event){
//	event.preventDefault();
//	$(this).hide().prev().hide();
//	$(this).next().show();
//});
//
//$('a.blockCollapse', textBlock).click(function(event){
//		event.preventDefault();
//		$(this).parent().hide().prev().show().prev().show();
//});
	
	// All zipcode fields that have class 'extzipcode' should be using a mask for 5[+4]
	$('.extzipcode').mask('00000-0000', {placeholder: "_____-____"});
	// All phoneNumbers fields that have class 'maskedphone' should have an US phone mask
	 $('.maskedphone').mask('(000) 000-0000');
	 
		
		//reg ex for avoid specific special characters in the keypress event
		$(document).on("keypress", "input[type='text']:not(.skipSqlFiltering)" ,function(e){
			var str = String.fromCharCode(!e.charCode ? e.which : e.charCode);
			if(/[*%_\\=\[\]\{\}]/.test(str)){
				return false;
			}
			else{
				return true;
			}
			});
		
		//reg ex for avoid specific special characters in the onBlur event
		$(document).on("blur", "input[type='text']:not(.skipSqlFiltering)" ,function(e){
			var target = $(e.target);
			target.val(function() {
				  return target.val().trim().replace(/[*%_\\=\[\]\{\}]/g,'').replace(/\s\s+/g, ' ').trim();
			});
			});
	
	 
	
	//Numbers only check
	$(document).on('keypress','.numberonly', function (e){
	  if (e.which != 8 && e.which != 0 && (e.which < 48 || e.which > 57)) {
	    return false;
	  }
	});
		
	$('.alphanumeric').keypress(function (e) {
		if(e.which == '8'){
			return true;
		}
	    var regex = new RegExp("^[a-zA-Z0-9]+$");
	    var str = String.fromCharCode(!e.charCode ? e.which : e.charCode);
	    if (regex.test(str)) {
	        return true;
	    }
	    e.preventDefault();
	    return false;
	});
	
	//Search typeahead	
	if ($('#search-button').length){
	    $('#search-button').typeahead({
	    	autoSelect: false,
			minLength: 3,
	 	 	source: function (query, process) {
	 	 		$("#search-dropdown").hide();
	 	 		var terms = [];
		 		if(query.length < 3){
	 	 			process(terms);
	 	 			return;
	 	 		}
		 		$.get( "/NewWebThemeDynamic/themes/html/searchTypeahead.jsp", { searchText: query+"*" } )
		 		.done(function( data ) {	    	 		
	    	 		$(data).find("autnresponse").find("responsedata").find("autn\\:hit,hit").find("autn\\:content,content").find("DOCUMENT").each(function() {	    	 			
		        		terms.push($(this).find("DRETITLE").text());
		        	});	    	 		
	    	 		process(terms);
	    	 		$('.typeahead.dropdown-menu').width("140%");
		 		});
		 	}
	 	});
	}
	
	$.fn.extend( {
        limiter: function(limit, elem) {
            $(this).on("keyup focus", function() {
                setCount(this, elem);
            });
            function setCount(src, elem) {
                var chars = src.value.length;
                if (chars > limit) {
                    src.value = src.value.substr(0, limit);
                    chars = limit;
                }
                elem.html( chars );
            }
            setCount($(this)[0], elem);
        }
    });

});


//This is for task 2537. Change place holder search button text and set current tab for search
function updatePlaceHolder(id, newPlaceHolder) {
	$("#searchTab").val(newPlaceHolder.toLowerCase());
	$("#"+id).attr("placeholder", "SEARCH " + newPlaceHolder).val("").focus().blur();
	
	//Coremetrics call
	CoreMetricsWrapper.createElementTag(newPlaceHolder, 'Theme Search bar placeholder change');
}


//Function for initializing the Invodo player
function initializeInvodoPlayer(pageName, pageType){
	if(Invodo !== undefined){
		Invodo.init({ 
		    pageName: pageName, 
		    pageType: pageType 
		  });
	}
}

function reportProductFinderCoreMetrics(selectedTabName, model) {
	
	if (model.path != null && model.path != '') {
		var pathElements = model.path.split('/products/');
		
		if (pathElements.length > 1) {
		   var path = pathElements[1].split('/');
		   pageView.attributes.attr15 = selectedTabName;
			pageView.attributes.attr16 = '1';
			pageView.attributes.attr17 = path[0];
			pageView.attributes.attr18 = path[1];
			pageView.attributes.attr19 = model.title;	
			CoreMetricsWrapper.reportPageCategory(); 
		}
	}
	
}

function filterPhoneNumberInputs(classToFilter){
	$('.'+classToFilter).each(function(){
		$(this).val(function() {
			  return $(this).cleanVal();
		});
		});
}

function resetPhoneNumberMasks(classSelector){
 $('.'+classSelector).each(function(){
		$(this).unmask();
		$(this).mask('(000) 000-0000');
		});
}



//Needed calls for Bazaar Voice
if(typeof $BV === 'undefined'){
    //Bazaar voice script library was not loaded (WAI theme)
}else{
	$BV.configure("global", { 
        submissionContainerUrl: baseURL + "/online/portal/us/home/products/reviewsubmission"
	}); 
};

var Utils = (function() {

	var uniqueList = function(list, field) {
 		var result = [];
 		var keys = [];
 		$.each(list, function(i, e) {
 			if ($.inArray(e[field], keys) == -1) {
 				result.push(e);
 				keys.push(e[field]);
 	 	        }
 	 	});
 	 	return result;
 	};
 	
 	return {
 		uniqueList : uniqueList
	};
 	
})();



var SummaryReview = (function($){
	var addLinkHandlers = function(id) {
		$('a[name=BV_TrackingTag_Rating_Summary_1_ReadReviews_' + id + ']').click(function(e) {
			e.preventDefault();
			$(this).off('click');
			$(this).prop("onclick", null);
			document.getElementById('BVRRContainer').style.visibility = 'visible';
		});
	};

	return {
		addLinkHandlers : addLinkHandlers
	};
	
})(jQuery);


