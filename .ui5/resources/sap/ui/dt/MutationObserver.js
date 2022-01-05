/*
 * ! OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/thirdparty/jquery","sap/ui/dt/OverlayUtil","sap/ui/base/ManagedObject","sap/ui/dt/DOMUtil","sap/base/util/restricted/_intersection","sap/base/util/restricted/_uniq"],function(q,O,M,D,_,a){"use strict";var b=M.extend("sap.ui.dt.MutationObserver",{metadata:{library:"sap.ui.dt",events:{domChanged:{parameters:{type:{type:"string"},targetNodes:{type:"element[]"}}}}}});b.prototype.init=function(){this._mutationOnTransitionend=this._callDomChangedCallback.bind(this,"MutationOnTransitionend");this._mutationOnAnimationEnd=this._callDomChangedCallback.bind(this,"MutationOnAnimationEnd");this._fireDomChangeOnScroll=this._fireDomChangeOnScroll.bind(this);this._mutationOnResize=this._callDomChangedOnResizeWithRoot.bind(this,"MutationOnResize");window.addEventListener("transitionend",this._mutationOnTransitionend,true);window.addEventListener("animationend",this._mutationOnAnimationEnd,true);window.addEventListener("scroll",this._fireDomChangeOnScroll,true);q(window).on("resize",this._mutationOnResize);this._aIgnoredMutations=[];this._bHandlerRegistred=false;this._mMutationHandlers={};this._aRootIds=[];this._startMutationObserver();};b.prototype.exit=function(){this._stopMutationObserver();window.removeEventListener("transitionend",this._mutationOnTransitionend,true);window.removeEventListener("animationend",this._mutationOnAnimationEnd,true);window.removeEventListener("scroll",this._fireDomChangeOnScroll,true);q(window).off("resize",this._mutationOnResize);this._aIgnoredMutations=[];this._bHandlerRegistred=false;this._mMutationHandlers={};};b.prototype.ignoreOnce=function(p){this._aIgnoredMutations.push(p);};b.prototype.registerHandler=function(i,d,I){if(!this._mMutationHandlers[i]){this._mMutationHandlers[i]=[];this._bHandlerRegistred=true;}this._mMutationHandlers[i].push(d);if(I&&this._aRootIds.indexOf(i)===-1){this._aRootIds.push(i);}};b.prototype.deregisterHandler=function(i){delete this._mMutationHandlers[i];if(Object.keys(this._mMutationHandlers).length===0){this._bHandlerRegistred=false;}this._aRootIds=this._aRootIds.filter(function(r){return r!==i;});};b.prototype._hasScrollbar=function(s,e){return s||D.hasScrollBar(e);};b.prototype._getIdsWhenRegistered=function(s,e,E){var r;if(e&&this._mMutationHandlers[e]){r=e;if(!E.closestElementInWhitlist){E.closestElementInWhitlist=e;}}E.result=s?r:E.closestElementInWhitlist;return E;};b.prototype._getClosestParentIdForNodeRegisteredWithScrollbar=function(n,N){var e={closestElementInWhitlist:undefined,result:undefined};var s=false;var c=q(N);var C=n;do{s=this._hasScrollbar(s,c);e=this._getIdsWhenRegistered(s,C,e);c=c.parent();C=c.attr("data-sap-ui");}while(!(e.result&&s)&&c.length&&c[0]!==document);return e.result||e.closestElementInWhitlist;};b.prototype._isNodeOverlayRelated=function(n,m){var o="overlay-container";if(D.contains(o,n)){return true;}if(n===document.body){return m&&m.addedNodes&&m.addedNodes[0]&&m.addedNodes[0].getAttribute&&m.addedNodes[0].getAttribute('id')===o;}return false;};b.prototype._getRelevantElementId=function(n,m){var N=n&&n.getAttribute&&n.getAttribute('id');var r;if(!this._isNodeOverlayRelated(n,m)&&document.body.contains(n)&&N!=="sap-ui-static"&&!D.contains("sap-ui-preserve",n)){var i=0;while(this._aRootIds.length>i&&!r){if(D.contains(this._aRootIds[i],n)||n.contains(document.getElementById(this._aRootIds[i]))){r=this._aRootIds[i];}i++;}}return r;};b.prototype._getRelevantElementIdsFromStaticArea=function(m){return m.target.id==="sap-ui-static"&&_([].concat(Array.prototype.slice.call(m.addedNodes),Array.prototype.slice.call(m.removedNodes)).map(function(n){return n.id;}),Object.keys(this._mMutationHandlers));};b.prototype._ignoreMutation=function(m){return this._aIgnoredMutations.some(function(i,I,s){if(i.target===m.target&&(!i.type||i.type===m.type)){s.splice(I,1);return true;}});};b.prototype._getTargetNode=function(m){return(m.type==="characterData"?m.target.parentNode:m.target);};b.prototype._callRelevantCallbackFunctions=function(t,T){t=a(t);t.forEach(function(s){(this._mMutationHandlers[s]||[]).forEach(function(f){f({type:T});});}.bind(this));};b.prototype._startMutationObserver=function(){this._oMutationObserver=new window.MutationObserver(function(m){if(this._bHandlerRegistred){var o=m.reduce(function(o,c){var t=[];var T=this._getTargetNode(c);var d=this._getRelevantElementId(T,c);if(d){t.push(d);}else{t=this._getRelevantElementIdsFromStaticArea(c);}if(t.length&&!this._ignoreMutation(c)){return o.concat(t);}return o;}.bind(this),[]);if(o.length){this._callRelevantCallbackFunctions(o,"MutationObserver");}}}.bind(this));this._oMutationObserver.observe(window.document,{childList:true,subtree:true,attributes:true,attributeFilter:["style","class","width","height","border"],characterData:true});};b.prototype._stopMutationObserver=function(){if(this._oMutationObserver){this._oMutationObserver.disconnect();delete this._oMutationObserver;}};b.prototype._callDomChangedCallback=function(m,e){var t=e.target;if(this._bHandlerRegistred&&t!==window){var T=this._getRelevantElementId(t);if(T){this._callRelevantCallbackFunctions([T],m);}}};b.prototype._callDomChangedOnResizeWithRoot=function(m){if(this._aRootIds.length){if(this._iApplyStylesRequest){window.cancelAnimationFrame(this._iApplyStylesRequest);}this._iApplyStylesRequest=window.requestAnimationFrame(function(){this._callRelevantCallbackFunctions(this._aRootIds,m);delete this._iApplyStylesRequest;}.bind(this));}};b.prototype._fireDomChangeOnScroll=function(e){var t=e.target;var T=[];if(this._bHandlerRegistred&&t!==document){var s=this._getRelevantElementId(t);if(s){T.push(s);}else if(t.getAttribute("id")!=="sap-ui-static"){T=this._aRootIds.filter(function(s){return t.contains(document.getElementById(s));});}if(T.length&&!O.getClosestOverlayForNode(t)){this._callRelevantCallbackFunctions(T,"MutationOnScroll");}}};return b;});