/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['sap/ui/thirdparty/jquery','../base/ManagedObject','./Element','./DeclarativeSupport','./XMLTemplateProcessor','sap/base/Log','sap/base/util/LoaderExtensions','sap/base/util/merge','sap/ui/core/Component','sap/ui/core/mvc/XMLProcessingMode'],function(q,M,E,D,X,L,a,m,C,b){"use strict";var r={},t={};var F=M.extend("sap.ui.core.Fragment",{metadata:{properties:{type:'string'},specialSettings:{async:{type:'boolean',visibility:'hidden'},fragmentName:'string',fragmentContent:'any',containingView:{type:'sap.ui.core.mvc.View',visibility:'hidden'},oController:{type:'sap.ui.core.mvc.Controller',visibility:'hidden'},sId:{type:'sap.ui.core.ID',visibility:'hidden'},sOwnerId:{type:'sap.ui.core.ID',visibility:'hidden'},processingMode:{type:'sap.ui.core.mvc.XMLProcessingMode',visibility:'hidden'}}},constructor:function(i,s){M.apply(this,arguments);if(!this._bAsync){if(this._aContent&&this._aContent.length==1){return this._aContent[0];}else{return this._aContent;}}}});F.registerType=function(T,o){if(!typeof(T)==="string"){L.error("Ignoring non-string Fragment type: "+T);return;}if(t[T]){L.warning("sap.ui.core.Fragment.registerType(): Fragment type '"+T+"' is already defined. Overriding this type now!");}t[T]=o;};F.prototype._initCompositeSupport=function(s){if(!s){throw new Error("Settings must be set");}if(!(s.fragmentName||s.fragmentContent)){throw new Error("Please provide a fragment name");}if(s.oController){this.oController=s.oController;}this._bAsync=s.async||false;this._sExplicitId=s.sId||s.id;this._sFragmentName=s.fragmentName;this.fnScopedRunWithOwner=s.containingView&&s.containingView.fnScopedRunWithOwner;if(!this.fnScopedRunWithOwner&&this._sOwnerId){var o=C.get(this._sOwnerId);this.fnScopedRunWithOwner=function(d){return o.runAsOwner(d);};}var c=F.getType(s.type);if(c){this._pContentPromise=c.init.apply(this,[s]);if(!this._pContentPromise){this._pContentPromise=Promise.resolve(this._aContent);}}else{throw new Error("No type for the fragment has been specified: "+s.type);}};F.prototype.getFragmentName=function(){return this._sFragmentName;};F.prototype.getController=function(){return this.oController;};F.byId=function(s,i){if(!(typeof(s)==="string"&&typeof(i)==="string")){L.error("sap.ui.core.Fragment.byId: two strings must be given as parameters, but are: "+s+" and "+i);return undefined;}return sap.ui.getCore().byId(s+"--"+i);};F.createId=function(s,i){if(!(typeof(s)==="string"&&typeof(i)==="string")){L.error("sap.ui.core.Fragment.createId: two strings must be given as parameters, but are: "+s+" and "+i);return undefined;}return s+"--"+i;};F.prototype.createId=function(i){var c=this._sExplicitId?this._sExplicitId+"--"+i:i;if(this._oContainingView&&this._oContainingView!=this){c=this._oContainingView.createId(c);}return c;};F.prototype.isSubView=function(){return true;};sap.ui.fragment=function(n,T,c){var s;if(typeof(T)==="string"){s=T.toLowerCase();}else if(typeof(T)==="object"&&typeof(T.fragmentName)==="string"){s=T.fragmentName.toLowerCase();}else{s="";}L.info("Do not use deprecated factory function 'sap.ui."+s+"fragment'. Require 'sap/ui/core/Fragment' and use 'load()' instead","sap.ui."+s+"fragment",null,function(){return{type:"sap.ui."+s+"fragment",name:s?n+".fragment."+s:n};});return f(n,T,c);};function f(n,T,c){var s={};if(typeof(n)==="string"){s.fragmentName=n;s.oController=c;s.type=T;}else if(typeof(n)==="object"){s=n;s.async=s.async===true?s.async:false;if(T){s.oController=T;}if(s.async){var d=function(){var O=s.sOwnerId||s.containingView&&s.containingView._sOwnerId;var e=C.get(O);if(e){return e.runAsOwner(function(){return new F(s);});}return new F(s);};var o=F.getType(s.type);if(s.fragmentName&&s.fragmentContent){delete s.fragmentName;}if(s.fragmentName&&typeof o.load=="function"){return new Promise(function(e,g){o.load(s).then(function(v){s.fragmentContent=v;e(d());}).catch(function(h){g(h);});});}else{return Promise.resolve(d());}}}else{L.error("sap.ui.fragment() must be called with Fragment name or config object as first parameter, but is: "+n);}return new F(s);}F.load=function(o){var p=Object.assign({},o);if(p.name&&p.definition){L.error("The properties 'name' and 'definition' shouldn't be provided at the same time. The fragment definition will be used instead of the name. Fragment name was: "+p.name);delete p.name;}p.type=p.type||"XML";p.async=true;p.processingMode=p.processingMode||b.Sequential;p.fragmentName=p.fragmentName||p.name;p.fragmentContent=p.fragmentContent||p.definition;p.oController=p.controller;p.sOwnerId=M._sOwnerId;delete p.name;delete p.definition;delete p.controller;var c=f(p);return c.then(function(d){return d._parsed();});};F.getType=function(T){return t[T];};F.prototype._parsed=function(){if(this._bAsync){return this._pContentPromise;}try{return Promise.resolve(this._pContentPromise.unwrap());}catch(e){return Promise.reject(e);}};sap.ui.xmlfragment=function(i,v,c){if(typeof(i)==="string"){if(typeof(v)==="string"){return sap.ui.fragment({fragmentName:v,sId:i,type:"XML"},c);}else{return sap.ui.fragment(i,"XML",v);}}else{i.type="XML";return sap.ui.fragment(i,v);}};sap.ui.jsfragment=function(n,v,c){if(typeof n==="string"&&typeof v==="object"){if(v.createContent){r[n]=v;sap.ui.loader._.declareModule(n.replace(/\./g,"/")+".fragment.js");}else{return sap.ui.fragment(n,"JS",v);}}else if(typeof n==="string"&&v===undefined){return sap.ui.fragment(n,"JS");}else if(typeof n==="object"){n.type="JS";return sap.ui.fragment(n,v);}else if(arguments.length>=3){return sap.ui.fragment({id:n,fragmentName:v,type:"JS"},c);}else{L.error("sap.ui.jsfragment() was called with wrong parameter set: "+n+" + "+v);}};sap.ui.htmlfragment=function(i,v,c){if(typeof(i)==="string"){if(typeof(v)==="string"){return sap.ui.fragment({fragmentName:v,sId:i,type:"HTML"},c);}else{return sap.ui.fragment(i,"HTML",v);}}else{i.type="HTML";return sap.ui.fragment(i,v);}};F.registerType("XML",{load:function(s){return X.loadTemplatePromise(s.fragmentName,"fragment").then(function(d){return d;});},init:function(s){this._aContent=[];if(s.fragmentContent){if(typeof(s.fragmentContent)==="string"){this._xContent=q.parseXML(s.fragmentContent).documentElement;}else{this._xContent=s.fragmentContent;}}else{L.warning("Synchronous loading of fragment, due to Fragment.init() call for '"+s.fragmentName+"'. Use 'sap/ui/core/Fragment' module with Fragment.load() instead.","SyncXHR",null,function(){return{type:"SyncXHR",name:"Fragment"};});this._xContent=X.loadTemplate(s.fragmentName,"fragment");}this._oContainingView=this._sExplicitId?this:(s.containingView||this);if((this._oContainingView===this)){this._oContainingView.oController=(s.containingView&&s.containingView.oController)||s.oController;}this._sProcessingMode=s.processingMode;var S=this._oContainingView._fnSettingsPreprocessor;var p={fnRunWithPreprocessor:function(c){return M.runWithPreprocessors(c,{settings:S});}};return X.parseTemplatePromise(this._xContent,this,this._bAsync,p).then(function(c){this._aContent=c;if(this._aContent&&this._aContent.length&&s.objectBindings){this._aContent.forEach(function(o,i){if(o instanceof E){for(var d in s.objectBindings){o.bindObject(s.objectBindings[d]);}}});}return this._aContent.length>1?this._aContent:this._aContent[0];}.bind(this));}});F.registerType("JS",{load:function(s){var c=s.fragmentName.replace(/\./g,"/")+".fragment";return new Promise(function(d,e){sap.ui.require([c],function(g){d(g);},e);});},init:function(s){this._aContent=[];if(s.fragmentContent){m(this,s.fragmentContent);}else{if(!r[s.fragmentName]){sap.ui.requireSync(s.fragmentName.replace(/\./g,"/")+".fragment");}m(this,r[s.fragmentName]);}this._oContainingView=s.containingView||this;return M.runWithPreprocessors(function(){var c;if(this.fnScopedRunWithOwner){this.fnScopedRunWithOwner(function(){c=this.createContent(s.oController||this._oContainingView.oController);}.bind(this));}else{c=this.createContent(s.oController||this._oContainingView.oController);}if(c instanceof Promise){return c.then(function(d){this._aContent=this._aContent.concat(d);return this._aContent.length>1?this._aContent:this._aContent[0];}.bind(this));}else{return new Promise(function(d,e){this._aContent=this._aContent.concat(c);d(this._aContent.length>1?this._aContent:this._aContent[0]);}.bind(this));}}.bind(this),{settings:this._oContainingView._fnSettingsPreprocessor});}});(function(){var _={};var c=function(T){var u=sap.ui.require.toUrl(T.replace(/\./g,"/"))+".fragment.html";var h=_[u];var R;if(!h){R=T.replace(/\./g,"/")+".fragment.html";h=a.loadResource(R);_[u]=h;}return h;};F.registerType("HTML",{load:function(s){var d=s.fragmentName.replace(/\./g,"/")+".fragment";return a.loadResource(d+".html",{async:true}).then(function(o){return o;});},init:function(s){this._aContent=[];this.getContent=function(){return this._aContent;};this.addContent=function(j){this._aContent.push(j);};this._oContainingView=s.containingView||this;this._sProcessingMode=s.processingMode;var h=s.fragmentContent||c(s.fragmentName);this._oTemplate=document.createElement("div");if(typeof h==="string"){this._oTemplate.innerHTML=h;}else{var n=h;var d=document.createDocumentFragment();for(var i=0;i<n.length;i++){d.appendChild(n.item(i));}this._oTemplate.appendChild(d);}var o=this._oTemplate.getElementsByTagName("template")[0];var p=this.getMetadata().getAllProperties();if(o){var e=this;q.each(o.attributes,function(I,A){var N=D.convertAttributeToSettingName(A.name,e.getId());var v=A.value;var P=p[N];if(!s[N]){if(P){s[N]=D.convertValueToType(D.getPropertyDataType(P),v);}else if(sap.ui.core.mvc.HTMLView._mAllowedSettings[N]){s[N]=v;}}});this._oTemplate=o;}if(this._oTemplate.content){var g=this._oTemplate.content;this._oTemplate=document.createElement("div");this._oTemplate.appendChild(g);}return M.runWithPreprocessors(function(){if(this.fnScopedRunWithOwner){this.fnScopedRunWithOwner(function(){D.compile(this._oTemplate,this);}.bind(this));}else{D.compile(this._oTemplate,this);}var j=this.getContent();if(j&&j.length===1){this._aContent=[j[0]];return new Promise(function(k,l){k(this._aContent[0]);}.bind(this));}}.bind(this),{settings:this._oContainingView._fnSettingsPreprocessor});}});}());return F;});
