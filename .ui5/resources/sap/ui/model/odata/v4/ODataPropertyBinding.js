/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./ODataBinding","./lib/_Cache","./lib/_Helper","sap/base/Log","sap/ui/base/SyncPromise","sap/ui/model/BindingMode","sap/ui/model/ChangeReason","sap/ui/model/odata/v4/Context","sap/ui/model/PropertyBinding"],function(a,_,b,L,S,B,C,c,P){"use strict";var s="sap.ui.model.odata.v4.ODataPropertyBinding",i=Object.freeze([]),m={AggregatedDataStateChange:true,change:true,dataReceived:true,dataRequested:true,DataStateChange:true},v="/"+c.VIRTUAL;var O=P.extend("sap.ui.model.odata.v4.ODataPropertyBinding",{constructor:function(M,p,o,d){P.call(this,M,p);a.call(this);if(p.endsWith("/")){throw new Error("Invalid path: "+p);}if(d){this.checkBindingParameters(d,["$$groupId","$$ignoreMessages","$$noPatch"]);this.sGroupId=d.$$groupId;this.bNoPatch=d.$$noPatch;this.setIgnoreMessages(d.$$ignoreMessages);}else{this.sGroupId=undefined;}this.oCheckUpdateCallToken=undefined;this.mQueryOptions=this.oModel.buildQueryOptions(b.clone(d),false);this.fetchCache(o);this.oContext=o;this.bHasDeclaredType=undefined;this.bInitial=true;this.vValue=undefined;M.bindingCreated(this);},metadata:{publicMethods:[]}});a(O.prototype);O.prototype.attachEvent=function(e,d,f,g){if(!(e in m)){throw new Error("Unsupported event '"+e+"': v4.ODataPropertyBinding#attachEvent");}return P.prototype.attachEvent.apply(this,arguments);};O.prototype.checkUpdateInternal=function(f,d,g,V){var D=false,h=this.sPath.indexOf("##"),I=h>=0,M=this.oModel.getMetaModel(),p={data:{}},r=this.getResolvedPath(),o={forceUpdate:r&&(f||f===undefined&&this.getDataState().getControlMessages().length>0||this.oCheckUpdateCallToken&&this.oCheckUpdateCallToken.forceUpdate)},t=this.oType,e=this;this.oCheckUpdateCallToken=o;if(this.bHasDeclaredType===undefined){this.bHasDeclaredType=!!t;}if(r&&!this.bHasDeclaredType&&this.sInternalType!=="any"&&!I){t=M.fetchUI5Type(r);}if(arguments.length<4){V=this.oCachePromise.then(function(j){var k,l;if(j){return j.fetchValue(e.lockGroup(g||e.getGroupId()),undefined,function(){D=true;e.fireDataRequested();},e).then(function(R){e.assertSameCache(j);return R;});}if(!e.sReducedPath||!e.isResolved()){return undefined;}if(r.includes(v)){o.forceUpdate=false;}if(!I){return e.oContext.fetchValue(e.sReducedPath,e);}k=e.sPath.slice(0,h);l=e.sPath.slice(h+2);if(l[0]==="/"){l="."+l;}return M.fetchObject(l,M.getMetaContext(e.oModel.resolve(k,e.oContext)));}).then(function(V){if(!V||typeof V!=="object"){return V;}if(e.sInternalType==="any"&&(e.getBindingMode()===B.OneTime||(e.sPath[e.sPath.lastIndexOf("/")+1]==="#"&&!I))){if(I){return V;}else if(e.bRelative){return b.publicClone(V);}}L.error("Accessed value is not primitive",r,s);},function(E){e.oModel.reportError("Failed to read path "+r,s,E);if(E.canceled){o.forceUpdate=false;return e.vValue;}p={error:E};});if(f&&V.isFulfilled()){if(t&&t.isFulfilled&&t.isFulfilled()){this.setType(t.getResult(),this.sInternalType);}this.vValue=V.getResult();}V=Promise.resolve(V);}return S.all([V,t]).then(function(R){var T=R[1],V=R[0];if(o===e.oCheckUpdateCallToken){e.oCheckUpdateCallToken=undefined;e.setType(T,e.sInternalType);if(o.forceUpdate||e.vValue!==V){e.bInitial=false;e.vValue=V;e._fireChange({reason:d||C.Change});}e.checkDataState();}if(D){e.fireDataReceived(p);}});};O.prototype.deregisterChange=function(){var t=this;this.withCache(function(d,p,o){o.doDeregisterChangeListener(p,t);}).catch(function(e){t.oModel.reportError("Error in deregisterChange",s,e);},"",false,true);};O.prototype.destroy=function(){this.deregisterChange();this.oModel.bindingDestroyed(this);this.oCheckUpdateCallToken=undefined;this.mQueryOptions=undefined;this.vValue=undefined;a.prototype.destroy.call(this);P.prototype.destroy.apply(this,arguments);};O.prototype.doCreateCache=function(r,q){return _.createProperty(this.oModel.oRequestor,r,q);};O.prototype.doFetchQueryOptions=function(){return this.isRoot()?S.resolve(this.mQueryOptions):S.resolve({});};O.prototype.getDependentBindings=function(){return i;};O.prototype.getResumePromise=function(){};O.prototype.getValue=function(){return this.vValue;};O.prototype.getValueListType=function(){var r=this.getResolvedPath();if(!r){throw new Error(this+" is unresolved");}return this.getModel().getMetaModel().getValueListType(r);};O.prototype.hasPendingChangesInDependents=function(){return false;};O.prototype.initialize=function(){if(this.isResolved()){if(this.getRootBinding().isSuspended()){this.sResumeChangeReason=C.Change;}else{this.checkUpdate(true);}}};O.prototype.isMeta=function(){return this.sPath.includes("##");};O.prototype.onChange=function(V){this.checkUpdateInternal(undefined,undefined,undefined,V);};O.prototype.refreshInternal=function(d,g,e){if(this.isRootBindingSuspended()){this.sResumeChangeReason=C.Refresh;return S.resolve();}this.fetchCache(this.oContext,false,true);return e?this.checkUpdateInternal(undefined,C.Refresh,g):S.resolve();};O.prototype.requestValue=function(){var t=this;return Promise.resolve(this.checkUpdateInternal(false).then(function(){return t.getValue();}));};O.prototype.requestValueListInfo=function(A){var r=this.getResolvedPath();if(!r){throw new Error(this+" is unresolved");}return this.getModel().getMetaModel().requestValueListInfo(r,A,this.oContext);};O.prototype.requestValueListType=function(){var r=this.getResolvedPath();if(!r){throw new Error(this+" is unresolved");}return this.getModel().getMetaModel().requestValueListType(r);};O.prototype.resetChangesInDependents=function(){};O.prototype.resetInvalidDataState=function(){if(this.getDataState().isControlDirty()){this._fireChange({reason:C.Change});}};O.prototype.resume=function(){throw new Error("Unsupported operation: resume");};O.prototype.resumeInternal=function(d,p){var r=this.sResumeChangeReason;this.sResumeChangeReason=undefined;this.fetchCache(this.oContext);if(d){this.checkUpdateInternal(p?undefined:false,r);}};O.prototype.setContext=function(o){if(this.oContext!==o){if(this.bRelative){this.deregisterChange();}this.oContext=o;this.sResumeChangeReason=undefined;if(this.bRelative){this.fetchCache(this.oContext);this.checkUpdateInternal(this.bInitial||undefined,C.Context);}}};O.prototype.setType=function(t,d){var o=this.oType;if(t&&t.getName()==="sap.ui.model.odata.type.DateTimeOffset"){t.setV4();}P.prototype.setType.apply(this,arguments);if(!this.bInitial&&o!==t){this._fireChange({reason:C.Change});}};O.prototype.setValue=function(V,g){var G,t=this;function r(e){t.oModel.reportError("Failed to update path "+t.getResolvedPath(),s,e);return e;}this.checkSuspended();if(this.bNoPatch&&g){throw r(new Error("Must not specify a group ID ("+g+") with $$noPatch"));}this.oModel.checkGroupId(g);if(typeof V==="function"||(V&&typeof V==="object")){throw r(new Error("Not a primitive value"));}if(!this.bNoPatch&&this.vValue===undefined){throw r(new Error("Must not change a property before it has been read"));}if(this.vValue!==V){if(this.oCache){r(new Error("Cannot set value on this binding as it is not relative"+" to a sap.ui.model.odata.v4.Context"));return;}G=this.bNoPatch?null:this.lockGroup(g,true,true);this.oContext.doSetProperty(this.sPath,V,G).catch(function(e){if(G){G.unlock(true);}r(e);});}};O.prototype.supportsIgnoreMessages=function(){return true;};O.prototype.suspend=function(){throw new Error("Unsupported operation: suspend");};O.prototype.visitSideEffects=function(){};return O;});
