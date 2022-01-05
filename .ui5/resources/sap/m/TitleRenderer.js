/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/Renderer","sap/ui/core/library","sap/m/HyphenationSupport"],function(R,c,H){"use strict";var T=c.TextDirection;var a=c.TitleLevel;var b={apiVersion:2};b.render=function(r,t){var A=t._getTitle(),o=t.getContent(),l=(A&&!o?A.getLevel():t.getLevel())||a.Auto,d=l==a.Auto,s=d?"div":l.toLowerCase(),e=!o?H.getTextForRender(t,"main"):"",f=t.getTextDirection(),g=R.getTextAlign(t.getTextAlign(),f),h;r.openStart(s,t);r.class("sapMTitle");r.class("sapMTitleStyle"+t.getTitleStyle());r.class(t.getWrapping()?"sapMTitleWrap":"sapMTitleNoWrap");r.class("sapUiSelectable");var w=t.getWidth();if(!w){r.class("sapMTitleMaxWidth");}else{r.style("width",w);}if(g){r.style("text-align",g);}if(t.getParent()instanceof sap.m.Toolbar){r.class("sapMTitleTB");}h=A&&!o?A.getTooltip_AsString():t.getTooltip_AsString();if(h){r.attr("title",h);}if(d){r.attr("role","heading");r.attr("aria-level",t._getAriaLevel());}if(!o){H.writeHyphenationClass(r,t);}r.openEnd();r.openStart("span",t.getId()+"-inner");r.attr("dir",f!==T.Inherit?f.toLowerCase():"auto");r.openEnd();if(o){r.renderControl(o);}else{r.text(e);}r.close("span");r.close(s);};return b;},true);
