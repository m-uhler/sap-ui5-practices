/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['sap/ui/mdc/field/FieldBase','sap/ui/mdc/field/FieldBaseRenderer','sap/base/util/merge'],function(F,a,m){"use strict";var b=F.extend("sap.ui.mdc.FilterField",{metadata:{library:"sap.ui.mdc",properties:{operators:{type:"string[]",group:"Data",defaultValue:[]},defaultOperator:{type:"string",group:"Data",defaultValue:null}},events:{change:{parameters:{value:{type:"string"},valid:{type:"boolean"},conditions:{type:"object[]"},promise:{type:"boolean"}}}}},renderer:a});b.prototype.init=function(){F.prototype.init.apply(this,arguments);};b.prototype.exit=function(){F.prototype.exit.apply(this,arguments);};b.prototype._fireChange=function(c,v,w,p){var V;if(c){if(v){if(c.length==1){V=c[0].values[0];}}else{V=w;}}this.fireChange({value:V,valid:v,conditions:m([],c),promise:p});};b.prototype._getOperators=function(){var o=this.getOperators();if(o.length===0){o=F.prototype._getOperators.apply(this,arguments);}return o;};b.prototype.setOperators=function(o){var O=[];o.forEach(function(c){if(typeof c==="string"){O.push(c);}else{O.push(c.name);}});this.setProperty("operators",O);return this;};b.prototype.addOperator=function(o){var O=this._getOperators();if(typeof o==="string"){O.push(o);}else{O.push(o.name);}this.setOperators(O);};b.prototype.addOperators=function(o){if(!Array.isArray(o)){o=[o];}o.forEach(function(O){this.addOperator(O);}.bind(this));return this;};b.prototype.removeOperator=function(o){var O=this.getOperators();var n=o;if(typeof o!=="string"){n=o.name;}if(O.indexOf(n)){O.splice(O.indexOf(n),1);this.setOperators(O);}};b.prototype.removeOperators=function(o){if(!Array.isArray(o)){o=[o];}o.forEach(function(O){this.removeOperator(O);}.bind(this));};b.prototype.removeAllOperators=function(){this.setOperators([]);};b.prototype.setDefaultOperator=function(o){var n=o;if(o&&typeof o!=="string"){n=o.name;}this.setProperty("defaultOperator",n);return this;};return b;});
