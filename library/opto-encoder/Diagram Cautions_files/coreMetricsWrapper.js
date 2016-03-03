var CoreMetricsWrapper = (function() {
	/*
	 * Configuration object for CoreMetrics Production
	 */
	var _coreMetricsProdConfig = {
			clientId : '90394130',
			url : 'data.coremetrics.com'
	};
	
	/*
	 * Configuration object for CoreMetrics Test
	 */
	var _coreMetricsTestConfig = {
			clientId : '60394130',
			url : 'testdata.coremetrics.com'
	};
	
	/*
	 * Domain to pass to CoreMetrics
	 */
	var _canonDomain = 'canon.com';
	
	/*
	 * Reports a button click to CoreMetrics
	 */
	var reportButtonClick = function(buttonIdentifier, buttonCategory) {
		cmCreateElementTag(buttonIdentifier.substring(0, 50), buttonCategory.substring(0, 50));
	};
	
	/*
	 * Reports a page load to CoreMetrics
	 */
	var reportPageCategory = function() {
		if(document.title == 'Product Support Details' || document.title == 'Product Details'){
			cmCreatePageviewTag($('input[name=hidden_modelname]').val() + ' / ' + $('input[name=hidden_modelid]').val(), $('input[name=hidden_currentsiteareaparentid]').val(), null, null, getAttributeList());
			digitalData.page.category.primaryCategory = $('input[name=hidden_currentsiteareaparentid]').val();
		}else if(document.title == 'Search Results'){
			cmCreatePageviewTag(document.title, digitalData.page.category.primaryCategory, digitalData.page.pageInfo.onsiteSearchTerm, digitalData.page.pageInfo.onsiteSearchResults, getAttributeList());
		}else cmCreatePageviewTag(document.title, digitalData.page.category.primaryCategory, null, null, getAttributeList());
		clearAttributes();
	};
	
	/*
	 * Create cm_mmc value to append to the URL
	 */
	var cm_mmc = function(category,placement,item,val) {
		return val = 'cm_mmc=New Web' + '-_-' + category + '-_-' + placement + '-_-' + item; 
	};
	
	/*
	 * Create cmCreateElementTag
	 */
	var createElementTag = function(elementID, category, attribute) {
		cmCreateElementTag(elementID, category, attribute);
	};
	
	/*
	 * Set search terms
	 */
	var setSearchTerms = function(terms) {
		digitalData.page.pageInfo.onsiteSearchTerm = terms;
	};
	
	/*
	 * set Search result counts
	 */
	var setSearchResults = function(resultCount){
		digitalData.page.pageInfo.onsiteSearchResults = resultCount;
	};
	
	/*
	 * registration/login event
	 */
	var createRegistrationCall = function(uuid, email, city, state, zip,country, fullname){
		cmCreateRegistrationTag(uuid, email, city, state, zip,country, fullname);
	};
	
	/*
	 * Conversion event tag 
	 */
	var createConversionEventTag = function(eventId, actionType, categoryId, points, attribute){
		cmCreateConversionEventTag(eventId, actionType, categoryId, points, attribute);
	};
	
	/*
	 * Initializes CoreMetrics. Choose between Test or Production config here
	 */
	var init = function() {
		if(prodSite == 'Y'){
			cmSetClientID(_coreMetricsProdConfig.clientId, true, _coreMetricsProdConfig.url, _canonDomain);
			if (typeof IORequest != "undefined") {IORequest.disable_console_logging=true;}
		}else cmSetClientID(_coreMetricsTestConfig.clientId, false, _coreMetricsTestConfig.url, _canonDomain);
	}; 
	
	return {
		init : init,
		reportButtonClick : reportButtonClick,
		reportPageCategory : reportPageCategory,
		cm_mmc : cm_mmc,
		createElementTag : createElementTag,
		setSearchTerms : setSearchTerms,
		setSearchResults : setSearchResults,
		createRegistrationCall : createRegistrationCall,
		createConversionEventTag : createConversionEventTag
	};
	
})();

var digitalData = {
		"page": {
		    "pageInfo": {
		        "pageID": document.title,
		        "breadCrumbs":[],
		        "onsiteSearchTerm":"",
		        "onsiteSearchResults":"",
		        "exploreAttributes":"",
		        "extraFields":""
		    },
		    "category":{ 
		    	"primaryCategory":"",
		    	"parentCategory":""
		    },
		    "attributes":{
		    	"exploreAttributes":[],
		    	"extraFields":[]
		    }
		},
		"product":[],
		"user":[]
	};

	var productData={
			"productInfo": {
				"productID":"",
				" productName":""
			}
	};

	var pageView = {
		"attributes":{
			"attr15":"",
			"attr16":"",
			"attr17":"",
			"attr18":"", 
			"attr19":""
		}		
	};

	function getAttributeList(){
		var val = '-_--_--_--_--_--_--_--_--_--_--_--_--_--_-' + 
		pageView.attributes.attr15 + '-_-' + 
		pageView.attributes.attr16 + '-_-' + 
		pageView.attributes.attr17 + '-_-' + 
		pageView.attributes.attr18 + '-_-' + 
		pageView.attributes.attr19;
		
		return val;
	}

	function clearAttributes(){
		pageView.attributes.attr15 = ""; 
		pageView.attributes.attr16 = ""; 
		pageView.attributes.attr17 = ""; 
		pageView.attributes.attr18 = ""; 
		pageView.attributes.attr19 = "";
	}

function createMMCThemeLinks(){
	//This function is to add the needed cm_mmc url parameter to the end of all external Canon site URLs
	//Set Canon Direct Link
	var cdLink = $('#canonDirectLink').prop('href');
	var cdMMC = 'cm_mmc=Sitewide-_-Ref-NW-_-Global-_-Header-link';
	$('#canonDirectLink').prop('href',appendParameter(cdLink,cdMMC));
	
}

function appendParameter(link, mmcVal,revisedLink){
	var splitLink = link.split('?');
	if(splitLink.length > 1) return link + '&' + mmcVal;
	else return link + '?' + mmcVal;	
}