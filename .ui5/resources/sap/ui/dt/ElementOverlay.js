/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/dt/Overlay","sap/ui/dt/ControlObserver","sap/ui/dt/ManagedObjectObserver","sap/ui/dt/ElementDesignTimeMetadata","sap/ui/dt/ElementUtil","sap/ui/dt/DOMUtil","sap/ui/dt/Util","sap/ui/core/Control","sap/ui/thirdparty/jquery","sap/base/Log","sap/base/util/isPlainObject","sap/base/util/merge","sap/base/util/restricted/_intersection","sap/base/util/restricted/_max"],function(O,C,M,E,a,D,U,b,q,L,i,m,_,c){"use strict";var S="sapUiDtOverlayScrollContainer";var d=O.extend("sap.ui.dt.ElementOverlay",{metadata:{library:"sap.ui.dt",associations:{editableByPlugins:{type:"any[]",multiple:true,singularName:"editableByPlugin"}},properties:{selected:{type:"boolean",defaultValue:false},selectable:{type:"boolean",defaultValue:false},movable:{type:"boolean",defaultValue:false},editable:{type:"boolean",defaultValue:false},relevantOverlays:{type:"any[]",defaultValue:[]},metadataScope:{type:"string"}},events:{selectionChange:{parameters:{selected:{type:"boolean"}}},movableChange:{parameters:{movable:{type:"boolean"}}},selectableChange:{parameters:{selectable:{type:"boolean"}}},editableChange:{parameters:{editable:{type:"boolean"}}},elementModified:{parameters:{type:"string",name:"string",value:"any",oldValue:"any",target:"sap.ui.core.Element"}},elementDestroyed:{parameters:{targetId:"string"}}}},constructor:function(){this._aMetadataEnhancers=[];O.apply(this,arguments);}});d.prototype.asyncInit=function(){return(this.getDesignTimeMetadata()?Promise.resolve():this._loadDesignTimeMetadata()).then(function(){this.attachEvent("elementModified",function(e){var p=e.getParameters();var n=p.name;if(p.type==="propertyChanged"){if(n==="visible"){this.setRelevantOverlays([]);}}else if(n){this.setRelevantOverlays([]);}},this);this._initMutationObserver();this._initControlObserver();}.bind(this));};d.prototype._updateScrollContainer=function(p){if(this.getShouldBeDestroyed()||this.bIsDestroyed){return;}var I=p.index;var o=this.getScrollContainerById(I);var n=this.getScrollContainers(true)[I];var A=[].concat(n.aggregations);var e=o.find(">:not(.sapUiDtDummyScrollContainer)").toArray();e.forEach(function(f){var s=f.getAttribute("data-sap-ui-dt-aggregation");if(n.aggregations.includes(s)){A.splice(A.indexOf(s),1);}else{o.get(0).removeChild(f);D.appendChild(this.getChildrenDomRef(),f);}}.bind(this));A.forEach(function(s){var f=this.getAggregationOverlay(s).getDomRef();this.getChildrenDomRef().removeChild(f);D.appendChild(o.get(0),f);}.bind(this));};d.prototype._onRootChanged=function(e){var r=e.getParameter("value");this._subscribeToMutationObserver(r);};d.prototype._initMutationObserver=function(){this._subscribeToMutationObserver(this.isRoot());this.attachEvent("isRootChanged",this._onRootChanged,this);};d.prototype._subscribeToMutationObserver=function(I){var o=O.getMutationObserver();var $=this.getAssociatedDomRef();this._sObservableNodeId=$&&$.get(0)&&$.get(0).id;if(this._sObservableNodeId){o.registerHandler(this._sObservableNodeId,this._domChangedCallback.bind(this),I);}else if(I){L.error("sap.ui.dt.ElementOverlay#_subscribeToMutationObserver: please provide a root control with proper domRef and id to ensure that RTA is working properly");}};d.prototype._unsubscribeFromMutationObserver=function(){if(this._sObservableNodeId){var o=O.getMutationObserver();o.deregisterHandler(this._sObservableNodeId);delete this._sObservableNodeId;}};d.prototype._initControlObserver=function(){if(this.getElement()instanceof b){this._oObserver=new C({target:this.getElement(),aggregations:this.getAggregationNames()});}else{this._oObserver=new M({target:this.getElement(),aggregations:this.getAggregationNames()});}this._oObserver.attachModified(this._onElementModified,this);this._oObserver.attachDestroyed(this._onElementDestroyed,this);};d.prototype._destroyControlObserver=function(){if(this._oObserver){this._oObserver.destroy();}};d.prototype._getAttributes=function(){return m({},O.prototype._getAttributes.apply(this,arguments),{"data-sap-ui-dt-for":this.getElement().getId(),draggable:this.getMovable()});};d.prototype.render=function(){this.addStyleClass("sapUiDtElementOverlay");return O.prototype.render.apply(this,arguments);};d.prototype.exit=function(){this._unsubscribeFromMutationObserver();this._destroyControlObserver();if(this._iApplyStylesRequest){window.cancelAnimationFrame(this._iApplyStylesRequest);}O.prototype.exit.apply(this,arguments);};d.prototype._loadDesignTimeMetadata=function(){return this.getElement().getMetadata().loadDesignTime(this.getElement(),this.getMetadataScope()).then(function(e){var o=this.getElement();if(!o||o.bIsDestroyed){throw U.createError("ElementOverlay#loadDesignTimeMetadata","Can't set metadata to overlay which element has been destroyed already");}this.setDesignTimeMetadata(e);}.bind(this)).catch(function(e){throw U.propagateError(e,"ElementOverlay#loadDesignTimeMetadata",U.printf("Can't load designtime metadata data for overlay with id='{1}', element id='{2}': {3}",this.getId(),this.getAssociation("element"),U.wrapError(e).message));}.bind(this));};d.prototype._setPosition=function(t,g,p,f){O.prototype._setPosition.apply(this,arguments);this.getScrollContainers().forEach(function(s,I){var $=this.getDesignTimeMetadata().getAssociatedDomRef(this.getElement(),s.domRef)||q();var e=this.getScrollContainerById(I);if($.length){var o=$.get(0);var h=D.getGeometry(o);this._setSize(e,h);O.prototype._setPosition.call(this,e,h,this.$());this._handleOverflowScroll(h,e,this,f);this._setZIndex(h,e);}else{e.css("display","none");}},this);};d.prototype._applySizes=function(){return O.prototype._applySizes.apply(this,arguments).then(function(){this._sortChildren(this.getChildrenDomRef());if(!this.bIsDestroyed){this.getScrollContainers().forEach(function(s,I){var $=this.getDesignTimeMetadata().getAssociatedDomRef(this.getElement(),s.domRef)||q();var e=this.getScrollContainerById(I);if($.length){this._sortChildren(e.get(0));}},this);}}.bind(this));};d.prototype._sortChildren=function(o){function e(h,j){var G=D.getGeometry(h);var k=D.getGeometry(j);var p=G&&G.position;var P=k&&k.position;if(p&&P){var B=p.top+G.size.height;var l=P.top+k.size.height;if(p.top<P.top){if(B>=l&&P.left<p.left){return 1;}return-1;}else if(p.top===P.top){if(p.left===P.left){if(G.size.height<k.size.height||G.size.width<k.size.width){return-1;}else if(G.size.height>k.size.height||G.size.width>k.size.width){return 1;}return 0;}else if(p.left<P.left){return-1;}return 1;}else if(B<=l&&P.left>p.left){return-1;}return 1;}return 0;}var f=q(o).find(">:not(.sapUiDtDummyScrollContainer)").toArray();var s=f.slice().sort(e);var g=f.some(function(h,I){return h!==s[I];});if(g){s.forEach(function(h){D.appendChild(o,h);});}};d.prototype.placeInOverlayContainer=function(){if(this._bInit){if(this.isRoot()){if(!this.isRendered()){O.getOverlayContainer().append(this.render());this.applyStyles();}else{L.error("sap.ui.dt.ElementOverlay: overlay is already rendered and can\'t be placed in overlay container. Isn\'t it already there?");}}else{L.error("sap.ui.dt.ElementOverlay: it\'s not possible to place overlay inside overlay container while it\'s part of some hierarchy");}}else{L.error('sap.ui.dt.ElementOverlay: overlay is not ready yet. Please wait until "init" event happens');}};d.prototype.setDesignTimeMetadata=function(v){var o=this.getDesignTimeMetadata();var e;if(typeof v==="function"){if(!o){this._aMetadataEnhancers=this._aMetadataEnhancers.concat(v);}else{o.setData(v(m({},o.getData())));return;}}else if(v instanceof E){o=v;}else if(i(v)){e=v;var f;while(f=this._aMetadataEnhancers.shift()){e=f.call(this,e);}o=new E({data:e});}if(o){O.prototype.setDesignTimeMetadata.call(this,o);}};d.prototype.getScrollContainers=function(I){return this.getDesignTimeMetadata().getScrollContainers(this.getElement(),I,this._updateScrollContainer.bind(this));};d.prototype._renderChildren=function(){var e=O.prototype._renderChildren.apply(this,arguments);this.getScrollContainers().forEach(function(s,I){var $=q("<div></div>",{"class":S,"data-sap-ui-dt-scrollContainerIndex":I});if(s.aggregations){_(s.aggregations,this.getAggregationNames()).forEach(function(A){var o=this.getAggregationOverlay(A);var f=e.indexOf(o.$());o.setScrollContainerId(I);$.append(e[f]);e.splice(f,1);},this);}e.push($);},this);return e;};d.prototype.getScrollContainerById=function(I){return q(this.getChildrenDomRef()).find(">."+S+'[data-sap-ui-dt-scrollcontainerindex="'+I+'"]');};d.prototype.getAssociatedDomRef=function(){var o=this.getDesignTimeMetadata();var v=o.getDomRef();var e=o.getAssociatedDomRef(this.getElement(),v);if(!e){e=a.getDomRef(this.getElement());}if(e){return q(e);}return undefined;};d.prototype.setSelectable=function(s){s=!!s;if(s!==this.isSelectable()){if(!s){this.setSelected(false);}this.toggleStyleClass("sapUiDtOverlaySelectable",s);this.setProperty("selectable",s);this.fireSelectableChange({selectable:s});}this.setFocusable(s);return this;};d.prototype.setSelected=function(s){s=!!s;if(this.isSelectable()&&s!==this.isSelected()){this.setProperty("selected",s);this.toggleStyleClass("sapUiDtOverlaySelected",s);this.fireSelectionChange({selected:s});}return this;};d.prototype.setMovable=function(e){e=!!e;if(this.getMovable()!==e){this.toggleStyleClass("sapUiDtOverlayMovable",e);this.setProperty("movable",e);this.fireMovableChange({movable:e});this.$()[e?"attr":"removeAttr"]("draggable",e);}return this;};d.prototype.setEditable=function(e){e=!!e;if(this.getEditable()!==e){this.toggleStyleClass("sapUiDtOverlayEditable",e);this.setProperty("editable",e);this.fireEditableChange({editable:e});}return this;};d.prototype.getAggregationNames=function(){var e=this.getElement();var o=this.getDesignTimeMetadata();var A=e.getMetadata().getAllAggregations();return[].concat(Object.keys(A),Object.keys(o.getAggregations())).filter(function(s,I,f){return(I===f.indexOf(s)&&!o.isAggregationIgnored(e,s));});};d.prototype._onChildAdded=function(e){var A=e.getSource();if(this.isRendered()&&!A.isRendered()){var t=(U.isInteger(A.getScrollContainerId())?this.getScrollContainerById(A.getScrollContainerId()):q(this.getChildrenDomRef()));t.append(A.render());}};d.prototype.addChild=function(A){A.detachChildAdded(this._onChildAdded,this);A.attachChildAdded(this._onChildAdded,this);O.prototype.addChild.apply(this,arguments);};d.prototype._onElementModified=function(e){if(e.getParameters().type==="afterRendering"){this._subscribeToMutationObserver(this.isRoot());this._oScrollbarSynchronizers.forEach(function(s){s.refreshListeners();});}this.fireElementModified(e.getParameters());};d.prototype._domChangedCallback=function(p){p.targetOverlay=this;if(this.isReady()){if(this._iApplyStylesRequest){window.cancelAnimationFrame(this._iApplyStylesRequest);}this._iApplyStylesRequest=window.requestAnimationFrame(function(){this.fireApplyStylesRequired(p);delete this._iApplyStylesRequest;}.bind(this));}};d.prototype._onElementDestroyed=function(e){var s=e.getSource().getTarget();this.fireElementDestroyed({targetId:s});if(this._bInit){this.destroy();}else{this._bShouldBeDestroyed=true;}};d.prototype.getAggregationOverlays=function(){return this.getAggregation("children")||[];};d.prototype.getAggregationOverlay=function(A){return this.getChildren().filter(function(o){return o.getAggregationName()===A;}).pop();};d.prototype.getParentElementOverlay=function(){var p=this.getParentAggregationOverlay();if(p){return p.getParent();}};d.prototype.getParentAggregationOverlay=function(){var p=this.getParent();return p instanceof sap.ui.dt.AggregationOverlay?p:null;};d.prototype.isSelected=function(){return this.getSelected();};d.prototype.isSelectable=function(){return this.getSelectable();};d.prototype.isMovable=function(){return this.getMovable();};d.prototype.isEditable=function(){return this.getEditable();};d.prototype._getElementInstanceVisible=function(){var e=this.getElement();if(e){var g=this.getGeometry();return g&&g.visible;}return false;};d.prototype.getElementVisibility=function(){var e=this.getElement();if(e instanceof sap.ui.core.Control){return e.getVisible();}var o=this.getDesignTimeMetadata();var f=o&&o.getData().isVisible;if(!f){return undefined;}return f(this.getElement());};d.prototype.isElementVisible=function(){var e=this.getElement();var v=false;var o=this.getDesignTimeMetadata();var f=o.getData();if(o.isIgnored(e)){v=false;}else if(typeof f.isVisible==="function"){v=f.isVisible(e);}else{var g=this.getGeometry(true);if(g){v=g.visible;}else if(e instanceof b){v=!!e.getDomRef()&&e.getVisible();}}return v;};d.prototype.isVisible=function(){return(O.prototype.isVisible.apply(this,arguments)&&this.isElementVisible());};d.prototype.getRelevantContainer=function(f){var o=this.getDesignTimeMetadata();if(o&&o.getData().relevantContainer){return o.getData().relevantContainer;}else if(f){return this.getElement();}var p=this.getParentElementOverlay();return p?p.getElement():undefined;};d.prototype._hasSameSize=function(s,t){var e=this.getScrollContainers();var f;if(e.length){f=c(e.map(function(g,I){var G=D.getGeometry(this.getScrollContainerById(I).get(0));return G.size[t];},this));}else{f=this.getGeometry().size[t];}return s.size[t]===f;};return d;});
