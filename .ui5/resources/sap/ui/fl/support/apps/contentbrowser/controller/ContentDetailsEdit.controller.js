/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/mvc/Controller","sap/ui/fl/support/apps/contentbrowser/lrepConnector/LRepConnector","sap/ui/fl/support/apps/contentbrowser/utils/DataUtils","sap/ui/fl/Layer","sap/m/Dialog","sap/m/Text","sap/m/Button","sap/m/Input","sap/m/library"],function(C,L,D,a,b,T,B,I,m){"use strict";var c=m.ButtonType;return C.extend("sap.ui.fl.support.apps.contentbrowser.controller.ContentDetailsEdit",{oSelectedContentModel:undefined,oDataUtils:D,onInit:function(){this._initAndBindSelectedContentModel();var r=sap.ui.core.UIComponent.getRouterFor(this);r.getRoute("ContentDetailsEdit").attachMatched(this._onRouteMatched,this);},_initAndBindSelectedContentModel:function(){this.oSelectedContentModel=new sap.ui.model.json.JSONModel();this.getView().setModel(this.oSelectedContentModel,"selectedContent");},_onRouteMatched:function(r){var t=this;var R=r.getParameter("arguments");var M={};M.layer=R.layer;M.namespace=decodeURIComponent(R.namespace);M.fileName=R.fileName;M.fileType=R.fileType;if(M.namespace[M.namespace.length-1]!=="/"){M.namespace+="/";}var s=M.namespace+M.fileName+"."+M.fileType;var p=t.getView().getContent()[0];p.setBusy(true);return L.getContent(M.layer,s,null,null,true).then(t._onContentReceived.bind(t,M,p,s),function(){p.setBusy(false);});},_onContentReceived:function(M,p,s,d){var t=this;return L.getContent(M.layer,s,true).then(function(o){M.data=D.formatData(d,M.fileType);M.metadata=o;t.oSelectedContentModel.setData(M);p.setBusy(false);},function(){p.setBusy(false);});},onSave:function(){var t=this;var s=this.getView().getModel("selectedContent");var o=s.getData();var l;var d;var p;var f;var P;o.metadata.some(function(M){if(M.name==="layer"){l=M.value;return true;}});o.metadata.some(function(M){if(M.name==="transportId"){d=M.value;return true;}});try{p=JSON.parse(o.data).packageName;}catch(e){}if((l===a.USER)||(l==="LOAD")||(l==="VENDOR_LOAD")||(!d&&(!p||p==="$TMP"))){f=undefined;this._saveFile(l,o.namespace,o.fileName,o.fileType,o.data,f,P);}else if(d==="ATO_NOTIFICATION"){f=d;this._saveFile(l,o.namespace,o.fileName,o.fileType,o.data,f,P);}else{var i=!!(l===a.VENDOR||l===a.CUSTOMER_BASE);var g=new I({visible:i,placeholder:"Package name (Only necessary for cross client content)"});var h=new I({placeholder:"Transport ID or ATO_NOTIFICATION"});var j=new b({title:"{i18n>transportInput}",type:"Message",content:[new T({text:"{i18n>transportInputDescription}"}),g,h],beginButton:new B({text:"{i18n>confirm}",type:c.Reject,press:function(){P=g.getValue();f=h.getValue();j.close();t._saveFile(l,o.namespace,o.fileName,o.fileType,o.data,f,P);}}),endButton:new B({text:"{i18n>cancel}",press:function(){j.close();}}),afterClose:function(){j.destroy();}});this.getView().addDependent(j);j.open();}},_saveFile:function(l,n,f,F,d,t,p){return L.saveFile(l,n,f,F,d,t,p).then(this._navToDisplayMode.bind(this));},onCancel:function(){this._navToDisplayMode();},_navToDisplayMode:function(){var s=this.getView().getModel("selectedContent");var o=s.getData();var r=sap.ui.core.UIComponent.getRouterFor(this);r.navTo("ContentDetailsFlip",{layer:o.layer,namespace:encodeURIComponent(o.namespace),fileName:o.fileName,fileType:o.fileType});}});});
