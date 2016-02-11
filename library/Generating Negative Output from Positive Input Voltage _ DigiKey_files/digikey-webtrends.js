// Based on https://developer.mozilla.org/en/DOM/Storage
var invalidateList = new Array();
(function() {
	var domain = location.hostname.match(/\.digikey\..*/)[0];
  
	var storage = {
		getItem: function(sKey) {
			var aCouples = document.cookie.split(/;\s*/);
			for ( var i = 0; i < aCouples.length; i++) {
				var iCouple = aCouples[i].split('=');
				if (iCouple.length > 1) {
					var iKey = unescape(iCouple[0]);
					var iValue = unescape(iCouple[1]);
					if (iKey === sKey) {
						return iValue;
					}
				}
			}
		},
		setItem: function(sKey, sValue) {
			if (!sKey) {
				return;
			}
			document.cookie = escape(sKey) + "=" + escape(sValue) +
			  "; path=/; domain=" + domain +";";
		},
		removeItem: function(sKey) {
			if (!sKey) {
				return;
			}
			var sExpDate = new Date();
			sExpDate.setDate(sExpDate.getDate() - 1);
			document.cookie = escape(sKey) + "=; expires=" + sExpDate.toGMTString() +
			  "; path=/; domain=" + domain + ";";
		}
	};

	function unpack(data) {
		var kvs = data.split(';');
		var res = {};
		for ( var i = 0; i < kvs.length; i++) {
			var parts = kvs[i].split('=');
			res[parts[0]] = parts[1];
		}
		return res;
	}

	function pack(data) {
		var res = [];
		for (var key in data) {
			res.push(key + '=' + data[key]);
		}
		return res.join(';');
	}
	
	//Gather data for the cookie.  The parameter isWebtrends is optional and defaults to false.
	function gatherTrackingData(node, isWebtrends) {
		var res = {};
		while (true) {
			var data = node.getAttribute('cookie-tracking') || node.getAttribute('data-webtrends') || node.getAttribute('wt_name');
			if (data) {
				data = unpack(data);
				for (var dKey in data) {
					var rKey = dKey;
					if (isWebtrends && dKey.lastIndexOf("WT.z_", 0) === -1) {
						rKey = "WT.z_" + dKey;
					}
					if (!res[rKey]) {
						res[rKey] = data[dKey];
					}
				}
			}
	    
			node = node.parentNode;
	    
			if (node == document) {
				break;
			} else if (node.getAttribute('data-wt-root') === "true") {
				break;
			}
		}
		return pack(res);
	}
	
	//add tracking data to storage
	function setTrackingData(node) {		
		while(true) {
			if(node.tagName.toLowerCase() == 'a' || node.tagName.toLowerCase() == 'input') {
				var wtdata = gatherTrackingData(node, true);
				var udodata = gatherTrackingData(node);
				if (wtdata) {
					storage.setItem('wt-tracking', wtdata);
				}
				if (udodata) {
					storage.setItem('udo-data', udodata);
				}
				break;
			}
			
			node = node.parentNode;
	    
			if (node == document) {
				break;
			}
		}
	}
	
	function bind(f, that) {
		return function () {
			return f.apply(that, arguments);
		};
	}
	
	function onEvent(targets, type, f) {
		var i, node;
		for (i = 0; i < targets.length; i++) {
			node = targets[i];
			if (node.addEventListener) {
				node.addEventListener(type, bind(f, node));
			} else if (node.attachEvent) {
				node.attachEvent('on' + type, bind(f, node));
			}
		}
	}
	
	function mousedown(e) {
		var node = e.target || e.srcElement;
		setTrackingData(node);		
	}

	function keydown(e) {
		var code = (e.keyCode ? e.keyCode : e.which);
		if(code == 13) { 
			var node = e.target || e.srcElement;
			setTrackingData(node);
		}
	}
	
	// Edit tag object
	var wtdata = storage.getItem('wt-tracking');	
	storage.removeItem('wt-tracking');
	if (wtdata) {
		wtdata = unpack(wtdata);
		if (typeof _tag != 'undefined') {		
			for (var key in wtdata) {
				_tag["WT"][key.replace("WT.","")] = wtdata[key];
				invalidateList.push(key.replace("WT.",""));								
			}
		} else if (typeof utag_data == 'undefined' || utag_data['wt_use_udo'] == 'false') {
			for (var key in wtdata) {
				document.write('<meta name="' + key + '" content="' + wtdata[key] + '">');
			}
		}		
	}
	
	//Edit UDO
	var udodata = storage.getItem('udo-data');
	storage.removeItem('udo-data');
	if (udodata) {
		udodata = unpack(udodata);
		if (typeof utag_data != 'undefined') {
			for (var key in udodata) {
				utag_data[key] = udodata[key];				
			}
		}		
	}
		
	//add event listeners
	onEvent([document], 'mousedown', mousedown);
	onEvent([document], 'keydown', keydown);
}());
