/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['./library'],function(l){"use strict";var I={apiVersion:2};var T=l.TabsOverflowMode;I.render=function(r,c){if(!c.getVisible()){return;}var s=c.getId(),a=c.getItems(),v=c.getVisibleTabFilters().length,V=0,t=c._checkTextOnly(),n=c._checkNoText(a),b=c._checkInLine(a)||c.isInlineMode();var o=c.getParent(),u=o&&o.isA('sap.m.IconTabBar')&&o.getUpperCase(),A=c.getAriaTexts()||{};r.openStart("div",c).class("sapMITH").class("sapContrastPlus").class("sapMITHBackgroundDesign"+c.getBackgroundDesign());if(u){r.class("sapMITBTextUpperCase");}if(t){r.class("sapMITBTextOnly");}if(n){r.class("sapMITBNoText");}if(b){r.class("sapMITBInLine");}r.accessibilityState(c,{role:"navigation"});if(A.headerLabel){r.accessibilityState(c,{label:A.headerLabel});}r.openEnd();if(a.length&&c.getTabsOverflowMode()===T.StartAndEnd){r.openStart("div").class("sapMITHStartOverflow").openEnd();c._getStartOverflow().render(r);r.close("div");}if(A.headerDescription){r.renderControl(c._getInvisibleHeadText());}r.openStart("div",s+"-head").class("sapMITBHead");r.accessibilityState({role:"tablist",orientation:"horizontal"});if(A.headerDescription){r.accessibilityState({describedby:c._getInvisibleHeadText().getId()});}r.openEnd();for(var i=0;i<a.length;i++){var d=a[i];d.render(r,V,v);if(d.isA("sap.m.IconTabFilter")){if(d.getVisible()){V++;}}}r.close("div");if(a.length){r.openStart("div").class("sapMITHEndOverflow").openEnd();c._getOverflow().render(r);r.close("div");}r.close("div");};return I;},true);
