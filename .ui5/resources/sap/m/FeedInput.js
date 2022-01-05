/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./library","sap/ui/core/Control","sap/ui/core/IconPool","sap/m/TextArea","sap/m/Button","./FeedInputRenderer","sap/ui/thirdparty/jquery","sap/base/security/URLListValidator","sap/base/security/sanitizeHTML"],function(l,C,I,T,B,F,q,U,s){"use strict";var a=l.ButtonType;var A=l.Avatar;var b=l.AvatarSize;var c=l.AvatarShape;var M=15,d=2,e=0;var f=C.extend("sap.m.FeedInput",{metadata:{library:"sap.m",designtime:"sap/m/designtime/FeedInput.designtime",properties:{enabled:{type:"boolean",group:"Behavior",defaultValue:true},rows:{type:"int",group:"Appearance",defaultValue:2},showExceededText:{type:"boolean",group:"Behavior",defaultValue:false},maxLength:{type:"int",group:"Behavior",defaultValue:0},growing:{type:"boolean",group:"Behavior",defaultValue:false},growingMaxLines:{type:"int",group:"Behavior",defaultValue:0},placeholder:{type:"string",group:"Appearance",defaultValue:"Post something here"},value:{type:"string",group:"Data",defaultValue:null},icon:{type:"sap.ui.core.URI",group:"Data",defaultValue:null},iconDisplayShape:{type:"sap.m.AvatarShape",defaultValue:c.Circle},iconInitials:{type:"string",defaultValue:""},iconSize:{type:"sap.m.AvatarSize",defaultValue:b.M},showIcon:{type:"boolean",group:"Behavior",defaultValue:true},iconDensityAware:{type:"boolean",group:"Appearance",defaultValue:true},buttonTooltip:{type:"sap.ui.core.TooltipBase",group:"Accessibility",defaultValue:"Submit"},ariaLabelForPicture:{type:"string",group:"Accessibility",defaultValue:null}},events:{post:{parameters:{value:{type:"string"}}}}}});var _={ATTRIBS:{'style':1,'class':1,'a::href':1,'a::target':1},ELEMENTS:{'a':{cssClass:'sapMLnk'},'abbr':1,'blockquote':1,'br':1,'cite':1,'code':1,'em':1,'h1':{cssClass:'sapMTitle sapMTitleStyleH1'},'h2':{cssClass:'sapMTitle sapMTitleStyleH2'},'h3':{cssClass:'sapMTitle sapMTitleStyleH3'},'h4':{cssClass:'sapMTitle sapMTitleStyleH4'},'h5':{cssClass:'sapMTitle sapMTitleStyleH5'},'h6':{cssClass:'sapMTitle sapMTitleStyleH6'},'p':1,'pre':1,'strong':1,'span':1,'u':1,'dl':1,'dt':1,'dd':1,'ol':1,'ul':1,'li':1}};f.prototype._renderingRules=_;function S(t,g){var h,v,j=t==="a";var k=this._renderingRules.ELEMENTS[t].cssClass||"";for(var i=0;i<g.length;i+=2){h=g[i];v=g[i+1];if(!this._renderingRules.ATTRIBS[h]&&!this._renderingRules.ATTRIBS[t+"::"+h]){g[i+1]=null;continue;}if(h=="href"){if(!U.validate(v)){g[i+1]="#";j=false;}}if(h=="target"){j=false;}if(k&&h.toLowerCase()=="class"){g[i+1]=k+" "+v;k="";}}if(j){g.push("target");g.push("_blank");}if(k){g.push("class");g.push(k);}return g;}function p(t,g){return S.call(this,t,g);}f.prototype._sanitizeHTML=function(t){return s(t,{tagPolicy:p.bind(this),uriRewriter:function(u){if(U.validate(u)){return u;}}});};f.prototype.init=function(){var o=sap.ui.getCore().getLibraryResourceBundle("sap.m");this.setProperty("placeholder",o.getText("FEEDINPUT_PLACEHOLDER"),true);this.setProperty("buttonTooltip",o.getText("FEEDINPUT_SUBMIT"),true);};f.prototype.exit=function(){if(this._oTextArea){this._oTextArea.destroy();}if(this._oButton){this._oButton.destroy();}if(this.oAvatar){this.oAvatar.destroy();}};f.prototype.setRows=function(r){var m=this.getProperty("growingMaxLines");if(r>M){r=M;}else if(r<d){r=d;}if(r>m&&m!==0){this.setProperty("growingMaxLines",r,true);this._getTextArea().setGrowingMaxLines(r);}this.setProperty("rows",r,true);this._getTextArea().setRows(r);return this;};f.prototype.setShowExceededText=function(v){this.setProperty("showExceededText",v,true);this._getTextArea().setShowExceededText(v);return this;};f.prototype.setMaxLength=function(m){this.setProperty("maxLength",m,true);this._getTextArea().setMaxLength(m);return this;};f.prototype.setGrowing=function(g){this.setProperty("growing",g,true);this._getTextArea().setGrowing(g);return this;};f.prototype.setGrowingMaxLines=function(m){var r=this.getProperty("rows");if(m!==e){if(m<r){m=r;}else if(m>M){m=M;}}this.setProperty("growingMaxLines",m,true);this._getTextArea().setGrowingMaxLines(m);return this;};f.prototype.setValue=function(v){this.setProperty("value",v,true);this._getTextArea().setValue(v);this._enablePostButton();return this;};f.prototype.setPlaceholder=function(v){this.setProperty("placeholder",v,true);this._getTextArea().setPlaceholder(v);return this;};f.prototype.setEnabled=function(E){this.setProperty("enabled",E,true);if(this.getDomRef("outerContainer")){if(E){this.getDomRef("outerContainer").classList.remove("sapMFeedInDisabled");}else{this.getDomRef("outerContainer").classList.add("sapMFeedInDisabled");}}this._getTextArea().setEnabled(E);this._enablePostButton();return this;};f.prototype.setButtonTooltip=function(v){this.setProperty("buttonTooltip",v,true);this._getPostButton().setTooltip(v);return this;};f.prototype._getTextArea=function(){var t=this;if(!this._oTextArea){this._oTextArea=new T(this.getId()+"-textArea",{value:this.getValue(),maxLength:this.getMaxLength(),placeholder:this.getPlaceholder(),growing:this.getGrowing(),growingMaxLines:this.getGrowingMaxLines(),showExceededText:this.getShowExceededText(),rows:this.getRows(),liveChange:q.proxy(function(E){var v=E.getParameter("value");this.setProperty("value",v,true);this._enablePostButton();},this)});this._oTextArea.setParent(this);this._oTextArea.addEventDelegate({onAfterRendering:function(){t.$("counterContainer").empty();t.$("counterContainer").html(t._oTextArea.getAggregation("_counter").$());}});}return this._oTextArea;};f.prototype._getPostButton=function(){if(!this._oButton){this._oButton=new B(this.getId()+"-button",{enabled:false,type:a.Default,icon:"sap-icon://feeder-arrow",tooltip:this.getButtonTooltip(),press:q.proxy(function(){this._oTextArea.focus();this.firePost({value:this._sanitizeHTML(this.getValue())});this.setValue(null);},this)});this._oButton.setParent(this);}return this._oButton;};f.prototype._enablePostButton=function(){var P=this._isControlEnabled();var o=this._getPostButton();o.setEnabled(P);};f.prototype._isControlEnabled=function(){var v=this.getValue();return this.getEnabled()&&(typeof v==="string"||v instanceof String)&&v.trim().length>0;};f.prototype._getAvatar=function(){var i=this.getIcon();var g=i?i:I.getIconURI("person-placeholder");var h=this.getId()+'-icon';if(!this.oAvatar){this.oAvatar=new A({id:h,src:g,displayShape:this.getIconDisplayShape(),initials:this.getIconInitials(),displaySize:this.getIconSize()}).addStyleClass("sapMFeedInImage");}else{this.oAvatar.setSrc(g).setDisplayShape(this.getIconDisplayShape()).setInitials(this.getIconInitials()).setDisplaySize(this.getIconSize());}return this.oAvatar;};return f;});
