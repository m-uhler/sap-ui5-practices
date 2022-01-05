/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./library","sap/ui/core/library","sap/ui/core/Element","sap/m/Image","sap/m/Title","sap/m/Label"],function(l,c,E,I,T,L){"use strict";var a=l.LightBoxLoadingStates;var O=c.OpenState;var b=c.TitleLevel;var d=E.extend("sap.m.LightBoxItem",{metadata:{library:"sap.m",properties:{imageSrc:{type:"sap.ui.core.URI",group:"Appearance",multiple:false,defaultValue:""},alt:{type:"string",group:"Appearance",multiple:false,defaultValue:""},title:{type:"string",group:"Appearance",multiple:false,defaultValue:""},subtitle:{type:"string",group:"Appearance",multiple:false,defaultValue:""}},aggregations:{_image:{type:"sap.m.Image",multiple:false,visibility:"hidden"},_title:{type:"sap.m.Title",multiple:false,visibility:"hidden"},_subtitle:{type:"sap.m.Label",multiple:false,visibility:"hidden"}}}});d.prototype.init=function(){this._createNativeImage();this.setAggregation("_image",new I({decorative:false,densityAware:false}),true);this.setAggregation("_title",new T({level:b.H5,wrapping:false}),true);this.setAggregation("_subtitle",new L({wrapping:false}),true);};d.prototype._createNativeImage=function(){var t=this;this._sImageState=a.Loading;this._oImage=new window.Image();this._oImage.onload=function(){if(this.complete&&t._sImageState===a.Loading){t._setImageState(a.Loaded);}};this._oImage.onerror=function(){t._setImageState(a.Error);};};d.prototype.exit=function(){this._oImage=null;};d.prototype._setImageState=function(i){if(i!==this._sImageState){this._sImageState=i;if(this.getParent()){this.getParent()._imageStateChanged(i);}}};d.prototype._getImageState=function(){return this._sImageState;};d.prototype._getNativeImage=function(){return this._oImage;};d.prototype.setImageSrc=function(i){var o=this.getAggregation("_image"),e=this.getParent();if(this.getImageSrc()===i){return this;}this._sImageState=a.Loading;if(e&&e._oPopup.getOpenState()===O.OPEN){this._oImage.src=i;}this.setProperty("imageSrc",i,false);o.setSrc(i);return this;};d.prototype.setAlt=function(e){var i=this.getAggregation("_image");this.setProperty("alt",e,false);i.setAlt(e);return this;};d.prototype.setTitle=function(t){var o=this.getAggregation("_title");this.setProperty("title",t,false);o.setText(t);return this;};d.prototype.setSubtitle=function(s){var S=this.getAggregation("_subtitle");this.setProperty("subtitle",s,false);S.setText(s);return this;};return d;});
