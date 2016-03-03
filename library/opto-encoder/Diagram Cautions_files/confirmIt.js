var ConfirmIt = (function() {
	
	var categoryName = '';
	var modelName = '';
	var surveyUrl = "https://www.customersat3.com/csc/4487_si.asp?si=C1zI72HPPgk%3D";
	var surveyTimeStamp = "";
	var browserUrl = window.location.href;
	var finalSurveyUrl = "";
	
	var setCategoryName = function(cat) {
		categoryName = cat;
	};
	
	var setModelName = function(mod) {
		modelName = mod;
	};
	
	var openSurvey = function() {
	
		//Check if browser is IE or not
	    if (navigator.userAgent.search("MSIE") >= 0) {
	    	finalSurveyUrl = surveyUrl+"&loc="+browserUrl+"&cat="+categoryName+"&mod="+modelName+"&t="+surveyTimeStamp+"','Survey Window','height=10','width=10'";
	    }
	    //Check if browser is Chrome or not
	    else if (navigator.userAgent.search("Chrome") >= 0) {
	    	finalSurveyUrl = surveyUrl+"&loc="+browserUrl+"&cat="+categoryName+"&mod="+modelName+"&t="+surveyTimeStamp+"','Survey Window','height=10','width=10'";
	    }
	    //Check if browser is Firefox or not
	    else if (navigator.userAgent.search("Firefox") >= 0) {
	    	finalSurveyUrl = surveyUrl+"&loc="+browserUrl+"&cat="+categoryName+"&mod="+modelName+"&t="+surveyTimeStamp;
	    }
	    //Check if browser is Safari or not
	    else if (navigator.userAgent.search("Safari") >= 0 && navigator.userAgent.search("Chrome") < 0) {
	    	finalSurveyUrl = surveyUrl+"&loc="+browserUrl+"&cat="+categoryName+"&mod="+modelName+"&t="+surveyTimeStamp+"','Survey Window','height=10','width=10'";
	    }
	    //Check if browser is Opera or not
	    else if (navigator.userAgent.search("Opera") >= 0) {
	    	finalSurveyUrl = surveyUrl+"&loc="+browserUrl+"&cat="+categoryName+"&mod="+modelName+"&t="+surveyTimeStamp+"','Survey Window','height=10','width=10'";
	    }

		var script = document.createElement("SCRIPT");
		script.setAttribute("LANGUAGE", "JavaScript");
		script.setAttribute("SRC", finalSurveyUrl);
		document.body.appendChild(script);
		return false;		
	};
	
	return {
		setCategoryName : setCategoryName,
		setModelName : setModelName,
		openSurvey : openSurvey
	};
	
})();