/*
Copyright (c) 2013 Webtrends, Inc.
Heatmap Plugin v10.4.7
  
An example of including the plugin with your tag.
  
Note - Requires base javascript tag >= 10.4 which adds support for the waitForCallback plugin option.
This option prevents the base tag from continuing on until the plugin's callback has called
dcs.registerPluginCallback. In this plugin, we are using this functionality to asynchronously
make a wtid.js request to the collection server

On the first page load of a new session (a browser session, not a WT session) the plugin will examine the FPC(s) 
and determine if each one is of type 1 or not. If a type 1 id is found, a wtid.js request is made to that dcs object's 
collection server. If the response from the collection server is not type 1, the id value in the cookie will be updated 
with the value returned from the collection server. When the id value is updated, the ss and lv cookie crumbs are also 
updated to a time in the past so the first WT event will be treated like the first hit of a new session on a new day 
but not as a new overall visitor.
 
A FPC session cookie will be set on the first execution. The presence of this cookie is what prevents the migration logic 
from firing on every page load. If it is found, the migration will not occur.

Example implementation

<script type="text/javascript">
	// async loader function, called by webtrends.js after load
	window.webtrendsAsyncInit=function(){
		var dcs=new Webtrends.dcs().init({
			dcsid:"YOUR_WEBTRENDS_DCSID_HERE",
			timezone:YOUR_TIMEZONE_HERE,
			plugins:{
				id_migrate:{src:"/path/to/webtrends.idmigrate.js", waitForCallback: true}
			}
		}).track();
	};
	(function(){
		var s=document.createElement("script"); s.async=true; s.src="webtrends.js";    
		var s2=document.getElementsByTagName("script")[0]; s2.parentNode.insertBefore(s,s2);
	}());
</script>
*/

(function () {

	WebtrendsIdMigrator = function () {

		/* Data stored in the following format to minimize wtid.js requests
		{
			server: {
				DCSs:[],				//List of dcs objects using this collection server that need to be migrated.	
				serverId: ""		//The id value returned by the server
			}
		}
		*/
		this.data = {};

		//The name of the session cookie that is used to make sure we only attempt an id migration once per session
		this.idMigFPC = "WT_MIG";

		//This value gets written to a session cookie and is used to make sure we only attempt to migrate once.
		//Need to write a time, rather than a simple flag because multiple dcs objects may need to migrate on 
		//the same page.
		this.startTime = new Date().getTime();
	}

	WebtrendsIdMigrator.prototype.migrateDCS = function (dcs) {
		var server = dcs.domain;

		//Have we seen this collection server before?
		if (this.data[server]) {

			//Do we already have an id for this server?
			if (this.data[server].serverId) {
				this.updateCookie(dcs, this.data[server].serverId);
				dcs.registerPluginCallback('id_migrate');
			}
			else {
				//Add this dcs object to the list using this collection server.
				//The request will already have been made so just wait
				this.data[server]["DCSs"].push(dcs);
			}
		}
		else {
			this.data[server] = {};
			this.data[server]["DCSs"] = [];
			this.data[server]["DCSs"].push(dcs);
			this.getId(dcs);
		}
	}

	WebtrendsIdMigrator.prototype.updateCookie = function (dcs, newId) {
		var expiry = (dcs.FPCConfig.sessionOnly) ? "" : ("; expires=" + dcs.FPCConfig.expireDate.toGMTString());
		var cookieMetaData = expiry + "; path=/" + (((dcs.FPCConfig.domain != "")) ? ("; domain=" + dcs.FPCConfig.domain) : (""));
		var cookie = dcs.FPCConfig.name + "=id=" + newId + ":lv=946713600000:ss=946713600000" + cookieMetaData;
		document.cookie = cookie;
	}

	WebtrendsIdMigrator.prototype.writeSessionCookie = function () {
		var cookie = this.idMigFPC + "=ss=" + this.startTime + "; path=/";
		document.cookie = cookie;
	}

	WebtrendsIdMigrator.prototype.getId = function (dcs) {

		var callbackName = "idCallback_" + dcs.domain.replace(/\.|-/g, "_");

		Webtrends.idMigrator[callbackName] = function (id) {
			var serverId = id.gWtId ? id.gWtId : id.gTempWtId;
			var serverIdFormat = Webtrends.idMigrator.getIdFormat(serverId);
			Webtrends.idMigrator.data[dcs.domain].serverId = serverId;

			while (Webtrends.idMigrator.data[dcs.domain].DCSs.length > 0) {
				var dcsMig = Webtrends.idMigrator.data[dcs.domain].DCSs[0];
				Webtrends.idMigrator.data[dcs.domain].DCSs.splice(0, 1);
				if (serverIdFormat != 1) {
					Webtrends.idMigrator.updateCookie(dcsMig, serverId);
				}
				dcsMig.registerPluginCallback('id_migrate');
			}
		}

		var src = "//" + dcs.domain + "/" + dcs.dcsid + "/wtid.js?callback=Webtrends.idMigrator." + callbackName;
		Webtrends.loadJS(src, true);
	}

	WebtrendsIdMigrator.prototype.getIdFormat = function (id) {
		var type1Pattern = /^[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}-[0-9]+\.[0-9]+$/;
		var type2Pattern = /^(\{){0,1}[0-9a-fA-F]{8}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{12}(\}){0,1}$/

		var idType = -1;
		if (type1Pattern.test(id))
			idType = 1;
		else if (type2Pattern.test(id))
			idType = 2;

		return idType;
	}

})();

//This will get called for each dcs object that includes the migration plugin
var migrate_loader = function (tag, pluginConfig) {

	//This plugin requires base tag >= 10.4. If using an earlier version, don't do anything.
	if (!tag.registerPluginCallback) {
		return
	}

	if (!Webtrends.idMigrator) {
		Webtrends.idMigrator = new WebtrendsIdMigrator();
	}

	//Check migration cookie to determine if we should attempt to migrate
	var FPCMig = Webtrends.dcsGetCookie(Webtrends.idMigrator.idMigFPC);
	var FPCMigSS = (FPCMig) ? Webtrends.dcsGetCrumb(FPCMig, "ss") : "";
	if (!tag.FPCConfig.enabled ||
		(FPCMigSS && FPCMigSS != Webtrends.idMigrator.startTime)) {
		//FPCs are disabled or we have already attempted a migration this session.
		tag.registerPluginCallback('id_migrate');
		return;
	}

	if (!FPCMigSS) {
		Webtrends.idMigrator.writeSessionCookie();
	}

	//Get the FPC cookie value for this tag
	var FPC = Webtrends.dcsGetCookie(tag.FPCConfig.name);
	var FPCId = (FPC) ? Webtrends.dcsGetCrumb(FPC, "id") : "";
	var FPCIdType = Webtrends.idMigrator.getIdFormat(FPCId);

	if (FPCIdType == 1) {
		Webtrends.idMigrator.migrateDCS(tag);
	}
	else {
		tag.registerPluginCallback('id_migrate')
	}
}

Webtrends.registerPlugin('id_migrate', migrate_loader);