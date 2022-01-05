/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['./library','./Button','./ScrollContainer','sap/ui/core/Core','sap/ui/core/Control','sap/ui/Device','sap/m/HeaderContainerItemNavigator','sap/ui/core/delegate/ItemNavigation','sap/ui/core/library','sap/ui/core/IntervalTrigger','sap/ui/core/Icon','./HeaderContainerRenderer',"sap/base/Log","sap/ui/events/PseudoEvents","sap/ui/thirdparty/jquery","sap/ui/dom/jquery/control","sap/ui/dom/jquery/scrollLeftRTL","sap/ui/dom/jquery/scrollRightRTL","sap/ui/dom/jquery/Selectors"],function(l,B,S,C,a,D,H,I,c,b,d,e,L,P,q){"use strict";var O=c.Orientation;var f=a.extend("sap.m.HeaderContainerItemContainer",{metadata:{defaultAggregation:"item",properties:{position:{type:"int",defaultValue:null},setSize:{type:"int",defaultValue:null},ariaLabelledBy:{type:"string",defaultValue:null}},aggregations:{item:{type:"sap.ui.core.Control",multiple:false}}},renderer:function(r,o){var i=o.getAggregation("item");if(!i||!i.getVisible()){return;}r.write("<div");r.writeControlData(o);r.addClass("sapMHdrCntrItemCntr");r.addClass("sapMHrdrCntrInner");r.writeAttribute("aria-setsize",o.getSetSize());r.writeAttribute("aria-posinset",o.getPosition());r.writeAttribute("role","listitem");if(o.getAriaLabelledBy()){r.writeAttributeEscaped("aria-labelledby",o.getAriaLabelledBy());}r.writeClasses();r.write(">");r.renderControl(i);r.write("</div>");}});var g=a.extend("sap.m.HeaderContainer",{metadata:{interfaces:["sap.m.ObjectHeaderContainer"],library:"sap.m",properties:{scrollStep:{type:"int",defaultValue:300,group:"Behavior"},scrollStepByItem:{type:"int",defaultValue:1,group:"Behavior"},scrollTime:{type:"int",defaultValue:500,group:"Behavior"},showOverflowItem:{type:"boolean",defaultValue:true,group:"Behavior"},showDividers:{type:"boolean",defaultValue:true,group:"Appearance"},orientation:{type:"sap.ui.core.Orientation",defaultValue:O.Horizontal,group:"Appearance"},backgroundDesign:{type:"sap.m.BackgroundDesign",defaultValue:l.BackgroundDesign.Transparent,group:"Appearance"},width:{type:"sap.ui.core.CSSSize",group:"Appearance"},height:{type:"sap.ui.core.CSSSize",group:"Appearance"}},defaultAggregation:"content",aggregations:{content:{type:"sap.ui.core.Control",multiple:true},_scrollContainer:{type:"sap.m.ScrollContainer",multiple:false,visibility:"hidden"},_prevButton:{type:"sap.ui.core.Control",multiple:false,visibility:"hidden"},_nextButton:{type:"sap.ui.core.Control",multiple:false,visibility:"hidden"}},associations:{ariaLabelledBy:{type:"sap.ui.core.Control",multiple:true,singularName:"ariaLabelledBy"}},events:{scroll:{}}}});g.prototype.init=function(){this._aItemEnd=[];this._bRtl=sap.ui.getCore().getConfiguration().getRTL();this._oRb=sap.ui.getCore().getLibraryResourceBundle("sap.m");this._oScrollCntr=new S(this.getId()+"-scrl-cntnr",{width:"100%",height:"100%",horizontal:!D.system.desktop});this.setAggregation("_scrollContainer",this._oScrollCntr,true);if(D.system.desktop){this._oArrowPrev=new B({id:this.getId()+"-scrl-prev-button",type:l.ButtonType.Transparent,tooltip:this._oRb.getText("HEADERCONTAINER_BUTTON_PREV_SECTION"),press:function(E){E.cancelBubble();this._scroll(this._getScrollValue(false),this.getScrollTime());}.bind(this)}).addStyleClass("sapMHdrCntrBtn").addStyleClass("sapMHdrCntrLeft");this._oArrowPrev._bExcludeFromTabChain=true;this.setAggregation("_prevButton",this._oArrowPrev,true);this._oArrowNext=new B({id:this.getId()+"-scrl-next-button",type:l.ButtonType.Transparent,tooltip:this._oRb.getText("HEADERCONTAINER_BUTTON_NEXT_SECTION"),press:function(E){E.cancelBubble();this._scroll(this._getScrollValue(true),this.getScrollTime());}.bind(this)}).addStyleClass("sapMHdrCntrBtn").addStyleClass("sapMHdrCntrRight");this._oArrowNext._bExcludeFromTabChain=true;this.setAggregation("_nextButton",this._oArrowNext,true);}else if(D.system.phone||D.system.tablet){this._oArrowPrev=new d({id:this.getId()+"-scrl-prev-button"}).addStyleClass("sapMHdrCntrBtn").addStyleClass("sapMHdrCntrLeft");this.setAggregation("_prevButton",this._oArrowPrev,true);this._oArrowNext=new d({id:this.getId()+"-scrl-next-button"}).addStyleClass("sapMHdrCntrBtn").addStyleClass("sapMHdrCntrRight");this.setAggregation("_nextButton",this._oArrowNext,true);}this._oScrollCntr.addDelegate({onAfterRendering:function(){if(D.system.desktop){var F=this._oScrollCntr.getDomRef("scroll");var o=this._oScrollCntr.$("scroll");var h=o.find(".sapMHrdrCntrInner").attr("tabindex","0");F.setAttribute("role","list");if(!this._oItemNavigation){this._oItemNavigation=new H();this.addDelegate(this._oItemNavigation);this._oItemNavigation.attachEvent(I.Events.BorderReached,this._handleBorderReached,this);this._oItemNavigation.attachEvent(I.Events.AfterFocus,this._handleAfterFocus,this);this._oItemNavigation.attachEvent(I.Events.BeforeFocus,this._handleBeforeFocus,this);if(D.browser.msie||D.browser.edge){this._oItemNavigation.attachEvent(I.Events.FocusAgain,this._handleFocusAgain,this);}}this._oItemNavigation.setRootDomRef(F);this._oItemNavigation.setItemDomRefs(h);this._oItemNavigation.setTabIndex0();this._oItemNavigation.setCycling(false);this._handleMobileScrolling();}}.bind(this)});b.addListener(this._checkOverflow,this);};g.prototype.onBeforeRendering=function(){if(!this.getHeight()){L.warning("No height provided",this);}if(!this.getWidth()){L.warning("No width provided",this);}if(D.system.desktop){this._oArrowPrev.setIcon(this.getOrientation()===O.Horizontal?"sap-icon://slim-arrow-left":"sap-icon://slim-arrow-up");this._oArrowNext.setIcon(this.getOrientation()===O.Horizontal?"sap-icon://slim-arrow-right":"sap-icon://slim-arrow-down");}else if(D.system.phone||D.system.tablet){this._oArrowPrev.setSrc(this.getOrientation()===O.Horizontal?"sap-icon://slim-arrow-left":"sap-icon://slim-arrow-up");this._oArrowNext.setSrc(this.getOrientation()===O.Horizontal?"sap-icon://slim-arrow-right":"sap-icon://slim-arrow-down");}};g.prototype.onAfterRendering=function(){this._bRtl=sap.ui.getCore().getConfiguration().getRTL();this._checkOverflow();};g.prototype.exit=function(){if(this._oItemNavigation){this.removeDelegate(this._oItemNavigation);this._oItemNavigation.destroy();this._oItemNavigation=null;}b.removeListener(this._checkOverflow,this);};g.prototype.onsaptabnext=function(E){var F=this.$().find(":focusable");var t=F.index(E.target);var n=F.eq(t+1).get(0);var o=this._getParentCell(E.target);var T;if(n){T=this._getParentCell(n);}if((o&&T&&o.id!==T.id)||(n&&n.id===this.getId()+"-after")||(n&&n.id===this.getId()+"-scrl-prev-button")||(n&&n.id===this.getId()+"-scrl-next-button")){var h=F.last().get(0);if(h){this._bIgnoreFocusIn=true;h.focus();}}};g.prototype.onsaptabprevious=function(E){this.$().find(".sapMHdrCntrItemCntr").css("border-color","");var F=this.$().find(":focusable");var t=F.index(E.target);var p=F.eq(t-1).get(0);var o=this._getParentCell(E.target);var T;if(p){T=this._getParentCell(p);}if(!T||o&&o.id!==T.id){var s=this.$().attr("tabindex");this.$().attr("tabindex","0");this.$().trigger("focus");if(!s){this.$().removeAttr("tabindex");}else{this.$().attr("tabindex",s);}}};g.prototype.setOrientation=function(v){this.setProperty("orientation",v);if(v===O.Horizontal&&!D.system.desktop){this._oScrollCntr.setHorizontal(true);this._oScrollCntr.setVertical(false);}else if(!D.system.desktop){this._oScrollCntr.setHorizontal(false);this._oScrollCntr.setVertical(true);}return this;};g.prototype.validateAggregation=function(A,o,m){return this._callSuperMethod("validateAggregation",A,o,m);};g.prototype.getAggregation=function(A,o,s){return this._callSuperMethod("getAggregation",A,o,s);};g.prototype.setAggregation=function(A,o,s){return this._callSuperMethod("setAggregation",A,o,s);};g.prototype.indexOfAggregation=function(A,o){return this._callSuperMethod("indexOfAggregation",A,o);};g.prototype.insertAggregation=function(A,o,i,s){return this._callSuperMethod("insertAggregation",A,o,i,s);};g.prototype.addAggregation=function(A,o,s){return this._callSuperMethod("addAggregation",A,o,s);};g.prototype.removeAggregation=function(A,o,s){return this._callSuperMethod("removeAggregation",A,o,s);};g.prototype.removeAllAggregation=function(A,s){return this._callSuperMethod("removeAllAggregation",A,s);};g.prototype.destroyAggregation=function(A,s){return this._callSuperMethod("destroyAggregation",A,s);};g.prototype._setScrollInProcess=function(v){this.bScrollInProcess=v;};g.prototype._scroll=function(i,h){this._setScrollInProcess(true);this.fireScroll();setTimeout(this._setScrollInProcess.bind(this,false),h+300);if(this.getOrientation()===O.Horizontal){this._hScroll(i,h);}else{this._vScroll(i,h);}};g.prototype._vScroll=function(h,i){var o=this._oScrollCntr.getDomRef(),s=o.scrollTop,j=o.scrollHeight,k=s+h,m=o.clientHeight,p=parseFloat(this.$("scroll-area").css("padding-top")),r;if(k<=0){r=this._calculateRemainingScrolling(h,i,s);this.$("scroll-area").css("transition","padding "+r+"s");this.$().removeClass("sapMHrdrTopPadding");}else if(k+m+p>=j){r=this._calculateRemainingScrolling(h,i,j-m-s);this.$("scroll-area").css("transition","padding "+r+"s");if(m+h>j&&m!==j){this.$().removeClass("sapMHrdrBottomPadding");this.$().addClass("sapMHrdrTopPadding");}else{this.$().removeClass("sapMHrdrBottomPadding");}}else{this.$("scroll-area").css("transition","padding "+i/1000+"s");}this._oScrollCntr.scrollTo(0,k,i);};g.prototype._hScroll=function(h,i){var o=this._oScrollCntr.getDomRef();var s,j,k,m,p,r;if(!this._bRtl){j=o.scrollLeft;m=o.scrollWidth;k=o.clientWidth+(D.browser.msie?1:0);s=j+h;p=parseFloat(this.$("scroll-area").css("padding-left"));if(s<=0){r=this._calculateRemainingScrolling(h,i,j);this.$("scroll-area").css("transition","padding "+r+"s");this.$().removeClass("sapMHrdrLeftPadding");}else if(s+o.clientWidth+p>=m){r=this._calculateRemainingScrolling(h,i,m-k-j);this.$("scroll-area").css("transition","padding "+r+"s");if(k+h>m&&k!==m){this.$().removeClass("sapMHrdrRightPadding");this.$().addClass("sapMHrdrLeftPadding");}else{this.$().removeClass("sapMHrdrRightPadding");}}else{this.$("scroll-area").css("transition","padding "+i/1000+"s");}this._oScrollCntr.scrollTo(s,0,i);}else{s=q(o).scrollRightRTL()+h;this._oScrollCntr.scrollTo((s>0)?s:0,0,i);}};g.prototype._collectItemSize=function(){var s=0,h=this._filterVisibleItems(),F=this.getOrientation()===O.Horizontal?"outerWidth":"outerHeight";this._aItemEnd=[];h.forEach(function(o,i){s+=o.$().parent()[F](true);this._aItemEnd[i]=s;},this);};g.prototype._getScrollValue=function(F){if(!this._oScrollCntr){return 0;}var h=this.getOrientation()===O.Horizontal,$=this._oScrollCntr.$(),j=this.$("prev-button-container"),m=this.$("next-button-container"),s=h?$[0].scrollLeft:$[0].scrollTop,t=0,n=0,o,p=this._filterVisibleItems();var G=function(k){var n=0,u=0;var v=10;if(this._bRtl&&h){if(!j.is(":visible")){u=j.width();}if(!m.is(":visible")){u=m.width();}}for(var i=0;i<p.length&&i<k;i++){n+=r(p[i]);}return n!==0?n+v-u:0;}.bind(this);var r=function(k){return h?k.$().parent().outerWidth(true):k.$().parent().outerHeight(true);};var E=function(){var n=this._getSize(true),M,A=0;for(var i=t;i<p.length;i++){if(!p[i].$().is(":visible")){M=r(p[i])+G(i)-n-s;for(var k=t;k<p.length&&k<i;k++){if(o+A>M){break;}t++;A+=r(p[k]);}o+=A;break;}}}.bind(this);if(this.getScrollStepByItem()>0){s=h&&this._bRtl?$.scrollRightRTL():s;for(var i=0;i<p.length;i++){n+=r(p[i]);if(n>=s){t=i;break;}}t=(F?1:-1)*this.getScrollStepByItem()+t;if(t<0){t=0;}if(t>=p.length){t=p.length-1;}o=G(t)-s;if(F&&!this.getShowOverflowItem()){E();}return o;}return F?this.getScrollStep():-this.getScrollStep();};g.prototype._calculateRemainingScrolling=function(h,i,j){return Math.abs(j*i/(1000*h));};g.prototype._checkOverflow=function(){if(this.getOrientation()===O.Horizontal){this._checkHOverflow();}else{this._checkVOverflow();}};g.prototype._filterVisibleItems=function(){return this.getContent().filter(function(i){return i.getVisible();});};g.prototype._getFirstItemOffset=function(t){var F=this._filterVisibleItems()[0],$=F&&F.$(),h=$&&$.parent(),i=h&&h[0]&&h[0][t];return i||0;};g.prototype._checkVOverflow=function(){var o=this._oScrollCntr.getDomRef(),h,$;if(o){var F=this._getFirstItemOffset("offsetTop");var s=Math.ceil(o.scrollTop);var i=false;var j=false;var r=o.scrollHeight;var k=o.offsetHeight;if(Math.abs(r-k)===1){r=k;}if(s>F){i=true;}if((r>k)&&(s+k<r)){j=true;}j=this._checkForOverflowItem(j);$=this.$("prev-button-container");h=$.is(":visible");if(h&&!i){$.hide();this.$().removeClass("sapMHrdrTopPadding");}if(!h&&i){$.show();this.$().addClass("sapMHrdrTopPadding");}$=this.$("next-button-container");var m=$.is(":visible");if(m&&!j){$.hide();this.$().removeClass("sapMHrdrBottomPadding");}if(!m&&j){$.show();this.$().addClass("sapMHrdrBottomPadding");}}};g.prototype._handleMobileScrolling=function(){if(C.isMobile()){var $=this.$("scrl-cntnr-scroll"),i=this.getOrientation()===O.Horizontal,p=i?"clientX":"clientY",h=0,t=this,s=false;$.on("touchstart",function(E){s=true;h=E.targetTouches[0][p];});$.on("touchmove",function(E){if(s){var j=E.targetTouches[0][p],k=h-j,o=t._oScrollCntr.getDomRef();i?o.scrollLeft+=k:o.scrollTop+=k;h=j;E.preventDefault();}});$.on("touchend",function(){s=false;});}};g.prototype._checkHOverflow=function(){var o=this._oScrollCntr.getDomRef(),$;if(o){var F=this._getFirstItemOffset("offsetLeft");var s=Math.ceil(o.scrollLeft);var h=false;var i=false;var r=o.scrollWidth;var j=o.offsetWidth;if(Math.abs(r-j)===1){r=j;}if(this._bRtl){var k=q(o).scrollLeftRTL();if(k>((D.browser.msie||D.browser.edge)?1:0)){i=true;}}else if(s>F){h=true;}if(r-5>j){if(this._bRtl){if(q(o).scrollRightRTL()>1){h=true;}}else if(s+j<r){i=true;}}$=this.$("prev-button-container");i=this._checkForOverflowItem(i);var m=$.is(":visible");if(m&&!h){$.hide();this.$().removeClass("sapMHrdrLeftPadding");}if(!m&&h){$.show();this.$().addClass("sapMHrdrLeftPadding");}$=this.$("next-button-container");var n=$.is(":visible");if(n&&!i){$.hide();this.$().removeClass("sapMHrdrRightPadding");}if(!n&&i){$.show();this.$().addClass("sapMHrdrRightPadding");}}};g.prototype._getSize=function(A){var $=this._oScrollCntr.$(),h=this.getOrientation()===O.Horizontal,i=this.$("next-button-container"),j=!i.is(":visible")&&A,F=h?"width":"height";return $[F]()-(j?i[F]():0);};g.prototype._checkForOverflowItem=function(s){if(this._oScrollCntr&&!this.getShowOverflowItem()){var $=this._oScrollCntr.$(),h=this.getOrientation()===O.Horizontal,j=!h?$[0].scrollTop:(this._bRtl?$.scrollRightRTL():$[0].scrollLeft),F=h?"width":"height",k=this._getSize(s),m=this._filterVisibleItems();this._collectItemSize();this._aItemEnd.forEach(function(E,i){var n=m[i].$(),o=n.parent(),v=n.is(":visible");if(s&&E>j+k){if(i===0||this._aItemEnd[i-1]<=j){o.css(F,"auto");n.show();}else if(v){o[F](o[F]());n.hide();s=true;}}else{if(!v){o.css(F,"auto");n.show();}}},this);}return s;};g.prototype._handleBorderReached=function(E){if(D.browser.msie&&this.bScrollInProcess){return;}var i=E.getParameter("index");if(i===0){this._scroll(this._getScrollValue(false),this.getScrollTime());}else if(i===this._filterVisibleItems().length-1){this._scroll(this._getScrollValue(true),this.getScrollTime());}};g.prototype._handleAfterFocus=function(E){var s=E.getParameter("event");if((D.browser.msie||D.browser.edge)&&s.type==="mousedown"&&s.srcControl instanceof sap.m.Input){s.srcControl.focus();}if(D.browser.msie&&this.bScrollInProcess){return;}var i=E.getParameter("index");if(i===0){this._scroll(this._getScrollValue(false),this.getScrollTime());}else if(i===this._filterVisibleItems().length-1){this._scroll(this._getScrollValue(true),this.getScrollTime());}};g.prototype._handleFocusAgain=function(E){var s=E.getParameter("event");if((D.browser.msie||D.browser.edge)&&s.type==="mousedown"&&s.srcControl instanceof sap.m.Input){s.srcControl.focus();}E.getParameter("event").preventDefault();};g.prototype._handleBeforeFocus=function(E){var o=E.getParameter("event");if(q(o.target).hasClass("sapMHdrCntrItemCntr")||q(o.target).hasClass("sapMScrollContScroll")||P.events.sapprevious.fnCheck(o)||P.events.sapnext.fnCheck(o)){this.$().find(".sapMHdrCntrItemCntr").css("border-color","");}else{this.$().find(".sapMHdrCntrItemCntr").css("border-color","transparent");}};g.prototype._unWrapHeaderContainerItemContainer=function(w){if(w instanceof f){w=w.getItem();}else if(Array.isArray(w)){for(var i=0;i<w.length;i++){if(w[i]instanceof f){w[i]=w[i].getItem();}}}return w;};g._AGGREGATION_FUNCTIONS=["validateAggregation","getAggregation","setAggregation","indexOfAggregation","removeAggregation"];g._AGGREGATION_FUNCTIONS_FOR_INSERT=["insertAggregation","addAggregation"];g.prototype._callSuperMethod=function(F,A){var h=Array.prototype.slice.call(arguments);if(A==="content"){var o=h[2];h[1]="content";if(o instanceof a){if(g._AGGREGATION_FUNCTIONS.indexOf(F)>-1&&o.getParent()instanceof f){h[2]=o.getParent();}else if(g._AGGREGATION_FUNCTIONS_FOR_INSERT.indexOf(F)>-1){h[2]=new f({item:o});}}var j=[];this._oScrollCntr.getContent().forEach(function(o,s){if(!o.getItem()){j.push(s);}});for(var i=0;i<j.length;i++){this._oScrollCntr.removeContent(j[i]);}var r=this._oScrollCntr[F].apply(this._oScrollCntr,h.slice(1));if(F!=="removeAllAggregation"){var k=this._oScrollCntr.getContent();var m=this.getAriaLabelledBy();var p=1;var v=k.filter(function(s){return s.getItem().getVisible();}).length;for(var i=0;i<k.length;i++){var n=k[i];if(n.getItem().getVisible()){n.setVisible(true);n.setPosition(p);n.setSetSize(v);n.setAriaLabelledBy(m[i]);p++;}else{n.setVisible(false);}}}return this._unWrapHeaderContainerItemContainer(r);}else{return a.prototype[F].apply(this,h.slice(1));}};g.prototype._callMethodInManagedObject=function(){throw new TypeError("Method no longer exists: HeaderContainer.prototype._callMethodInManagedObject");};g.prototype._getParentCell=function(o){return q(o).parents(".sapMHrdrCntrInner").andSelf(".sapMHrdrCntrInner").get(0);};g.prototype.onfocusin=function(E){if(this._bIgnoreFocusIn){this._bIgnoreFocusIn=false;return;}if(E.target.id===this.getId()+"-after"){this._restoreLastFocused();}};g.prototype._restoreLastFocused=function(){if(!this._oItemNavigation){return;}var n=this._oItemNavigation.getItemDomRefs();var i=this._oItemNavigation.getFocusedIndex();var $=q(n[i]);var r=$.control(0)||{};var t=r.getTabbables?r.getTabbables():$.find(":sapTabbable");t.eq(-1).add($).eq(-1).trigger("focus");};return g;});
