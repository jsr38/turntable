var lpUnit = "customer-service";
var lpMTagConfig = {
	'lpServer' : 'sales.liveperson.net',
	'lpNumber' : '50183814', // this will change between Production and Testing
	'lpProtocol' : (document.location.toString().indexOf('https:')==0) ? 'https' : 'http',
	'lpTagLoaded' : false,
	'lpTagSrv' : 'sales.liveperson.net',
	'pageStartTime' : (new Date()).getTime() //pageStartTime is set with a timestamp as soon as the page starts loading
	
};

lpMTagConfig.lpLoadScripts = function(){
	lpAddMonitorTag();
}

function lpAddMonitorTag(src) { 
	if (!lpMTagConfig.lpTagLoaded) {if (typeof(src) == 'undefined' || typeof(src) == 'object') {if (lpMTagConfig.lpMTagSrc) {src = lpMTagConfig.lpMTagSrc;}else {if (lpMTagConfig.lpTagSrv) {src = lpMTagConfig.lpProtocol + '://' +lpMTagConfig.lpTagSrv + '/hcp/html/mTag.js';}else {src = '/hcp/html/mTag.js';};};};if (src.indexOf('http') != 0) {src = lpMTagConfig.lpProtocol + '://' + lpMTagConfig.lpServer + src + '?site=' + lpMTagConfig.lpNumber;} else {if (src.indexOf('site=') < 0) {if (src.indexOf('?') < 0) {src = src + '?';} else{src = src + '&';} src = src + 'site=' + lpMTagConfig.lpNumber;  };};var s = document.createElement('script');s.setAttribute('type', 'text/javascript');s.setAttribute('charset', 'iso-8859-1');s.setAttribute('src', src);document.getElementsByTagName('head').item(0).appendChild(s);}
}
		
//The code below send a PAGEVAR to LP with the time [in seconds] it took the page to load. Code is executed in the onload event
lpMTagConfig.calculateSentPageTime = function () {
	var t = (new Date()).getTime() - lpMTagConfig.pageStartTime;
	lpAddVars('page','pageLoadTime', Math.round(t/1000)+' sec');
};

//Variables Arrays - By Scope
if (typeof(lpMTagConfig.pageVar)=='undefined') { lpMTagConfig.pageVar = []; }
if (typeof(lpMTagConfig.sessionVar)=='undefined') { lpMTagConfig.sessionVar = []; }
if (typeof(lpMTagConfig.visitorVar)=='undefined') { lpMTagConfig.visitorVar = []; }
//Extra actions to be taken once the code executes
if (typeof(lpMTagConfig.onLoadCode)=='undefined') { lpMTagConfig.onLoadCode = []; }
//Dynamic Buttons Array
if(typeof(lpMTagConfig.dynButton)=='undefined') { lpMTagConfig.dynButton = []; }
// This need to be add to afterStartPage will work
if(typeof(lpMTagConfig.ifVisitorCode)=='undefined') {lpMTagConfig.ifVisitorCode = []; }


// Function that sends variables to LP - By Scope
function lpAddVars(scope,name,value) {
	if (name.indexOf('OrderTotal')!=-1 || name.indexOf('OrderNumber')!=-1){
		if  (value=='' || value==0) return; // pass 0 value to all but OrderTotal
		else lpMTagConfig.sendCookies = false
	}	
	value=lpTrimSpaces(value.toString());
//Remove cut long variables names and values. Trims suffix of the variable name above the 25th character onwards
	if (name.length>50) { 
		name=name.substr(0,50);
	}
    if (value.length>50) { // Trims suffix of the variable value above the 50th character onwards
		value=value.substr(0,50);
	}
	switch (scope){
		case 'page': lpMTagConfig.pageVar[lpMTagConfig.pageVar.length] = escape(name)+'='+escape(value); break;
		case 'session': lpMTagConfig.sessionVar[lpMTagConfig.sessionVar.length] = escape(name)+'='+escape(value); break;
		case 'visitor': lpMTagConfig.visitorVar[lpMTagConfig.visitorVar.length] = escape(name)+'='+escape(value); break;
	}	
}

// Preventing long cookie transfer for IE based browsers.
function onloadEMT() { 
	var LPcookieLengthTest=document.cookie;
	if (lpMTag.lpBrowser == 'IE' && LPcookieLengthTest.length>1000){
		lpMTagConfig.sendCookies=false;
	}
}

