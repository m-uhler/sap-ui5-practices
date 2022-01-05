/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define([],function(){"use strict";var E={};E.render=function(r,c){var s=c.getSubLists();var a=c._getAtt();if(!a){return;}var I=c._isTop();r.write("<div");r.writeControlData(c);r.addClass("sapUiUx3ExactLst");var A=false;var t=false;if(I){var b=c.getParent();if(b){if(b.hasOptionsMenu){A=b.hasOptionsMenu();if(A){r.addClass("sapUiUx3ExactLstTopActive");}}if(b.getShowTopList&&!b.getShowTopList()){r.addClass("sapUiUx3ExactLstTopHidden");t=true;}}r.addClass("sapUiUx3ExactLstTop");r.addStyle("height",c.getTopHeight()+"px");}if(c._bCollapsed){r.addClass("sapUiUx3ExactLstCollapsed");}r.addClass("sapUiUx3ExactLstLvl_"+c._iLevel);r.writeClasses();r.writeStyles();r.write(">");if(t){r.write("<div id=\""+c.getId()+"-foc\" class=\"sapUiUx3ExactLstFoc\" tabindex=\"0\"></div>");}if(!c._bPopupOpened){r.write("<div id=\""+c.getId()+"-lst\" class=\"sapUiUx3ExactLstLst\"");if(c._bCollapsed&&c._oCollapseStyles&&c._oCollapseStyles["lst"]){r.write(" style=\""+c._oCollapseStyles["lst"]+"\"");}r.write(">");r.renderControl(c._lb);r.write("<a id=\""+c.getId()+"-exp\" class=\"sapUiUx3ExactLstExp\">"+this.getExpanderSymbol(false,false)+"</a>");r.write("</div>");}else{c._bRefreshList=true;}r.write("<div id=\""+c.getId()+"-cntnt\" ");r.write("class=\"sapUiUx3ExactLstCntnt");if(s.length==0){r.write(" sapUiUx3ExactLstCntntEmpty");}r.write("\"");if(c._bCollapsed&&c._oCollapseStyles&&c._oCollapseStyles["cntnt"]){r.write(" style=\""+c._oCollapseStyles["cntnt"]+"\"");}r.write(">");for(var i=0;i<s.length;i++){r.renderControl(s[i]);}r.write("</div>");r.write("<header id=\""+c.getId()+"-head\" class=\"sapUiUx3ExactLstHead\"");if(I&&A){r.write(" role=\"button\" aria-haspopup=\"true\"");}if(!I&&c._bCollapsed&&a){r.writeAttribute("role","region");r.writeAttribute("aria-expanded","false");r.writeAttributeEscaped("aria-label",c._rb.getText("EXACT_LST_LIST_COLL_ARIA_LABEL",[c._iLevel,a.getText()]));}r.write(" tabindex=\""+(I?"0":"-1")+"\">");if(I){r.write("<h3 id=\""+c.getId()+"-head-txt\" class=\"sapUiUx3ExactLstHeadTopTxt\"><span class=\"sapUiUx3ExactLstHeadTopTxtTxt\">");if(c.getTopTitle()){r.writeEscaped(c.getTopTitle());}r.write("</span>");if(A){r.write("<span class=\"sapUiUx3ExactLstHeadTopIco\"></span>");}r.write("</h3>");}else{r.write("<h3 id=\""+c.getId()+"-head-txt\" class=\"sapUiUx3ExactLstHeadTxt\"");if(a&&a.getTooltip_AsString()){r.writeAttributeEscaped("title",a.getTooltip_AsString());}else if(a&&a.getText()){r.writeAttributeEscaped("title",a.getText());}if(c._bCollapsed&&c._oCollapseStyles&&c._oCollapseStyles["head-txt"]){r.write(" style=\""+c._oCollapseStyles["head-txt"]+"\"");}r.write(">");if(a){r.writeEscaped(a.getText());}r.write("</h3>");r.write("<div id=\""+c.getId()+"-head-action\" class=\"sapUiUx3ExactLstHeadAct"+(c.getShowClose()?"":" sapUiUx3ExactLstHeadActNoClose")+"\">");r.write("<a id=\""+c.getId()+"-hide\" class=\"sapUiUx3ExactLstHide\" role=\"presentation\"");r.writeAttributeEscaped("title",c._rb.getText(c._bCollapsed?"EXACT_LST_LIST_EXPAND":"EXACT_LST_LIST_COLLAPSE"));r.write(">",this.getExpanderSymbol(!c._bCollapsed,true),"</a>");r.write("<a id=\""+c.getId()+"-close\" role=\"presentation\" class=\"sapUiUx3ExactLstClose\"");r.writeAttributeEscaped("title",c._rb.getText("EXACT_LST_LIST_CLOSE"));r.write(">X</a>");r.write("</div>");}r.write("</header>");r.write("<div id=\""+c.getId()+"-rsz\" class=\"sapUiUx3ExactLstRSz\"></div>");r.write("</div>");};E.getExpanderSymbol=function(e,h){if(h){if(sap.ui.getCore().getConfiguration().getRTL()){return e?"&#9654;":"&#9664;";}else{return e?"&#9664;":"&#9654;";}}else{return e?"&#9650;":"&#9660;";}};return E;},true);
