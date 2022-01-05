/*
 * ! OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/fl/initial/_internal/StorageUtils","sap/ui/fl/write/_internal/StorageFeaturesMerger","sap/base/util/ObjectPath"],function(S,a,O){"use strict";var W="sap/ui/fl/write/_internal/connectors/";function _(){return S.getConnectors(W,false);}function f(l,C){var F=C.filter(function(o){return o.layers.indexOf("ALL")!==-1||o.layers.indexOf(l)!==-1;});if(F.length===1){return F[0];}if(F.length===0){throw new Error("No Connector configuration could be found to write into layer: "+l);}if(F.length>1){throw new Error("sap.ui.core.Configuration 'flexibilityServices' has a misconfiguration: Multiple Connector configurations were found to write into layer: "+l);}}function b(C){var i=C.map(function(o){return o.writeConnectorModule.loadFeatures({url:o.url}).then(function(F){return{features:F,layers:o.layers};}).catch(S.logAndResolveDefault.bind(null,{features:{},layers:o.layers},o,"loadFeatures"));});return Promise.all(i);}function c(l){if(!l){return Promise.reject("No layer was provided");}return _().then(f.bind(this,l));}function d(p){if(p.draft){return new Promise(function(r,i){sap.ui.require(["sap/ui/fl/write/api/FeaturesAPI"],function(F){F.isVersioningEnabled(p.layer).then(function(D){if(D){r();}else{i("Draft is not supported for the given layer: "+p.layer);}});});});}return Promise.resolve();}function e(p){var C;if(p.allChanges&&p.allChanges.length&&p.condensedChanges){C={namespace:p.allChanges[0].getDefinition().namespace,layer:p.layer,"delete":{change:[]},update:{change:[]},reorder:{change:[]},create:{change:[],ctrl_variant_change:[],ctrl_variant_management_change:[]}};var o=0;var A=false;p.allChanges.forEach(function(i,j){if(i.getFileType()==="ctrl_variant"){return;}var k=C.create[i.getFileType()].length;if(i.condenserState){var D=false;if(i.condenserState==="delete"){if(i.getState()==="NONE"){C.delete.change.push(i.getFileName());}o++;}else if(p.condensedChanges.length){D=p.allChanges[j].getFileName()!==p.condensedChanges[j-o].getFileName();}if(i.condenserState==="select"&&D&&!A){var r=p.condensedChanges.slice(j-o).map(function(i){return i.getFileName();});C.reorder.change=r;A=true;}if(i.condenserState==="select"&&i.getProperty("state")==="NEW"){C.create.change[k]={};C.create.change[k][i.getFileName()]=i.getDefinition();}else if(i.condenserState==="update"){var l=C.update.change.length;C.update.change[l]={};C.update.change[l][i.getFileName()]={content:i.getContent()};}delete i.condenserState;}else if(i.getProperty("state")==="NEW"){C.create[i.getFileType()][k]={};C.create[i.getFileType()][k][i.getId()]=i.getDefinition();}});}return C;}function g(A,p){return d(p).then(c.bind(undefined,p.layer)).then(function(C){p.url=C.url;var o=O.get(A,C.writeConnectorModule);return o.call(C.writeConnectorModule,p);});}var h={};h.write=function(p){return g("write",p);};h.condense=function(p){p.flexObjects=e(p);if(!p.flexObjects){return Promise.reject("No changes were provided");}return g("condense",p);};h.remove=function(p){return g("remove",p);};h.update=function(p){return g("update",p);};h.reset=function(p){return g("reset",p);};h.getFlexInfo=function(p){return g("getFlexInfo",p);};h.getContexts=function(p){return g("getContexts",p);};h.loadContextDescriptions=function(p){return g("loadContextDescriptions",p);};h.isContextSharingEnabled=function(p){return g("isContextSharingEnabled",p);};h.loadFeatures=function(){return _().then(b).then(a.mergeResults);};h.publish=function(p){return g("publish",p);};h.versions={load:function(p){return _().then(g.bind(undefined,"versions.load",p));},activate:function(p){return _().then(g.bind(undefined,"versions.activate",p));},discardDraft:function(p){return _().then(g.bind(undefined,"versions.discardDraft",p));}};return h;});
