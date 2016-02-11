//~~tv:23001.external.20150413
//~~tc: Adding External Version

//tealium universal tag - utag.sender.23001.external ut4.0.201601282343, Copyright 2016 Tealium.com Inc. All Rights Reserved.
try {
  (function (id, loader) {
    var u = {};
    utag.o[loader].sender[id] = u;

    // Please do not modify
    if (utag.ut === undefined) { utag.ut = {}; }
    // Start Tealium loader 4.35
    if (utag.ut.loader === undefined) { u.loader = function (o) { var b, c, l, a = document; if (o.type === "iframe") { b = a.createElement("iframe"); o.attrs = o.attrs || { "height" : "1", "width" : "1", "style" : "display:none" }; for( l in utag.loader.GV(o.attrs) ){ b.setAttribute( l, o.attrs[l] ); } b.setAttribute("src", o.src); }else if (o.type=="img"){ utag.DB("Attach img: "+o.src); b=new Image();b.src=o.src; return; }else{ b = a.createElement("script");b.language="javascript";b.type="text/javascript";b.async=1;b.charset="utf-8"; for( l in utag.loader.GV(o.attrs) ){ b[l] = o.attrs[l]; } b.src = o.src; } if(o.id){b.id=o.id}; if (typeof o.cb=="function") { if(b.addEventListener) { b.addEventListener("load",function(){o.cb()},false); }else { /* old IE support */ b.onreadystatechange=function(){if(this.readyState=='complete'||this.readyState=='loaded'){this.onreadystatechange=null;o.cb()}}; } } l = o.loc || "head"; c = a.getElementsByTagName(l)[0]; if (c) { utag.DB("Attach to "+l+": "+o.src); if (l == "script") { c.parentNode.insertBefore(b, c); } else { c.appendChild(b) } } } } else { u.loader = utag.ut.loader; }
    // End Tealium loader

    u.ev = {"view" : 1, "link" : 1};
    u.initialized = false;
    u.scriptrequested = false;
    u.queue = [];
    u.plugin_fn = function(pluginOb, data, plugin_name) {
      var dataObj;
      plugin_name = plugin_name || pluginOb;
      if (u.data['plugins_'+pluginOb] === "true") {
        u.data.plugins[plugin_name] = u.data.plugins[plugin_name] || {};
        dataObj = u.data.plugins[plugin_name];
        if (typeof(data) === "string") {
          dataObj.src = dataObj.src || data;
        } else {
          for (var i in utag.loader.GV(data)) {
            dataObj[i] = dataObj[i] || data[i];
          }
        }
      } else {
        try { delete u.data.plugins[plugin_name]; } catch(e){u.data.plugins[plugin_name] = undefined;}
      }
    };

      u.map={"page_title":"WT.ti","page_id":"WT.z_page_id","page_type":"WT.z_page_type","page_sub_type":"WT.z_page_sub_type","page_content_group":"WT.cg_n","page_content_sub_group":"WT.cg_s","page_site":"WT.site,WT.z_site_id","page_language":"WT.z_lang","content_search_autocorrect":"WT.z_oss_s","content_search_results_count":"WT.z_oss_r","content_search_pre_filters":"WT.z_pre_filter","page_content_guid":"WT.z_page_content","page_content_guid_template":"WT.z_page_content_type","techzone_name":"WT.z_TechZone_Name","content_search_keywords":"WT.z_oss","content_search_filters":"WT.z_filter","wt_onsitedoms":"onsitedoms","ref_page_type":"WT.z_ref_page_type","ref_page_sub_type":"WT.z_ref_page_sub_type","ref_page_id":"WT.z_ref_page_id","ref_page_event":"WT.z_ref_page_event","wt_dl":"WT.dl","event_domain":"DCS.dcssip","event_uri":"DCS.dcsuri","event_query":"DCS.dcsqry","event_referrer_url":"DCS.dcsref","chip":"WT.z_chip","chip_category":"WT.z_chip_cat","chip_link":"WT.z_chip_link","wt_dcsid":"dcsid","wt_downloadtypes":"downloadtypes","homepage_link":"WT.z_homepage_link","prod_highlight_type":"WT.z_ph_type","ref_content_search_keywords":"WT.z_ref_oss_s","content_doc_id":"WT.z_doc_id","ref_content_search_filters":"WT.z_ref_filter","ref_content_search_pre_filters":"WT.z_ref_pre_filter","supplier_id":"WT.z_supplier_id","header_flag":"WT.z_header","merch_id":"WT.z_merch_id","merch_campaign":"WT.z_merch_campaign","merch_placement":"WT.z_merch_placement","merch_target":"WT.z_merch_target","merch_type":"WT.z_merch_type","merch_plyrstate":"WT.z_merch_PlyrState","ref_customer":"WT.z_ref_customer","customer_id":"WT.z_customer_id","order_status":"WT.z_ord_status","order_id":"WT.tx_i","invoice_id":"WT.z_invoice_id","asset_type":"WT.z_Asset_Type","num_records":"WT.z_num_records","image_name":"WT.z_image_name","event_track_version":"WT.z_event_version","registered_user_id":"WT.dcsvid","page_alias":"WT.z_slp","video_source":"WT.z_sm_source,WT.z_video_source","ph_id":"WT.z_ph_id","doi_tab":"WT.z_DOI_Tab","tab_category":"WT.z_Tab_Cat","pn_sku":"WT.z_pn_sku","part_id":"WT.z_part_id","design_house":"WT.z_design_house","ref_webid":"WT.z_ref_webid","ref_techzone":"WT.z_ref_techzone","resource":"WT.z_resource","sales_order_id":"WT.z_sales_order","ref_supplier_id":"WT.z_ref_supplier_id","scenario_name":"WT.si_n","scenario_step":"WT.si_x","adtl_info":"WT.z_adtl_info","cp.fullsite":"WT.z_fullsite","ref_pn_sku":"WT.z_ref_pn_sku","ref_part_id":"WT.z_ref_part_id","ptm_id":"WT.z_ptm_id","rdl_cat_id":"WT.z_rdl_cat_id","rdl_sub_cat_id":"WT.z_rdl_sub_cat_id","video_title":"WT.z_video_title","scenario_step_label":"WT.si_p","transaction_type":"WT.tx_e","transaction_quantity":"WT.tx_u","pre_order_id":"WT.z_webID","product_number":"WT.z_part_list","product_quantity":"WT.z_part_qtys","product_extended_prices":"WT.z_part_values","opt_in_state":"WT.z_opt_in","transaction_date":"WT.tx_id","transaction_time":"WT.tx_it","product_unit_prices":"WT.tx_s","skumax":"WT.z_skumax","order_currency":"WT.z_original_currency","extended_price_savings":"WT.z_extended_price_savings","dialog_type":"WT.z_dialog_type","num_choices":"WT.z_num_choices","org_prod_id":"WT.z_org_prod_id","sel_prod_id":"WT.sel_prod_id","org_quant":"WT.z_org_quant","sel_quant":"WT.z_sel_quant","accepted_extended_price_savings":"WT.z_accepted_extended_price_savings","disable_recommendations":"WT.z_disable_recommendations","part_search_filter":"WT.z_oss_filter","part_search_term":"WT.oss","part_search_results_count":"WT.oss_r","show_top_results":"WT.z_top_results"};
  u.extend=[function(a,b){ try{ if((typeof b['meta.wt.site']!='undefined'&&b['wt_use_udo'].toString().toLowerCase()=='false'.toLowerCase())){b['page_site']=b['meta.wt.site']} } catch(e){ utag.DB(e) }  },
function(a,b){ try{ if(b['page_site'].toString().toLowerCase()=='GB'.toLowerCase()){b['page_site']='UK'} } catch(e){ utag.DB(e) }  },
function(a,b){ try{ if(b['cp.cur'].toString().toLowerCase()=='CNY'.toLowerCase()){b['page_site']='ZZ'} } catch(e){ utag.DB(e) }  },
function(a,b,c,d,e,f,g){d=b['page_site'];if(typeof d=='undefined')return;c=[{'AR':'dcsjophyzuz5bdjgxvj7hze6h_5e1c'},{'AM':'dcsho7xv0wz5bdk4yturn63mi_6r3h'},{'AU':'dcsom6vb300000cpf6npz36l2_4e1g'},{'AT':'dcs8gkp5c00000oun5ow6czma_8m1o'},{'BY':'dcs7pkst9vz5bd8zh4sblttli_8x8i'},{'BE':'dcsx2m3h300000sxobtw7ezma_4o3x'},{'BO':'dcs9ktow1wz5bd8rfdvn225mi_4q8s'},{'BA':'dcs9pyyv2vz5bdwh0mgkmm5mi_4k7q'},{'BR':'dcs879mcw00000cdudt2eb6l2_7z1i'},{'BG':'dcsh39215wz5bdgtyn8p15uli_7c3f'},{'CA':'dcsnbq05o000008yjgjd33zma_4k6q'},{'CL':'dcsmcsd8wvz5bdsevcyo0isli_8s7b'},{'CN':'dcsux55t8000000gwr3chmypr_5l6m'},{'CO':'dcsypi4dpuz5bdrexcmsg8f6h_4m1r'},{'CR':'dcsuhqscguz5bd8f6qhqve3mi_1l3t'},{'HR':'dcsrir9wzvz5bdory8unzhvli_1h6d'},{'CY':'dcs8n6ewevz5bdw5vp20kq3mi_7e9t'},{'CZ':'dcsmnvam9vz5bdfxfmgwzte6h_1o8s'},{'DK':'dcsa0opzc10000s96dn6pfzma_5e2y'},{'DO':'dcs8eqotvuz5bd4ct6u9jz2mi_7s6t'},{'EC':'dcsileiqtvz5bdo7jz0c784mi_5s5e'},{'EG':'dcsahm5g8vz5bdkcgxb0jauli_1g4p'},{'EE':'dcsv4ufaiuz5bd09kmgjmjuli_4i5f'},{'FI':'dcs36b2wb100000krmjeahzma_5n3l'},{'FR':'dcsl0rqni00000k3owuc77zma_8z2g'},{'DE':'dcsn85fae00000gk2wrolazma_7f4p'},{'GR':'dcsk6ei2c00000gox6wcglzma_1h8k'},{'GT':'dcskabioluz5bd8vqsh5dh5mi_1v6p'},{'HK':'dcs8cesyf000008apcxx5z0na_1o5s'},{'HU':'dcsbnwu49wz5bds2ak42fpsli_4m4d'},{'IS':'dcs7az6xiuz5bdob6k3jws2mi_9d3s'},{'IN':'dcs732ogx00000wwmw4o6a6l2_7j7o'},{'ID':'dcsseomswuz5bd8z5zbm6ovli_9c8u'},{'IE':'dcs5el0uc100008i784tpuzma_4c1w'},{'IL':'dcsig05qc10000ggffg9z86l2_5t7o'},{'IT':'dcs27de4r00000s9yunggxzma_2t5z'},{'JM':'dcssx7u0iuz5bdw1s41dd56mi_3v8g'},{'JP':'dcs0592e410000o69yhjs4zma_9e7l'},{'LV':'dcs1wpf0uuz5bdc62c2x3xuli_4t7b'},{'LB':'dcsog1bjvvz5bdsebpanyt4mi_1p3y'},{'LT':'dcssv9xi2wz5bd87g4h0ltsli_9o8j'},{'LU':'dcsb5d5vq1000008i788020na_6o8g'},{'MK':'dcshok0ccvz5bdcyfpn21a6mi_4w4t'},{'MY':'dcslp8ixyvz5bdgdehha7y0mi_6m1b'},{'MX':'dcsd9vg8ouz5bd0h6x1nfupli_8o7w'},{'MD':'dcs6mxa7vuz5bdo7blkzwt5mi_8x6p'},{'MA':'dcszt3gp6vz5bdwlfoj13p4mi_6e7n'},{'NL':'dcsgo2h9u00000wwafvfsd0na_1x9c'},{'NZ':'dcs5xbwqf10000spyxmbf01na_7b9j'},{'NO':'dcsx0r68x10000oq4cl2mi0na_5m1g'},{'PK':'dcs1208wivz5bdsa4xcr82tli_1e4l'},{'PA':'dcs71wkwnuz5bdgtew1a1d5mi_1s3l'},{'PE':'dcsf3iapiuz5bds2y2vlq71mi_5n7g'},{'PH':'dcsiuokirvz5bdovhyd4m7tli_6z2m'},{'PL':'dcsh1lv2fvz5bdw1k65rp7sli_9q4x'},{'PT':'dcsmzd412000000w8sw1qm0na_5d6g'},{'PR':'dcsiumafguz5bd8bvixzh75mi_9l2s'},{'RO':'dcsdyxml2wz5bd8fy7i0nw3mi_7y8f'},{'RU':'dcsxw7ey110000krigto266l2_7g5i'},{'SA':'dcsyzl90xvz5bdgtqxylhe2mi_3j7t'},{'RS':'dcse5tmw9wz5bdwd92kva3vli_5y3j'},{'SG':'dcsqzdui9000004f66i6nw0na_4e6c'},{'SK':'dcs8j59ituz5bd0d730dd0sli_1w3z'},{'SI':'dcsdcq9mnvz5bdw5rq0wir1mi_7v7j'},{'ZA':'dcshh98n6vz5bdf5azolt6f6h_7i9m'},{'KR':'dcscm7x4k100000s5zsnmt0na_4n2k'},{'ES':'dcszox74k10000ctu8isbr0na_8i8d'},{'LK':'dcs73vsoluz5bdo3cbe71k3mi_5v6c'},{'SE':'dcsxhpley00000oyyotrfv0na_9v5l'},{'CH':'dcsi1u5z8wz5bdcugbio5dvi0_6e2k'},{'TW':'dcsrjlw2h00000oufr7kwx0na_5x4u'},{'TH':'dcselwn0dvz5bd0127msa4qli_2g3i'},{'TN':'dcs72aruruz5bdc23e9noy5mi_4r4h'},{'TR':'dcs8vy0bhvz5bdftctciw0f6h_6m7l'},{'UA':'dcsbeg97uvz5bdo3s3ji0dqli_8f9b'},{'AE':'dcs8plcc9wz5bdwdtl8blm1mi_3e7l'},{'UK':'dcseuctk400000g8luxe49zma_7s8m'},{'US':'dcsmnfcct10000wkx0i5hzyma_5n9f'},{'UY':'dcsc8a48duz5bdov5pe19ytli_6r7k'},{'VE':'dcsoqt4oevz5bd8r30lt5puli_4z6d'},{'VN':'dcsmdfy4dvz5bdg5cm9v431mi_7o1g'},{'ZZ':'dcs4hm46e00000cpfykyquqs2_1x9e'}];var m=false;for(e=0;e<c.length;e++){for(f in c[e]){if(d==f){b['wt_dcsid']=c[e][f];m=true};};if(m)break};if(!m)b['wt_dcsid']='';},
function(a,b){
if(location.hostname.match(/^dp[\d-]+/) != null) {
  u.test_domains += location.hostname + ",";
}
if(u.test_domains.indexOf(','+location.hostname+',')>-1){
  b['wt_dcsid'] = null;
} 
},
function(a,b){ try{ if(b['event_query'].toString().toLowerCase()==''.toLowerCase()){try{b['event_query']=null}catch(e){}} } catch(e){ utag.DB(e) }  },
function(a,b){ try{ if(1){b['wt_onsitedoms']='www.digikey.co.il,digikey.co.il,digi-key.co.il,digikey.org.il,digi-key.org.il,digikeystage.digikey.co.il,digikeytest.digikey.co.il,digikeydev.digikey.co.il,il.digikey.com,designs.digikey.com,blm-was-cmrc.digikey.lu,digikeydev.digikey.lu,test.digikey.lu,digikeytest.digikey.lu,digikey.lu,ar.digikey.com,digikey.mx,digikey.com.mx,eg.digikey.com,hr.digikey.com,orderingdev.digikey.com,parts.digikey.be,parts.digikey.ch,parts.digikey.co.nz,parts.digikey.com.cn,parts.digikey.dk,parts.digikey.hk,parts.digikey.kr,parts.digikey.no,parts.digikey.se,parts.digikey.sg,parts.digikey.tw,tn.digikey.com,www.digikey.be,www.digikey.mx,www.digikey.com.mx,designstest.digikey.com,www.digikey.com,digikey.com,digi-key.dirxion.com,media.digikey.com,pdfcatalog.digikey.com,rocky.digikey.com,suppliers.digikey.com,dkc1.digikey.com,ordering.digikey.com,sales.digikey.com,search.digikey.com,dkc3.digikey.com,javascript,at.digikey.com,au.digikey.com,be.digikey.com,ca.digikey.com,cn.digikey.com,de.digikey.com,dk.digikey.com,es.digikey.com,fi.digikey.com,fr.digikey.com,gr.digikey.com,hk.digikey.com,ie.digikey.com,in.digikey.com,it.digikey.com,jp.digikey.com,kr.digikey.com,lu.digikey.com,mx.digikey.com,nl.digikey.com,no.digikey.com,nz.digikey.com,pt.digikey.com,se.digikey.com,sg.digikey.com,tw.digikey.com,uk.digikey.com,us.digikey.com,bismuth.digikey.com,boron,digikey.com,dktest.digikey.com,searchdev.digikey.com,searchtest.digikey.com,webdev.digikey.com,webtest.digikey.com,digikey.co.jp,mkt.digikey.com,www.digikey.com.au,www.digikey.at,br.digikey.com,www.digikey.ca,www.digikey.cn,www.digikey.dk,www.digikey.de,www.digikey.fi,www.digikey.fr,www.digikey.gr,www.digikey.hk,www.digikey.in,www.digikey.ie,www.digikey.co.il,www.digikey.it,www.digikey.jp,www.digikey.kr,www.digikey.lu,www.digikey.nl,www.digikey.co.nz,www.digikey.no,www.digikey.pt,www.digikey.ru,www.digikey.sg,www.digikey.es,www.digikey.se,www.digikey.ch,www.digikey.tw,www.digikey.co.uk,www.digikey.com.br,www.digikey.cz,digikey.co.cz,www.digikey.my,www.digikey.com.my,digikey.my,www.digikey.mx,digikey.com.mx,www.digikey.ar,tr.digikey.com,www.digikey.com.tr,www.digikey.co.za,www.digikey.com.co,www.digikey.co.th,www.digikey.com.do,digikey.do,www.digikey.com.gt,www.digikey.com.jm,www.digikey.com.ph,digikey.ph,www.digikey.com.pr,www.digikey.com.ve,digikey.co.ve,www.digikey.com.vn,digikey.vn,digikey.lt,digikey.pe,digikey.pk,digikey.com.pk,digikey.si,digikey.bo,digikey.com.bo,digikey.cl,digikey.co.ee,digikey.com.pa,digikey.com.pl,digikey.lv,digikey.ro,digikey.ae,digikey.co.cr,digikey.co.hu,digikey.hu,digikey.com.ec,digikey.com.lv,digikey.com.pe,digikey.com.sa,digikey.com.uy,digikey.ec,digikey.pr,www.digikey.com.ar,www.digikey.ua,www.digikey.sk,www.digikey.pl,www.digikey.cl,www.digikey.hu,www.digikey.lt,www.digikey.pk,www.digikey.ph,www.digikey.by,www.digikey.com.uy,www.digikey.bg,www.digikey.com.eg,www.digikey.ee,www.digikey.lv,www.digikey.rs,www.digikey.hr,www.digikey.co.id,www.digikey.vn,www.digikey.pe,www.digikey.ae,www.digikey.si,www.digikey.com.sa,www.digikey.is,www.digikey.do,www.digikey.am,www.digikey.cr,www.digikey.lk,www.digikey.com.cy,www.digikey.ro,www.digikey.ec,www.digikey.ma,www.digikey.com.lb,www.digikey.bo,www.digikey.pr,www.digikey.com.pa,www.digikey.ba,www.digikey.md,www.digikey.tn,www.digikey.mk,parts.digikey.com,parts.digikey.co.uk,parts.digikey.de,parts.digikey.es,parts.digikey.at,parts.digikey.ie,parts.digikey.ca,parts.digikey.jp,parts.digikey.it,parts.digikey.fr,orderingtest.digikey.com,digikeytest.digikey.com,tsrtest.digikey.com,scdev.digikey.com,scdev-cd.digikey.com,sctest.digikey.com,sctest-cd.digikey.com,local.digikey.com'} } catch(e){ utag.DB(e) }  },
function(a,b){ try{ if(b['wt_use_udo'].toString().toLowerCase()=='false'.toLowerCase()){b['wt_downloadtypes']='xls,doc,pdf,txt,csv,zip,ppt,swf,pps'} } catch(e){ utag.DB(e) }  },
function(a,b){ try{ if(1){try{b['page_site']=b['page_site'].toUpperCase();}catch(e){}} } catch(e){ utag.DB(e) }  },
function(a,b){ try{ if(b['page_sub_type'].toString().toLowerCase()=='PH'.toLowerCase()){b['ph_id']=b['page_id']} } catch(e){ utag.DB(e) }  },
function(a,b){ try{ if(typeof b['wt_dl']=='undefined'){b['wt_dl']='0'} } catch(e){ utag.DB(e) }  },
function(a,b){ try{ if(b['ref_page_event'].toString().toLowerCase().indexOf('Impression'.toLowerCase())>-1){try{b['event_referrer_url']=null}catch(e){}} } catch(e){ utag.DB(e) }  }];


    u.send = function (a, b) {
      if (u.ev[a] || u.ev.all !== undefined) {
        //##UTENABLEDEBUG##utag.DB("send:##UTID##");

        var c, d, e, f;

        u.data = {
          "base_url" : "//s.webtrends.com/js/webtrends.min.js",
          "dcsid" : "",
          "testdcsid" : "dcsbzhp7700000s1cgbdiw1a6_4h9m",
          "domain" : "statse.webtrendslive.com",
          "timezone" : "-6",
          "fpcdom" : "" ||  ("." + utag.cfg.domain),
          "onsitedoms" : "" || utag.cfg.domain,
          "download" : "false",
          "offsite" : "false",
          "anchor" : "false",
          "javascript" : "false",
          "trimoffsiteparams" : "false",
          "enabled" : "true",
          "downloadtypes" : "",
          "i18n" : "false",
          "fpc" : "WT_FPC",
          "paidsearchparams" : "gclid",
          "splitvalue" : "",
          "preserve" : "true",
          "navigationtag" : "div,table",
          "adimpressions" : "true",
          "adsparam" : 'WT.ac',
          "cookieexpires" : 46656000000, //default of about 18 months
          "plugins" : {},
          "plugins_ads" : "false",
          "plugins_fb" : "false",
          "plugins_yt" : "false",
          "plugins_hm" : "false",
          "plugins_id_migrate" : "true", // custom
          "plugins_replicate" : "false",

          "test_domains" : ",local.digikey.com,blm-was-cmrc.digikey.lu,designstest.digikey.com,digikeybranch.digikey.com,digikeydev.digikey.at,digikeydev.digikey.be,digikeydev.digikey.ca,digikeydev.digikey.ch,digikeydev.digikey.cn,digikeydev.digikey.co.il,digikeydev.digikey.co.nz,digikeydev.digikey.co.uk,digikeydev.digikey.com,digikeydev.digikey.com.,digikeydev.digikey.com.au,digikeydev.digikey.com.cn,digikeydev.digikey.com.mx,digikeydev.digikey.de,digikeydev.digikey.dk,digikeydev.digikey.es,digikeydev.digikey.fi,digikeydev.digikey.fr,digikeydev.digikey.gr,digikeydev.digikey.hk,digikeydev.digikey.ie,digikeydev.digikey.it,digikeydev.digikey.jp,digikeydev.digikey.kr,digikeydev.digikey.lu,digikeydev.digikey.nl,digikeydev.digikey.no,digikeydev.digikey.pt,digikeydev.digikey.se,digikeydev.digikey.sg,digikeydev.digikey.tw,digikeystage.digikey.co.il,digikeystage.digikey.co.uk,digikeystage.digikey.com,digikeystage.digikey.com.mx,digikeystage.digikey.fr,digikeystage.digikey.it,digikeystage.digikey.kr,digikeystage.digikey.no,digikeystage.digikey.se,digikeystage.digikey.tw,digikeytest.digikey.at,digikeytest.digikey.be,digikeytest.digikey.ca,digikeytest.digikey.ch,digikeytest.digikey.cn,digikeytest.digikey.co.il,digikeytest.digikey.co.nz,digikeytest.digikey.co.uk,digikeytest.digikey.com,digikeytest.digikey.com.,digikeytest.digikey.com.au,digikeytest.digikey.com.cn,digikeytest.digikey.com.mx,digikeytest.digikey.de,digikeytest.digikey.dk,digikeytest.digikey.es,digikeytest.digikey.fi,digikeytest.digikey.fr,digikeytest.digikey.gr,digikeytest.digikey.hk,digikeytest.digikey.ie,digikeytest.digikey.it,digikeytest.digikey.jp,digikeytest.digikey.kr,digikeytest.digikey.lu,digikeytest.digikey.nl,digikeytest.digikey.no,digikeytest.digikey.pt,digikeytest.digikey.se,digikeytest.digikey.sg,digikeytest.digikey.tw,digikeytrain.digikey.ca,local.digikey.ca,local.digikey.cn,local.digikey.co.il,local.digikey.com,local.digikey.com.au,local.digikey.com.mx,local.digikey.de,local.digikey.dk,local.digikey.it,local.digikey.kr,local.digikey.se,local.digikey.sg,local.digikey.tw,localhost,localpci.digikey.com,orderingdev.digikey.com,partsim.local,partsim.test,partsim-gui.lio.cdo,partsim-gui.local,punchoutdev.digikey.com,punchoutlocal.digikey.com,punchouttest.digikey.com,sc-cd-preview.digikey.at,sc-cd-preview.digikey.co.il,sc-cd-preview.digikey.com,sc-cd-preview.digikey.fr,sc-cd-preview.digikey.it,sc-cd-preview.digikey.jp,sc-cd-preview.digikey.kr,sc-cd-preview.digikey.tw,sc-cd-test-01.digikey.dmz1,sc-cm-cd-dev-01,sc-cm-cd-stage,sc-cm-test-01,scdev.digikey.com,scdev-cd.digikey.co.il,scdev-cd.digikey.com,scdev-cd.digikey.com.mx,scdev-cd.digikey.de,scprod.digikey.com,scstage.digikey.com,scstage-cd.digikey.com,sctest.digikey.com,sctest-cd.digikey.at,sctest-cd.digikey.ca,sctest-cd.digikey.cn,sctest-cd.digikey.co.il,sctest-cd.digikey.com,sctest-cd.digikey.com.mx,sctest-cd.digikey.de,sctest-cd.digikey.es,sctest-cd.digikey.hk,sctest-cd.digikey.it,sctest-cd.digikey.jp,sctest-cd.digikey.sg,sctest-cd-preview.digikey.at,sctest-cd-preview.digikey.ca,sctest-cd-preview.digikey.ch,sctest-cd-preview.digikey.cn,sctest-cd-preview.digikey.co.il,sctest-cd-preview.digikey.com,sctest-cd-preview.digikey.de,sctest-cd-preview.digikey.fr,sctest-cd-preview.digikey.it,sctest-cd-preview.digikey.jp,sctest-cd-preview.digikey.kr,staging.partsim.com,teamsite-dev02,teamsite-test02,webtest.digikey.com,ws.ereview.digikey.co.il,ws-rdl-test.digikey.com,ws-rdl-test-a.digikey.us,ws-rdl-test-b.digikey.us,www.dev.avagotech-online.com,www.digikeydev.digikey.com,www.digikeydev.digikey.se,www.digikeytest.com,www.digikeytest.digikey.com,"
        };

        // Start tag-scoped extensions
        for(c=0;c<u.extend.length;c++){try{d=u.extend[c](a,b);if(d==false)return}catch(e){}};
        // End tag-scoped extensions

        c = [];

        // Start Mapping
        for (d in utag.loader.GV(u.map)) {
          if (typeof b[d] !== "undefined" && b[d] !== "") {
            e = u.map[d].split(",");
            for (f = 0; f < e.length; f++) {
              if (u.data.hasOwnProperty(e[f]) || e[f].indexOf("plugins.") === 0) {
                if (e[f].indexOf("plugins.") === 0) {
                  g = e[f].split(".");
                  if (g.length === 3) {
                    u.data.plugins[g[1]] = u.data.plugins[g[1]] || {};
                    u.data.plugins[g[1]][g[2]] = b[d];
                  } else if (g.length === 2){
                    u.data.plugins[g[1]] = b[d];
                  }
                } else {
                  u.data[e[f]] = b[d];
                }
              } else {
                if (b[d] instanceof Array) {
                  c[e[f]] = b[d].join(';');
                } else {
                  c[e[f]] = b[d];
                }
              }
            }
          }
        }
        // End Mapping

        // Start Loader Callback
        u.loader_cb = function (a,b,c) {
          if(!u.initialized){
            u.initialized=true;

            if(u.data.test_domains.replace(/\s/g,"").indexOf(","+location.hostname+',')>-1){
              u.data.dcsid = u.data.testdcsid;
            }

            u.plugin_fn("ads", "//s.webtrends.com/js/webtrends.ads.js");
            u.plugin_fn("fb", "//s.webtrends.com/js/webtrends.fb.js", "facebook");
            u.plugin_fn("yt", "//s.webtrends.com/js/webtrends.yt.js");
            u.plugin_fn("hm", "//s.webtrends.com/js/webtrends.hm.js");
            u.plugin_fn("id_migrate", {src: "//s.webtrends.com/js/webtrends.idmigrate.js", waitForCallback: true}); // custom
            u.plugin_fn("replicate", {src : "//s.webtrends.com/js/webtrends.replicate.js", servers : [{domain:"scs.webtrends.com"}], callbackTimeout : 200});
	    
            u.o=new Webtrends.dcs().init({
              paidsearchparams : u.data.paidsearchparams,
              splitvalue : c["WT.sp"] || u.data.splitvalue,
              dcsid: c["dcsid"]  || u.data.dcsid,
              domain: u.data.domain,
              fpc : u.data.fpc,
              fpcdom : u.data.fpcdom,
              timezone: parseInt(u.data.timezone),
              i18n: (u.data.i18n === "true"),
              offsite: (u.data.offsite === "true"),
              onsitedoms : u.data.onsitedoms,
              downloadtypes: u.data.downloadtypes,
              // use mapping to set these to false to stop specific link tracking
              download: (u.data.download === "true"),
              anchor: (u.data.anchor === "true"),
              javascript: (u.data.javascript === "true"),
              navigationtag: u.data.navigationtag,
              adimpressions: (u.data.adimpressions === "true"),
              adsparam: u.data.adsparam,
              trimoffsiteparams : (u.data.trimoffsiteparams === "true"),
              enabled: (u.data.enabled === "true"),
              cookieexpires: parseInt(u.data.cookieexpires),
              preserve: (u.data.preserve === "true"),
              plugins: u.data.plugins
            });
          }
          if(a=="link"){
            if(typeof b["link_text"]!="undefined" && typeof c["WT.ti"]=="undefined"){
              c["WT.ti"]=b["link_text"];
            }
            if(typeof c["WT.dl"]=="undefined" || c["WT.dl"]=="0"){
              c["WT.dl"]="99";
            }
          }

          Webtrends.multiTrack({args : c});
        };
        // End Loader Callback

        u.callBack = function () {
          var data = {};
          while (data = u.queue.shift()) {
            u.data = data.data;
            u.loader_cb(data.a,data.b,data.c);
          }
        };

        if (u.initialized) {
          u.loader_cb(a,b,c);
        } else {
          u.queue.push({"data" : u.data, "a" : a, "b" : b, "c": c});
          if (!u.scriptrequested) {
            u.scriptrequested = true;
            u.loader({"type": "script",  "src": u.data.base_url, "cb": u.callBack, "loc": "script", "id": 'utag_171' });
          }
        }

        //##UTENABLEDEBUG##utag.DB("send:##UTID##:COMPLETE");
      }
    };
    utag.o[loader].loader.LOAD(id);
  }("171", "digikey.main"));
} catch (error) {
  utag.DB(error);
}
//end tealium universal tag
