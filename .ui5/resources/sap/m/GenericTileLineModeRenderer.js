/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/m/library","sap/base/security/encodeCSS","sap/ui/thirdparty/jquery"],function(l,e,q){"use strict";var G=l.GenericTileScope;var L=l.LoadState;var r=sap.ui.getCore().getLibraryResourceBundle("sap.m");var a={apiVersion:2};a.render=function(R,c){var t=c._getTooltipText(),i=c._isScreenLarge(),A=c._getAriaText(),s=c.getScope(),S,I=false,h=c.hasListeners("press"),b=c.getState(),d=c.getAriaRoleDescription(),f=c.getAriaRole();var g=c.getUrl()&&!c._isInActionScope()&&b!==L.Disabled;this._bRTL=sap.ui.getCore().getConfiguration().getRTL();if(s===G.Actions){if(b!==L.Disabled){S=e("sapMGTScopeActions");}}else if(s===G.ActionMore||s===G.ActionRemove){I=true;if(b!==L.Disabled){S=e("sapMGTScopeSingleAction");}}else{S=e("sapMGTScopeDisplay");}if(g){R.openStart("a",c);R.attr("href",c.getUrl());R.attr("rel","noopener noreferrer");R.attr("draggable","false");}else{R.openStart("span",c);}R.attr("aria-label",A);if(d){R.attr("aria-roledescription",d);}else{R.attr("aria-roledescription",r.getText("GENERIC_TILE_ROLE_DESCRIPTION"));}if(f){R.attr("role",f);}else if(!g){R.attr("role",h?"button":"presentation");}else{R.attr("role","link");}R.class("sapMGT");R.class(S);R.class("sapMGTLineMode");this._writeDirection(R);if(t){R.attr("title",t);}if(b!==L.Disabled){if(!c.isInActionRemoveScope()){R.class("sapMPointer");R.style("pointer-events","auto");}R.attr("tabindex","0");}else{R.class("sapMGTDisabled");}if(b===L.Failed){R.class("sapMGTFailed");}R.openEnd();if(c.getState()!==L.Disabled){this._renderFocusDiv(R,c);}if(i){R.openStart("div",c.getId()+"-startMarker");R.class("sapMGTStartMarker");R.openEnd();R.close("div");this._renderFailedIcon(R,c);this._renderHeader(R,c);if(c.getSubheader()){this._renderSubheader(R,c);}R.openStart("div",c.getId()+"-endMarker");R.class("sapMGTEndMarker");R.openEnd();if(c._isInActionScope()){this._renderActionsScope(R,c,I);}R.close("div");R.openStart("div",c.getId()+"-styleHelper");R.class("sapMGTStyleHelper");R.openEnd();R.close("div");}else{R.openStart("div",c.getId()+"-touchArea");R.class("sapMGTTouchArea");R.openEnd();this._renderFailedIcon(R,c);R.openStart("span",c.getId()+"-lineModeHelpContainer");R.class("sapMGTLineModeHelpContainer");R.openEnd();this._renderHeader(R,c);if(c.getSubheader()){this._renderSubheader(R,c);}R.close("span");if(c._isInActionScope()){this._renderActionsScope(R,c,I);}R.close("div");}if(g){R.close("a");}else{R.close("span");}};a._writeDirection=function(R){if(this._bRTL){R.attr("dir","rtl");}};a._renderFailedIcon=function(R,c){if(c.getState()===L.Failed){if(c._isCompact()){c._oWarningIcon.setSize("1.25rem");}else{c._oWarningIcon.setSize("1.375rem");}R.renderControl(c._oWarningIcon.addStyleClass("sapMGTLineModeFailedIcon"));}};a._renderHeader=function(R,c){R.openStart("span",c.getId()+"-hdr-text");this._writeDirection(R);R.class("sapMGTHdrTxt");R.openEnd();R.text(c._oTitle.getText());R.close("span");};a._renderSubheader=function(R,c){R.openStart("span",c.getId()+"-subHdr-text");this._writeDirection(R);R.class("sapMGTSubHdrTxt");R.openEnd();R.text(c._oSubTitle.getText());R.close("span");};a._renderActionsScope=function(R,c,i){if(c.getState()!==L.Disabled){R.openStart("span",c.getId()+"-actions");R.class("sapMGTActionsContainer");if(i){R.class("sapMGTScopeSingleActionContainer");}R.openEnd();R.renderControl(c._oMoreIcon);R.renderControl(c._oRemoveButton);R.close("span");}};a._updateHoverStyle=function(){var s=this.$("styleHelper"),o,i=0,h="";s.empty();if(!this._oStyleData||this.$().is(":hidden")){return;}if(this._oStyleData.rtl){s.css("right",-this._oStyleData.positionRight);}else{s.css("left",-this._oStyleData.positionLeft);}for(i;i<this._oStyleData.lines.length;i++){o=this._oStyleData.lines[i];var R=q("<div class='sapMGTLineStyleHelper'><div class='sapMGTLineStyleHelperInner'></div></div>");if(this._oStyleData.rtl){R.css("right",o.offset.x+"px");}else{R.css("left",o.offset.x+"px");}R.css({top:o.offset.y+"px",width:o.width+"px"});h+=R.get(0).outerHTML.trim();}s.html(h);};a._renderFocusDiv=function(R,c){R.openStart("div",c.getId()+"-focus");R.class("sapMGTFocusDiv");R.openEnd();R.close("div");};a._getCSSPixelValue=function(o,p){var O=o instanceof q?o:o.$(),m=(O.css(p)||"").match(/([^a-zA-Z\%]*)(.*)/),v=parseFloat(m[1]),u=m[2];return(u==="px")?v:v*16;};return a;},true);
