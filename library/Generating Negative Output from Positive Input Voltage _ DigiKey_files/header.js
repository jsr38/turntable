// This file does not depend on jQuery by design. Keep it that way.
(function () {
  var dropdownTitle = '.header-dropdown-title';
  var dropdownActive = 'header-dropdown-active';
  var dropdownBody = '.header-dropdown-content';
  var mobileCartQuantity = document.getElementById('cart-quantity');

  /* Utility code */
  function parentElement(node) {
    if ('parentElement' in node) {
      return node.parentElement;
    }
    
    var parent = node.parentNode;
    while (parent) {
      if ('className' in parent) {
        return parent;
      } else {
        parent = parent.parentNode;
      }
    }
    return null;
  }
  
  function getText(element) {
    if ('textContent' in element) {
      return element.textContent;
    } else {
      return element.innerText;
    }
  }
  
  function setText(element, text) {
    if ('textContent' in element) {
      element.textContent = text;
    } else {
      element.innerText = text;
    }
  }
  
  function getTarget(e) {
    return e.target || e.srcElement;
  }
  
  function getWidth(element) {
    return Math.max(element.scrollWidth, element.offsetWidth, element.clientWidth)
  }
  
  function getHeight(element) {
    return Math.max(element.scrollHeight, element.offsetHeight, element.clientHeight);
  }
  
  function setClasses(element, obj) {
    var resolved = {};
    var parts, i, key;
    
    if (element.className !== '') {
      parts = element.className.split(' ');
      for (i = 0; i < parts.length; i++) {
        resolved[parts[i]] = true;
      }
    }
    
    for (key in obj) {
      if (obj.hasOwnProperty(key)) {
        resolved[key] = obj[key];
      }
    }
    
    parts = [];
    for (key in resolved) {
      if (resolved.hasOwnProperty(key) && resolved[key]) {
        parts.push(key);
      }
    }
    
    if (parts.length === 0) {
      element.className = '';
    } else {
      element.className = parts.join(' ');
    }
  }
  
  function setPosition(body, title, totalWidth, rtl) {
    var left;
    var offsetLeft = title.offsetLeft;
    var offsetTop = title.offsetTop;
    var width = getWidth(title);
    var height = getHeight(title);
    var right = offsetLeft + width;
    var bodyWidth = getWidth(body);
    
    if (rtl) {
      if ((offsetLeft + width) < bodyWidth) {
        if ((offsetLeft + bodyWidth) < totalWidth) {
          left = offsetLeft;
        } else {
          left = totalWidth - bodyWidth;
        }
      } else {
        left = right - bodyWidth;
      }
    } else {
      if ((offsetLeft + bodyWidth) > totalWidth) {
        if (bodyWidth > right) {
          left = Math.max(0, totalWidth - bodyWidth);
        } else {
          left = right - bodyWidth;
        }
      } else {
        left = offsetLeft;
      }
    }
    
    body.style.left = left + 'px';
    body.style.top = (offsetTop + height) + 'px';
  }
  
  function computeStyle(node) {
    return window.getComputedStyle ? window.getComputedStyle(node, null) : node.currentStyle;
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
      if (!node) {
        continue;
      }
      if (node.addEventListener) {
        node.addEventListener(type, bind(f, node), false);
      } else if (node.attachEvent) {
        node.attachEvent('on' + type, bind(f, node));
      }
    }
  }
  
  function hasClass(element, className) {
    if (element.className === '') {
      return false;
    }
    var parts = element.className.split(' ');
    var i;
    for (i = 0; i < parts.length; i++) {
      if (parts[i] === className) {
        return true;
      }
    }
    return false;
  }
  
  function hasParentWithClass(element, className) {
    var ptr = element;
    while (ptr) {
      if (hasClass(ptr, className)) {
        return true;
      }
      ptr = parentElement(ptr);
    }
  }
  
  function preventDefault(e) {
    if (e.preventDefault) {
			e.preventDefault(true);
		} else {
			e.returnValue = false;
		}
  }

    function Tokenizer() {
    this.patterns = [];
  }
  
  Tokenizer.prototype.add = function add(name, pattern) {
    this.patterns.push({name: name, pattern: new RegExp(pattern, 'g')});
  };
  
  Tokenizer.prototype.parse = function (input) {
    var res = [];
    var ptr = 0;
    var i, pattern, match, matched;
    while (ptr < input.length) {
      matched = false;
      for (i = 0; i < this.patterns.length; i++) {
        pattern = this.patterns[i];
        pattern.pattern.lastIndex = ptr;
        match = pattern.pattern.exec(input);
        if (match && match.index === ptr) {
          matched = true;
          res.push({name: pattern.name, groups: match, text: match[0]});
          ptr = ptr + match[0].length;
          break;
        }
      }
      if (!matched) {
        throw new Error();
      }
    }
    return res;
  };
  
  var formatGrammar = new Tokenizer();
  formatGrammar.add('{', '\\{\\{');
  formatGrammar.add('placeholder', '\\{(\\d+)\\}');
  formatGrammar.add('literal', '[^{]+');
  
  function format(pattern) {
    var tokens = formatGrammar.parse(pattern);
    var i, token, ent;
    
    var res = [];
    for (i = 0; i < tokens.length; i++) {
      token = tokens[i];
      switch (token.name) {
        case '{':
          res.push('{');
          break;
          
        case 'placeholder':
          res.push(arguments[parseInt(token.groups[1]) + 1]);
          break;
          
        case 'literal':
          res.push(token.text);
          break;
      }
    }
    return res.join('');
  }
  
  function htmlEscape(str) {
    var div = document.createElement('div');
    setText(div, str);
    return div.innerHTML;
  }

  function getQueryStringValue(key) {
		var kvs = window.location.search.substring(1).split('&');
		var i, parts;
		for (i = 0; i < kvs.length; i++) {
			parts = kvs[i].split('=');
			if (parts[0] === key) {
				return parts[1];
			}
		}
		return undefined;
	}
  
  function getBrowserDims() {
    var docEl = document.documentElement;
    if (typeof(window.innerWidth) === 'number') {
      return {width: window.innerWidth, height: window.innerHeight};
    } else if (docEl && (docEl.clientWidth || docEl.clientHeight)) {
      return {width: docEl.clientWidth, height: docEl.clientHeight};
    } else {
      return {width: document.body.clientWidth, height: document.body.clientHeight};
    }
  }
  
  // http://spin.js.org/#v2.1.3
  var Spinner = (function(){"use strict";function a(a,b){var c,d=document.createElement(a||"div");for(c in b)d[c]=b[c];return d}function b(a){for(var b=1,c=arguments.length;c>b;b++)a.appendChild(arguments[b]);return a}function c(a,b,c,d){var e=["opacity",b,~~(100*a),c,d].join("-"),f=.01+c/d*100,g=Math.max(1-(1-a)/b*(100-f),a),h=j.substring(0,j.indexOf("Animation")).toLowerCase(),i=h&&"-"+h+"-"||"";return m[e]||(k.insertRule("@"+i+"keyframes "+e+"{0%{opacity:"+g+"}"+f+"%{opacity:"+a+"}"+(f+.01)+"%{opacity:1}"+(f+b)%100+"%{opacity:"+a+"}100%{opacity:"+g+"}}",k.cssRules.length),m[e]=1),e}function d(a,b){var c,d,e=a.style;if(b=b.charAt(0).toUpperCase()+b.slice(1),void 0!==e[b])return b;for(d=0;d<l.length;d++)if(c=l[d]+b,void 0!==e[c])return c}function e(a,b){for(var c in b)a.style[d(a,c)||c]=b[c];return a}function f(a){for(var b=1;b<arguments.length;b++){var c=arguments[b];for(var d in c)void 0===a[d]&&(a[d]=c[d])}return a}function g(a,b){return"string"==typeof a?a:a[b%a.length]}function h(a){this.opts=f(a||{},h.defaults,n)}function i(){function c(b,c){return a("<"+b+' xmlns="urn:schemas-microsoft.com:vml" class="spin-vml">',c)}k.addRule(".spin-vml","behavior:url(#default#VML)"),h.prototype.lines=function(a,d){function f(){return e(c("group",{coordsize:k+" "+k,coordorigin:-j+" "+-j}),{width:k,height:k})}function h(a,h,i){b(m,b(e(f(),{rotation:360/d.lines*a+"deg",left:~~h}),b(e(c("roundrect",{arcsize:d.corners}),{width:j,height:d.scale*d.width,left:d.scale*d.radius,top:-d.scale*d.width>>1,filter:i}),c("fill",{color:g(d.color,a),opacity:d.opacity}),c("stroke",{opacity:0}))))}var i,j=d.scale*(d.length+d.width),k=2*d.scale*j,l=-(d.width+d.length)*d.scale*2+"px",m=e(f(),{position:"absolute",top:l,left:l});if(d.shadow)for(i=1;i<=d.lines;i++)h(i,-2,"progid:DXImageTransform.Microsoft.Blur(pixelradius=2,makeshadow=1,shadowopacity=.3)");for(i=1;i<=d.lines;i++)h(i);return b(a,m)},h.prototype.opacity=function(a,b,c,d){var e=a.firstChild;d=d.shadow&&d.lines||0,e&&b+d<e.childNodes.length&&(e=e.childNodes[b+d],e=e&&e.firstChild,e=e&&e.firstChild,e&&(e.opacity=c))}}var j,k,l=["webkit","Moz","ms","O"],m={},n={lines:12,length:7,width:5,radius:10,scale:1,corners:1,color:"#000",opacity:.25,rotate:0,direction:1,speed:1,trail:100,fps:20,zIndex:2e9,className:"spinner",top:"50%",left:"50%",shadow:!1,hwaccel:!1,position:"absolute"};if(h.defaults={},f(h.prototype,{spin:function(b){this.stop();var c=this,d=c.opts,f=c.el=a(null,{className:d.className});if(e(f,{position:d.position,width:0,zIndex:d.zIndex,left:d.left,top:d.top}),b&&b.insertBefore(f,b.firstChild||null),f.setAttribute("role","progressbar"),c.lines(f,c.opts),!j){var g,h=0,i=(d.lines-1)*(1-d.direction)/2,k=d.fps,l=k/d.speed,m=(1-d.opacity)/(l*d.trail/100),n=l/d.lines;!function o(){h++;for(var a=0;a<d.lines;a++)g=Math.max(1-(h+(d.lines-a)*n)%l*m,d.opacity),c.opacity(f,a*d.direction+i,g,d);c.timeout=c.el&&setTimeout(o,~~(1e3/k))}()}return c},stop:function(){var a=this.el;return a&&(clearTimeout(this.timeout),a.parentNode&&a.parentNode.removeChild(a),this.el=void 0),this},lines:function(d,f){function h(b,c){return e(a(),{position:"absolute",width:f.scale*(f.length+f.width)+"px",height:f.scale*f.width+"px",background:b,boxShadow:c,transformOrigin:"left",transform:"rotate("+~~(360/f.lines*k+f.rotate)+"deg) translate("+f.scale*f.radius+"px,0)",borderRadius:(f.corners*f.scale*f.width>>1)+"px"})}for(var i,k=0,l=(f.lines-1)*(1-f.direction)/2;k<f.lines;k++)i=e(a(),{position:"absolute",top:1+~(f.scale*f.width/2)+"px",transform:f.hwaccel?"translate3d(0,0,0)":"",opacity:f.opacity,animation:j&&c(f.opacity,f.trail,l+k*f.direction,f.lines)+" "+1/f.speed+"s linear infinite"}),f.shadow&&b(i,e(h("#000","0 0 4px #000"),{top:"2px"})),b(d,b(i,h(g(f.color,k),"0 0 1px rgba(0,0,0,.1)")));return d},opacity:function(a,b,c){b<a.childNodes.length&&(a.childNodes[b].style.opacity=c)}}),"undefined"!=typeof document){k=function(){var c=a("style",{type:"text/css"});return b(document.getElementsByTagName("head")[0],c),c.sheet||c.styleSheet}();var o=e(a("group"),{behavior:"url(#default#VML)"});!d(o,"transform")&&o.adj?i():j=d(o,"animation")}return h})();
  
  /* Dialogs */
  var dialogState = {active: false, overlay: undefined, queueSpinner: false, spinner: undefined};
  function createDialog(url, classes, onCancel, onLoad) {
    if (dialogState.active) {
      throw 'A dialog is already active';
    }
    dialogState.active = true;
    var overlay = dialogState.overlay;
    var spinner = dialogState.spinner;
    if (!overlay) {
      overlay = document.createElement('div');
      overlay.className = 'header-overlay';
      document.body.appendChild(overlay);
      spinner = new Spinner({color: '#fff', position: 'fixed'}).spin();
      document.body.appendChild(spinner.el);
      dialogState.overlay = overlay;
      dialogState.spinner = spinner;
      if (window.mobile && window.mobile.showOverlay) {
        window.mobile.showOverlay();
      }
    }

    function showSpinnerLater() {
      setTimeout(function () {
        if (dialogState.overlay && dialogState.queueSpinner) {
          spinner.el.style.display = '';
        }
      }, 500);
    }
    spinner.el.style.display = 'none';
    dialogState.queueSpinner = true;
    showSpinnerLater();

    var container = document.createElement('div');
    container.innerHTML = '<div class="header-popup" tabindex="-1" role="dialog" aria-labelledby="header-popup-title-title"><div class="header-popup-titlebar" unselectable="on"><span class="header-popup-title" id="header-popup-title-title" unselectable="on"></span><a href="#" class="header-popup-close" role="button" unselectable="on"><span class="header-popup-icon" unselectable="on">close</span></a></div><iframe class="' + classes + '" src="' + htmlEscape(url) + '"></iframe></div>';
    var dialog = container.querySelector('.header-popup');
    var title = container.querySelector('.header-popup-title');
    var frame = container.querySelector('iframe');
    var closeButton = dialog.querySelector('.header-popup-icon');
    var armed = true;

    dialog.style.zIndex = 1002;
    dialog.style.display = 'none';
    document.body.appendChild(dialog);
    
    onEvent([frame], 'load', function () {
      if (!armed) {
        return;
      }
      var doc;
      try {
        doc = frame.contentDocument;
      } catch (e) {
        onCancel();
        return;
      }
      var redirectText = doc.querySelector('#redirect');
      var titleText = doc.querySelector('#title');
      var titleElText = doc.querySelector('title');
      var heightText = doc.querySelector('#height');
      var dims = getBrowserDims();

      function showDialog() {
        dialogState.queueSpinner = false;
        spinner.el.style.display = 'none';
        dialog.style.display = '';
        if (heightText && getText(heightText)) {
           frame.style.height = getText(heightText) + 'px';
           parentElement(heightText).removeChild(heightText);
        } else {
           frame.style.height = getHeight(frame.contentDocument.body) + 'px';
        }
        dialog.style.top = ((dims.height - getHeight(dialog)) / 2) + 'px';
      }
      
      if (redirectText) {
        frame.src = redirectText.innerHTML; 
      } else {
        if (titleText) {
          title.innerHTML = titleText.innerHTML;
          parentElement(titleText).removeChild(titleText);
        } else {
          title.innerHTML = titleElText ? titleElText.innerHTML : 'Untitled';
        }

        // Hook the forms
        onEvent(doc.forms, 'submit', function () {
          spinner.el.style.display = 'none';
          dialogState.queueSpinner = true;
          showSpinnerLater();
          dialog.style.display = 'none';
        });
        
        if (onLoad) {
          onLoad(frame, showDialog);
        } else {
          showDialog();
        }
      }
    });
    
    onEvent([closeButton], 'click', function (e) {
      onCancel();
      preventDefault(e);
    });
        
    return {
      close: function () {
        dialogState.active = false;
        armed = false;
        document.body.removeChild(dialog);
        setTimeout(function () {
          if (!dialogState.active) {
            document.body.removeChild(overlay);
            dialogState.overlay = undefined;
            document.body.removeChild(spinner.el);
            spinner.stop();
            if (window.mobile && window.mobile.hideOverlay) {
              window.mobile.hideOverlay();
            }
          }
        }, 0);
      },
      frame: frame
    };
  }
  
  /* Static part of the header */
  function updateDropdowns() {
    var totalWidth = document.body.clientWidth;
    var nodeList = document.querySelectorAll(dropdownBody);
    var i;
    var body;
    
    for (i = 0; i < nodeList.length; i++) {
      body = nodeList[i];
      var title = parentElement(body).querySelector(dropdownTitle);
      var dir = computeStyle(title).direction;
      
      if (body.style.display === 'block') {
        if (!body.style.width) {
          body.style.width = getWidth(body) + 'px';
        }
        setClasses(title, {'header-dropdown-active': true});
        setPosition(body, title, totalWidth, dir === "rtl");
      } else {
        setClasses(title, {'header-dropdown-active': false});
        body.style.width = '';
      }
    }
  }
  
  onEvent(document.querySelectorAll(dropdownTitle), 'click', function () {
    var title = parentElement(this).querySelector(dropdownTitle);
    var self = parentElement(this).querySelector(dropdownBody);
    var visible = self.style.display === 'block';
    
    var i, nodes;
    nodes = document.querySelectorAll(dropdownBody);
    for (i = 0; i < nodes.length; i++) {
      nodes[i].style.display = 'none';
    }
    
    if (!visible) {
      self.style.display = 'block';
    }
    updateDropdowns();
  });
  onEvent([document], 'click', function (e) {
    if (!hasParentWithClass(getTarget(e), 'header-dropdown')) {
      
      var i, nodes;
      nodes = document.querySelectorAll(dropdownBody);
      for (i = 0; i < nodes.length; i++) {
        nodes[i].style.display = 'none';
      }
      
      updateDropdowns();
    }
  });
  onEvent([window], 'resize', updateDropdowns);
  
  function doSearch(e, textBox) {
		if (textBox.value === textBox.defaultValue) {
			textBox.value = '';
		}
    var text = encodeURIComponent(textBox.value);

    var dropDown = document.getElementById('header-search-type');
    location.href = format(dropDown.value, text);
    preventDefault(e);
  }
  
  function updateSearchName() {
    var select = document.getElementById('header-search-type');
    var option = select.options[select.selectedIndex];
    if (option) {
      var name = option.getAttribute('data-name');
      document.getElementById('header-search').setAttribute('name', name);
    }
  }
  onEvent([document.getElementById('header-search-type')], 'change', updateSearchName);
  updateSearchName();
  var headerSearch = document.getElementById('header-search');
  onEvent([document.getElementById('header-search-button')], 'click', function (e) { doSearch(e, headerSearch); });
  onEvent([document.getElementById('header-search')], 'keydown', function (e) {
    if (e.keyCode === 13) {
      doSearch(e, headerSearch);
    }
  });
  // Mobile
  onEvent([document.getElementById('headerSearchButton')], 'click', function (e) {
    doSearch(e, document.getElementById('headerSearchValue'));
  });
  onEvent([document.getElementById('headerSearchValue')], 'keydown', function(e){
  	if(e.keyCode === 13){
  		doSearch(e, this);
  	}
  });
  
  var semiRichGrammar = new Tokenizer();
  semiRichGrammar.add('entity', '&([\\w\\d#-]+);');
  semiRichGrammar.add('{', '\\{\\{');
  semiRichGrammar.add('placeholder', '\\{(\\d+)\\}');
  semiRichGrammar.add('literal', '.[^{&]*');
  
  function formatSemiRich(pattern) {
    var tokens = semiRichGrammar.parse(pattern);
    var i, token, ent;
    
    var res = [];
    for (i = 0; i < tokens.length; i++) {
      token = tokens[i];
      switch (token.name) {
        case 'entity':
          ent = __headerData.entities[token.groups[1]];
          if (ent) {
            res.push(ent);
          } else {
            res.push(token.text);
          }
          break;
          
        case '{':
          res.push('{');
          break;
          
        case 'placeholder':
          res.push(htmlEscape(arguments[parseInt(token.groups[1]) + 1]));
          break;
          
        case 'literal':
          res.push(htmlEscape(token.text));
          break;
      }
    }
    return res.join('');
  }
  
  var entityTextGrammar = new Tokenizer();
  entityTextGrammar.add('entity', '&([\\w\\d#-]+);');
  entityTextGrammar.add('literal', '.[^&]*');
  
  function formatEntityText(text) {
    var tokens = entityTextGrammar.parse(text);
    var i, token, ent;
    
    var res = [];
    for (i = 0; i < tokens.length; i++) {
      token = tokens[i];
      switch (token.name) {
        case 'entity':
          res.push(token.text);
          break;
          
        case 'literal':
          res.push(htmlEscape(token.text));
          break;
      }
    }
    return res.join('');
  }
  
  function updateTextDirection(e) {
    var target = getTarget(e);
    if (computeStyle(parentElement(target)).direction === 'ltr') {
      target.style.direction = 'ltr';
      return;
    }
    setTimeout(function () {
      var value = target.value;
      var rtl = false;
      var i, char;
      for (i = 0; i < value.length; i++) {
        char = value.charCodeAt(i);
        if (char >= 1488 && char <= 1514) {
          rtl = true;
        }
      }
      target.style.direction = rtl ? 'rtl' : 'ltr';
    }, 0);
  }

  function registerDirChanger() {
    var targets = document.querySelectorAll('.dkdirchanger');
    onEvent(targets, 'change', updateTextDirection);
    onEvent(targets, 'paste', updateTextDirection);
    onEvent(targets, 'keydown', updateTextDirection);
    onEvent(targets, 'keyup', updateTextDirection);
    var i;
    for (i = 0; i < targets.length; i++) {
      updateTextDirection({target: targets[i]});
    }
  }
  
  function getCookieValue() {
    return document.cookie.replace(new RegExp('(?:(?:^|.*;)\\s*cur\\s*\\=\\s*([^;]*).*$)|^.*$'), '$1') || null;
  }
  
  function setCookieValue(val) {
    var now = new Date();
    var expires = new Date(now.getFullYear(), now.getMonth() + 1, now.getDate());
    var domain = /\.digikey\..*/.exec(location.hostname)[0];
    document.cookie = 'cur=' + val + '; expires=' + expires.toUTCString() + '; domain=' + domain + '; path=/';
  }
  
  var effectiveCur = getCookieValue() || getQueryStringValue('curr') || __headerData.cur;
  
  function invokeChange(lang, cur) {
    var config = window.headerLanguageToggle;
    var isLangToggle = lang !== __headerData.lang;
    var legacyLang = lang;
    if (lang === 'zh') {
      switch (__headerData.site) {
        case 'hk':
          legacyLang = 'zht';
          break;
        case 'sg':
          legacyLang = 'zhs';
          break;
        case 'cn':
          legacyLang = 'zhs';
          break;
        case 'tw':
          legacyLang = 'zht';
          break;
      }
    }
    
    if (window.dcsMultiTrack) {
      window.dcsMultiTrack('WT.z_ref_page_event', isLangToggle ? 'Change Language' : 'Change Currency', 'WT.z_lang', legacyLang);
    } else if (window.utag && window.utag.view) {
      window.utag.view({ref_page_event: isLangToggle ? 'Change Language' : 'Change Currency', page_language: legacyLang});
    }
    
    function defaultOnChange() {
      // Try the qsp
      var currentParam = 'lang=' + __headerData.lang;
      var search = window.location.search;
      if (search.indexOf(currentParam) !== -1) {
        window.location.search = search.replace(currentParam, 'lang=' + lang);
        return;
      }
      
      // Try finding site/lang
      var parts = window.location.pathname.split('/');
      var i;
      for (i = 1; i < (parts.length - 1); i++) {
        if (parts[i].toLowerCase() === __headerData.site.toLowerCase() && parts[i + 1].toLowerCase() === __headerData.lang.toLowerCase()) {
          parts[i + 1] = lang;
          window.location.href = parts.join('/') + window.location.search;
          return;
        }
      }
      
      // Try finding lang
      for (i = 1; i < parts.length; i++) {
        if (parts[i].toLowerCase() === __headerData.lang.toLowerCase()) {
          parts[i] = lang;
          window.location.href = parts.join('/') + window.location.search;
          return;
        }
      }
      
      // Handle the homepage
      if (parts.length === 2 && parts[1] === '') {
        parts[1] = lang;
        window.location.href = parts.join('/') + window.location.search;
        return;
      }
      
      // Give up and reset
      if (lang !== __headerData.lang) {
        document.querySelector('.header-lang').value = __headerData.lang;
      }
    }
    
    function invokeOnChange() {
      setCookieValue(cur);
      
      if (config && config.change) {
        config.change(lang, cur);
      } else {
        defaultOnChange();
      }
    }
    
    // Delay execution to prevent weirdness when setting window.location
    window.setTimeout(invokeOnChange, 0);
  }
  
  function displayCurPrompt() {
    var dialog;
    var cur;
    var url;
    
    url = format('/{0}/resources/currencyprompt', __headerData.lang);
    dialog = createDialog(url, 'currency-selection-frame', function () {
      dialog.close();
      resetSelection();
    }, function (frame, cont) {
      frame.contentWindow.CurrencySetter = {setCurrency: contSelectCur};
      cont();
    });
    
    function contSelectCur(curSelection) {
      dialog.close();
      cur = curSelection;
      if (cur !== effectiveCur) {
        window.headerAcceptCurrencyChange = contRemoveDenied;
        url = format('/classic/ordering/currencysmall.aspx?headerCurrChange=true&cscur={0}', cur);
        dialog = createDialog(url, 'currency-denied-frame', function () {
          contRemoveDenied(false);
        });
      } else {
        resetSelection();
      }
    }
    
    function contRemoveDenied(accepted) {
      dialog.close();
      if (accepted) {
        invokeChange(__headerData.lang, cur);
      } else {
        resetSelection();
      }
    }
    
    function resetSelection() {
      var curEl = document.querySelector('.header-currency');
      if (curEl) {
        curEl.value = effectiveCur;
      }
    }
  }
  window.displayCurPrompt = displayCurPrompt;
  
  /* Language/currency toggles */
  var langToggleEnabled = __headerData.enableToggle && (!window.headerLanguageToggle || !window.headerLanguageToggle.disableLang);
  var curToggleEnabled = __headerData.enableCurToggle && (!window.headerLanguageToggle || !window.headerLanguageToggle.disableCur);
  
  function dropdownifyCurrency() {
		var element = document.querySelector('.header-currency');
    if (!element) {
      return;
    }
    var curs = __headerData.curs;
    if (curToggleEnabled && curs.length > 1) {
      var select = document.createElement('select');
      select.className = 'header-currency';
      var i, curName, option;
      for (i = 0; i < curs.length; i++) {
        curName = curs[i];
        option = document.createElement('option');
        option.value = curName;
        setText(option, curName);
        option.selected = curName === effectiveCur;
        select.appendChild(option);
      }
      onEvent([select], 'change', function (e) { displayCurPrompt(); });
      parentElement(element).replaceChild(select, element);
    } else {
      setText(element, effectiveCur);
    }
  }
  
  function dropdownifyLang() {
    var element = document.querySelector('.header-lang');
    if (!element || !langToggleEnabled) {
      return;
    }
    var select = document.createElement('select');
    select.className = 'header-lang';
    var i, langInfo, option, langs;
    langs = (window.headerLanguageToggle && window.headerLanguageToggle.langs) || __headerData.langs;
    if (langs.length < 2) {
      return;
    }
    for (i = 0; i < langs.length; i++) {
      langInfo = langs[i];
      option = document.createElement('option');
      option.value = langInfo.code;
      setText(option, langInfo.name);
      option.selected = langInfo.code === __headerData.lang;
      select.appendChild(option);
    }
    onEvent([select], 'change', function (e) { invokeChange(getTarget(e).value, effectiveCur); });
    parentElement(element).replaceChild(select, element);
  }
  
  /* Header personalization */
  function setPersonalization(dataStr) {
    var data = JSON.parse(dataStr);
    var headerCart = document.getElementById('header-cart');
    var myDK = document.getElementById('header-login');
    if (myDK) {
      setMyDigikey(document.getElementById('header-login-title'), myDK.querySelector(dropdownBody), data['DisplayName']);
    }
    if (headerCart) {
      setCart(headerCart.querySelector('.header-dropdown-title'), headerCart.querySelector(dropdownBody), data);
    }
	  if (mobileCartQuantity) {
		  var count = data['Count'];
		  if (count <= 99) {
			  mobileCartQuantity.innerHTML = data['Count'];
		  } else {
			  mobileCartQuantity.innerHTML = '99+';
		  }				
	  }
  }
  
  function formatProperty(prop) {
    return prop['Label'] + ' ' + prop['Value'];
  }
  
  function setCart(title, body, data) {
    var count = data['Count'];
    var viewCart = body.querySelector('.header-view-cart');
    var effective = data['Details'].length;
    var i, detail, div, el, imgSrc, children;
    title.innerHTML = formatSemiRich(__headerData.cartTitle, count);
    viewCart.innerHTML = formatSemiRich(__headerData.viewCart, count);
    
    // Remove any content we added eariler
    children = body.children;
    for (i = children.length - 1; i >= 0; i--) {
      if (children[i].nodeName !== 'A') {
        body.removeChild(children[i]);
      }
    }
    
    for (i = 0; i < effective; i++) {
      detail = data['Details'][i];
      
      div = document.createElement('div');
      div.className = 'header-cart-detail';
      el = document.createElement('img');
			imgSrc = detail['Image'];
			if (!imgSrc) {
				imgSrc = __headerData.noImage;
			}
      el.src = imgSrc;
			if (imgSrc) {
				div.appendChild(el);
			}
      el = document.createElement('p');
      el.className = 'header-cart-pn';
      el.innerHTML = formatProperty(detail['PartNumber']);
      div.appendChild(el);
      el = document.createElement('p');
      el.className = 'header-cart-ref';
      el.innerHTML = formatEntityText(detail['CustomerReference']['Value']);
      div.appendChild(el);
      el = document.createElement('p');
      el.className = 'header-cart-quantity';
      setText(el, formatProperty(detail['Quantity']));
      div.appendChild(el);
      el = document.createElement('p');
      el.className = 'header-cart-ref';
      setText(el, detail['Price']['Value']);
      div.appendChild(el);
      body.appendChild(div);
      
      if (i !== (effective - 1)) {
        el = document.createElement('hr');
        el.className = 'header-dropdown-sep';
        body.appendChild(el);
      }
    }
    
    el = document.createElement('p');
    el.id = 'header-cart-disclaimer';
    el.innerHTML = data['Disclaimer'];
    body.appendChild(el);
    body.appendChild(viewCart);
  }
  
  function createButton(text, href) {
    var a = document.createElement('a');
    a.className = 'header-button';
    a.href = href;
    a.innerHTML = text;
    return a;
  }
  
  function setMyDigikey(title, body, name) {
    var titleParts = title.querySelectorAll('p');
    if (name === '') {
      return;
    }
    
    titleParts[0].innerHTML = formatSemiRich(__headerData.userLine1, name);
    titleParts[1].innerHTML = formatSemiRich(__headerData.userLine2, name);
    
    body.innerHTML = '';
    var link, i;
    for (i = 0; i < __headerData.links.length; i++) {
      link = __headerData.links[i];
      body.appendChild(createButton(formatSemiRich(link.title), link.link));
    }
  }
  
  function getPersonalization() {
    if (!document.querySelector('#header-cart')) {
      return;
    }
    var request = new XMLHttpRequest();
    var site = __headerData.orderSite;
    var lang = __headerData.orderLang;
		var url = '/classic/headerinfo.ashx?site=' + site + '&lang=' + lang + '&cur=' + effectiveCur;
		if (window.location.host.match(/^local/)) {
			url = url.replace('classic', 'localordering');
		}
		request.open('GET', url, true);
    
    request.onreadystatechange = function () {
      if (this.readyState === 4) {
        if (this.status >= 200 && this.status < 400) {
          setPersonalization(this.responseText);
        } else {
		      if (mobileCartQuantity) {
			      mobileCartQuantity.style.display = 'none';
		      }
		    }
      }
    };
    
    request.send();
    request = null;
  }
  window.refreshHeaderPersonalization = getPersonalization;
  window.headerChangeLanguage = function (lang) { invokeChange(lang, effectiveCur); };
  
  /* Start it up */
  registerDirChanger();
  dropdownifyCurrency();
  dropdownifyLang();
  getPersonalization();
}());
