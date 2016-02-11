//tealium universal tag - utag.loader ut4.003.201602021453, Copyright 2016 Tealium.com Inc. All Rights Reserved. 
var utag_condload=false;try{(function(){function ul(src,a,b){a=document;b=a.createElement('script');b.language='javascript';b.type='text/javascript';b.src=src;a.getElementsByTagName('head')[0].appendChild(b)};if((""+document.cookie).match("utag_env_digikey_main=([^\S;]*)")){if(RegExp.$1.indexOf("/prod/") === -1) {ul(RegExp.$1);utag_condload=true;__tealium_default_path='//tags.tiqcdn.com/utag/digikey/main/prod/';}}})();}catch(e){};
if (typeof utag == "undefined" && !utag_condload) {
  var utag = {
    id:"digikey.main",
    o:{},
    sender: {},
    send: {},
    rpt: {
      ts: {
        a: new Date()
      }
    },
    dbi: [],
    loader: {
      q: [],
      lc: 0,
      f: {},
      p: 0,
      ol: 0,
      wq: [],
      ft: 0,
      rf: 0,
      ri: 0,
      rp: 0,
      rq: [],
      lh: function(a, b, c) {
        a = "" + location.hostname;
        b = a.split(".");
        c = (/\.co\.|\.com\.|\.org\./.test(a)) ? 3 : 2;
        return b.splice(b.length - c, c).join(".");
      },
      WQ: function(a, b, c, d) {
        utag.DB('WQ:' + utag.loader.wq.length);
        c = true;
        try {
          utag.loader.GET()
        } catch (e) {};
        var lq = [];
        for (a = 0; a < utag.loader.wq.length; a++) {
          b = utag.loader.wq[a];
	  b.load = utag.loader.cfg[b.id].load;
          if (b.load>0&&b.send) {
            c = false;
            utag.send[b.id] = b;
          }
	  if(b.load!=0&&b.load!=4){
	    lq.push(b);
            this.f[b.id] = 0;
	  }
        }
        if (c) {
          d = false;
          for (b in utag.loader.GV(utag.send)) d = true;
          if (c && d) this.LOAD('WAIT_FORCE');
        }
        this.wq = [];
        for (a = 0; a < lq.length; a++) {
          utag.DB('utag.loader.WAIT: loading ' + lq[a].id);
          utag.loader.AS(lq[a])
        }
        if(lq.length==0)utag.handler.INIT();
      },
      AS: function(a, b, c, d) {
        utag.sender[a.id] = a;
        if (typeof a.src == 'undefined') {
          a.src = utag.cfg.path + ((typeof a.name != 'undefined') ? a.name : 'utag.' + a.id + '.js')
        }
        if (utag.cfg.v) a.src += (a.src.indexOf('?') > 0 ? '&' : '?') + 'utv=' + utag.cfg.v;
        utag.rpt['l_' + a.id] = a.src;
        b = document;
        if (a.load == 2) {
          b.write('<script id="utag_' + a.id + '" src="' + a.src + '"></scr' + 'ipt>')
        } else if(a.load==1||a.load==3) {
          if (b.createElement) {
            c = 'utag_digikey.main_'+a.id;
            if (!b.getElementById(c)) {
              if (a.load == 3) {
                d = b.createElement('iframe');
                d.setAttribute('height', '1');
                d.setAttribute('width', '1');
                d.setAttribute('style', 'display:none');
                d.setAttribute('src', a.src)
              } else {
                d = b.createElement('script');
                d.language = 'javascript';
                d.type = 'text/javascript';
                d.src = a.src;
              }
 	      d.id = c;
              b.getElementsByTagName('head')[0].appendChild(d)
            }
          }
        }
      },
      GV: function(a, b, c) {
        b = {};
        for (c in a) {
          if (typeof a[c] != "function") b[c] = a[c];
        }
        return b
      },
      RD: function(o, a, b, c, d, e, f, g) {
        a = document.getElementsByTagName("meta");
        for (b = 0; b < a.length; b++) {
          if (a[b].name && a[b].name != "") o["meta." + a[b].name.toLowerCase()] = a[b].content.toLowerCase();
        }
        a = location.search.toLowerCase();
        if (a.length > 1) {
          b = a.substring(1).split('&');
          for (a = 0; a < b.length; a++) {
            c = b[a].split("=");
            o["qp." + c[0]] = unescape(c[1])
          }
        }
        a = (new Date()).getTime();
        b = utag.loader.RC();
        c = a + parseInt(utag.cfg.session_timeout);
        d = a + (Math.ceil(Math.random() * 1000000));
        if ((b.utag_main && (typeof b.utag_main._st == "undefined" || (typeof b.utag_main._st != "undefined" && parseInt(b.utag_main._st) < a))) || !b.utag_main) {
          if (b.utag_main) {
            b.utag_main._st = c;
            b.utag_main.ses_id = d;
          } else {
            b.utag_main = {
              _st: c,
              ses_id: d
            }
          }
          utag.loader.SC("utag_main", {
            "_st": c,
            "ses_id": d + ";exp-session"
          });
        } else {
          utag.loader.SC("utag_main", {
            "_st": c
          })
        }
        for (d in b) {
          if (d.match(/utag_(.*)/)) {
            for (c in utag.loader.GV(b[d])) {
              o["cp.utag_" + RegExp.$1 + "_" + c] = b[d][c];
            }
          }
        }
        for (c in utag.loader.GV((utag.cl && !utag.cl['_all_']) ? utag.cl : b)) {
          if (c.indexOf("utag_") < 0 && typeof b[c] != "undefined") o["cp." + c] = b[c];
        }
        o["dom.referrer"] = eval("document." + "referrer");
        o["dom.title"] = "" + document.title;
        o["dom.domain"] = "" + location.hostname;
        o["dom.query_string"] = "" + (location.search).substring(1);
        o["dom.url"] = "" + document.URL;
        o["dom.pathname"] = "" + location.pathname;
      },
      RC: function(a, x, b, c, d, e, f, g, h, i, j, k, l, m, n, o, v, ck, cv) {
        o = {};
        b = ("" + document.cookie != "") ? (document.cookie).split("; ") : [];
        for (c = 0; c < b.length; c++) {
          if (b[c].match(/^(.*?)=(.*)$/)) {
            ck = RegExp.$1;
            cv = RegExp.$2;
          }
	  try{e = decodeURIComponent(cv); }catch(er){e=""};
          if (typeof ck!="undefined" && (ck.indexOf("ulog") == 0 || ck.indexOf("utag_") == 0)) {
            e = e.split("$");
            g = [];
            j = {};
            for (f = 0; f < e.length; f++) {
              try{
                g = e[f].split(":");
                if (g.length > 2) {
                  g[1] = g.slice(1).join(":");
                }
                v = "";
                if (("" + g[1]).indexOf("~") == 0) {
                  h = g[1].substring(1).split("|");
                  for (i = 0; i < h.length; i++) h[i] = decodeURIComponent(h[i]);
                  v = h
                } else v = decodeURIComponent(g[1]);
                j[g[0]] = v;
              }catch(er){};
            }
            o[ck] = {};
            e = (new Date()).getTime();
            for (f in utag.loader.GV(j)) {
              if (j[f] instanceof Array) {
                n = [];
                for (m = 0; m < j[f].length; m++) {
                  if (j[f][m].match(/^(.*);exp-(.*)$/)) {
                    k = (RegExp.$2 == "session") ? (typeof j._st != "undefined" ? j._st : e - 1) : parseInt(RegExp.$2);
                    if (k > e) n[m] = (x == 0) ? j[f][m] : RegExp.$1;
                  }
                }
                j[f] = n.join("|");
              } else {
                j[f] = "" + j[f];
                if (j[f].match(/^(.*);exp-(.*)$/)) {
                  k = (RegExp.$2 == "session") ? (typeof j._st != "undefined" ? j._st : e - 1) : parseInt(RegExp.$2);
                  j[f] = (k < e) ? null : (x == 0 ? j[f] : RegExp.$1);
                }
              }
              if (j[f]) o[ck][f] = j[f];
            }
          } else if (utag.cl[ck] || utag.cl['_all_']) {
            o[ck] = e
          }
        }
        return (a) ? (o[a] ? o[a] : {}) : o;
      },
      SC: function(a, b, c, d, e, f, g, h, i, j, k, x, v) {
        if (!a) return 0;
        v = "";
        x = "Thu, 31 Dec 2099 00:00:00 GMT";
        if (c && c == "da") {
          x = "Thu, 31 Dec 2009 00:00:00 GMT";
        } else if (a.indexOf("utag_") != 0 && a.indexOf("ulog") != 0) {
          if (typeof b != "object") {
            v = b
          }
        } else {
          d = utag.loader.RC(a, 0);
          for (e in utag.loader.GV(b)) {
            f = "" + b[e];
            if (f.match(/^(.*);exp-(\d+)(\w)$/)) {
              g = (new Date()).getTime() + parseInt(RegExp.$2) * ((RegExp.$3 == "h") ? 3600000 : 86400000);
              if (RegExp.$3 == "u") g = parseInt(RegExp.$2);
              f = RegExp.$1 + ";exp-" + g;
            }
            if (c == "i") {
              if (d[e] == null) d[e] = f;
            } else if (c == "d") delete d[e];
            else if (c == "a") d[e] = (d[e] != null) ? (f - 0) + (d[e] - 0) : f;
            else if (c == "ap" || c == "au") {
              if (d[e] == null) d[e] = f;
              else {
                if (d[e].indexOf("|") > 0) {
                  d[e] = d[e].split("|")
                }
                g = (d[e] instanceof Array) ? d[e] : [d[e]];
                g.push(f);
                if (c == "au") {
                  h = {};
                  k = {};
                  for (i = 0; i < g.length; i++) {
                    if (g[i].match(/^(.*);exp-(.*)$/)) {
                      j = RegExp.$1;
                    }
                    if (typeof k[j] == "undefined") {
                      k[j] = 1;
                      h[g[i]] = 1;
                    }
                  }
                  g = [];
                  for (i in utag.loader.GV(h)) {
                    g.push(i);
                  }
                }
                d[e] = g
              }
            } else d[e] = f;
          }
          h = new Array();
          for (g in utag.loader.GV(d)) {
            if (d[g] instanceof Array) {
              for (c = 0; c < d[g].length; c++) {
                d[g][c] = encodeURIComponent(d[g][c])
              }
              h.push(g + ":~" + d[g].join("|"))
            } else h.push(g + ":" + encodeURIComponent(d[g]))
          };
          if (h.length == 0) {
            h.push("");
            x = ""
          }
          v = (h.join("$"));
        }
        document.cookie = a + "=" + v + ";path=/;domain=" + utag.cfg.domain + ";expires=" + x;
        return 1
      },
      LOAD: function(a, b, c, d) {
        utag.DB('utag.loader.LOAD:' + a);
        if (this.f[a] == 0) {
          utag.DB('utag.loader.LOAD:add sender-' + a);
          this.f[a] = 1;
          if (utag.loader.wq.length > 0) return;
          for (b in utag.loader.GV(this.f)) {
            if (this.f[b] == 0) return
          };
          utag.DB('CLEAR FORCE');
          clearTimeout(utag.loader.ft);
          utag.DB('utag.handler.INIT');
          utag.handler.INIT()
        }
      },
      EV: function(a, b, c, d) {
        if (b == "ready") {
          if (document.readyState === "complete") setTimeout(c, 1);
          else {
            var RH;
            if (document.addEventListener) {
              RH = function() {
                document.removeEventListener("DOMContentLoaded", RH, false);
                c()
              };
              document.addEventListener("DOMContentLoaded", RH, false);
              window.addEventListener("load", c, false);
            } else if (document.attachEvent) {
              RH = function() {
                if (document.readyState === "complete") {
                  document.detachEvent("onreadystatechange", RH);
                  c()
                }
              }
              document.attachEvent("onreadystatechange", RH);
              window.attachEvent("onload", c);
            }
          }
        } else {
          if (a.addEventListener) {
            a.addEventListener(b, c, false)
          } else if (a.attachEvent) {
            a.attachEvent(((d == 1) ? "" : "on") + b, c)
          }
        }
      }
    },
    DB: function(a, b) {
      try {
        b = document.cookie;
        if (b.indexOf('utagdb=true') >= 0) console.log(a)
      } catch (e) {}
    },
    RP: function(a, b, c) {
      if (typeof a != 'undefined' && typeof a.src != 'undefined' && a.src != '') {
        b = [];
        for (c in utag.loader.GV(a)) {
          if (c != 'src') b.push(c + '=' + escape(a[c]));
        }
        this.dbi.push((new Image()).src = a.src + '?utv=' + utag.cfg.v + '&utid=' + utag.cfg.utid + '&' + (b.join('&')));
      }
    },
    view: function(a,c) {
      return this.track('view',a,c);
    },
    link: function(a,c) {
      return this.track('link',a,c);
    },
    track: function(a,b,c) {
      for(var i in utag.loader.GV(utag.o)){
        try{utag.o[i].handler.trigger(a,b)}catch(e){};
      }
      if(c)try{c()}catch(e){};
      return true;
    },
    handler: {
      base: "",
      df: {},
      o: {},
      send: {},
      iflag: 0,
      INIT: function(a, b, c) {
        this.iflag = 1;
        a = utag.loader.q.length;
        if (a > 0) {
          for (b = 0; b < a; b++) {
            c = utag.loader.q[b];
            utag.handler.trigger(c.a, c.b)
          }
        }
	if(utag.cfg.noview!=true)utag.handler.trigger('view', utag.data);
      },
      test: function() {
        return 1
      },
      trigger: function(a, b, c, d) {
        b = b || {};
        if (!this.iflag) {
          utag.loader.q.push({
            a: a,
            b: b
          });
          return;
        }
        for (c in utag.loader.GV(this.df)) {
          if (typeof this.df[c] != "function" && typeof b[c] == "undefined") b[c] = this.df[c]
        }
        for (c = 0; c < this.extend.length; c++) {
          try {
            this.extend[c](a, b);
            utag.rpt['ex_' + c] = 0
          } catch (e) {
            utag.rpt['ex_' + c] = 1;
	    if(typeof utag_err!="undefined"){utag_err.push({e:e.message,s:utag.cfg.path+'utag.js',l:c,t:'ge'})};
          }
        };
        for (c in utag.loader.GV(utag.send)) {
          if (typeof utag.sender[c] != "undefined") {
            try {
              utag.sender[c].send(a, utag.handler.C(b));
              utag.rpt['s_' + c] = 0
            } catch (e) {
              utag.rpt['s_' + c] = 1
            };
            utag.rpt.ts['s'] = new Date();
            utag.RP(utag.rpt);
          }
        }
        c = this.base.split(",");
        for (d = 0; d < c.length; d++) {
          if (typeof b[c[d]] != "undefined") this.df[c[d]] = b[c[d]]
        };
	for(d in utag.loader.GV(b)){if(d.indexOf('dom.')==0)this.df[d]=b[d]};
        this.o = b;
	
      },
      C: function(a, b, c, d) {
        b = {};
        for (c in utag.loader.GV(a)) {
          if (typeof a[c] != "function") b[c] = a[c]
        }
        return b
      }
    }
  };
  utag.o['digikey.main']=utag;
  utag.cfg = {
    v: "ut4.003.201602021453",
    session_timeout: 1800000,
    readywait: 0,
    noload: 0,
    forcetimeout: 3000,
    domain: utag.loader.lh(),
    path: "//tags.tiqcdn.com/utag/digikey/main/prod/",
    utid: "digikey/main/201602021453"
  };utag.cond={10:0,11:0,12:0,13:0,14:0,16:0,17:0,18:0,19:0,20:0,21:0,22:0,23:0,26:0,27:0,2:0,32:0,33:0,34:0,35:0,36:0,37:0,38:0,39:0,3:0,43:0,44:0,45:0,46:0,47:0,48:0,49:0,50:0,51:0,53:0,54:0,55:0,57:0,60:0,63:0,64:0,65:0,66:0,67:0,68:0,8:0,9:0};
utag.pagevars=function(){try{utag.data['js_page.mkto_a']=mkto_a}catch(e){utag.DB(e)};try{utag.data['js_page.mkto_b']=mkto_b}catch(e){utag.DB(e)};try{utag.data['js_page.mkto_c']=mkto_c}catch(e){utag.DB(e)};try{utag.data['js_page.mkto_e']=mkto_e}catch(e){utag.DB(e)};try{utag.data['js_page.mkto_f']=mkto_f}catch(e){utag.DB(e)};try{utag.data['js_page.mkto_g']=mkto_g}catch(e){utag.DB(e)};try{utag.data['js_page.mkto_h']=mkto_h}catch(e){utag.DB(e)};try{utag.data['js_page.marin_client_id']=marin_client_id}catch(e){utag.DB(e)};try{utag.data['js_page.window.mobile']=window.mobile}catch(e){utag.DB(e)};try{utag.data['js_page.DCS.dcsref']=DCS.dcsref}catch(e){utag.DB(e)};};
utag.loader.initdata = function() {   try {       utag.data = (typeof utag_data != 'undefined') ? utag_data : {};       utag.udoname='utag_data';    } catch (e) {       utag.data = {};       utag.DB('idf:'+e);   }};utag.loader.loadrules = function() {try{utag.cond[10]|=(utag.data['dom.pathname'].toString().toLowerCase().indexOf('shipping.aspx'.toLowerCase())>-1)}catch(e){utag.DB(e)};try{utag.cond[11]|=(utag.data['dom.pathname'].toString().toLowerCase().indexOf('billing.aspx'.toLowerCase())>-1)}catch(e){utag.DB(e)};try{utag.cond[12]|=(utag.data['dom.domain'].toString().toLowerCase()=='www.digikey.com'.toLowerCase())||(utag.data['dom.domain'].toString().toLowerCase()=='digikeytest.digikey.com'.toLowerCase())||(utag.data['dom.domain'].toString().toLowerCase()=='ordering.digikey.com'.toLowerCase())||(utag.data['dom.domain'].toString().toLowerCase()=='localhost'.toLowerCase())}catch(e){utag.DB(e)};try{utag.cond[13]|=(utag.data['dom.domain'].toString().toLowerCase()=='www.digikey.com'.toLowerCase())||(utag.data['dom.domain'].toString().toLowerCase()=='www.digikey.ca'.toLowerCase())||(utag.data['dom.domain'].toString().toLowerCase()=='www.digikey.co.uk'.toLowerCase())||(utag.data['dom.domain'].toString().toLowerCase()=='www.digikey.co.nz'.toLowerCase())||(utag.data['dom.domain'].toString().toLowerCase()=='www.digikey.com.mx'.toLowerCase())||(utag.data['dom.domain'].toString().toLowerCase()=='www.digikey.com.au'.toLowerCase())||(utag.data['dom.domain'].toString().toLowerCase()=='digikeytest.digikey.com'.toLowerCase())||(utag.data['dom.domain'].toString().toLowerCase()=='digikeytest.digikey.ca'.toLowerCase())||(utag.data['dom.domain'].toString().toLowerCase()=='digikeytest.digikey.co.uk'.toLowerCase())||(utag.data['dom.domain'].toString().toLowerCase()=='digikeytest.digikey.co.nz'.toLowerCase())||(utag.data['dom.domain'].toString().toLowerCase()=='digikeytest.digikey.com.mx'.toLowerCase())||(utag.data['dom.domain'].toString().toLowerCase()=='digikeytest.digikey.com.au'.toLowerCase())||(utag.data['dom.domain'].toString().toLowerCase()=='ordering.digikey.com'.toLowerCase())}catch(e){utag.DB(e)};try{utag.cond[14]|=(utag.data['page_type']!='Homepage')}catch(e){utag.DB(e)};try{utag.cond[16]|=(utag.data['dom.domain'].toString().indexOf('.ca')>-1)}catch(e){utag.DB(e)};try{utag.cond[17]|=(utag.data['dom.domain'].toString().indexOf('co.uk')>-1)}catch(e){utag.DB(e)};try{utag.cond[18]|=(utag.data['dom.domain'].toString().indexOf('.au')>-1)}catch(e){utag.DB(e)};try{utag.cond[19]|=(utag.data['dom.domain'].toString().indexOf('.fr')>-1)}catch(e){utag.DB(e)};try{utag.cond[2]|=(utag.data['page_title']=='Order Confirmation')}catch(e){utag.DB(e)};try{utag.cond[20]|=(utag.data['dom.domain'].toString().indexOf('.ie')>-1)}catch(e){utag.DB(e)};try{utag.cond[21]|=(utag.data['dom.domain'].toString().indexOf('.nz')>-1)}catch(e){utag.DB(e)};try{utag.cond[22]|=(utag.data['dom.domain'].toString().indexOf('.de')>-1)}catch(e){utag.DB(e)};try{utag.cond[23]|=(utag.data['dom.domain'].toString().indexOf('.jp')>-1)}catch(e){utag.DB(e)};try{utag.cond[26]|=(utag.data['dom.domain'].toString().indexOf('at')>-1)}catch(e){utag.DB(e)};try{utag.cond[27]|=(utag.data['dom.domain'].toString().indexOf('.kr')>-1)}catch(e){utag.DB(e)};try{utag.cond[3]|=(utag.data['dom.pathname']=='/')||(utag.data['page_type']=='Homepage')}catch(e){utag.DB(e)};try{utag.cond[32]|=(utag.data['wt_use_udo'].toString().toLowerCase()=='true'.toLowerCase())}catch(e){utag.DB(e)};try{utag.cond[33]|=(utag.data['dom.domain'].toString().toLowerCase().indexOf('digikey.nl'.toLowerCase())>-1)}catch(e){utag.DB(e)};try{utag.cond[34]|=(utag.data['dom.domain'].toString().toLowerCase().indexOf('digikey.tw'.toLowerCase())>-1)}catch(e){utag.DB(e)};try{utag.cond[35]|=(utag.data['dom.domain'].toString().indexOf('digikey.it')>-1)}catch(e){utag.DB(e)};try{utag.cond[36]|=(utag.data['dom.domain'].toString().toLowerCase().indexOf('digikey.be'.toLowerCase())>-1)}catch(e){utag.DB(e)};try{utag.cond[37]|=(utag.data['dom.domain'].toString().toLowerCase().indexOf('digikey.es'.toLowerCase())>-1)}catch(e){utag.DB(e)};try{utag.cond[38]|=(utag.data['dom.domain'].toString().toLowerCase().indexOf('digikey.com.mx'.toLowerCase())>-1)}catch(e){utag.DB(e)};try{utag.cond[39]|=(utag.data['dom.domain'].toString().toLowerCase().indexOf('digikey.hk'.toLowerCase())>-1)}catch(e){utag.DB(e)};try{utag.cond[43]|=(utag.data['qp.wt.z_sm_link'].toString().indexOf('Twitter')>-1)||(utag.data['qp.wt.z_sm_link'].toString().indexOf('twitter')>-1)}catch(e){utag.DB(e)};try{utag.cond[44]|=(utag.data['dom.domain'].toString().toLowerCase().indexOf('digikey.fi'.toLowerCase())>-1)}catch(e){utag.DB(e)};try{utag.cond[45]|=(utag.data['dom.domain'].toString().toLowerCase().indexOf('.pt'.toLowerCase())>-1)}catch(e){utag.DB(e)};try{utag.cond[46]|=(utag.data['dom.domain'].toString().toLowerCase().indexOf('.ch'.toLowerCase())>-1)}catch(e){utag.DB(e)};try{utag.cond[47]|=(utag.data['dom.domain'].toString().toLowerCase().indexOf('.co.il'.toLowerCase())>-1)}catch(e){utag.DB(e)};try{utag.cond[48]|=(utag.data['dom.domain'].toString().toLowerCase().indexOf('digikey.se'.toLowerCase())>-1)}catch(e){utag.DB(e)};try{utag.cond[49]|=(utag.data['dom.domain'].toString().toLowerCase().indexOf('digikey.dk'.toLowerCase())>-1)}catch(e){utag.DB(e)};try{utag.cond[50]|=(utag.data['dom.domain'].toString().toLowerCase().indexOf('digikey.no'.toLowerCase())>-1)}catch(e){utag.DB(e)};try{utag.cond[51]|=(utag.data['dom.domain'].toString().toLowerCase().indexOf('digikey.sg'.toLowerCase())>-1)}catch(e){utag.DB(e)};try{utag.cond[53]|=(utag.data['dom.pathname'].toString().toLowerCase().indexOf('/classic/RegisteredUser/Login.aspx'.toLowerCase())<0&&utag.data['dom.pathname'].toString().toLowerCase().indexOf('/classic/RegisteredUser/Register.aspx'.toLowerCase())<0&&utag.data['page_type']!='RU'&&utag.data['page_sub_type']!='NR'&&utag.data['page_sub_type']!='LOG'&&utag.data['page_id']!='Registration Form'&&utag.data['page_id']!='Standard Login')}catch(e){utag.DB(e)};try{utag.cond[54]|=(utag.data['page_type']=='RU'&&utag.data['page_sub_type']=='NR'&&utag.data['page_id']=='Registration Form')||(utag.data['page_type']=='RU'&&utag.data['page_sub_type']=='LOG'&&utag.data['page_id']=='Standard Login')}catch(e){utag.DB(e)};try{utag.cond[55]|=(utag.data['dom.domain'].toString().toLowerCase().indexOf('digikey'.toLowerCase())>-1&&typeof utag.data['page_site']!='undefined'&&utag.data['page_site'].toString().toLowerCase()!='am'.toLowerCase()&&utag.data['page_site'].toString().toLowerCase()!='by'.toLowerCase()&&utag.data['page_site'].toString().toLowerCase()!='bo'.toLowerCase()&&utag.data['page_site'].toString().toLowerCase()!='ba'.toLowerCase()&&utag.data['page_site'].toString().toLowerCase()!='br'.toLowerCase()&&utag.data['page_site'].toString().toLowerCase()!='bg'.toLowerCase()&&utag.data['page_site'].toString().toLowerCase()!='cl'.toLowerCase()&&utag.data['page_site'].toString().toLowerCase()!='co'.toLowerCase()&&utag.data['page_site'].toString().toLowerCase()!='cr'.toLowerCase()&&utag.data['page_site'].toString().toLowerCase()!='cy'.toLowerCase()&&utag.data['page_site'].toString().toLowerCase()!='cz'.toLowerCase()&&utag.data['page_site'].toString().toLowerCase()!='do'.toLowerCase()&&utag.data['page_site'].toString().toLowerCase()!='ec'.toLowerCase()&&utag.data['page_site'].toString().toLowerCase()!='eg'.toLowerCase()&&utag.data['page_site'].toString().toLowerCase()!='ee'.toLowerCase()&&utag.data['page_site'].toString().toLowerCase()!='gt'.toLowerCase()&&utag.data['page_site'].toString().toLowerCase()!='hu'.toLowerCase()&&utag.data['page_site'].toString().toLowerCase()!='is'.toLowerCase()&&utag.data['page_site'].toString().toLowerCase()!='in'.toLowerCase()&&utag.data['page_site'].toString().toLowerCase()!='id'.toLowerCase()&&utag.data['page_site'].toString().toLowerCase()!='jm'.toLowerCase()&&utag.data['page_site'].toString().toLowerCase()!='lv'.toLowerCase()&&utag.data['page_site'].toString().toLowerCase()!='lb'.toLowerCase()&&utag.data['page_site'].toString().toLowerCase()!='lt'.toLowerCase()&&utag.data['page_site'].toString().toLowerCase()!='mk'.toLowerCase()&&utag.data['page_site'].toString().toLowerCase()!='my'.toLowerCase()&&utag.data['page_site'].toString().toLowerCase()!='md'.toLowerCase()&&utag.data['page_site'].toString().toLowerCase()!='ma'.toLowerCase()&&utag.data['page_site'].toString().toLowerCase()!='pk'.toLowerCase()&&utag.data['page_site'].toString().toLowerCase()!='pa'.toLowerCase()&&utag.data['page_site'].toString().toLowerCase()!='pe'.toLowerCase()&&utag.data['page_site'].toString().toLowerCase()!='ph'.toLowerCase()&&utag.data['page_site'].toString().toLowerCase()!='pl'.toLowerCase()&&utag.data['page_site'].toString().toLowerCase()!='pr'.toLowerCase()&&utag.data['page_site'].toString().toLowerCase()!='ro'.toLowerCase()&&utag.data['page_site'].toString().toLowerCase()!='ru'.toLowerCase()&&utag.data['page_site'].toString().toLowerCase()!='sa'.toLowerCase()&&utag.data['page_site'].toString().toLowerCase()!='rs'.toLowerCase()&&utag.data['page_site'].toString().toLowerCase()!='sk'.toLowerCase()&&utag.data['page_site'].toString().toLowerCase()!='si'.toLowerCase()&&utag.data['page_site'].toString().toLowerCase()!='za'.toLowerCase()&&utag.data['page_site'].toString().toLowerCase()!='lk'.toLowerCase()&&utag.data['page_site'].toString().toLowerCase()!='th'.toLowerCase()&&utag.data['page_site'].toString().toLowerCase()!='tn'.toLowerCase()&&utag.data['page_site'].toString().toLowerCase()!='tr'.toLowerCase()&&utag.data['page_site'].toString().toLowerCase()!='ua'.toLowerCase()&&utag.data['page_site'].toString().toLowerCase()!='ae'.toLowerCase()&&utag.data['page_site'].toString().toLowerCase()!='uy'.toLowerCase()&&utag.data['page_site'].toString().toLowerCase()!='ve'.toLowerCase()&&utag.data['page_site'].toString().toLowerCase()!='vn'.toLowerCase()&&utag.data['page_site'].toString().toLowerCase()!='ar'.toLowerCase()&&typeof utag.data['order_salesorder_number']=='undefined'&&typeof utag.data['order_subtotal']=='undefined'&&typeof utag.data['sales_order_id']=='undefined'&&utag.data['order_subtotal']!='0'&&utag.data['page_type']!='MDK'&&utag.data['ref_page_type']!='MDK')||(utag.data['dom.domain'].toString().toLowerCase().indexOf('digikey'.toLowerCase())>-1&&utag.data['meta.wt.site'].toString().toLowerCase()!='ar'.toLowerCase()&&utag.data['meta.wt.site'].toString().toLowerCase()!='am'.toLowerCase()&&utag.data['meta.wt.site'].toString().toLowerCase()!='by'.toLowerCase()&&utag.data['meta.wt.site'].toString().toLowerCase()!='bo'.toLowerCase()&&utag.data['meta.wt.site'].toString().toLowerCase()!='ba'.toLowerCase()&&utag.data['meta.wt.site'].toString().toLowerCase()!='br'.toLowerCase()&&utag.data['meta.wt.site'].toString().toLowerCase()!='bg'.toLowerCase()&&utag.data['meta.wt.site'].toString().toLowerCase()!='cl'.toLowerCase()&&utag.data['meta.wt.site'].toString().toLowerCase()!='co'.toLowerCase()&&utag.data['meta.wt.site'].toString().toLowerCase()!='cr'.toLowerCase()&&utag.data['meta.wt.site'].toString().toLowerCase()!='cy'.toLowerCase()&&utag.data['meta.wt.site'].toString().toLowerCase()!='cz'.toLowerCase()&&utag.data['meta.wt.site'].toString().toLowerCase()!='do'.toLowerCase()&&utag.data['meta.wt.site'].toString().toLowerCase()!='ec'.toLowerCase()&&utag.data['meta.wt.site'].toString().toLowerCase()!='eg'.toLowerCase()&&utag.data['meta.wt.site'].toString().toLowerCase()!='ee'.toLowerCase()&&utag.data['meta.wt.site'].toString().toLowerCase()!='gt'.toLowerCase()&&utag.data['meta.wt.site'].toString().toLowerCase()!='hu'.toLowerCase()&&utag.data['meta.wt.site'].toString().toLowerCase()!='is'.toLowerCase()&&utag.data['meta.wt.site'].toString().toLowerCase()!='in'.toLowerCase()&&utag.data['meta.wt.site'].toString().toLowerCase()!='id'.toLowerCase()&&utag.data['meta.wt.site'].toString().toLowerCase()!='jm'.toLowerCase()&&utag.data['meta.wt.site'].toString().toLowerCase()!='lv'.toLowerCase()&&utag.data['meta.wt.site'].toString().toLowerCase()!='lb'.toLowerCase()&&utag.data['meta.wt.site'].toString().toLowerCase()!='lt'.toLowerCase()&&utag.data['meta.wt.site'].toString().toLowerCase()!='mk'.toLowerCase()&&utag.data['meta.wt.site'].toString().toLowerCase()!='my'.toLowerCase()&&utag.data['meta.wt.site'].toString().toLowerCase()!='md'.toLowerCase()&&utag.data['meta.wt.site'].toString().toLowerCase()!='ma'.toLowerCase()&&utag.data['meta.wt.site'].toString().toLowerCase()!='pk'.toLowerCase()&&utag.data['meta.wt.site'].toString().toLowerCase()!='pa'.toLowerCase()&&utag.data['meta.wt.site'].toString().toLowerCase()!='pe'.toLowerCase()&&utag.data['meta.wt.site'].toString().toLowerCase()!='ph'.toLowerCase()&&utag.data['meta.wt.site'].toString().toLowerCase()!='pl'.toLowerCase()&&utag.data['meta.wt.site'].toString().toLowerCase()!='pr'.toLowerCase()&&utag.data['meta.wt.site'].toString().toLowerCase()!='ro'.toLowerCase()&&utag.data['meta.wt.site'].toString().toLowerCase()!='ru'.toLowerCase()&&utag.data['meta.wt.site'].toString().toLowerCase()!='sa'.toLowerCase()&&utag.data['meta.wt.site'].toString().toLowerCase()!='rs'.toLowerCase()&&utag.data['meta.wt.site'].toString().toLowerCase()!='sk'.toLowerCase()&&utag.data['meta.wt.site'].toString().toLowerCase()!='si'.toLowerCase()&&utag.data['meta.wt.site'].toString().toLowerCase()!='za'.toLowerCase()&&utag.data['meta.wt.site'].toString().toLowerCase()!='lk'.toLowerCase()&&utag.data['meta.wt.site'].toString().toLowerCase()!='th'.toLowerCase()&&utag.data['meta.wt.site'].toString().toLowerCase()!='tn'.toLowerCase()&&utag.data['meta.wt.site'].toString().toLowerCase()!='tr'.toLowerCase()&&utag.data['meta.wt.site'].toString().toLowerCase()!='ua'.toLowerCase()&&utag.data['meta.wt.site'].toString().toLowerCase()!='ae'.toLowerCase()&&utag.data['meta.wt.site'].toString().toLowerCase()!='uy'.toLowerCase()&&utag.data['meta.wt.site'].toString().toLowerCase()!='ve'.toLowerCase()&&utag.data['meta.wt.site'].toString().toLowerCase()!='vn'.toLowerCase()&&typeof utag.data['order_salesorder_number']=='undefined'&&typeof utag.data['order_subtotal']=='undefined'&&typeof utag.data['sales_order_id']=='undefined'&&utag.data['order_subtotal']!='0'&&utag.data['page_type']!='MDK'&&utag.data['ref_page_type']!='MDK')||(utag.data['dom.domain'].toString().toLowerCase().indexOf('digikey'.toLowerCase())>-1&&typeof utag.data['page_site']!='undefined'&&utag.data['page_site'].toString().toLowerCase()!='am'.toLowerCase()&&utag.data['page_site'].toString().toLowerCase()!='by'.toLowerCase()&&utag.data['page_site'].toString().toLowerCase()!='bo'.toLowerCase()&&utag.data['page_site'].toString().toLowerCase()!='ba'.toLowerCase()&&utag.data['page_site'].toString().toLowerCase()!='br'.toLowerCase()&&utag.data['page_site'].toString().toLowerCase()!='bg'.toLowerCase()&&utag.data['page_site'].toString().toLowerCase()!='cl'.toLowerCase()&&utag.data['page_site'].toString().toLowerCase()!='co'.toLowerCase()&&utag.data['page_site'].toString().toLowerCase()!='cr'.toLowerCase()&&utag.data['page_site'].toString().toLowerCase()!='cy'.toLowerCase()&&utag.data['page_site'].toString().toLowerCase()!='cz'.toLowerCase()&&utag.data['page_site'].toString().toLowerCase()!='do'.toLowerCase()&&utag.data['page_site'].toString().toLowerCase()!='ec'.toLowerCase()&&utag.data['page_site'].toString().toLowerCase()!='eg'.toLowerCase()&&utag.data['page_site'].toString().toLowerCase()!='ee'.toLowerCase()&&utag.data['page_site'].toString().toLowerCase()!='gt'.toLowerCase()&&utag.data['page_site'].toString().toLowerCase()!='hu'.toLowerCase()&&utag.data['page_site'].toString().toLowerCase()!='is'.toLowerCase()&&utag.data['page_site'].toString().toLowerCase()!='in'.toLowerCase()&&utag.data['page_site'].toString().toLowerCase()!='id'.toLowerCase()&&utag.data['page_site'].toString().toLowerCase()!='jm'.toLowerCase()&&utag.data['page_site'].toString().toLowerCase()!='lv'.toLowerCase()&&utag.data['page_site'].toString().toLowerCase()!='lb'.toLowerCase()&&utag.data['page_site'].toString().toLowerCase()!='lt'.toLowerCase()&&utag.data['page_site'].toString().toLowerCase()!='mk'.toLowerCase()&&utag.data['page_site'].toString().toLowerCase()!='my'.toLowerCase()&&utag.data['page_site'].toString().toLowerCase()!='md'.toLowerCase()&&utag.data['page_site'].toString().toLowerCase()!='ma'.toLowerCase()&&utag.data['page_site'].toString().toLowerCase()!='pk'.toLowerCase()&&utag.data['page_site'].toString().toLowerCase()!='pa'.toLowerCase()&&utag.data['page_site'].toString().toLowerCase()!='pe'.toLowerCase()&&utag.data['page_site'].toString().toLowerCase()!='ph'.toLowerCase()&&utag.data['page_site'].toString().toLowerCase()!='pl'.toLowerCase()&&utag.data['page_site'].toString().toLowerCase()!='pr'.toLowerCase()&&utag.data['page_site'].toString().toLowerCase()!='ro'.toLowerCase()&&utag.data['page_site'].toString().toLowerCase()!='ru'.toLowerCase()&&utag.data['page_site'].toString().toLowerCase()!='sa'.toLowerCase()&&utag.data['page_site'].toString().toLowerCase()!='rs'.toLowerCase()&&utag.data['page_site'].toString().toLowerCase()!='sk'.toLowerCase()&&utag.data['page_site'].toString().toLowerCase()!='si'.toLowerCase()&&utag.data['page_site'].toString().toLowerCase()!='za'.toLowerCase()&&utag.data['page_site'].toString().toLowerCase()!='lk'.toLowerCase()&&utag.data['page_site'].toString().toLowerCase()!='th'.toLowerCase()&&utag.data['page_site'].toString().toLowerCase()!='tn'.toLowerCase()&&utag.data['page_site'].toString().toLowerCase()!='tr'.toLowerCase()&&utag.data['page_site'].toString().toLowerCase()!='ua'.toLowerCase()&&utag.data['page_site'].toString().toLowerCase()!='ae'.toLowerCase()&&utag.data['page_site'].toString().toLowerCase()!='uy'.toLowerCase()&&utag.data['page_site'].toString().toLowerCase()!='ve'.toLowerCase()&&utag.data['page_site'].toString().toLowerCase()!='vn'.toLowerCase()&&utag.data['page_site'].toString().toLowerCase()!='ar'.toLowerCase()&&typeof utag.data['order_salesorder_number']!='undefined'&&typeof utag.data['order_subtotal']!='undefined'&&utag.data['order_subtotal']!='0'&&utag.data['page_type']!='MDK'&&utag.data['ref_page_type']!='MDK')||(utag.data['dom.domain'].toString().toLowerCase().indexOf('digikey'.toLowerCase())>-1&&utag.data['meta.wt.site'].toString().toLowerCase()!='ar'.toLowerCase()&&utag.data['meta.wt.site'].toString().toLowerCase()!='am'.toLowerCase()&&utag.data['meta.wt.site'].toString().toLowerCase()!='by'.toLowerCase()&&utag.data['meta.wt.site'].toString().toLowerCase()!='bo'.toLowerCase()&&utag.data['meta.wt.site'].toString().toLowerCase()!='ba'.toLowerCase()&&utag.data['meta.wt.site'].toString().toLowerCase()!='br'.toLowerCase()&&utag.data['meta.wt.site'].toString().toLowerCase()!='bg'.toLowerCase()&&utag.data['meta.wt.site'].toString().toLowerCase()!='cl'.toLowerCase()&&utag.data['meta.wt.site'].toString().toLowerCase()!='co'.toLowerCase()&&utag.data['meta.wt.site'].toString().toLowerCase()!='cr'.toLowerCase()&&utag.data['meta.wt.site'].toString().toLowerCase()!='cy'.toLowerCase()&&utag.data['meta.wt.site'].toString().toLowerCase()!='cz'.toLowerCase()&&utag.data['meta.wt.site'].toString().toLowerCase()!='do'.toLowerCase()&&utag.data['meta.wt.site'].toString().toLowerCase()!='ec'.toLowerCase()&&utag.data['meta.wt.site'].toString().toLowerCase()!='eg'.toLowerCase()&&utag.data['meta.wt.site'].toString().toLowerCase()!='ee'.toLowerCase()&&utag.data['meta.wt.site'].toString().toLowerCase()!='gt'.toLowerCase()&&utag.data['meta.wt.site'].toString().toLowerCase()!='hu'.toLowerCase()&&utag.data['meta.wt.site'].toString().toLowerCase()!='is'.toLowerCase()&&utag.data['meta.wt.site'].toString().toLowerCase()!='in'.toLowerCase()&&utag.data['meta.wt.site'].toString().toLowerCase()!='id'.toLowerCase()&&utag.data['meta.wt.site'].toString().toLowerCase()!='jm'.toLowerCase()&&utag.data['meta.wt.site'].toString().toLowerCase()!='lv'.toLowerCase()&&utag.data['meta.wt.site'].toString().toLowerCase()!='lb'.toLowerCase()&&utag.data['meta.wt.site'].toString().toLowerCase()!='lt'.toLowerCase()&&utag.data['meta.wt.site'].toString().toLowerCase()!='mk'.toLowerCase()&&utag.data['meta.wt.site'].toString().toLowerCase()!='my'.toLowerCase()&&utag.data['meta.wt.site'].toString().toLowerCase()!='md'.toLowerCase()&&utag.data['meta.wt.site'].toString().toLowerCase()!='ma'.toLowerCase()&&utag.data['meta.wt.site'].toString().toLowerCase()!='pk'.toLowerCase()&&utag.data['meta.wt.site'].toString().toLowerCase()!='pa'.toLowerCase()&&utag.data['meta.wt.site'].toString().toLowerCase()!='pe'.toLowerCase()&&utag.data['meta.wt.site'].toString().toLowerCase()!='ph'.toLowerCase()&&utag.data['meta.wt.site'].toString().toLowerCase()!='pl'.toLowerCase()&&utag.data['meta.wt.site'].toString().toLowerCase()!='pr'.toLowerCase()&&utag.data['meta.wt.site'].toString().toLowerCase()!='ro'.toLowerCase()&&utag.data['meta.wt.site'].toString().toLowerCase()!='ru'.toLowerCase()&&utag.data['meta.wt.site'].toString().toLowerCase()!='sa'.toLowerCase()&&utag.data['meta.wt.site'].toString().toLowerCase()!='rs'.toLowerCase()&&utag.data['meta.wt.site'].toString().toLowerCase()!='sk'.toLowerCase()&&utag.data['meta.wt.site'].toString().toLowerCase()!='si'.toLowerCase()&&utag.data['meta.wt.site'].toString().toLowerCase()!='za'.toLowerCase()&&utag.data['meta.wt.site'].toString().toLowerCase()!='lk'.toLowerCase()&&utag.data['meta.wt.site'].toString().toLowerCase()!='th'.toLowerCase()&&utag.data['meta.wt.site'].toString().toLowerCase()!='tn'.toLowerCase()&&utag.data['meta.wt.site'].toString().toLowerCase()!='tr'.toLowerCase()&&utag.data['meta.wt.site'].toString().toLowerCase()!='ua'.toLowerCase()&&utag.data['meta.wt.site'].toString().toLowerCase()!='ae'.toLowerCase()&&utag.data['meta.wt.site'].toString().toLowerCase()!='uy'.toLowerCase()&&utag.data['meta.wt.site'].toString().toLowerCase()!='ve'.toLowerCase()&&utag.data['meta.wt.site'].toString().toLowerCase()!='vn'.toLowerCase()&&typeof utag.data['order_salesorder_number']!='undefined'&&typeof utag.data['order_subtotal']!='undefined'&&utag.data['order_subtotal']!='0'&&utag.data['page_type']!='MDK'&&utag.data['ref_page_type']!='MDK')}catch(e){utag.DB(e)};try{utag.cond[57]|=(utag.data['page_title']=='Order Confirmation'&&utag.data['page_site']=='US'&&utag.data['page_type']!='MDK'&&typeof utag.data['order_salesorder_number']!='undefined'&&typeof utag.data['order_subtotal']!='undefined'&&utag.data['order_subtotal']!='0'&&utag.data['ref_page_type']!='MDK')||(utag.data['page_title']=='Order Confirmation'&&utag.data['page_site']=='US'&&utag.data['page_type']!='MDK'&&typeof utag.data['order_salesorder_number']=='undefined'&&typeof utag.data['order_subtotal']=='undefined'&&typeof utag.data['sales_order_id']=='undefined'&&utag.data['order_subtotal']!='0'&&utag.data['ref_page_type']!='MDK')}catch(e){utag.DB(e)};try{utag.cond[60]|=(utag.data['dom.url'].toString().indexOf('/customer-forms')<0)}catch(e){utag.DB(e)};try{utag.cond[63]|=(utag.data['dom.pathname'].toString().indexOf('/product-highlight/c/cui/summer-of-power')>-1)}catch(e){utag.DB(e)};try{utag.cond[64]|=(typeof utag.data['js_page.window.mobile']=='undefined')}catch(e){utag.DB(e)};try{utag.cond[65]|=(utag.data['dom.domain'].toString().toLowerCase().indexOf('.cn'.toLowerCase())>-1)}catch(e){utag.DB(e)};try{utag.cond[66]|=(utag.data['dom.domain'].toString().toLowerCase().indexOf('.cn'.toLowerCase())>-1&&utag.data['page_type']=='MDK'&&utag.data['page_sub_type']=='HP')}catch(e){utag.DB(e)};try{utag.cond[67]|=(utag.data['page_title']=='Order Confirmation'&&utag.data['dom.domain'].toString().toLowerCase().indexOf('.cn'.toLowerCase())>-1)}catch(e){utag.DB(e)};try{utag.cond[68]|=(utag.data['dom.url'].toString().toLowerCase().indexOf('/resources/careers'.toLowerCase())>-1&&utag.data['page_sub_type'].toString().toLowerCase()=='AC'.toLowerCase())||(utag.data['dom.url'].toString().toLowerCase().indexOf('/resources/scholarship-programs'.toLowerCase())>-1)}catch(e){utag.DB(e)};try{utag.cond[8]|=(utag.data['page_title']!='Order Confirmation')}catch(e){utag.DB(e)};try{utag.cond[9]|=(utag.data['dom.domain'].toString().toLowerCase().indexOf('www.digikey.kr'.toLowerCase())>-1)||(utag.data['dom.domain'].toString().toLowerCase().indexOf('www.digikey.cn'.toLowerCase())>-1)}catch(e){utag.DB(e)};};utag.pre=function() {    utag.loader.initdata();utag.pagevars();    try{utag.loader.RD(utag.data)}catch(e){utag.DB(e)};    utag.loader.loadrules();        };utag.loader.GET=function(){utag.cl={'_all_':1};utag.pre();
  utag.handler.extend=[function(a,b,c,d){
  b._ccity='';
  b._ccountry='';
  b._ccurrency=(typeof b['order_currency']!='undefined')?b['order_currency']:'';
  b._ccustid='';
  b._corder=(typeof b['order_id']!='undefined')?b['order_id']:'';
  b._cpromo='';
  b._cship='';
  b._cstate='';
  b._cstore='';
  b._csubtotal=(typeof b['order_subtotal']!='undefined')?b['order_subtotal']:'';
  b._ctax='';
  b._ctotal=(typeof b['order_subtotal']!='undefined')?b['order_subtotal']:'';
  b._ctype='';
  b._czip='';
  b._cprod=(typeof b['product_sku']!='undefined'&&b['product_sku'].length>0)?b['product_sku']:[];
  b._cprodname=[];
  b._cbrand=[];
  b._ccat=[];
  b._ccat2=[];
  b._cquan=(typeof b['product_quantities']!='undefined'&&b['product_quantities'].length>0)?b['product_quantities']:[];
  b._cprice=(typeof b['product_price']!='undefined'&&b['product_price'].length>0)?b['product_price']:[];
  b._csku=(typeof b['product_sku']!='undefined'&&b['product_sku'].length>0)?b['product_sku']:[];
  b._cpdisc=[];
  if(b._cprod.length==0){b._cprod=b._csku.slice()};
  if(b._cprodname.length==0){b._cprodname=b._csku.slice()};
  function tf(a){if(a=='' || isNaN(parseFloat(a))){return a}else{return (parseFloat(a)).toFixed(2)}};
  b._ctotal=tf(b._ctotal);b._csubtotal=tf(b._csubtotal);b._ctax=tf(b._ctax);b._cship=tf(b._cship);for(c=0;c<b._cprice.length;c++){b._cprice[c]=tf(b._cprice[c])};for(c=0;c<b._cpdisc.length;c++){b._cpdisc[c]=tf(b._cpdisc[c])};
},
function(a,b,c,d,e,f,g){d=b['meta.wt.z_lang'];if(typeof d=='undefined')return;c=[{'zhs':'zh'},{'zht':'zh'}];var m=false;for(e=0;e<c.length;e++){for(f in c[e]){if(d==f){b['meta.wt.z_lang']=c[e][f];m=true};};if(m)break};},
function(a,b){ try{ if(1){b['dc_quan']='1'} } catch(e){ utag.DB(e) }  }];
  utag.handler.cfg_extend=[{"alr":1,"bwq":0,"id":"3","blr":0,"end":0},{"alr":1,"bwq":0,"id":"34","blr":0,"end":0},{"alr":1,"bwq":0,"id":"55","blr":0,"end":0}];
  utag.loader.initcfg = function(){
    utag.loader.cfg={"171":{load:utag.cond[32],send:1,v:201601282343,wait:1,tid:23001},"4":{load:utag.cond[2],send:1,v:201510301947,wait:1,tid:4001},"6":{load:(utag.cond[3] && utag.cond[12]),send:1,v:201510301947,wait:1,tid:7050},"8":{load:(utag.cond[2] && utag.cond[12]),send:1,v:201510301947,wait:1,tid:7050},"9":{load:(utag.cond[2] && utag.cond[12]),send:1,v:201510301947,wait:1,tid:7050},"10":{load:(utag.cond[2] && utag.cond[12]),send:1,v:201510301947,wait:1,tid:7050},"46":{load:(utag.cond[2] && utag.cond[12]),send:1,v:201510301947,wait:1,tid:7050},"24":{load:(utag.cond[10] && utag.cond[12]),send:1,v:201510301947,wait:1,tid:7050},"25":{load:(utag.cond[11] && utag.cond[12]),send:1,v:201510301947,wait:1,tid:7050},"31":{load:(utag.cond[2] && utag.cond[12]),send:1,v:201510301947,wait:1,tid:7050},"13":{load:(utag.cond[2] && utag.cond[13]),send:1,v:201510301947,wait:1,tid:12006},"14":{load:(utag.cond[13] && utag.cond[8] && utag.cond[14] && utag.cond[64]),send:1,v:201510301947,wait:1,tid:12006},"22":{load:(utag.cond[8] && utag.cond[9]),send:1,v:201510301947,wait:1,tid:23015},"23":{load:(utag.cond[2] && utag.cond[9]),send:1,v:201510301947,wait:1,tid:23015},"44":{load:(utag.cond[2] && utag.cond[12]),send:1,v:201601141741,wait:1,tid:7114},"49":{load:(utag.cond[2] && utag.cond[17]),send:1,v:201510301947,wait:1,tid:7050},"57":{load:(utag.cond[16] && utag.cond[2]),send:1,v:201510301947,wait:1,tid:7050},"51":{load:utag.cond[2],send:1,v:201510301947,wait:1,tid:7050},"53":{load:(utag.cond[18] && utag.cond[2]),send:1,v:201510301947,wait:1,tid:7050},"52":{load:(utag.cond[2] && utag.cond[22]),send:1,v:201510301947,wait:1,tid:7050},"54":{load:(utag.cond[2] && utag.cond[19]),send:1,v:201510301947,wait:1,tid:7050},"55":{load:(utag.cond[2] && utag.cond[21]),send:1,v:201510301947,wait:1,tid:7050},"56":{load:(utag.cond[2] && utag.cond[20]),send:1,v:201510301947,wait:1,tid:7050},"73":{load:(utag.cond[2] && utag.cond[23]),send:1,v:201510301947,wait:1,tid:7050},"74":{load:utag.cond[16],send:1,v:201601141741,wait:1,tid:7114},"75":{load:utag.cond[17],send:1,v:201601141741,wait:1,tid:7114},"87":{load:(utag.cond[2] && utag.cond[26]),send:1,v:201510301947,wait:1,tid:7050},"88":{load:(utag.cond[2] && utag.cond[27]),send:1,v:201510301947,wait:1,tid:7050},"89":{load:(utag.cond[2] && utag.cond[12]),send:1,v:201510301947,wait:1,tid:7050},"90":{load:(utag.cond[2] && utag.cond[12]),send:1,v:201510301947,wait:1,tid:7050},"93":{load:(utag.cond[2] && utag.cond[16]),send:1,v:201601141741,wait:1,tid:15022},"98":{load:(utag.cond[33] && utag.cond[2]),send:1,v:201510301947,wait:1,tid:7050},"99":{load:(utag.cond[2] && utag.cond[34]),send:1,v:201510301947,wait:1,tid:7050},"100":{load:(utag.cond[35] && utag.cond[2]),send:1,v:201510301947,wait:1,tid:7050},"105":{load:(utag.cond[60] && utag.cond[2] && utag.cond[12]),send:1,v:201601141741,wait:1,tid:15022},"107":{load:utag.cond[23],send:1,v:201510301947,wait:1,tid:7114},"108":{load:utag.cond[22],send:1,v:201601141741,wait:1,tid:7114},"109":{load:utag.cond[27],send:1,v:201510301947,wait:1,tid:7114},"111":{load:(utag.cond[2] && utag.cond[36]),send:1,v:201510301947,wait:1,tid:7050},"112":{load:(utag.cond[2] && utag.cond[37]),send:1,v:201510301947,wait:1,tid:7050},"113":{load:(utag.cond[38] && utag.cond[2]),send:1,v:201510301947,wait:1,tid:7050},"114":{load:(utag.cond[39] && utag.cond[2]),send:1,v:201510301947,wait:1,tid:7050},"116":{load:(utag.cond[2] && utag.cond[27]),send:1,v:201510301947,wait:1,tid:7050},"125":{load:(utag.cond[2] && utag.cond[12]),send:1,v:201510301947,wait:1,tid:7050},"126":{load:(utag.cond[2] && utag.cond[12]),send:1,v:201510301947,wait:1,tid:7050},"127":{load:(utag.cond[22] && utag.cond[43]),send:1,v:201510301947,wait:1,tid:20078},"128":{load:(utag.cond[35] && utag.cond[43]),send:1,v:201510301947,wait:1,tid:20078},"129":{load:(utag.cond[43] && utag.cond[17]),send:1,v:201510301947,wait:1,tid:20078},"130":{load:(utag.cond[19] && utag.cond[43]),send:1,v:201510301947,wait:1,tid:20078},"131":{load:(utag.cond[44] && utag.cond[2]),send:1,v:201510301947,wait:1,tid:7050},"132":{load:(utag.cond[2] && utag.cond[45]),send:1,v:201510301947,wait:1,tid:7050},"133":{load:(utag.cond[2] && utag.cond[46]),send:1,v:201510301947,wait:1,tid:7050},"134":{load:(utag.cond[2] && utag.cond[47]),send:1,v:201510301947,wait:1,tid:7050},"136":{load:(utag.cond[2] && utag.cond[48]),send:1,v:201510301947,wait:1,tid:7050},"137":{load:(utag.cond[2] && utag.cond[49]),send:1,v:201510301947,wait:1,tid:7050},"139":{load:utag.cond[18],send:1,v:201510301947,wait:1,tid:7114},"140":{load:(utag.cond[8] && utag.cond[12]),send:1,v:201510301947,wait:1,tid:7114},"141":{load:(utag.cond[2] && utag.cond[50]),send:1,v:201510301947,wait:1,tid:7050},"142":{load:(utag.cond[2] && utag.cond[51]),send:1,v:201510301947,wait:1,tid:7050},"143":{load:(utag.cond[2] && utag.cond[12]),send:1,v:201510301947,wait:1,tid:7050},"144":{load:utag.cond[19],send:1,v:201510301947,wait:1,tid:7114},"145":{load:utag.cond[35],send:1,v:201510301947,wait:1,tid:7114},"151":{load:utag.cond[55],send:1,v:201510301947,wait:1,tid:13002},"158":{load:utag.cond[53],send:1,v:201511171600,wait:1,tid:20067},"162":{load:utag.cond[54],send:1,v:201511171600,wait:1,tid:13060},"164":{load:1,send:1,v:201511171600,wait:1,tid:20067},"170":{load:utag.cond[57],send:1,v:201510301947,wait:1,tid:20067},"172":{load:utag.cond[63],send:1,v:201510301947,wait:1,tid:20078},"173":{load:utag.cond[65],send:1,v:201510301947,wait:1,tid:20067},"174":{load:utag.cond[66],send:1,v:201510301947,wait:1,tid:20067},"175":{load:utag.cond[67],send:1,v:201510301947,wait:1,tid:20067},"180":{load:(utag.cond[23] && utag.cond[60] && utag.cond[2]),send:1,v:201601141741,wait:1,tid:15022},"181":{load:(utag.cond[22] && utag.cond[60] && utag.cond[2]),send:1,v:201601141741,wait:1,tid:15022},"182":{load:utag.cond[68],send:1,v:201601292231,wait:1,tid:6026},"183":{load:utag.cond[12],send:1,v:201602021453,wait:1,tid:3117},"184":{load:utag.cond[22],send:1,v:201602021453,wait:1,tid:3117},"185":{load:utag.cond[23],send:1,v:201602021453,wait:1,tid:3117}};
utag.loader.cfgsort=["171","4","6","8","9","10","46","24","25","31","13","14","22","23","44","49","57","51","53","52","54","55","56","73","74","75","87","88","89","90","93","98","99","100","105","107","108","109","111","112","113","114","116","125","126","127","128","129","130","131","132","133","134","136","137","139","140","141","142","143","144","145","151","158","162","164","170","172","173","174","175","180","181","182","183","184","185"];
  }
utag.loader.initcfg();
}

  if(typeof utag_cfg_ovrd!='undefined'){for(var i in utag.loader.GV(utag_cfg_ovrd))utag.cfg[i]=utag_cfg_ovrd[i];};
  utag.loader.SETFORCE = function(a) {
    utag.DB('SETFORCE:' + a);
    if (utag.loader.ft > 0) clearTimeout(utag.loader.ft);
    utag.loader.ft = (utag.cfg.forcetimeout != 0) ? setTimeout(utag.loader.FORCE, utag.cfg.forcetimeout) : 0
  }
  utag.loader.FORCE = function(a, b, c, d) {
    a = utag.sender;
    b = utag.loader.f;
    utag.DB('FORCE');
    for (c in utag.loader.GV(b)) {
      d = a[c].id;
      if (typeof b[c] != 'undefined' && b[c] == 0) {
        utag.DB('FORCEERROR:' + d);
        utag.rpt['f_' + d] = 1;
	if(typeof utag_err!="undefined"){utag_err.push({e:'load error',s:utag.cfg.path+'utag.'+d+'.js',l:0,t:'le'})};
        delete utag.sender[d];
        delete utag.send[d];
        utag.loader.LOAD(d)
      }
    }
  }
  utag.loader.INIT = function(a, b, c, d) {
    if (this.ol == 1) return -1;
    else this.ol = 1;
    utag.rpt.ts['i'] = new Date();
    if (!utag.cfg.noload) {
      try {
        this.GET()
      } catch (e) {};
      var lq = [];
      for (a in this.GV(this.cfg)) {
        b = this.cfg[a];
        b.id = a;
        if (b.wait == 1) {
          this.wq.push(b)
        } else if (b.load > 0) {
          if (b.send) {
            c = false;
            utag.send[b.id] = b;
          }
	  if(b.load!=4){
	    lq.push(b);
            this.f[b.id] = 0;
	  }
        }
      }
      for (a = 0; a < lq.length; a++) {
        utag.DB('utag.loader.INIT: loading ' + b.id);
        utag.loader.AS(lq[a])
      }
      if (utag.loader.wq.length > 0) utag.loader.EV('', 'ready', function(a) {
	if(utag.loader.rf==0){
	  utag.loader.rf=1;
	  utag.loader.WQ();
	  utag.loader.SETFORCE('WAIT')
	}
      });
      else if(lq.length==0)utag.handler.INIT();
      else utag.loader.SETFORCE('INIT')
    }
    return 1
  };
  utag.loader.EV('', 'ready', function(a) {if(utag.loader.efr!=1){utag.loader.efr=1;try{if(typeof utag.runonce=='undefined')utag.runonce={};utag.jdh=function(h,i,j,k){h=utag.jdhc.length;if(h==0)window.clearInterval(utag.jdhi);else{for(i=0;i<h;i++){j=utag.jdhc[i];k=jQuery(j.i).is(":visible")?1:0;if(k!=j.s){if(j.e==(j.s=k))jQuery(j.i).trigger(j.e?"afterShow":"afterHide")}}}};utag.jdhi=window.setInterval(utag.jdh, 250);utag.jdhc=[];
if(typeof utag.runonce[88]=='undefined'){utag.runonce[88]=1;jQuery(document.body).on('mousedown','a[href*=".xls"],a[href*=".doc"],a[href*=".pdf"],a[href*=".txt"],a[href*=".csv"],a[href*=".zip"],a[href*=".ppt"],a[href*=".swf"],a[href*=".pps"]', function(e){utag.link({ page_site:utag.data['page_site'],page_language:utag.data['page_language'],wt_dl:'20',event_domain:this.hostname,event_uri:this.pathname,event_query:this.search,page_title:'Download:'+this.text,event_referrer_url:utag.data['dom.url'] })});}

}catch(e){utag.DB(e)};
try{
if(typeof utag.runonce[119]=='undefined'){utag.runonce[119]=1;jQuery(document.body).on('mousedown','a[track-event]', function(e){var data = {};
data['page_site'] = utag.data['page_site'];
data['page_language'] = utag.data['page_language'];
data['ref_page_type'] = utag.data['page_type'];
data['ref_page_sub_type'] = utag.data['page_sub_type'];
data['ref_page_id'] = utag.data['page_id'];
data['event_domain'] = this.hostname;
data['event_uri'] = this.pathname; 
data['event_query'] = this.search;
data['event_referrer_url'] = null;
data['wt_dl'] = "2";
data['event_track_version'] = "1.1";
var kvs = $(this).attr("track-data").split(';');
for (var i = 0; i < kvs.length; i++) {
  var pair = kvs[i].split('=');
  data[pair[0]] = pair[1];
}
utag.view(data);});}

}catch(e){utag.DB(e)};
try{
if(typeof utag.runonce[125]=='undefined'){utag.runonce[125]=1;jQuery(document.body).on('click',':submit[track-data],:button[track-data],:image[track-data]', function(e){var data = {};
data['page_site'] = utag.data['page_site'];
data['page_language'] = utag.data['page_language'];
data['ref_page_type'] = utag.data['page_type'];
data['ref_page_sub_type'] = utag.data['page_sub_type'];
data['ref_page_id'] = utag.data['page_id'];
data['event_domain'] = this.hostname;
data['event_uri'] = this.pathname; 
data['event_query'] = this.search;
data['event_referrer_url'] = null;
data['wt_dl'] = "2";
data['event_track_version'] = "1.1";
var kvs = $(this).attr("track-data").split(';');
for (var i = 0; i < kvs.length; i++) {
  var pair = kvs[i].split('=');
  data[pair[0]] = pair[1];
}
utag.view(data);})}

}catch(e){utag.DB(e)};
try{
if(typeof utag.runonce[126]=='undefined'){utag.runonce[126]=1;jQuery(document.body).on('click','a[track-data]:not([track-event])', function(e){var data = {};
data['page_site'] = utag.data['page_site'];
data['page_language'] = utag.data['page_language'];
data['ref_page_type'] = utag.data['page_type'];
data['ref_page_sub_type'] = utag.data['page_sub_type'];
data['ref_page_id'] = utag.data['page_id'];
data['event_domain'] = this.hostname;
data['event_uri'] = this.pathname; 
data['event_query'] = this.search;
data['event_referrer_url'] = null;
data['wt_dl'] = "2";
data['event_track_version'] = "1.1";
var kvs = $(this).attr("track-data").split(';');
for (var i = 0; i < kvs.length; i++) {
  var pair = kvs[i].split('=');
  data[pair[0]] = pair[1];
}
utag.view(data);})}

}catch(e){utag.DB(e)};
try{
if(typeof utag.runonce[127]=='undefined'){utag.runonce[127]=1;jQuery(document.body).on('click','img[track-data]', function(e){var data = {};
data['page_site'] = utag.data['page_site'];
data['page_language'] = utag.data['page_language'];
data['ref_page_type'] = utag.data['page_type'];
data['ref_page_sub_type'] = utag.data['page_sub_type'];
data['ref_page_id'] = utag.data['page_id'];
data['event_domain'] = this.hostname;
data['event_uri'] = this.pathname; 
data['event_query'] = this.search;
data['event_referrer_url'] = null;
data['wt_dl'] = "2";
data['event_track_version'] = "1.1";
var kvs = $(this).attr("track-data").split(';');
for (var i = 0; i < kvs.length; i++) {
  var pair = kvs[i].split('=');
  data[pair[0]] = pair[1];
}
utag.view(data);})}

}catch(e){utag.DB(e)};}})

  utag.cfg.readywait ? utag.loader.EV('', 'ready', function(a) {
    if(utag.loader.rf==0){
      utag.loader.rf=1;
      utag.DB('READY');
      utag.loader.INIT()
    }
  }) : utag.loader.INIT();
}