//The Trim function returns a text value with the leading and trailing spaces removed
function lpTrimSpaces(stringToTrim) {
	return stringToTrim.replace(/^\s+|\s+$/g,'');
}

// Immediate Data submission function
function lpSendData(varscope,varname,varvalue) {
	if(typeof(lpMTag)!='undefined' && typeof(lpMTag.lpSendData)!='undefined')
		lpMTag.lpSendData(varscope.toUpperCase() +'VAR!'+ varname + '=' + varvalue, true);
}

// The unit variable purpose is to route the chat or call to the designated skill. <LOB> should be replaced with the skill name, i.e. : sales
try{
	if (typeof(lpUnit)=='undefined') { var lpUnit='sales'; }
	if (typeof(lpLanguage)=='undefined') { var lpLanguage='english'; }
	if(typeof(lpAddVars)!='undefined') { 
		lpAddVars('page','unit',lpUnit); 
		lpAddVars('session','language',lpLanguage); 
	}
	lpMTagConfig.defaultInvite ='chat'+'-'+lpUnit+'-'+lpLanguage;
}catch(e){}

lpMTagConfig.onLoadCode[lpMTagConfig.onLoadCode.length] = onloadEMT;

//Scan dynButton and removes buttons which doesnt have Div on the page
lpMTagConfig.onLoadCode[lpMTagConfig.onLoadCode.length] = function () {
	if(typeof(lpMTagConfig.dynButton)!='undefined') {
		for (i=0;i<lpMTagConfig.dynButton.length;i++){
			if (typeof(lpMTagConfig.dynButton[i].pid)!='undefined' && document.getElementById(lpMTagConfig.dynButton[i].pid) == null) {
					lpMTagConfig.dynButton.splice(i,1);
					i--;
			}
		}
	}
};

//The folowing functions will be load after the page will finish loading
lpMTagConfig.onLoadAll = function () {
	//lpMTagConfig.calculateSentPageTime();
	lpMTagConfig.lpLoadScripts();
};

// LP Button Code
lpMTagConfig.dynButton[lpMTagConfig.dynButton.length] = {'name':'chat-'+lpUnit+'-'+lpLanguage,'pid':'lpbuttondiv','afterStartPage': true};
lpMTagConfig.dynButton[lpMTagConfig.dynButton.length] = {'name':'chat-secure-'+lpUnit+'-'+lpLanguage,'pid':'lpbuttonsecure','afterStartPage': true};
lpMTagConfig.dynButton[lpMTagConfig.dynButton.length] = {'name':'chat-'+lpUnit+'-inner','pid':'lpbuttoninner','afterStartPage': true};
lpMTagConfig.dynButton[lpMTagConfig.dynButton.length] = {'name':'chat-'+lpUnit+'-inner-secure','pid':'lpbuttoninnersecure','afterStartPage': true};
lpMTagConfig.dynButton[lpMTagConfig.dynButton.length] = {'name':'chat-'+lpUnit+'-text','pid':'lpbuttontext','afterStartPage': true};
lpMTagConfig.dynButton[lpMTagConfig.dynButton.length] = {'name':'chat-'+lpUnit+'-text-secure','pid':'lpbuttontextsecure','afterStartPage': true};

//tealium universal tag - utag.sender.12006 ut4.0.201401311659, Copyright 2014 Tealium.com Inc. All Rights Reserved.
try{
(function(id,loader,u){
  try{u=utag.o[loader].sender[id]={}}catch(e){u=utag.sender[id]};
  u.ev={'view':1};
  u.map={};
  u.extend=[];

  u.send=function(a,b,c,d,e,f){
    if(u.ev[a]||typeof u.ev.all!="undefined"){
      
      //c=[];for(d in utag.loader.GV(u.map)){if(typeof b[d]!="undefined"&&b[d]!=""){e=u.map[d].split(",");for(f=0;f<e.length;f++){c.push(e[f]+u.kvp_delim+encodeURIComponent(b[d]))}}}
      
      if(!utag.cfg.readywait){utag.loader.EV("window","ready",lpMTagConfig.onLoadAll);}
      else{lpMTagConfig.onLoadAll();}

    }
  }
  try{utag.o[loader].loader.LOAD(id)}catch(e){utag.loader.LOAD(id)}
})('14','digikey.main');
}catch(e){}
//end tealium universal tag
//~~tv:12006.20120109