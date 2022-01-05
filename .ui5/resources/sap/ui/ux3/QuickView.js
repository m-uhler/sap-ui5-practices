/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['sap/ui/thirdparty/jquery','sap/ui/commons/CalloutBase','sap/ui/core/delegate/ItemNavigation','./ActionBar','./library','./QuickViewRenderer','sap/ui/core/TooltipBase'],function(q,C,I,A,l,Q,T){"use strict";var F=l.FollowActionState;var a=C.extend("sap.ui.ux3.QuickView",{metadata:{library:"sap.ui.ux3",properties:{type:{type:"string",group:"Misc",defaultValue:null},firstTitle:{type:"string",group:"Misc",defaultValue:null},firstTitleHref:{type:"string",group:"Misc",defaultValue:null},secondTitle:{type:"string",group:"Misc",defaultValue:null},icon:{type:"sap.ui.core.URI",group:"Misc",defaultValue:null},width:{type:"sap.ui.core.CSSSize",group:"Dimension",defaultValue:null},showActionBar:{type:"boolean",group:"Misc",defaultValue:true},followState:{type:"sap.ui.ux3.FollowActionState",group:"Misc",defaultValue:F.Default},flagState:{type:"boolean",group:"Misc",defaultValue:false},favoriteState:{type:"boolean",group:"Misc",defaultValue:false},favoriteActionEnabled:{type:"boolean",group:"Misc",defaultValue:true},updateActionEnabled:{type:"boolean",group:"Misc",defaultValue:true},followActionEnabled:{type:"boolean",group:"Misc",defaultValue:true},flagActionEnabled:{type:"boolean",group:"Misc",defaultValue:true},openActionEnabled:{type:"boolean",group:"Misc",defaultValue:true}},aggregations:{content:{type:"sap.ui.core.Element",multiple:true,singularName:"content"},actions:{type:"sap.ui.ux3.ThingAction",multiple:true,singularName:"action"},actionBar:{type:"sap.ui.ux3.ActionBar",multiple:false}},events:{actionSelected:{parameters:{id:{type:"string"},action:{type:"sap.ui.ux3.ThingAction"},newState:{type:"string"}}},feedSubmit:{parameters:{text:{type:"string"}}},navigate:{allowPreventDefault:true,parameters:{href:{type:"string"}}}}}});a.prototype.init=function(){var o;function b(d){var p=d.getParameters();this.fireActionSelected(p);}function c(d){var p=d.getParameters();this.fireFeedSubmit(p);}C.prototype.init.call(this);if(!this.getActionBar()){o=new A();o.attachActionSelected(q.proxy(b,this));o.attachFeedSubmit(q.proxy(c,this));this.setAggregation("actionBar",o,true);}};a.prototype.onmouseover=function(e){var p=this._getPopup();if(p.isOpen()&&p.getContent()==this){if(this.sCloseNowTimeout){clearTimeout(this.sCloseNowTimeout);this.sCloseNowTimeout=null;}return;}T.prototype.onmouseover.call(this,e);};a.prototype.onAfterRendering=function(){var f=this.getDomRef(),d=[];var r=this.$("title");d.push(r);r=this.$("link");if(!r.length){r=this.$("name");}if(!r.length){return;}d.push(r);r=this.$("descr");if(r.length){d.push(r);}if(!this.oItemNavigation){this.oItemNavigation=new I(null,null,false);this.addDelegate(this.oItemNavigation);}this.oItemNavigation.setRootDomRef(f);this.oItemNavigation.setItemDomRefs(d);this.oItemNavigation.setCycling(false);this.oItemNavigation.setSelectedIndex(1);this.oItemNavigation.setPageSize(d.length);};a.prototype.onclick=function(e){var t=e.target;if(!t||!t.hasAttribute("href")){return;}if(!this.fireEvent("navigate",{href:t.href},true,false)){e.preventDefault();}};a.prototype.exit=function(){if(this.oItemNavigation){this.removeDelegate(this.oItemNavigation);this.oItemNavigation.destroy();delete this.oItemNavigation;}};a.prototype.insertAction=function(o,i){if(this.getActionBar()){this.getActionBar().insertBusinessAction(o,i);}return this;};a.prototype.addAction=function(o){if(this.getActionBar()){this.getActionBar().addBusinessAction(o);}return this;};a.prototype.removeAction=function(o){if(this.getActionBar()){this.getActionBar().removeBusinessAction(o);}return this;};a.prototype.removeAllActions=function(){if(this.getActionBar()){this.getActionBar().removeAllBusinessActions();}return this;};a.prototype.getActions=function(){if(this.getActionBar()){this.getActionBar().getBusinessActions();}return this;};a.prototype.destroyActions=function(){if(this.getActionBar()){this.getActionBar().destroyBusinessActions();}return this;};a.prototype.setFollowState=function(f){if(this.getActionBar()){this.getActionBar().setFollowState(f);}return this;};a.prototype.getFollowState=function(){var r=null;if(this.getActionBar()){r=this.getActionBar().getFollowState();}return r;};a.prototype.setFlagState=function(f){if(this.getActionBar()){this.getActionBar().setFlagState(f);}return this;};a.prototype.getFlagState=function(){var r=null;if(this.getActionBar()){r=this.getActionBar().getFlagState();}return r;};a.prototype.setFavoriteState=function(f){if(this.getActionBar()){this.getActionBar().setFavoriteState(f);}return this;};a.prototype.getFavoriteState=function(){var r=null;if(this.getActionBar()){r=this.getActionBar().getFavoriteState();}return r;};a.prototype.setFavoriteActionEnabled=function(e){if(this.getActionBar()){this.getActionBar().setShowFavorite(e);}return this;};a.prototype.getFavoriteActionEnabled=function(){var r;if(this.getActionBar()){r=this.getActionBar().getShowFavorite();}return r;};a.prototype.setFlagActionEnabled=function(e){if(this.getActionBar()){this.getActionBar().setShowFlag(e);}return this;};a.prototype.getFlagActionEnabled=function(){var r;if(this.getActionBar()){r=this.getActionBar().getShowFlag();}return r;};a.prototype.setUpdateActionEnabled=function(e){if(this.getActionBar()){this.getActionBar().setShowUpdate(e);}return this;};a.prototype.getUpdateActionEnabled=function(){var r;if(this.getActionBar()){r=this.getActionBar().getShowUpdate();}return r;};a.prototype.setFollowActionEnabled=function(e){if(this.getActionBar()){this.getActionBar().setShowFollow(e);}return this;};a.prototype.getFollowActionEnabled=function(){var r;if(this.getActionBar()){r=this.getActionBar().getShowFollow();}return r;};a.prototype.setOpenActionEnabled=function(e){if(this.getActionBar()){this.getActionBar().setShowOpen(e);}return this;};a.prototype.getOpenActionEnabled=function(){var r;if(this.getActionBar()){r=this.getActionBar().getShowOpen();}return r;};a.prototype.setIcon=function(i){this.setProperty("icon",i);if(this.getActionBar()){this.getActionBar().setThingIconURI(i);}return this;};a.prototype.setActionBar=function(o){this.setAggregation("actionBar",o,true);if(this.getIcon()&&this.getActionBar()){this.getActionBar().setThingIconURI(this.getIcon());}return this;};return a;});
