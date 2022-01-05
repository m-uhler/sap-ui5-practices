/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./library","sap/ui/core/Core","sap/ui/core/Control","sap/ui/Device","sap/ui/core/ResizeHandler","sap/ui/core/library","sap/m/MessagePage","sap/ui/core/theming/Parameters","sap/ui/dom/units/Rem","./CarouselRenderer","./CarouselLayout","sap/ui/events/KeyCodes","sap/base/Log","sap/ui/events/F6Navigation","sap/ui/thirdparty/jquery","sap/ui/thirdparty/mobify-carousel","sap/ui/core/IconPool"],function(l,C,a,D,R,c,M,P,b,d,e,K,L,F,q){"use strict";var B=c.BusyIndicatorSize;var I=l.ImageHelper;var f=l.CarouselArrowsPlacement;var g=l.PlacementType;var h=a.extend("sap.m.Carousel",{metadata:{library:"sap.m",designtime:"sap/m/designtime/Carousel.designtime",properties:{height:{type:"sap.ui.core.CSSSize",group:"Dimension",defaultValue:'100%'},width:{type:"sap.ui.core.CSSSize",group:"Dimension",defaultValue:'100%'},loop:{type:"boolean",group:"Misc",defaultValue:false},showPageIndicator:{type:"boolean",group:"Appearance",defaultValue:true},pageIndicatorPlacement:{type:"sap.m.PlacementType",group:"Appearance",defaultValue:g.Bottom},showBusyIndicator:{type:"boolean",group:"Appearance",defaultValue:true,deprecated:true},arrowsPlacement:{type:"sap.m.CarouselArrowsPlacement",group:"Appearance",defaultValue:f.Content}},defaultAggregation:"pages",aggregations:{pages:{type:"sap.ui.core.Control",multiple:true,singularName:"page"},customLayout:{type:"sap.m.CarouselLayout",multiple:false}},associations:{activePage:{type:"sap.ui.core.Control",multiple:false}},events:{loadPage:{deprecated:true,parameters:{pageId:{type:"string"}}},unloadPage:{deprecated:true,parameters:{pageId:{type:"string"}}},pageChanged:{parameters:{oldActivePageId:{type:"string"},newActivePageId:{type:"string"},activePages:{type:"array"}}},beforePageChanged:{parameters:{activePages:{type:"array"}}}}}});h._INNER_SELECTOR=".sapMCrslInner";h._PAGE_INDICATOR_SELECTOR=".sapMCrslBulleted";h._PAGE_INDICATOR_ARROWS_SELECTOR=".sapMCrslIndicatorArrow";h._CONTROLS=".sapMCrslControls";h._ITEM_SELECTOR=".sapMCrslItem";h._LEFTMOST_CLASS="sapMCrslLeftmost";h._RIGHTMOST_CLASS="sapMCrslRightmost";h._LATERAL_CLASSES="sapMCrslLeftmost sapMCrslRightmost";h._MODIFIERNUMBERFORKEYBOARDHANDLING=10;h._BULLETS_TO_NUMBERS_THRESHOLD=9;h._PREVIOUS_CLASS_ARROW="sapMCrslPrev";h._NEXT_CLASS_ARROW="sapMCrslNext";h.prototype.init=function(){this._fnAdjustAfterResize=function(){var $=this.$().find(h._INNER_SELECTOR);this._oMobifyCarousel.resize($);this._setWidthOfPages(this._getNumberOfItemsToShow());}.bind(this);this._aOrderOfFocusedElements=[];this._aAllActivePages=[];this._aAllActivePagesIndexes=[];this._onBeforePageChangedRef=this._onBeforePageChanged.bind(this);this._onAfterPageChangedRef=this._onAfterPageChanged.bind(this);this.data("sap-ui-fastnavgroup","true",true);this._oRb=C.getLibraryResourceBundle("sap.m");};h.prototype.exit=function(){if(this._oMobifyCarousel){this._oMobifyCarousel.destroy();delete this._oMobifyCarousel;}if(this._oArrowLeft){this._oArrowLeft.destroy();delete this._oArrowLeft;}if(this._oArrowRight){this._oArrowRight.destroy();delete this._oArrowRight;}if(this._sResizeListenerId){R.deregister(this._sResizeListenerId);this._sResizeListenerId=null;}if(this.oMessagePage){this.oMessagePage.destroy();this.oMessagePage=null;}this.$().off('afterSlide');this._fnAdjustAfterResize=null;this._$InnerDiv=null;this._aOrderOfFocusedElements=null;this._aAllActivePages=null;this._aAllActivePagesIndexes=null;};h.prototype.ontouchstart=function(E){if(this._oMobifyCarousel){if(E.target instanceof HTMLImageElement){E.preventDefault();}this._oMobifyCarousel.touchstart(E);}};h.prototype.ontouchmove=function(E){if(this._oMobifyCarousel){this._oMobifyCarousel.touchmove(E);}};h.prototype.ontouchend=function(E){if(this._oMobifyCarousel){if(this._oMobifyCarousel.hasActiveTransition()){this._oMobifyCarousel.onTransitionComplete();}this._oMobifyCarousel.touchend(E);}};h.prototype.onBeforeRendering=function(){var A=this.getActivePage();if(!A&&this.getPages().length>0){this.setAssociation("activePage",this.getPages()[0].getId(),true);}if(this._sResizeListenerId){R.deregister(this._sResizeListenerId);this._sResizeListenerId=null;}this.$().off('beforeSlide',this._onBeforePageChangedRef);this.$().off('afterSlide',this._onAfterPageChangedRef);return this;};h.prototype._getNumberOfItemsToShow=function(){var p=this.getPages().length,o=this.getCustomLayout(),n=1;if(o&&o.isA("sap.m.CarouselLayout")){n=Math.max(o.getVisiblePagesCount(),1);}if(n>1&&p<n){return p;}return n;};h.prototype.onAfterRendering=function(){if(this._oMobifyCarousel){this._oMobifyCarousel.unbind();setTimeout(function(){if(this._oMobifyCarousel){this._oMobifyCarousel.onTransitionComplete();}}.bind(this),0);}var n=this._getNumberOfItemsToShow();this.$().carousel(undefined,{numberOfItemsToShow:n});this._oMobifyCarousel=this.getDomRef()._carousel;this._oMobifyCarousel.setLoop(this.getLoop());this._oMobifyCarousel.setRTL(C.getConfiguration().getRTL());if(n>1){this._setWidthOfPages(n);}var A=this.getActivePage();if(A){this._updateActivePages(A);var i=this._getPageNumber(A);if(isNaN(i)||i==0){if(this.getPages().length>0){this.setAssociation("activePage",this.getPages()[0].getId(),true);this._adjustHUDVisibility(1);}}else{if(C.isThemeApplied()){this._moveToPage(i+1);}else{C.attachThemeChanged(this._handleThemeLoad,this);}if(this.getParent()&&this.getParent().isA("sap.zen.commons.layout.PositionContainer")){if(this._isCarouselUsedWithCommonsLayout===undefined){setTimeout(this["invalidate"].bind(this),0);this._isCarouselUsedWithCommonsLayout=true;}}}}this.$().on('beforeSlide',this._onBeforePageChangedRef);this.$().on('afterSlide',this._onAfterPageChangedRef);this._$InnerDiv=this.$().find(h._INNER_SELECTOR)[0];this._sResizeListenerId=R.register(this._$InnerDiv,this._fnAdjustAfterResize);var p=this.getParent();while(p){if(p.isA("sap.m.IconTabBar")){var t=this;p.attachExpand(function(E){var j=E.getParameter('expand');if(j&&i>0){t._moveToPage(i+1);}});break;}p=p.getParent();}};h.prototype._onBeforePageChanged=function(E,p,n){if(E.target!==this.getDomRef()){return;}var N=this.getPages()[n-1].getId();this._updateActivePages(N);this.fireBeforePageChanged({activePages:this._aAllActivePagesIndexes});};h.prototype._onAfterPageChanged=function(E,p,n){var H=this.getPages().length>0;if(E.target!==this.getDomRef()){return;}if(H&&n>0){this._changePage(p,n);}};h.prototype._setWidthOfPages=function(n){var i=this._calculatePagesWidth(n);this.$().find(".sapMCrslItem").each(function(j,p){p.style.width=i+"%";});};h.prototype._calculatePagesWidth=function(n){var w=this.$().width(),m=b.toPx(P.get("_sap_m_Carousel_PagesMarginRight")),i=(w-(m*(n-1)))/n,j=(i/w)*100;return j;};h.prototype._handleThemeLoad=function(){var A=this.getActivePage();if(A){var i=this._getPageNumber(A);if(i>0){this._moveToPage(i+1);}}C.detachThemeChanged(this._handleThemeLoad,this);};h.prototype._moveToPage=function(i){this._oMobifyCarousel.changeAnimation('sapMCrslNoTransition');this._oMobifyCarousel.move(i);this._changePage(undefined,i);};h.prototype._changePage=function(o,n){this._adjustHUDVisibility(n);var O=this.getActivePage();if(o){O=this.getPages()[o-1].getId();}var N=this.getPages()[n-1].getId();this.setAssociation("activePage",N,true);var t=this._getPageIndicatorText(n);L.debug("sap.m.Carousel: firing pageChanged event: old page: "+O+", new page: "+N);if(!D.system.desktop){q(document.activeElement).trigger("blur");}if(this._oMobifyCarousel&&this._oMobifyCarousel.getShouldFireEvent()){this.firePageChanged({oldActivePageId:O,newActivePageId:N,activePages:this._aAllActivePagesIndexes});}this.$('slide-number').text(t);};h.prototype._getPageIndicatorText=function(n){return this._oRb.getText("CAROUSEL_PAGE_INDICATOR_TEXT",[n,this.getPages().length-this._getNumberOfItemsToShow()+1]);};h.prototype._adjustHUDVisibility=function(n){var N=this._getNumberOfItemsToShow();if(D.system.desktop&&!this.getLoop()&&this.getPages().length>1){var H=this.$('hud');H.removeClass(h._LATERAL_CLASSES);if(n===1){H.addClass(h._LEFTMOST_CLASS);this._focusCarouselContainer(H,h._PREVIOUS_CLASS_ARROW);}if((n+N-1)===this.getPages().length){H.addClass(h._RIGHTMOST_CLASS);this._focusCarouselContainer(H,h._NEXT_CLASS_ARROW);}}};h.prototype._focusCarouselContainer=function(H,A){if(H.find('.'+A)[0]===document.activeElement){this.focus();}};h.prototype.setActivePage=function(p){var s=null;if(typeof(p)=='string'){s=p;}else if(p instanceof a){s=p.getId();}if(s){if(s===this.getActivePage()){return this;}var i=this._getPageNumber(s);if(!isNaN(i)){if(this._oMobifyCarousel){this._oMobifyCarousel.setShouldFireEvent(true);this._oMobifyCarousel.move(i+1);}}}this.setAssociation("activePage",s,true);return this;};h.prototype._getNavigationArrow=function(s){if(!this["_oArrow"+s]){this["_oArrow"+s]=I.getImageControl(this.getId()+"-arrowScroll"+s,this["_oArrow"+s],this,{src:"sap-icon://slim-arrow-"+s.toLowerCase(),useIconTooltip:false});}return this["_oArrow"+s];};h.prototype._getErrorPage=function(){if(!this.oMessagePage){this.oMessagePage=new M({text:this._oRb.getText("CAROUSEL_ERROR_MESSAGE"),description:"",icon:"sap-icon://document",showHeader:false});}return this.oMessagePage;};h.prototype.previous=function(){if(this._oMobifyCarousel){this._oMobifyCarousel.setShouldFireEvent(true);this._oMobifyCarousel.prev();}else{L.warning("Unable to execute sap.m.Carousel.previous: carousel must be rendered first.");}return this;};h.prototype.next=function(){if(this._oMobifyCarousel){this._oMobifyCarousel.setShouldFireEvent(true);this._oMobifyCarousel.next();}else{L.warning("Unable to execute sap.m.Carousel.next: carousel must be rendered first.");}return this;};h.prototype._getPageNumber=function(p){var i,r;for(i=0;i<this.getPages().length;i++){if(this.getPages()[i].getId()==p){r=i;break;}}return r;};h.prototype.onsaptabprevious=function(E){this._bDirection=false;this._fnOnTabPress(E);};h.prototype.onsaptabnext=function(E){this._bDirection=true;this._fnOnTabPress(E);};h.prototype.onfocusin=function(E){this.saveLastFocusReference(E);this._bDirection=undefined;};h.prototype.onsapskipforward=function(E){E.preventDefault();this._handleGroupNavigation(E,false);};h.prototype.onsapskipback=function(E){E.preventDefault();this._handleGroupNavigation(E,true);};h.prototype.onkeydown=function(E){if(E.keyCode==K.F7){this._handleF7Key(E);return;}if(E.target!=this.getDomRef()){return;}switch(E.keyCode){case 189:case K.NUMPAD_MINUS:this._fnSkipToIndex(E,-1);break;case K.PLUS:case K.NUMPAD_PLUS:this._fnSkipToIndex(E,1);break;}};h.prototype.onsapescape=function(E){var i;if(E.target===this.$()[0]&&this._lastActivePageNumber){i=this._lastActivePageNumber+1;this._oMobifyCarousel.move(i);this._changePage(undefined,i);}};h.prototype.onsapright=function(E){this._fnSkipToIndex(E,1);};h.prototype.onsapup=function(E){this._fnSkipToIndex(E,-1);};h.prototype.onsapleft=function(E){this._fnSkipToIndex(E,-1);};h.prototype.onsapdown=function(E){this._fnSkipToIndex(E,1);};h.prototype.onsaphome=function(E){this._fnSkipToIndex(E,0);};h.prototype.onsapend=function(E){this._fnSkipToIndex(E,this.getPages().length);};h.prototype.onsaprightmodifiers=function(E){if(E.ctrlKey){this._fnSkipToIndex(E,h._MODIFIERNUMBERFORKEYBOARDHANDLING);}};h.prototype.onsapupmodifiers=function(E){if(E.ctrlKey){this._fnSkipToIndex(E,h._MODIFIERNUMBERFORKEYBOARDHANDLING);}};h.prototype.onsappageup=function(E){this._fnSkipToIndex(E,h._MODIFIERNUMBERFORKEYBOARDHANDLING);};h.prototype.onsapleftmodifiers=function(E){if(E.ctrlKey){this._fnSkipToIndex(E,-h._MODIFIERNUMBERFORKEYBOARDHANDLING);}};h.prototype.onsapdownmodifiers=function(E){if(E.ctrlKey){this._fnSkipToIndex(E,-h._MODIFIERNUMBERFORKEYBOARDHANDLING);}};h.prototype.onsappagedown=function(E){this._fnSkipToIndex(E,-h._MODIFIERNUMBERFORKEYBOARDHANDLING);};h.prototype._fnOnTabPress=function(E){if(E.target===this.$()[0]){this._lastActivePageNumber=this._getPageNumber(this.getActivePage());}};h.prototype._handleGroupNavigation=function(E,s){var o=q.Event("keydown");E.preventDefault();this.$().trigger("focus");o.target=E.target;o.key='F6';o.shiftKey=s;F.handleF6GroupNavigation(o);};h.prototype.saveLastFocusReference=function(E){var o=q(E.target).closest(".sapMCrsPage").control(0),s;if(this._bDirection===undefined){return;}if(this._lastFocusablePageElement===undefined){this._lastFocusablePageElement={};}if(o){s=o.getId();this._lastFocusablePageElement[s]=E.target;this._updateFocusedPagesOrder(s);}};h.prototype._getActivePageLastFocusedElement=function(){if(this._lastFocusablePageElement){return this._lastFocusablePageElement[this._getLastFocusedActivePage()];}};h.prototype._updateFocusedPagesOrder=function(s){var i=this._aOrderOfFocusedElements.indexOf(s);if(i>-1){this._aOrderOfFocusedElements.splice(0,0,this._aOrderOfFocusedElements.splice(i,1)[0]);}else{this._aOrderOfFocusedElements.unshift(s);}};h.prototype._updateActivePages=function(n){var N=this._getPageNumber(n),j=this._getNumberOfItemsToShow(),k=N+j,A=this.getPages();if(k>A.length){k=A.length-j;}this._aAllActivePages=[];this._aAllActivePagesIndexes=[];for(var i=N;i<k;i++){this._aAllActivePages.push(A[i].getId());this._aAllActivePagesIndexes.push(i);}};h.prototype._getLastFocusedActivePage=function(){for(var i=0;i<this._aOrderOfFocusedElements.length;i++){var p=this._aOrderOfFocusedElements[i];if(this._aAllActivePages.indexOf(p)>-1){return p;}}return this.getActivePage();};h.prototype._fnSkipToIndex=function(E,n){var i=n;if(E.target!==this.getDomRef()){return;}E.preventDefault();if(this._oMobifyCarousel.hasActiveTransition()){this._oMobifyCarousel.onTransitionComplete();}this._oMobifyCarousel.setShouldFireEvent(true);if(n!==0){i=this._getPageNumber(this.getActivePage())+1+n;}this._oMobifyCarousel.move(i);};h.prototype._handleF7Key=function(E){var A=this._getActivePageLastFocusedElement();if(E.target===this.$()[0]&&A){A.focus();}else{this.$().trigger("focus");}};h.prototype.setShowBusyIndicator=function(){L.warning("sap.m.Carousel: Deprecated function 'setShowBusyIndicator' called. Does nothing.");return this;};h.prototype.getShowBusyIndicator=function(){L.warning("sap.m.Carousel: Deprecated function 'getShowBusyIndicator' called. Does nothing.");return false;};h.prototype.setBusyIndicatorSize=function(s){if(!(s in B)){s=B.Medium;}return a.prototype.setBusyIndicatorSize.call(this,s);};return h;});