//~~tv:13002.20141004
//~~tc: Updated to latest implementation guide.
//~~tc: Removed E-Commerce extension requirement.

var _mTrack = _mTrack || [];

//tealium universal tag - utag.sender.13002 ut4.0.201505221827, Copyright 2015 Tealium.com Inc. All Rights Reserved.
try {
  (function (id, loader) {
    var u = {};
    utag.o[loader].sender[id] = u;

    // Start Tealium loader 4.32
    // Please do not modify
    if (utag === undefined) { utag = {}; } if (utag.ut === undefined) { utag.ut = {}; } if (utag.ut.loader === undefined) { u.loader = function (o) { var a, b, c, l; a = document; if (o.type === "iframe") { b = a.createElement("iframe"); b.setAttribute("height", "1"); b.setAttribute("width", "1"); b.setAttribute("style", "display:none"); b.setAttribute("src", o.src); } else if (o.type === "img") { utag.DB("Attach img: " + o.src); b = new Image(); b.src = o.src; return; } else { b = a.createElement("script"); b.language = "javascript"; b.type = "text/javascript"; b.async = 1; b.charset = "utf-8"; b.src = o.src; } if (o.id) { b.id = o.id; } if (typeof o.cb === "function") { if (b.addEventListener) { b.addEventListener("load", function () { o.cb(); }, false); } else { b.onreadystatechange = function () { if (this.readyState === "complete" || this.readyState === "loaded") { this.onreadystatechange = null; o.cb(); } }; } } l = o.loc || "head"; c = a.getElementsByTagName(l)[0]; if (c) { utag.DB("Attach to " + l + ": " + o.src); if (l === "script") { c.parentNode.insertBefore(b, c); } else { c.appendChild(b); } } }; } else { u.loader = utag.ut.loader; }
    // End Tealium loader

    u.ev = {"view" : 1};

    u.initialized = false;

      u.map={"marin_client_id":"clientid","order_salesorder_number":"orderId","order_subtotal":"price","marin_conv_type":"order_type"};
  u.extend=[function(a,b,c,d,e,f,g){d=b['dom.domain'];if(typeof d=='undefined')return;c=[{'digikey.cn$':'6fzke3kdm0'},{'digikey.co.il$':'27490y1d44455'},{'digikey.fi$':'274908ii44454'},{'digikey.co.nz$':'274903bu44451'},{'digikey.at$':'27490w9b44845'},{'digikey.be$':'27490f5a44846'},{'digikey.ca$':'27490aiz44848'},{'digikey.dk$':'27490p8d44849'},{'digikey.fr$':'27490bvp44850'},{'digikey.de$':'27490ol144851'},{'digikey.hk$':'27490k4944852'},{'digikey.in$':'2749046d44853'},{'digikey.ie$':'27490ne544854'},{'digikey.it$':'27490mu044855'},{'digikey.jp$':'27490x9444856'},{'digikey.com.mx$':'27490ngz44858'},{'digikey.nl$':'274903oa44859'},{'digikey.no$':'274903ud44860'},{'digikey.pt$':'27490rx444861'},{'digikey.sg$':'27490i3244862'},{'digikey.kr$':'27490lb344857'},{'digikey.es$':'27490hhi44864'},{'digikey.se$':'27490l5s44865'},{'digikey.ch$':'27490qmj44866'},{'digikey.tw$':'2749098744867'},{'digikey.co.uk$':'27490ndg44869'},{'digikey.com$':'27490huz44870'},{'digikey.com.au$':'27490v4c44844'},{'digikey.co.za$':'27490ns144863'},{'digikey.com.tr$':'27490d6344868'},{'br.digikey.com$':'27490ey344847'}];var m=false;for(e=0;e<c.length;e++){for(f in c[e]){g=new RegExp(f,'i');if(g.test(d)){b['marin_client_id']=c[e][f];m=true};};if(m)break};if(!m)b['marin_client_id']='27490u6b44871';},
function(a,b){ try{ if((typeof b['product_sku']!='undefined'&&typeof b['order_salesorder_number']!='undefined')){b['marin_conv_type']='websales'} } catch(e){ utag.DB(e) }  },
function(a,b){ try{ if(b['dom.domain'].toString().indexOf('digikey.kr')>-1){b['_ccurrency']='KRW'} } catch(e){ utag.DB(e) }  }];


    u.send = function (a, b) {
      if (u.ev[a] || u.ev.all !== undefined) {
        //##UTENABLEDEBUG##utag.DB("send:##UTID##");

        var c, d, e, f, g;

        u.data = {
          "clientid" : "",
          "base_url" : "//tracker.marinsm.com/tracker/async/",
          // E-Commerce Vars
          "order_id" : "",
          "order_currency" : "",
          "order_type" : "",
          "product_id" : [],
          "product_category" : [],
          "product_quantity" : [],
          "product_unit_price" : [],
          // Legacy E-Commerce Vars
          "orderid" : "",
          "currency" : "",
          "convType" : "",
          "product" : "",
          "category" : "",
          "quantity" : "",
          "price" : ""
        };

        // Start tag-scoped extensions
        for(c=0;c<u.extend.length;c++){try{d=u.extend[c](a,b);if(d==false)return}catch(e){}};
        // End tag-scoped extensions

        // Start Mapping
        for (d in utag.loader.GV(u.map)) {
          if (b[d] !== undefined && b[d] !== "") {
            e = u.map[d].split(",");
            for (f = 0; f < e.length; f++) {
              u.data[e[f]] = b[d];
            }
          }
        }
        // End Mapping

        // Pull E-Commerce extension values
        // Mappings override E-Commerce extension values
        u.data.order_id = u.data.orderId || u.data.order_id || b._corder;
        u.data.order_currency = u.data.currency || u.data.order_currency || b._ccurrency;
        u.data.order_type = u.data.convType || u.data.order_type || b._ctype;
        if (u.data.product_id.length === 0 && b._cprod !== undefined) { u.data.product_id = b._cprod.slice(0); }
        if (u.data.product_category.length === 0 && b._ccat !== undefined) { u.data.product_category = b._ccat.slice(0); }
        if (u.data.product_quantity.length === 0 && b._cquan !== undefined) { u.data.product_quantity = b._cquan.slice(0); }
        if (u.data.product_unit_price.length === 0 && b._cprice !== undefined) { u.data.product_unit_price = b._cprice.slice(0); }

        u.data.product_id = u.data.product.slice(0) || u.data.product_id;
        u.data.product_category = u.data.category.slice(0) || u.data.product_category;
        u.data.product_quantity = u.data.quantity.slice(0) || u.data.product_quantity;
        u.data.product_unit_price = u.data.price.slice(0) || u.data.product_unit_price;

        if (u.data.order_type || u.data.order_id ){
          if (u.data.order_type instanceof Array && u.data.order_type.length !== u.data.product_id.length) {
            utag.DB("Error:151: convType array length does not match product_id length");
          }

          u.data.items = [];

          if (u.data.product_id) {
            for (f = 0; f < u.data.product_id.length; f++) {
              u.data.items.push({
                orderId : ((u.data.order_id instanceof Array) ? u.data.order_id[f] : u.data.order_id),
                convType : ((u.data.order_type instanceof Array) ? u.data.order_type[f] : u.data.order_type),
                product : u.data.product_id[f],
                price : u.data.product_unit_price[f],
                category : ((u.data.product_category instanceof Array) ? u.data.product_category[f] : u.data.product_category),
                quantity : u.data.product_quantity[f]
              })
            }
          }

          if (u.data.items.length === 0) {
            u.data.items.push({
              orderId: u.data.order_id,
              convType: u.data.order_type,
              product : "",
              price : "",
              category : ((u.data.product_category instanceof Array) ? u.data.product_category[f] : u.data.product_category),
              quantity : ""
            });
          }

          _mTrack.push(['addTrans', {
            currency : u.data.order_currency,
            items : [{
        orderId : utag_data['order_salesorder_number'],
        convType : 'websales',
        price : utag_data['order_subtotal']
    }]
          }]);
          _mTrack.push(['processOrders']);
        } else {
          _mTrack.push(['trackPage']);
        } 

        // Start Loader Callback
        u.loader_cb = function () {
          u.initialized = true;
        };
        // End Loader Callback

        if (!u.initialized) {
          u.loader({ "type" : "script", "src" : u.data.base_url + u.data.clientid + ".js", "cb" : u.loader_cb, "loc" : "script", "id" : "utag_151" });
        }

        //##UTENABLEDEBUG##utag.DB("send:##UTID##:COMPLETE");
      }
    };
    utag.o[loader].loader.LOAD(id);
  }("151", "digikey.main"));
} catch (error) {
  utag.DB(error);
}
//end tealium universal tag