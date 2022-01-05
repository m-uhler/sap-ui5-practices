/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./library","sap/ui/core/Control","sap/ui/core/HTML","sap/ui/core/ResizeHandler","sap/ui/layout/Grid","sap/ui/layout/GridData","sap/ui/layout/VerticalLayout","sap/ui/layout/HorizontalLayout","sap/ui/core/Icon","sap/ui/core/theming/Parameters","sap/ui/core/InvisibleText","sap/ui/Device","sap/ui/core/library","./ColorPickerRenderer","sap/base/Log","sap/ui/thirdparty/jquery","sap/ui/Global"],function(L,a,H,R,G,b,V,c,I,P,e,D,f,g,h,q){"use strict";var j=f.ValueState,k=L.ColorPickerMode,l=L.ColorPickerDisplayMode;var m=a.extend("sap.ui.unified.ColorPicker",{metadata:{library:"sap.ui.unified",properties:{colorString:{type:"string",group:"Misc",defaultValue:null},mode:{type:"sap.ui.unified.ColorPickerMode",group:"Appearance",defaultValue:k.HSV},displayMode:{type:"sap.ui.unified.ColorPickerDisplayMode",group:"Appearance",defaultValue:l.Default}},aggregations:{_grid:{type:"sap.ui.layout.Grid",group:"Appearance",multiple:false,visibility:"hidden"},_invisibleTexts:{type:"sap.ui.core.InvisibleText",multiple:true,visibility:"hidden"},_oCPBox:{type:"sap.ui.core.Control",group:"Appearance",multiple:false,visibility:"hidden"},_oSlider:{type:"sap.ui.core.Control",group:"Appearance",multiple:false,visibility:"hidden"},_oAlphaSlider:{type:"sap.ui.core.Control",group:"Appearance",multiple:false,visibility:"hidden"},_oHexField:{type:"sap.ui.core.Control",group:"Appearance",multiple:false,visibility:"hidden"},_oRedField:{type:"sap.ui.core.Control",group:"Appearance",multiple:false,visibility:"hidden"},_oGreenField:{type:"sap.ui.core.Control",group:"Appearance",multiple:false,visibility:"hidden"},_oBlueField:{type:"sap.ui.core.Control",group:"Appearance",multiple:false,visibility:"hidden"},_oHueField:{type:"sap.ui.core.Control",group:"Appearance",multiple:false,visibility:"hidden"},_oSatField:{type:"sap.ui.core.Control",group:"Appearance",multiple:false,visibility:"hidden"},_oLitField:{type:"sap.ui.core.Control",group:"Appearance",multiple:false,visibility:"hidden"},_oValField:{type:"sap.ui.core.Control",group:"Appearance",multiple:false,visibility:"hidden"},_oAlphaField:{type:"sap.ui.core.Control",group:"Appearance",multiple:false,visibility:"hidden"},_oAlphaField2:{type:"sap.ui.core.Control",group:"Appearance",multiple:false,visibility:"hidden"},_oRGBorHSLRBUnifiedGroup:{type:"sap.ui.core.Control",group:"Appearance",multiple:false,visibility:"hidden"},_oButton:{type:"sap.ui.core.Control",group:"Appearance",multiple:false,visibility:"hidden"}},events:{change:{parameters:{r:{type:"int"},g:{type:"int"},b:{type:"int"},h:{type:"int"},s:{type:"int"},v:{type:"int"},l:{type:"int"},hex:{type:"string"},alpha:{type:"string"}}},liveChange:{parameters:{r:{type:"int"},g:{type:"int"},b:{type:"int"},h:{type:"int"},s:{type:"int"},v:{type:"int"},l:{type:"int"},hex:{type:"string"},alpha:{type:"string"}}}}}});var B="",s=sap.ui.resource('sap.ui.unified','img/ColorPicker/Alphaslider_BG.png'),r=sap.ui.getCore().getLibraryResourceBundle("sap.ui.unified"),n={};Object.defineProperties(n,{RGB:{value:"RGB"},CPResponsiveClass:{value:"sapUnifiedColorPicker"},CPMatrixClass:{value:"sapUiColorPicker-ColorPickerMatrix"},HSLClass:{value:"sapUiColorPickerHSL"},LabelClass:{value:"sapUiColorPicker-ColorPickerLabels"},UnitLabelClass:{value:"sapUiCPUnitLabel"},HEXClass:{value:"sapUiColorPicker-ColorPickerHexField"},LeftColumnInputClass:{value:"sapUiColorPicker-ColorPickerInputFieldsLeft"},RightColumnInputClass:{value:"sapUiColorPicker-ColorPickerInputFieldsRight"},SliderClass:{value:"sapUiColorPicker-ColorPickerSlider"},AlphaSliderClass:{value:"sapUiColorPicker-ColorPickerAlphaSlider"},OutputSelectorClass:{value:"sapUiColorPickerHSL-RB"},OutputSelectorRowClass:{value:"sapUiColorPicker-RBRow"},CPBoxClass:{value:"sapUiColorPicker-ColorPickerBox"},CPCircleClass:{value:"sapUiColorPicker-ColorPickerCircle"},LastColumnClass:{value:"sapUiColorPicker-ColorPickerLastColumn"},HideForHSVClass:{value:"hideForHSV"},HideForHSLClass:{value:"hideForHSL"},OldColorClass:{value:"sapUiColorPicker-ColorPickerOldColor"},NewColorClass:{value:"sapUiColorPicker-ColorPickerNewColor"},SwatchesClass:{value:"sapUiColorPicker-swatches"},Colors:{value:{aliceblue:'f0f8ff',antiquewhite:'faebd7',aqua:'00ffff',aquamarine:'7fffd4',azure:'f0ffff',beige:'f5f5dc',bisque:'ffe4c4',black:'000000',blanchedalmond:'ffebcd',blue:'0000ff',blueviolet:'8a2be2',brown:'a52a2a',burlywood:'deb887',cadetblue:'5f9ea0',chartreuse:'7fff00',chocolate:'d2691e',coral:'ff7f50',cornflowerblue:'6495ed',cornsilk:'fff8dc',crimson:'dc143c',cyan:'00ffff',darkblue:'00008b',darkcyan:'008b8b',darkgoldenrod:'b8860b',darkgray:'a9a9a9',darkgrey:'a9a9a9',darkgreen:'006400',darkkhaki:'bdb76b',darkmagenta:'8b008b',darkolivegreen:'556b2f',darkorange:'ff8c00',darkorchid:'9932cc',darkred:'8b0000',darksalmon:'e9967a',darkseagreen:'8fbc8f',darkslateblue:'483d8b',darkslategray:'2f4f4f',darkslategrey:'2f4f4f',darkturquoise:'00ced1',darkviolet:'9400d3',deeppink:'ff1493',deepskyblue:'00bfff',dimgray:'696969',dimgrey:'696969',dodgerblue:'1e90ff',firebrick:'b22222',floralwhite:'fffaf0',forestgreen:'228b22',fuchsia:'ff00ff',gainsboro:'dcdcdc',ghostwhite:'f8f8ff',gold:'ffd700',goldenrod:'daa520',gray:'808080',grey:'808080',green:'008000',greenyellow:'adff2f',honeydew:'f0fff0',hotpink:'ff69b4',indianred:'cd5c5c',indigo:'4b0082',ivory:'fffff0',khaki:'f0e68c',lavender:'e6e6fa',lavenderblush:'fff0f5',lawngreen:'7cfc00',lemonchiffon:'fffacd',lightblue:'add8e6',lightcoral:'f08080',lightcyan:'e0ffff',lightgoldenrodyellow:'fafad2',lightgray:'d3d3d3',lightgrey:'d3d3d3',lightgreen:'90ee90',lightpink:'ffb6c1',lightsalmon:'ffa07a',lightseagreen:'20b2aa',lightskyblue:'87cefa',lightslategray:'778899',lightslategrey:'778899',lightsteelblue:'b0c4de',lightyellow:'ffffe0',lime:'00ff00',limegreen:'32cd32',linen:'faf0e6',magenta:'ff00ff',maroon:'800000',mediumaquamarine:'66cdaa',mediumblue:'0000cd',mediumorchid:'ba55d3',mediumpurple:'9370db',mediumseagreen:'3cb371',mediumslateblue:'7b68ee',mediumspringgreen:'00fa9a',mediumturquoise:'48d1cc',mediumvioletred:'c71585',midnightblue:'191970',mintcream:'f5fffa',mistyrose:'ffe4e1',moccasin:'ffe4b5',navajowhite:'ffdead',navy:'000080',oldlace:'fdf5e6',olive:'808000',olivedrab:'6b8e23',orange:'ffa500',orangered:'ff4500',orchid:'da70d6',palegoldenrod:'eee8aa',palegreen:'98fb98',paleturquoise:'afeeee',palevioletred:'db7093',papayawhip:'ffefd5',peachpuff:'ffdab9',peru:'cd853f',pink:'ffc0cb',plum:'dda0dd',powderblue:'b0e0e6',purple:'800080',red:'ff0000',rosybrown:'bc8f8f',royalblue:'4169e1',saddlebrown:'8b4513',salmon:'fa8072',sandybrown:'f4a460',seagreen:'2e8b57',seashell:'fff5ee',sienna:'a0522d',silver:'c0c0c0',skyblue:'87ceeb',slateblue:'6a5acd',slategray:'708090',slategrey:'708090',snow:'fffafa',springgreen:'00ff7f',steelblue:'4682b4',tan:'d2b48c',teal:'008080',thistle:'d8bfd8',tomato:'ff6347',turquoise:'40e0d0',violet:'ee82ee',wheat:'f5deb3',white:'ffffff',whitesmoke:'f5f5f5',yellow:'ffff00',yellowgreen:'9acd32',transparent:'00000000'}}});m.prototype.init=function(){if(D.browser.firefox){B="-moz-linear-gradient";}else if(D.browser.msie){B="-ms-linear-gradient";}else if(D.browser.webkit){B="-webkit-linear-gradient";}else{B="linear-gradient";}this.Color={r:255,g:255,b:255,h:0,s:0,l:100,v:100,a:1,oldA:1,hex:"#ffffff",old:"#ffffff"};this.sHexString="ffffff";this.$CPBox=null;this.$CPCur=null;this.RGB={r:0,g:0,b:0};this.bRtl=sap.ui.getCore().getConfiguration().getRTL();this.data("sap-ui-fastnavgroup","true",true);this.bResponsive=L.ColorPickerHelper.isResponsive();var d=this.bResponsive?"_sap_ui_unified_ColorPicker_CircleSize":"_sap_ui_commons_ColorPicker_CircleSize";this._iCPCursorSize=parseInt(P.get(d));this._processChanges=this._processHSVChanges;this._bHSLMode=false;if(this.getDisplayMode()===l.Simplified){n.HideForDisplay.value=".hideDisplay";}this.bPressed=false;};var o=a.extend("sap.ui.unified._ColorPickerBox",{metadata:{events:{select:{parameters:{value:{type:"int"},saturation:{type:"int"}}},resize:{parameters:{size:{type:"int"}}}}},init:function(){this.bRtl=sap.ui.getCore().getConfiguration().getRTL();},exit:function(){if(this._sResizeListener){R.deregister(this._sResizeListener);}},getWidth:function(){return this.$().width();},getOffset:function(){return this.$().offset();},onBeforeRendering:function(){if(this._sResizeListener){R.deregister(this._sResizeListener);}},onAfterRendering:function(){this._handle=this.$().find("> div."+n.CPCircleClass);this._sResizeListener=R.register(this.getDomRef(),this.handleResize.bind(this));},handleResize:function(E){this.fireResize({size:E.size.width});},getHandle:function(){return this._handle;},ontouchstart:function(E){this.handleTouch(E);},ontouchend:function(E){this.handleTouch(E);},ontouchmove:function(E){this.handleTouch(E);},handleTouch:function(E){var v=this.calculateValuesFromEvent(E);if(v){this.fireSelect(v);}},calculateValuesFromEvent:function(E){var x=E.offsetX,y=E.offsetY,i,d=i=this.getWidth(),p,O;E.preventDefault&&E.preventDefault();if(!x){p=E.targetTouches?E.targetTouches[0]:E;if(!p||!p.pageX){p=E;if((!p||!p.pageX)&&E.changedTouches){p=E.changedTouches[0];}}if(!p.pageX){return false;}O=this.getOffset();x=p.pageX-O.left;y=p.pageY-O.top;}x=Math.min(Math.max(x,0),d);y=Math.min(Math.max(y,0),i);if(this.bRtl){x=d-x;}return{value:x/d*100,saturation:(1-y/i)*100};},renderer:function(d,C){d.write("<div");d.addClass(n.CPBoxClass);d.writeControlData(C);d.writeClasses();d.write(">");d.write("<div");d.writeAttribute("id",C.getId()+"-cpCur");d.addClass(n.CPCircleClass);d.writeClasses();d.write("></div>");d.write("</div>");}});m.prototype._createRowFromInput=function(i,t,d,u){var T=r.getText(t),p;p=new c({content:[L.ColorPickerHelper.factory.createLabel({text:d,tooltip:T,labelFor:i}).addStyleClass(n.LabelClass),i.setTooltip(T)]});if(u){p.addContent(L.ColorPickerHelper.factory.createLabel({text:u,labelFor:i}).addStyleClass(n.UnitLabelClass).addStyleClass(n.LabelClass));}return p;};m.prototype._updateColorStringProperty=function(F,d){var i=this._getCSSColorString();this.setProperty('colorString',i,true);if(d){this.fireLiveChange({r:this.Color.r,g:this.Color.g,b:this.Color.b,h:this.Color.h,s:this.Color.s,v:this.Color.v,l:this.Color.l,alpha:this.Color.a,hex:this.Color.hex,formatHSL:this.Color.formatHSL,colorString:i});}if(F){this.fireChange({r:this.Color.r,g:this.Color.g,b:this.Color.b,h:this.Color.h,s:this.Color.s,v:this.Color.v,l:this.Color.l,alpha:this.Color.a,hex:this.Color.hex,formatHSL:this.Color.formatHSL,colorString:i});}};m.prototype._handleCPBoxSelectEvent=function(E){var v=E.getParameter("value"),d=E.getParameter("saturation");this.oSatField.setValue(d);if(this._bHSLMode){this.oLitField.setValue(v);}else{this.oValField.setValue(v);}this._processChanges();this._updateColorStringProperty(false,true);};m.prototype._handleCPBoxResizeEvent=function(E){this._iCPBoxSize=E.getParameter("size");this._updateCursorPosition();};m.prototype._handleCPBoxTouchEndEvent=function(E){this._updateColorStringProperty(true,false);};m.prototype._createInteractionControls=function(){var i=this.getId();this.oCPBox=new o(i+"-cpBox",{select:this._handleCPBoxSelectEvent.bind(this),resize:this._handleCPBoxResizeEvent.bind(this)});this.oCPBox.addDelegate({ontouchend:this._handleCPBoxTouchEndEvent.bind(this)});this.oHexField=L.ColorPickerHelper.factory.createInput(i+"-hxF",{value:this.Color.hex.substr(1),change:this._handleHexValueChange.bind(this),ariaLabelledBy:e.getStaticId("sap.ui.unified","COLORPICKER_HEX")}).addStyleClass(n.HEXClass);this.oRedField=L.ColorPickerHelper.factory.createInput(i+"-rF",{value:this.Color.r,change:this._handleRedValueChange.bind(this),ariaLabelledBy:e.getStaticId("sap.ui.unified","COLORPICKER_RED")}).addStyleClass(n.LeftColumnInputClass);this.oGreenField=L.ColorPickerHelper.factory.createInput(i+"-gF",{value:this.Color.g,change:this._handleGreenValueChange.bind(this),ariaLabelledBy:e.getStaticId("sap.ui.unified","COLORPICKER_GREEN")}).addStyleClass(n.LeftColumnInputClass);this.oBlueField=L.ColorPickerHelper.factory.createInput(i+"-bF",{value:this.Color.b,change:this._handleBlueValueChange.bind(this),ariaLabelledBy:e.getStaticId("sap.ui.unified","COLORPICKER_BLUE")}).addStyleClass(n.LeftColumnInputClass);this.oHueField=L.ColorPickerHelper.factory.createInput(i+"-hF",{value:this.Color.h,change:this._handleHueValueChange.bind(this),ariaLabelledBy:e.getStaticId("sap.ui.unified","COLORPICKER_HUE")}).addStyleClass(n.RightColumnInputClass);this.oSatField=L.ColorPickerHelper.factory.createInput(i+"-sF",{value:this.Color.s,change:this._handleSatValueChange.bind(this),ariaLabelledBy:e.getStaticId("sap.ui.unified","COLORPICKER_SAT")+" "+e.getStaticId("sap.ui.unified","COLORPICKER_PERCENTAGE")}).addStyleClass(n.RightColumnInputClass);this.oLitField=L.ColorPickerHelper.factory.createInput(i+"-lF",{value:this.Color.l,change:this._handleLitValueChange.bind(this),ariaLabelledBy:e.getStaticId("sap.ui.unified","COLORPICKER_LIGHTNESS")+" "+e.getStaticId("sap.ui.unified","COLORPICKER_PERCENTAGE")}).addStyleClass(n.RightColumnInputClass).addStyleClass(n.HideForHSVClass);this.oAlphaField=L.ColorPickerHelper.factory.createInput(i+"-aF",{value:this.Color.a,change:this._handleAlphaValueChange.bind(this),ariaLabelledBy:e.getStaticId("sap.ui.unified","COLORPICKER_ALPHA")}).addStyleClass(n.RightColumnInputClass).addStyleClass(n.HideForHSVClass).addStyleClass("sapUnifiedA");this.oAlphaField2=L.ColorPickerHelper.factory.createInput(i+"-aF2",{value:this.Color.a,change:this._handleAlphaValueChange.bind(this),ariaLabelledBy:e.getStaticId("sap.ui.unified","COLORPICKER_ALPHA")}).addStyleClass(n.RightColumnInputClass).addStyleClass(n.HideForHSVClass).addStyleClass("sapUnifiedA");this.oValField=L.ColorPickerHelper.factory.createInput(i+"-vF",{value:this.Color.v,change:this._handleValValueChange.bind(this),ariaLabelledBy:e.getStaticId("sap.ui.unified","COLORPICKER_VALUE")}).addStyleClass(n.RightColumnInputClass).addStyleClass(n.HideForHSLClass);this.oRGBorHSLRBGroup=L.ColorPickerHelper.factory.createRadioButtonGroup({columns:2,buttons:[L.ColorPickerHelper.factory.createRadioButtonItem({text:n.RGB}),L.ColorPickerHelper.factory.createRadioButtonItem({text:L.ColorPickerMode.HSL})],select:this._handleRGBorHSLValueChange.bind(this),selectedIndex:(this.Color.formatHSL?1:0)}).addStyleClass(n.OutputSelectorClass);this.oHueInvisibleText=new e({text:r.getText("COLORPICKER_HUE_SLIDER")}).toStatic();this.addAggregation("_invisibleTexts",this.oHueInvisibleText,true);this.oSlider=L.ColorPickerHelper.factory.createSlider(i+"-hSLD",{max:360,step:1,tooltip:r.getText("COLORPICKER_HUE"),value:parseInt(this.oHueField.getValue())}).addStyleClass(n.SliderClass).addAriaLabelledBy(this.oHueInvisibleText);this.oSlider.attachEvent("liveChange","liveChange",this._handleSliderChange.bind(this));this.oSlider.attachEvent("change","change",this._handleSliderChange.bind(this));this.oAlphaInvisibleText=new e({text:r.getText("COLORPICKER_ALPHA_SLIDER")}).toStatic();this.addAggregation("_invisibleTexts",this.oAlphaInvisibleText,true);this.oAlphaSlider=L.ColorPickerHelper.factory.createSlider(i+"-aSLD",{max:1,value:1,step:0.01,tooltip:r.getText("COLORPICKER_ALPHA")}).addStyleClass(n.AlphaSliderClass).addAriaLabelledBy(this.oAlphaInvisibleText);this.oAlphaSlider.attachEvent("liveChange","liveChange",this._handleAlphaSliderChange.bind(this));this.oAlphaSlider.attachEvent("change","change",this._handleAlphaSliderChange.bind(this));};m.prototype._createLayout=function(){var i=this.getId(),d;if(this._bLayoutControlsCreated){return;}this._createInteractionControls();this.oCPBoxGD=new b({span:"L6 M6 S12"});this.icOne=new b({span:"L3 M3 S6"});this.icTwo=new b({span:"L3 M3 S6"});this.swatches=new b({span:"L3 M3 S12"});this.rbg=new b({span:"L6 M8 S12"});if(this.bResponsive){this._createUnifiedColorPicker(i);}else{d=this._createCommonsColorPicker(d,i);this.setAggregation("_grid",d,true);}this._bLayoutControlsCreated=true;if(!this.bResponsive){this._adaptControlToLibrary();}};m.prototype._adaptControlToLibrary=function(){var d;if(!this._bLayoutControlsCreated){return;}d=this.getAggregation("_grid");if(this.bResponsive){if(!D.system.phone&&!q('html').hasClass("sapUiMedia-Std-Phone")){d._setBreakPointTablet(400);}d.addStyleClass(n.CPResponsiveClass);}else{d.setProperty("hSpacing",0,true);d.setProperty("vSpacing",0,true);this.oCPBoxGD.setSpanS(5);this.icOne.setSpanS(4);this.icTwo.setSpanS(3);this.rbg.setSpanS(8);}};m.prototype._updateControlVisualState=function(){var d=this.getAggregation("_grid");if(!d){return;}if(this.bResponsive){if(this._bHSLMode){d.addStyleClass(n.HSLClass);this.swatches.setSpanM(4).setLinebreak(true);}else{d.removeStyleClass(n.HSLClass);this.swatches.setSpanM(3).setLinebreak(false);}}else{if(this._bHSLMode){d.addStyleClass(n.HSLClass);this.swatches.setSpanS(4).setLinebreak(true);}else{d.removeStyleClass(n.HSLClass);this.swatches.setSpanS(3).setLinebreak(false);}}};m.prototype._processChanges=function(){};m.prototype.setMode=function(M,S){this._bLayoutControlsCreated=false;switch(M){case L.ColorPickerMode.HSL:this._processChanges=this._processHSLChanges;break;case L.ColorPickerMode.HSV:this._processChanges=this._processHSVChanges;break;default:h.error("Control must have a valid mode set to work correct");break;}this._bHSLMode=M===L.ColorPickerMode.HSL;return this.setProperty("mode",M,S);};m.prototype.setDisplayMode=function(d){this._bLayoutControlsCreated=false;return this.setProperty("displayMode",d,false);};m.prototype._cleanup=function(){var C=[this.getAggregation("_grid"),this.getAggregation("_oCPBox"),this.getAggregation("_oHexField"),this.getAggregation("_oRedField"),this.getAggregation("_oGreenField"),this.getAggregation("_oBlueField"),this.getAggregation("_oHueField"),this.getAggregation("_oSatField"),this.getAggregation("_oLitField"),this.getAggregation("_oAlphaField"),this.getAggregation("_oAlphaField2"),this.getAggregation("_oValField"),this.getAggregation("_oSlider"),this.getAggregation("_oAlphaSlider"),this.oRGBorHSLRBUnifiedGroup,this.oCPBoxGD,this.icOne,this.icTwo,this.rbg,this.swatches,this.oAlphaInvisibleText,this.oHueInvisibleText,this.getAggregation("_oButton"),this.getAggregation("_oRGBorHSLRBUnifiedGroup"),this.oRGBorHSLRBGroup];C.forEach(function(d){if(d){d.destroy();}},this);this._bLayoutControlsCreated=false;};m.prototype.exit=function(){this._cleanup();};m.prototype.onBeforeRendering=function(){this._cleanup();this._createLayout();this._updateControlVisualState();this._updateColorString();};m.prototype._updateColorString=function(){this._parseColorString(this.getColorString());this.oHexField.setValue(this.Color.hex.substr(1));this.oRedField.setValue(this.Color.r);this.oGreenField.setValue(this.Color.g);this.oBlueField.setValue(this.Color.b);this.oHueField.setValue(this.Color.h);this.oSatField.setValue(this.Color.s);if(this._bHSLMode){this.oLitField.setValue(this.Color.l);this.oAlphaField.setValue(this.Color.a);this.oAlphaField2.setValue(this.Color.a);this.oSlider.setValue(this.Color.h);this.oAlphaSlider.setValue(this.Color.a);if(this.bResponsive){this.oRGBorHSLRBUnifiedGroup.setSelectedIndex(this.Color.formatHSL?1:0);}else{this.oRGBorHSLRBGroup.setSelectedIndex(this.Color.formatHSL?1:0);}}else{this.oValField.setValue(this.Color.v);this.oSlider.setValue(this.Color.h);this.oAlphaSlider.setValue(this.Color.a);this.oAlphaField.setValue(this.Color.a);this.oAlphaField2.setValue(this.Color.a);}this._updateColorStringProperty(true,true);};m.prototype.isColor=function(C){return this._parseColorString(C,true);};m.prototype._handleSliderChange=function(E,d){var i=parseInt(this.oSlider.getValue());this.oHueField.setValue(i);this._processChanges();this._updateColorStringProperty(d==="change",d==="liveChange");};m.prototype._handleAlphaSliderChange=function(E,d){this.Color.a=this.oAlphaSlider.getValue();if(this._bHSLMode){this.oAlphaField.setValue(this.Color.a);this.oAlphaField2.setValue(this.Color.a);}if(!this.Color.formatHSL){this._processRGBChanges();}else{this._processChanges();}this._updateColorStringProperty(d==="change",d==="liveChange");};m.prototype._getValueInRange=function(v,M,i){if(isNaN(v)){v=0;}return Math.min(Math.max(v,M),i);};m.prototype._handleAlphaValueChange=function(E){var d=(E.getParameter("id")=="cp-aF2")?parseFloat(this.oAlphaField2.getValue(),10):parseFloat(this.oAlphaField.getValue(),10);d=this._getValueInRange(d,0,1);this.Color.a=d;this.oAlphaField.setValue(d);this.oAlphaField2.setValue(d);this.oAlphaSlider.setValue(d);if(!this.Color.formatHSL){this._processRGBChanges();}else{this._processChanges();}this._updateColorStringProperty(true,true);};m.prototype._handleRGBorHSLValueChange=function(){var u=this.oRGBorHSLRBUnifiedGroup;this.Color.formatHSL=u?u.getSelectedIndex()===1:this.oRGBorHSLRBGroup.getSelectedIndex()===1;this._updateColorStringProperty(true,true);};m.prototype._handleHueValueChange=function(){var d=parseInt(this.oHueField.getValue());d=this._getValueInRange(d,0,360);this.oHueField.setValue(d);this.oSlider.setValue(d);this._processChanges();this._updateColorStringProperty(true,true);};m.prototype._handleSatValueChange=function(){var d=parseInt(this.oSatField.getValue());d=this._getValueInRange(d,0,100);this.oSatField.setValue(d);this._processChanges();this._updateColorStringProperty(true,true);};m.prototype._handleValValueChange=function(){var v=parseInt(this.oValField.getValue());v=this._getValueInRange(v,0,100);this.oValField.setValue(v);this._processHSVChanges();this._updateColorStringProperty(true,true);};m.prototype._handleLitValueChange=function(){var d=parseInt(this.oLitField.getValue());d=this._getValueInRange(d,0,100);this.oLitField.setValue(d);this._processHSLChanges();this._updateColorStringProperty(true,true);};m.prototype._handleRedValueChange=function(){var d=parseInt(this.oRedField.getValue());d=this._getValueInRange(d,0,255);this.oRedField.setValue(d);this._processRGBChanges();this._updateColorStringProperty(true,true);};m.prototype._handleGreenValueChange=function(){var d=parseInt(this.oGreenField.getValue());d=this._getValueInRange(d,0,255);this.oGreenField.setValue(d);this._processRGBChanges();this._updateColorStringProperty(true,true);};m.prototype._handleBlueValueChange=function(){var d=parseInt(this.oBlueField.getValue());d=this._getValueInRange(d,0,255);this.oBlueField.setValue(d);this._processRGBChanges();this._updateColorStringProperty(true,true);};m.prototype._processHSVChanges=function(){var d=parseInt(this.oHueField.getValue());var i=parseInt(this.oSatField.getValue());var v=parseInt(this.oValField.getValue());this._calculateRGB(d,i,v);this.Color.r=this.RGB.r;this.Color.g=this.RGB.g;this.Color.b=this.RGB.b;this.oRedField.setValue(this.Color.r);this.oGreenField.setValue(this.Color.g);this.oBlueField.setValue(this.Color.b);this._calculateHEX(this.Color.r,this.Color.g,this.Color.b);this.oHexField.setValue(this.sHexString);this.Color.hex="#"+this.oHexField.getValue();this.Color.h=d;this.Color.s=i;this.Color.v=v;this.oHueField.setValue(this.Color.h);this.oSatField.setValue(this.Color.s);this.oValField.setValue(this.Color.v);this._updateGradientBoxBackground(this.Color.h);this._updateCursorPosition();this._updateSelColorBackground();};m.prototype._processHSLChanges=function(){var i=parseInt(this.oHueField.getValue()),S=parseInt(this.oSatField.getValue()),d=parseInt(this.oLitField.getValue());if(i>360){i%=360;}this._calculateRGB(i,S,d);this.Color.r=this.RGB.r;this.Color.g=this.RGB.g;this.Color.b=this.RGB.b;this.oRedField.setValue(this.Color.r);this.oGreenField.setValue(this.Color.g);this.oBlueField.setValue(this.Color.b);this._calculateHEX(this.Color.r,this.Color.g,this.Color.b);this.oHexField.setValue(this.sHexString);this.Color.hex="#"+this.oHexField.getValue();this.Color.h=i;this.Color.s=S;this.Color.l=d;this.oHueField.setValue(this.Color.h);this.oSatField.setValue(this.Color.s);this.oLitField.setValue(this.Color.l);this._updateGradientBoxBackground(this.Color.h);this._updateCursorPosition();this._updateAlphaBackground();this._updateSelColorBackground();};m.prototype._processRGBChanges=function(){var d=Math.round(parseInt(this.oRedField.getValue())),i=Math.round(parseInt(this.oGreenField.getValue())),p=Math.round(parseInt(this.oBlueField.getValue())),t=(d+i+p)===765;this._calculateHEX(d,i,p);this.oHexField.setValue(this.sHexString);if(this._bHSLMode){this._calculateHSL(d,i,p);this.oLitField.setValue(this.Color.l);}else{if(!t){this._calculateHSV(d,i,p);}this.oValField.setValue(this.Color.v);}if(!t){this.oHueField.setValue(this.Color.h);}this.oSatField.setValue(this.Color.s);this.oSlider.setValue(parseInt(this.oHueField.getValue()));this.Color.r=d;this.Color.g=i;this.Color.b=p;this.Color.hex="#"+this.oHexField.getValue();this._updateGradientBoxBackground(this.Color.h);this._updateCursorPosition();this._updateSelColorBackground();};m.prototype._handleHexValueChange=function(){var d=this.oHexField.getValue().toLowerCase(),i=1,p;if(d.substr(0,1)==='#'){d=d.substr(1);}p=/^([0-9a-fA-F]{8})$/;if(p.test(d)!==false){i=Number((parseInt(d.substr(6,2),16)/255).toFixed(2));d=d.substr(0,6);}p=/^([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/;if(p.test(d)===false){this.oHexField.setValueState(j.Error);this.oSlider.setEnabled(false);this.oAlphaSlider.setEnabled(false);this.oHueField.setEnabled(false);this.oRedField.setEnabled(false);this.oGreenField.setEnabled(false);this.oBlueField.setEnabled(false);this.oSatField.setEnabled(false);this.oAlphaField.setEnabled(false);this.oAlphaField2.setEnabled(false);if(this._bHSLMode){this.oLitField.setEnabled(false);}else{this.oValField.setEnabled(false);}return;}else if(this.oHexField.getValueState()===j.Error){this.oHexField.setValueState(j.None);this.oSlider.setEnabled(true);this.oAlphaSlider.setEnabled(true);this.oHueField.setEnabled(true);this.oRedField.setEnabled(true);this.oGreenField.setEnabled(true);this.oBlueField.setEnabled(true);this.oSatField.setEnabled(true);this.oAlphaField.setEnabled(true);this.oAlphaField2.setEnabled(true);if(this._bHSLMode){this.oLitField.setEnabled(true);}else{this.oValField.setEnabled(true);}}if(d.length===3){d=d.charAt(0)+d.charAt(0)+d.charAt(1)+d.charAt(1)+d.charAt(2)+d.charAt(2);}this._processHexChanges(d);this.oHexField.setValue(d);this.oRedField.setValue(this.Color.r);this.oGreenField.setValue(this.Color.g);this.oBlueField.setValue(this.Color.b);this.oHueField.setValue(this.Color.h);this.oSatField.setValue(this.Color.s);if(this._bHSLMode){this.oLitField.setValue(this.Color.l);this.oAlphaField.setValue(1);this.oAlphaField2.setValue(1);}else{this.oValField.setValue(this.Color.v);}this.oSlider.setValue(parseInt(this.oHueField.getValue()));this.oAlphaSlider.setValue(i);this.Color.a=i;if(this._bHSLMode){this.oAlphaField.setValue(i);this.oAlphaField2.setValue(i);}this._updateGradientBoxBackground(this.Color.h);this._updateCursorPosition();this._updateSelColorBackground();this._updateColorStringProperty(true,true);};m.prototype._processHexChanges=function(d){this._convertRGB(d);if(this._bHSLMode){this._calculateHSL(this.Color.r,this.Color.g,this.Color.b);}else{this._calculateHSV(this.Color.r,this.Color.g,this.Color.b);}this.Color.hex="#"+d.toLowerCase();};m.prototype._updateAlphaBackground=function(){var d=[this.Color.r,this.Color.g,this.Color.b].join(","),i=B+"(left,rgba("+d+",0),rgba("+d+",1)),url("+s+")";this.oAlphaSlider.$().find(this.bResponsive?".sapMSliderInner":".sapUiSliBar").css("background-image",i);};m.prototype._updateCursorPosition=function(){var x,y;if(!this._iCPBoxSize){return;}if(this._bHSLMode){x=Math.round(this.oLitField.getValue()*this._iCPBoxSize/100.0);}else{x=Math.round(this.oValField.getValue()*this._iCPBoxSize/100.0);}if(sap.ui.getCore().getConfiguration().getRTL()){x=this._iCPBoxSize-x;}y=Math.round((1-this.oSatField.getValue()/100.0)*this._iCPBoxSize);x=Math.round(Math.max(x,0)-this._iCPCursorSize/2.0-1.0);y=Math.round(Math.max(y,0)-this._iCPCursorSize/2.0-1.0);this.$CPCur.css("left",x).css("top",y);if(sap.ui.Device.browser.edge){var d=document.getElementById(this.oCPBox.getId());d.style.verticalAlign="top";setTimeout(function(){d.style.verticalAlign="initial";},0);}};m.prototype._calculateRGB=function(d,S,v){var p,t,u,M,x,C,i;if(this._bHSLMode){this._calculateRGBAdvanced(d,S,v);return;}d%=360;d/=60;S/=100;v/=100;C=v*S;x=C*(1-Math.abs(d%2-1));M=v-C;p=0;t=0;u=0;i=Math.floor(d);switch(i){case 0:p=C;t=x;break;case 1:p=x;t=C;break;case 2:t=C;u=x;break;case 3:t=x;u=C;break;case 4:p=x;u=C;break;case 5:p=C;u=x;break;default:p=0;u=0;t=0;break;}this.RGB.r=Math.floor((p+M)*255);this.RGB.g=Math.floor((t+M)*255);this.RGB.b=Math.floor((u+M)*255);};m.prototype._calculateRGBAdvanced=function(d,S,p){var t,u,v,M,w,x,y,z,i;d=this._getValueInRange(d,0,360);d%=360;if(S>100){S=1;}else if(S<0){S=0;}else{S=S/100;}if(p>100){p=1;}else if(p<0){p=0;}else{p=p/100;}z=S*(1-Math.abs(2*p-1));y=255*(p-0.5*z);x=z*(1-Math.abs((d/60)%2-1));i=Math.floor(d/60);w=y+255*x;M=y+255*z;switch(i){case 0:t=M;u=w;v=y;break;case 1:t=w;u=M;v=y;break;case 2:t=y;u=M;v=w;break;case 3:t=y;u=w;v=M;break;case 4:t=w;u=y;v=M;break;case 5:t=M;u=y;v=w;break;default:t=0;u=0;v=0;break;}this.RGB.r=Math.round(t);this.RGB.g=Math.round(u);this.RGB.b=Math.round(v);};m.prototype._getCSSColorString=function(){if(this.Color.formatHSL){if(this.Color.a<1){return"hsla("+this.Color.h+","+this.Color.s+"%,"+this.Color.l+"%, "+this.Color.a+")";}else{return"hsl("+this.Color.h+","+this.Color.s+"%,"+this.Color.l+"%)";}}if(this.Color.a<1){return"rgba("+this.Color.r+","+this.Color.g+","+this.Color.b+", "+this.Color.a+")";}else{return"rgb("+this.Color.r+","+this.Color.g+","+this.Color.b+")";}};m.prototype._calculateHEX=function(i,d,p){var t=i.toString(16),u=d.toString(16),v=p.toString(16);if(t.length===1){t='0'+t;}if(u.length===1){u='0'+u;}if(v.length===1){v='0'+v;}this.sHexString=(t+u+v).toLowerCase();};m.prototype._calculateHSV=function(i,d,p){var t=Math.max(Math.max(i,d),p),u=Math.min(Math.min(i,d),p),v=t-u,w=Math.round(t*100/255),x=t===0.0?0:(100*v/t),y=0;if(x===0){y=0;}else if(i===t){y=60.0*(d-p)/v;}else if(d===t){y=120.0+60.0*(p-i)/v;}else if(p===t){y=240.0+60.0*(i-d)/v;}if(y<0.0){y+=359.9;}y=Math.round(y);x=Math.round(x);this.Color.h=y;this.Color.s=x;this.Color.v=w;};m.prototype._calculateHSL=function(i,p,t){var u=Math.max(i,p,t),v=Math.min(i,p,t),d=(u-v)/255,w=(u+v)/510,x=1-Math.abs(2*w-1),y=(w===0.0)?0:d/x,z=(x!==0)?y:0,A=0;w=Math.round(w*100);z=Math.round(z*100);if(w===0||z===0||(i+p+t===765)){A=0;}else{var C=u-v;if(u===i){A=((p-t)/C)%6;}if(u===p){A=(t-i)/C+2;}if(u===t){A=(i-p)/C+4;}if(C===0){A=0;}A*=60;if(A<0){A+=360;}}if(A!==0||this.Color.h!==360){this.Color.h=Math.round(A);}this.Color.s=z;this.Color.l=w;};m.prototype._convertRGB=function(d){this.Color.r=parseInt(d.substr(0,2),16);this.Color.g=parseInt(d.substr(2,2),16);this.Color.b=parseInt(d.substr(4,2),16);};m.prototype._updateGradientBoxBackground=function(i){if(this._bHSLMode){this._calculateRGBAdvanced(i,100,50);}else{this._calculateRGB(i,100,100);}this._calculateHEX(this.RGB.r,this.RGB.g,this.RGB.b);this.$CPBox.css('background-color','rgb('+[this.RGB.r,this.RGB.g,this.RGB.b].join(",")+')');};m.prototype._updateSelColorBackground=function(){this.$().find(".sapUiColorPicker-ColorPickerNewColor").css('background-color',this._getCSSColorString());};m.prototype._parseColorString=function(C,d){var i;if(C.substr(0,1)==='#'){C=C.substr(1);}C=C.trim().toLowerCase();i=this._parseColorName(C);if(i){if(d){return true;}if(i.length===8){this.Color.a=this.Color.oldA=Number((parseInt(i.substr(6,2),16)/255).toFixed(2));i=i.substring(0,6);}this._processHexChanges(i);this.Color.old=this.Color.hex;if(this._bHSLMode){this.Color.formatHSL=false;}return true;}if(/^([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/.test(C)){if(d){return true;}if(C.length===3){i=C[0]+C[0]+C[1]+C[1]+C[2]+C[2];}else{i=C;}this._processHexChanges(i);this.Color.old=this.Color.hex;if(this._bHSLMode){this.Color.formatHSL=false;}return true;}if(C.substr(0,3)==='rgb'){return this._parseRGB(C,d);}if(this._bHSLMode){return this._parseHSL(C,d);}else if(C.substr(0,3)==='hsv'){return this._parseHSV(C,d);}return false;};m.prototype._parseHSV=function(C,d){var i=/^(((\d{1,2})|([1,2]\d{2})|(3[0-5]\d)|(360)),)(((\d{1,2})|(100)),)((\d{1,2})|(100))$/,p,t,S,v;C=C.substr(3).replace("(",'').replace(")",'').split(' ').join('');if(i.test(C)===true){if(d){return true;}p=C.split(",");t=parseInt(p[0]);S=parseInt(p[1]);v=parseInt(p[2]);this._calculateRGB(t,S,v);this._calculateHEX(this.RGB.r,this.RGB.g,this.RGB.b);this.Color.r=this.RGB.r;this.Color.g=this.RGB.g;this.Color.b=this.RGB.b;this.Color.h=t;this.Color.s=S;this.Color.v=v;this.Color.hex="#"+this.sHexString;this.Color.old=this.Color.hex;return true;}return false;};m.prototype._parseHSL=function(C,d){var i,p=C.substr(0,4),t,u,S,v,A;if(p==="hsla"){t=true;}else if(p==="hsl("){t=false;}else{return false;}C=C.substr(t?4:3).replace("(",'').replace(")",'').split(' ').join('');i=C.split(",");u=parseInt(i[0]);S=parseFloat(i[1]);v=parseFloat(i[2]);if(t){A=parseFloat(i[3]);}else{if(i[3]&&parseFloat(i[3])>=0){return false;}A=1;}S=(S<1&&S>0)?S*100:S;v=(v<1&&v>0)?v*100:v;if((u>=0&&u<=360)&&(S>=0&&S<=100)&&(v>=0&&v<=100)&&(A>=0&&A<=1)){if(d){return true;}this._calculateRGB(u,S,v);this._calculateHEX(this.RGB.r,this.RGB.g,this.RGB.b);this.Color.r=this.RGB.r;this.Color.g=this.RGB.g;this.Color.b=this.RGB.b;this.Color.h=u;this.Color.s=S;this.Color.l=v;this.Color.hex="#"+this.sHexString;this.Color.old=this.Color.hex;this.Color.a=this.Color.oldA=A;this.Color.formatHSL=true;}else{return false;}return true;};m.prototype._parseRGB=function(C,d){var v,i,p,t;i=C.substring(0,4);if(i==="rgba"){t=/^(((\d{1,2})|(1\d{2})|(2[0-4]\d)|(25[0-5])),){2}(((\d{1,2})|(1\d{2})|(2[0-4]\d)|(25[0-5])),)([0]|([0]\.[0-9]+)|(\.[0-9]+)|[1])$/;p=true;}else if(i.substring(0,3)==="rgb"){t=/^(((\d{1,2})|(1\d{2})|(2[0-4]\d)|(25[0-5])),){2}(((\d{1,2})|(1\d{2})|(2[0-4]\d)|(25[0-5])))$/;p=false;}else{return false;}C=C.substr(p?4:3).replace("(",'').replace(")",'').split(' ').join('');if(t.test(C)){if(d){return true;}v=C.split(",");this._calculateHEX(parseInt(v[0]),parseInt(v[1]),parseInt(v[2]));this._processHexChanges(this.sHexString);this.Color.old=this.Color.hex;if(p){this.Color.a=this.Color.oldA=parseFloat(v[3]);}return true;}if(this._bHSLMode){this.Color.formatHSL=false;}return false;};m.prototype._parseColorName=function(C){return n.Colors[C];};m.prototype.onAfterRendering=function(){var d=this._getCSSColorString(),p=this.getParent();this.$CPBox=this.oCPBox.$();this.$CPCur=this.oCPBox.getHandle();this.$().find(".sapUiColorPicker-ColorPickerNewColor").css('background-color',d);this.$().find(".sapUiColorPicker-ColorPickerOldColor").css('background-color',d);this._updateGradientBoxBackground(this.Color.h);this._iCPBoxSize=this.oCPBox.getWidth();this._updateCursorPosition();if(this._bHSLMode){this._updateAlphaBackground();}this.oSlider.iShiftGrip=Math.round(q(this.oSlider.oGrip).outerWidth()/2);this.oAlphaSlider.iShiftGrip=Math.round(q(this.oAlphaSlider.oGrip).outerWidth()/2);if(p&&p.getMetadata().getName()==="sap.m.Dialog"){p.addStyleClass("sapUiCPDialog");}this.addStyleClass("sapUiCPDisplayRGB");if(D.system.phone){this._toggleFields();}};m.prototype.getRGB=function(){return{r:this.Color.r,g:this.Color.g,b:this.Color.b};};m.prototype._getConstants=function(){return n;};m.prototype._createCommonsColorPicker=function(d,i){d=new G({containerQuery:true,content:[this.oCPBox.setLayoutData(this.oCPBoxGD),new V({content:[this._createRowFromInput(this.oRedField,"COLORPICKER_RED","R:"),this._createRowFromInput(this.oGreenField,"COLORPICKER_GREEN","G:"),this._createRowFromInput(this.oBlueField,"COLORPICKER_BLUE","B:"),this._createRowFromInput(this.oHexField,"COLORPICKER_HEX","#:")],layoutData:this.icOne}),new V({content:[this._createRowFromInput(this.oHueField,"COLORPICKER_HUE","H:"),this._createRowFromInput(this.oSatField,"COLORPICKER_SAT","S:","%"),this._createRowFromInput(this.oLitField,"COLORPICKER_LIGHTNESS","L:","%").addStyleClass(n.HideForHSVClass),this._createRowFromInput(this.oAlphaField,"COLORPICKER_ALPHA","A:").addStyleClass(n.HideForHSVClass),this._createRowFromInput(this.oAlphaField2,"COLORPICKER_ALPHA","A:").addStyleClass(n.HideForHSVClass),this._createRowFromInput(this.oValField,"COLORPICKER_VALUE","V:").addStyleClass(n.HideForHSLClass)],layoutData:this.icTwo}).addStyleClass(n.LastColumnClass),new c({content:[new H({content:["<div id='",i,"-ocBox' class='",n.OldColorClass,"'></div>"].join("")}),new H({content:["<div id='",i,"-ncBox' class='",n.NewColorClass,"'></div>"].join("")})],layoutData:this.swatches}).addStyleClass(n.SwatchesClass),new c({content:[L.ColorPickerHelper.factory.createLabel({text:"Output:",labelFor:this.oRGBorHSLRBGroup}),this.oRGBorHSLRBGroup],layoutData:this.rbg}).addStyleClass(n.HideForHSVClass).addStyleClass(n.OutputSelectorRowClass),this.oSlider.setLayoutData(new b({span:"L6 M6 S12",linebreak:true})),this.oAlphaSlider.setLayoutData(new b({span:"L6 M6 S12"}))]}).addStyleClass(n.CPMatrixClass);return d;};m.prototype._createUnifiedColorPicker=function(i){var t=this;this.oRbRGB=L.ColorPickerHelper.factory.createRadioButtonItem({tooltip:r.getText("COLORPICKER_SELECT_RGB_TOOLTIP")});this.oRbRGB.addStyleClass("sapUiCPRB");this.oRbHSLV=L.ColorPickerHelper.factory.createRadioButtonItem({tooltip:r.getText("COLORPICKER_SELECT_HSL_TOOLTIP")});this.oRbHSLV.addStyleClass("sapUiCPRB");this.oButton=L.ColorPickerHelper.factory.createButton(i+"-toggleMode",{type:D.system.phone?"Default":"Transparent",tooltip:r.getText("COLORPICKER_TOGGLE_BTN_TOOLTIP"),icon:"sap-icon://source-code",press:function(E){t._toggleFields();}});this.setAggregation("_oButton",this.oButton,true);this.oRGBorHSLRBUnifiedGroup=L.ColorPickerHelper.factory.createRadioButtonGroup({select:this._handleRGBorHSLValueChange.bind(this),selectedIndex:(this.Color.formatHSL?1:0)});this.oRGBorHSLRBUnifiedGroup.addButton(this.oRbRGB);this.oRGBorHSLRBUnifiedGroup.addButton(this.oRbHSLV);this.setAggregation("_oRGBorHSLRBUnifiedGroup",this.oRGBorHSLRBUnifiedGroup,true);this.setAggregation("_oCPBox",this.oCPBox,true);this.setAggregation("_oHexField",this.oHexField,true);this.setAggregation("_oRedField",this.oRedField,true);this.setAggregation("_oGreenField",this.oGreenField,true);this.setAggregation("_oBlueField",this.oBlueField,true);this.setAggregation("_oHueField",this.oHueField,true);this.setAggregation("_oSatField",this.oSatField,true);this.setAggregation("_oLitField",this.oLitField,true);this.setAggregation("_oAlphaField",this.oAlphaField,true);this.setAggregation("_oAlphaField2",this.oAlphaField2,true);this.setAggregation("_oValField",this.oValField,true);this.setAggregation("_oSlider",this.oSlider,true);this.setAggregation("_oAlphaSlider",this.oAlphaSlider,true);};m.prototype._toggleFields=function(){if(!D.system.phone){this.toggleStyleClass("sapUiCPDisplayRGB",this.bPressed);this.bPressed=!this.bPressed;}else{switch(this.sVisibleFiled){case"HSL":this.removeStyleClass("sapUiCPHexVisible");this.toggleStyleClass("sapUiCPDisplayRGB",false);this.addStyleClass("sapUiCPHideHex");this.sVisibleFiled="RGB";break;case"RGB":this.removeStyleClass("sapUiCPHexVisible");this.addStyleClass("sapUiCPHideHex");this.toggleStyleClass("sapUiCPDisplayRGB",true);this.sVisibleFiled="Hex";break;case"Hex":default:this.addStyleClass("sapUiCPHexVisible");this.removeStyleClass("sapUiCPHideHex");this.sVisibleFiled="HSL";break;}}};return m;});
