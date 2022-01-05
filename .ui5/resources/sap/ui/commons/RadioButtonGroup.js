/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['sap/base/Log','./library','sap/ui/core/Control','sap/ui/core/delegate/ItemNavigation','./RadioButton','./RadioButtonGroupRenderer','sap/ui/core/library'],function(L,l,C,I,R,a,c){"use strict";var V=c.ValueState;var b=C.extend("sap.ui.commons.RadioButtonGroup",{metadata:{interfaces:["sap.ui.core.IFormContent"],library:"sap.ui.commons",properties:{width:{type:"sap.ui.core.CSSSize",group:"Dimension",defaultValue:null},columns:{type:"int",group:"Appearance",defaultValue:1},editable:{type:"boolean",group:"Behavior",defaultValue:true},valueState:{type:"sap.ui.core.ValueState",group:"Data",defaultValue:V.None},selectedIndex:{type:"int",group:"Data",defaultValue:0},enabled:{type:"boolean",group:"Behavior",defaultValue:true}},defaultAggregation:"items",aggregations:{items:{type:"sap.ui.core.Item",multiple:true,singularName:"item",bindable:"bindable"}},associations:{ariaDescribedBy:{type:"sap.ui.core.Control",multiple:true,singularName:"ariaDescribedBy"},ariaLabelledBy:{type:"sap.ui.core.Control",multiple:true,singularName:"ariaLabelledBy"}},events:{select:{parameters:{selectedIndex:{type:"int"}}}}}});b.prototype.exit=function(){this.destroyItems();if(this.oItemNavigation){this.removeDelegate(this.oItemNavigation);this.oItemNavigation.destroy();delete this.oItemNavigation;}};b.prototype.onBeforeRendering=function(){if(this.getSelectedIndex()>this.getItems().length){L.warning("Invalid index, set to 0");this.setSelectedIndex(0);}};b.prototype.onAfterRendering=function(){this.initItemNavigation();for(var i=0;i<this.aRBs.length;i++){this.aRBs[i].getDomRef().setAttribute("aria-posinset",i+1);this.aRBs[i].getDomRef().setAttribute("aria-setsize",this.aRBs.length);}};b.prototype.initItemNavigation=function(){var d=[];this._aActiveItems=[];var A=this._aActiveItems;var e=false;for(var i=0;i<this.aRBs.length;i++){A[d.length]=i;d.push(this.aRBs[i].getDomRef());if(!e&&this.aRBs[i].getEnabled()){e=true;}}if(e){e=this.getEnabled();}if(!e){if(this.oItemNavigation){this.removeDelegate(this.oItemNavigation);this.oItemNavigation.destroy();delete this.oItemNavigation;}return;}if(!this.oItemNavigation){this.oItemNavigation=new I();this.oItemNavigation.attachEvent(I.Events.AfterFocus,this._handleAfterFocus,this);this.addDelegate(this.oItemNavigation);}this.oItemNavigation.setRootDomRef(this.getDomRef());this.oItemNavigation.setItemDomRefs(d);this.oItemNavigation.setCycling(true);this.oItemNavigation.setColumns(this.getColumns());this.oItemNavigation.setSelectedIndex(this.getSelectedIndex());this.oItemNavigation.setFocusedIndex(this.getSelectedIndex());};b.prototype.setSelectedIndex=function(s){var i=this.getSelectedIndex();if(s<0){L.warning("Invalid index, will not be changed");return this;}this.setProperty("selectedIndex",s,true);if(!isNaN(i)&&this.aRBs&&this.aRBs[i]){this.aRBs[i].setSelected(false);}if(this.aRBs&&this.aRBs[s]){this.aRBs[s].setSelected(true);}if(this.oItemNavigation){this.oItemNavigation.setSelectedIndex(s);this.oItemNavigation.setFocusedIndex(s);}return this;};b.prototype.setSelectedItem=function(s){for(var i=0;i<this.getItems().length;i++){if(s.getId()==this.getItems()[i].getId()){this.setSelectedIndex(i);break;}}};b.prototype.getSelectedItem=function(){return this.getItems()[this.getSelectedIndex()];};b.prototype.addItem=function(i){this.myChange=true;this.addAggregation("items",i);i.attachEvent("_change",this._handleItemChanged,this);this.myChange=undefined;if(!this._bUpdateItems){if(this.getSelectedIndex()===undefined){this.setSelectedIndex(0);}}if(!this.aRBs){this.aRBs=[];}var d=this.aRBs.length;this.aRBs[d]=this.createRadioButton(i,d);return this;};b.prototype.insertItem=function(o,d){this.myChange=true;this.insertAggregation("items",o,d);o.attachEvent("_change",this._handleItemChanged,this);this.myChange=undefined;if(!this.aRBs){this.aRBs=[];}var e=this.aRBs.length;if(!this._bUpdateItems){if(this.getSelectedIndex()===undefined||e==0){this.setSelectedIndex(0);}else if(this.getSelectedIndex()>=d){this.setProperty("selectedIndex",this.getSelectedIndex()+1,true);}}if(d>=e){this.aRBs[d]=this.createRadioButton(o,d);}else{for(var i=(e);i>d;i--){this.aRBs[i]=this.aRBs[i-1];if((i-1)==d){this.aRBs[i-1]=this.createRadioButton(o,d);}}}return this;};b.prototype.createRadioButton=function(i,d){if(this.iIDCount==undefined){this.iIDCount=0;}else{this.iIDCount++;}var r=new R(this.getId()+"-"+this.iIDCount);r.setText(i.getText());r.setTooltip(i.getTooltip());if(this.getEnabled()){r.setEnabled(i.getEnabled());}else{r.setEnabled(false);}r.setKey(i.getKey());r.setTextDirection(i.getTextDirection());r.setEditable(this.getEditable());r.setGroupName(this.getId());r.setValueState(this.getValueState());r.setParent(this);if(d==this.getSelectedIndex()){r.setSelected(true);}r.attachEvent('select',this.handleRBSelect,this);return r;};b.prototype.removeItem=function(e){var i=e;if(typeof(e)=="string"){e=sap.ui.getCore().byId(e);}if(typeof(e)=="object"){i=this.indexOfItem(e);}this.myChange=true;var o=this.removeAggregation("items",i);o.detachEvent("_change",this._handleItemChanged,this);this.myChange=undefined;if(!this.aRBs){this.aRBs=[];}if(!this.aRBs[i]){return null;}this.aRBs[i].destroy();this.aRBs.splice(i,1);if(!this._bUpdateItems){if(this.aRBs.length==0){this.setSelectedIndex(undefined);}else if(this.getSelectedIndex()==i){this.setSelectedIndex(0);}else if(this.getSelectedIndex()>i){this.setProperty("selectedIndex",this.getSelectedIndex()-1,true);}}return o;};b.prototype.removeAllItems=function(){this.myChange=true;var d=this.removeAllAggregation("items");for(var i=0;i<d.length;i++){d[i].detachEvent("_change",this._handleItemChanged,this);}this.myChange=undefined;if(!this._bUpdateItems){this.setSelectedIndex(undefined);}if(this.aRBs){while(this.aRBs.length>0){this.aRBs[0].destroy();this.aRBs.splice(0,1);}return d;}else{return null;}};b.prototype.destroyItems=function(){this.myChange=true;var d=this.getItems();for(var i=0;i<d.length;i++){d[i].detachEvent("_change",this._handleItemChanged,this);}this.destroyAggregation("items");this.myChange=undefined;if(!this._bUpdateItems){this.setSelectedIndex(undefined);}if(this.aRBs){while(this.aRBs.length>0){this.aRBs[0].destroy();this.aRBs.splice(0,1);}}return this;};b.prototype.updateItems=function(){var s=this.getSelectedIndex();this._bUpdateItems=true;this.updateAggregation("items");this._bUpdateItems=undefined;var i=this.getItems();if(s===undefined&&i.length>0){this.setSelectedIndex(0);}else if(s>=0&&i.length==0){this.setSelectedIndex(undefined);}else if(s>=i.length){this.setSelectedIndex(i.length-1);}};b.prototype.clone=function(){var d=this.getItems();var i=0;for(i=0;i<d.length;i++){d[i].detachEvent("_change",this._handleItemChanged,this);}var o=C.prototype.clone.apply(this,arguments);for(i=0;i<d.length;i++){d[i].attachEvent("_change",this._handleItemChanged,this);}return o;};b.prototype.handleRBSelect=function(o){for(var i=0;i<this.aRBs.length;i++){if(this.aRBs[i].getId()==o.getParameter("id")){this.setSelectedIndex(i);this.oItemNavigation.setSelectedIndex(i);this.oItemNavigation.setFocusedIndex(i);this.fireSelect({selectedIndex:i});break;}}};b.prototype.setEditable=function(e){this.setProperty("editable",e,false);if(this.aRBs){for(var i=0;i<this.aRBs.length;i++){this.aRBs[i].setEditable(e);}}return this;};b.prototype.setEnabled=function(e){this.setProperty("enabled",e,false);if(this.aRBs){for(var i=0;i<this.aRBs.length;i++){this.aRBs[i].setEnabled(e);}}return this;};b.prototype.setValueState=function(v){this.setProperty("valueState",v,false);if(this.aRBs){for(var i=0;i<this.aRBs.length;i++){this.aRBs[i].setValueState(v);}}return this;};b.prototype._handleAfterFocus=function(o){var i=o.getParameter("index");var e=o.getParameter("event");if(i!=this.getSelectedIndex()&&!(e.ctrlKey||e.metaKey)&&this.aRBs[i].getEditable()&&this.aRBs[i].getEnabled()){this.setSelectedIndex(i);this.oItemNavigation.setSelectedIndex(i);this.fireSelect({selectedIndex:i});}};b.prototype._handleItemChanged=function(e){var o=e.oSource;var p=e.getParameter("name");var s=e.getParameter("newValue");var d=this.getItems();var r;for(var i=0;i<d.length;i++){if(d[i]==o){if(this.aRBs[i]){r=this.aRBs[i];}break;}}switch(p){case"text":r.setText(s);break;case"tooltip":r.setTooltip(s);break;case"enabled":if(this.getEnabled()){r.setEnabled(s);}break;case"key":r.setKey(s);break;case"textDirection":r.setTextDirection(s);break;default:break;}};return b;});