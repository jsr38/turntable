var Allegiance = (function() {
	
	var showSurvey = function(surveyId, cimId, pimId, modelDesc) {
		var url = "https://canonusa.allegiancetech.com/cgi-bin/qwebcorporate.dll?";
		var	idx = surveyId; 
		var cim = cimId;   
		var pim = pimId;   
		var model = modelDesc;  
		var surveyTimeStamp = "";
		var finalSurveyUrl = "";
			
		if (navigator.userAgent.search("Firefox") >= 0) {
	    	finalSurveyUrl = url+"&idx="+idx+"&CIM="+cim+"&PIM="+pim+"&Model="+model+"&t="+surveyTimeStamp;
	    } else {
	    	finalSurveyUrl = url+"&idx="+idx+"&CIM="+cim+"&PIM="+pim+"&Model="+model+"&t="+surveyTimeStamp+"','Survey Window','height=10','width=10'";
		}
		
	    window.open(finalSurveyUrl, "_blank", "toolbar=no, scrollbars=yes, resizable=yes, top=50, left=300, width=900, height=750, menubar=no");
	};
	
	
	return {
		showSurvey : showSurvey
	};
	
})();








