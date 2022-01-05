/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/base/ManagedObject","sap/base/util/includes","sap/base/util/values","sap/base/util/each","sap/base/util/restricted/_omit"],function(M,i,v,e,_){"use strict";var C=M.extend("sap.ui.rta.util.changeVisualization.ChangeIndicatorRegistry",{metadata:{properties:{commandCategories:{type:"object",defaultValue:[]}}},constructor:function(){M.prototype.constructor.apply(this,arguments);this._oChanges={};this._oChangeIndicators={};}});C.prototype.exit=function(){this.reset();};C.prototype.getChanges=function(){return v(this._oChanges||{}).map(function(c){return Object.assign({},c);});};C.prototype.getChangeIds=function(){return Object.keys(this._oChanges||{});};C.prototype.getChange=function(c){return this._oChanges[c]&&Object.assign({},this._oChanges[c]);};C.prototype.getChangeIndicatorData=function(){var c={};function a(s,A,o,d){if(c[s]===undefined){c[s]=[];}c[s].push(Object.assign({id:o.change.getId(),dependent:d,affectedElementId:A},_(o,["displayElementIds","dependentElementIds","affectedElementIds"])));}v(this._oChanges).forEach(function(o){o.displayElementIds.forEach(function(s,I){a(s,o.affectedElementIds[I],o,false);});o.dependentElementIds.forEach(function(s){a(s,s,o,true);});});return c;};C.prototype.hasChangeIndicator=function(s){return!!this._oChangeIndicators[s];};C.prototype.getChangeIndicator=function(s){return this._oChangeIndicators[s];};C.prototype.getChangeIndicators=function(){return v(this._oChangeIndicators||{});};C.prototype.registerChange=function(c,s){var a=this.getCommandCategories();var n={change:c,commandName:s,commandCategory:Object.keys(a).find(function(b){return i(a[b],s);}),affectedElementIds:[],displayElementIds:[],dependentElementIds:[]};if(n.commandCategory===undefined){return;}this._oChanges[c.getId()]=n;};C.prototype.registerChangeIndicator=function(s,c){this._oChangeIndicators[s]=c;};C.prototype.addSelectorsForChangeId=function(c,s){var o=this._oChanges[c];if(o===undefined){throw new Error("Change id is not registered");}e(s,function(S,a){o[S]=a;});};C.prototype.reset=function(){Object.keys(this._oChanges).forEach(function(k){this.removeChange(k);}.bind(this));v(this._oChangeIndicators).forEach(function(I){I.destroy();});this._oChangeIndicators={};};C.prototype.removeChange=function(c){delete this._oChanges[c];};return C;});
