//~~tv:20067.20141231
//~~tc: Update to fix mapping logic

//tealium universal tag - utag.sender.20067 ut4.0.201511171600, Copyright 2015 Tealium.com Inc. All Rights Reserved.
try{
(function(id,loader,u){
  try{u=utag.o[loader].sender[id]={}}catch(e){u=utag.sender[id]};
  u.ev={'view':1};
  u.qsp_delim="&";
  u.kvp_delim="=";
  u.qs_delim="?";
  u.tag_type="script";
  u.base_url="//www.digikey.com/munchkin_known_leads.js";
  u.static_params="";

  u.map={"mk_base_url":"base_url"};
  u.extend=[function(a,b){ try{ if(b['dom.domain'].toString().toLowerCase().indexOf('digikeytest.digikey'.toLowerCase())>-1||b['dom.domain'].toString().toLowerCase().indexOf('digikeydev.digikey'.toLowerCase())>-1){b['mk_base_url']='//digikeytest.digikey.com/munchkin_known_leads.js';b['mk_account_id']='508-ZUD-632'} } catch(e){ utag.DB(e) }  }];

  u.send=function(a,b){
    if(u.ev[a]||typeof u.ev.all!="undefined"){
      for(c=0;c<u.extend.length;c++){try{d=u.extend[c](a,b);if(d==false)return}catch(e){}};
      var c,d,e,f;
      c=[];
      for(d in utag.loader.GV(u.map)){if(typeof b[d]!=="undefined"&&b[d]!==""){e=u.map[d].split(",");for(f=0;f<e.length;f++){
        if(e[f]=="qsp_delim" || e[f]=="kvp_delim" || e[f]=="qs_delim" || e[f]=="base_url" || e[f]=="secure_base_url"){
          u[e[f]]=b[d];
        }else{
          // requires "kvp_delim" mapped first (if mapped)
          c.push(e[f]+u.kvp_delim+encodeURIComponent(b[d]));
        }
      }}}

      u.secure_base_url=u.secure_base_url || "" || u.base_url;
      u.url=(location.protocol=="https:"?u.secure_base_url:u.base_url);

      if(u.url.indexOf("http")!=0 && u.url.indexOf("/")!=0 ){
        u.url="//"+u.url;
      }

      if(u.url.indexOf(u.qs_delim)<0 && (c.length>0 || u.static_params.length>0)){
        u.url+=u.qs_delim
      }

      if(u.static_params){
	if(c.length>0){
	  u.url+=u.static_params+u.qsp_delim;
	  }else{
	    u.url+=u.static_params;
	  }
      }

      //FUTURE
      //utag.ut.loader({type: u.tag_type, src: u.url+c.join(u.qsp_delim)});

      if(u.tag_type=="img"){
        u.img=new Image();u.img.src=u.url+c.join(u.qsp_delim);
      }else if(u.tag_type=="script"){
        u.s=document.getElementsByTagName("script")[0];u.scr=document.createElement("script");u.scr.type="text/javascript";u.scr.src=u.url+c.join(u.qsp_delim);
        u.s.parentNode.insertBefore(u.scr,u.s);
      }else{
        d=document.createElement("iframe");d.setAttribute('id','158');d.setAttribute('height','1');d.setAttribute('width','1');d.setAttribute('style','display:none');d.setAttribute('src',u.url+c.join(u.qsp_delim));document.body.appendChild(d);
      }
    }
  }
  try{utag.o[loader].loader.LOAD(id)}catch(e){utag.loader.LOAD(id)}
})('158','digikey.main');
}catch(e){}
//end tealium universal tag
//~~tv:20067.20130906
