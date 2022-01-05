/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['./ComboBoxTextField','./ComboBoxBase','./List','./library','sap/ui/Device','sap/ui/core/Item','./StandardListItem','./ComboBoxRenderer','sap/ui/base/ManagedObjectObserver',"sap/ui/dom/containsOrEquals","sap/m/inputUtils/scrollToItem","sap/m/inputUtils/inputsDefaultFilter","sap/m/inputUtils/typeAhead","sap/m/inputUtils/filterItems","sap/m/inputUtils/ListHelpers","sap/m/inputUtils/itemsVisibilityHandler","sap/m/inputUtils/selectionRange","sap/m/inputUtils/calculateSelectionStart","sap/ui/events/KeyCodes","./Toolbar","sap/base/assert","sap/base/security/encodeXML","sap/ui/core/Core","sap/base/Log","sap/ui/dom/jquery/control"],function(C,a,L,l,D,I,S,b,M,c,s,i,t,f,d,g,h,j,K,T,k,m,n,o,q){"use strict";var p=l.ListMode;var r=a.extend("sap.m.ComboBox",{metadata:{library:"sap.m",designtime:"sap/m/designtime/ComboBox.designtime",properties:{selectedKey:{type:"string",group:"Data",defaultValue:""},selectedItemId:{type:"string",group:"Misc",defaultValue:""},filterSecondaryValues:{type:"boolean",group:"Misc",defaultValue:false}},associations:{selectedItem:{type:"sap.ui.core.Item",multiple:false}},events:{change:{parameters:{value:{type:"string"},itemPressed:{type:"boolean"}}},selectionChange:{parameters:{selectedItem:{type:"sap.ui.core.Item"}}}},dnd:{draggable:false,droppable:true}}});function u(e){var v=this.getSelectedItem(),w=d.getListItem(v),x=v&&w&&w.getDomRef(),y=x&&x.offsetTop,z=x&&x.offsetHeight,P=this.getPicker(),A=P.getDomRef("cont"),B=A.clientHeight;if(v&&((y+z)>(B))){if(!e){this._getList().$().css("visibility","hidden");}else{A.scrollTop=y-z/2;this._getList().$().css("visibility","visible");}}}r.prototype._getSelectedItemText=function(v){v=v||this.getSelectedItem();if(!v){v=this.getDefaultSelectedItem();}if(v){return v.getText();}return"";};r.prototype.setSelectedIndex=function(e,_){var v;_=_||this.getItems();e=(e>_.length-1)?_.length-1:Math.max(0,e);v=_[e];if(v){this.setSelection(v);}};r.prototype.revertSelection=function(){var P,e=this.getPickerTextField();this.setSelectedItem(this._oSelectedItemBeforeOpen);this.setValue(this._sValueBeforeOpen);if(this.getSelectedItem()===null){P=this._sValueBeforeOpen;}else{P=this._oSelectedItemBeforeOpen.getText();}e&&e.setValue(P);};r.prototype._filterStartsWithItems=function(e,v){var w=e.toLowerCase();var x=this.getItems(),F=x.filter(function(y){return y[v]&&y[v]().toLowerCase().startsWith(w);});return F;};r.prototype.setSelection=function(v){var e=this._getList(),w,x;this.setAssociation("selectedItem",v);this._setPropertyProtected("selectedItemId",(v instanceof I)?v.getId():v,true);if(typeof v==="string"){v=n.byId(v);}if(e){w=d.getListItem(v);if(w){e.setSelectedItem(w,true);}else{e.removeSelections(true);}}x=v?v.getKey():"";this._setPropertyProtected("selectedKey",x);};r.prototype.isSelectionSynchronized=function(){var v=this.getSelectedItem();return this.getSelectedKey()===(v&&v.getKey());};r.prototype._forwardItemProperties=function(P){var e=P.object,v=e.data(d.CSS_CLASS+"ListItem"),w={text:"title",enabled:"visible",tooltip:"tooltip"},A,x,y;if(Object.keys(w).indexOf(P.name)>-1){x=w[P.name];y="set"+x.charAt(0).toUpperCase()+x.slice(1);v[y](P.current);}if(P.name==="additionalText"){A=this.getShowSecondaryValues()?P.current:"";v.setInfo(A);}};r.prototype.isItemSelected=function(v){return v&&(v.getId()===this.getAssociation("selectedItem"));};r.prototype.setAssociation=function(A,e,v){var w=this._getList();if(w&&(A==="selectedItem")){if(!(e instanceof I)){e=this.findItem("id",e);}w.setSelectedItem(d.getListItem(e),true);}return a.prototype.setAssociation.apply(this,arguments);};r.prototype.removeAllAssociation=function(A,e){var v=this._getList();if(v&&(A==="selectedItem")){L.prototype.removeAllAssociation.apply(v,arguments);}return a.prototype.removeAllAssociation.apply(this,arguments);};r.prototype.init=function(){this._oRb=n.getLibraryResourceBundle("sap.m");a.prototype.init.apply(this,arguments);this.bOpenValueStateMessage=true;this._sValueBeforeOpen="";this._sInputValueBeforeOpen="";this._oSelectedItemBeforeOpen=null;this.bIsFocused=false;if(D.system.phone){this.attachEvent("_change",this.onPropertyChange,this);}this.setLastFocusedListItem(null);this._oItemObserver=new M(this._forwardItemProperties.bind(this));};r.prototype.onBeforeRendering=function(){a.prototype.onBeforeRendering.apply(this,arguments);this.synchronizeSelection();if(!this.isOpen()&&document.activeElement===this.getFocusDomRef()&&this.getEnabled()){this.addStyleClass("sapMFocus");}};r.prototype.exit=function(){a.prototype.exit.apply(this,arguments);this._oRb=null;this._oSelectedItemBeforeOpen=null;this.setLastFocusedListItem(null);if(this._oItemObserver){this._oItemObserver.disconnect();this._oItemObserver=null;}};r.prototype.onBeforeRenderingPicker=function(){var O=this["onBeforeRendering"+this.getPickerType()];O&&O.call(this);};r.prototype.onBeforeRenderingDropdown=function(){var P=this.getPicker(),w=(this.$().outerWidth()/parseFloat(l.BaseFontSize))+"rem";if(P){P.setContentMinWidth(w);}};r.prototype.onBeforeRenderingList=function(){if(this.bProcessingLoadItemsEvent){var e=this._getList(),F=this.getFocusDomRef();if(e){e.setBusy(true);}if(F){F.setAttribute("aria-busy","true");}}};r.prototype.onAfterRenderingPicker=function(){var O=this["onAfterRendering"+this.getPickerType()];O&&O.call(this);u.call(this,false);};r.prototype.onAfterRenderingList=function(){var e=this.getSelectedItem(),v=d.getListItem(e);if(this.bProcessingLoadItemsEvent&&(this.getItems().length===0)){return;}var w=this._getList(),F=this.getFocusDomRef();this.highlightList(this._sInputValueBeforeOpen);if(e){w.setSelectedItem(v);this.setLastFocusedListItem(v);}if(w){w.setBusy(false);}if(F){F.removeAttribute("aria-busy");}};r.prototype._fillList=function(){var F,e,v,w=this._getList(),E=d.getEnabledItems(this.getItems());if(!w){return;}if(this.getLastFocusedListItem()){e=d.getItemByListItem(E,this.getLastFocusedListItem());}w.destroyItems();if(this._sInputValueBeforeOpen){F=this.filterItems(this._sInputValueBeforeOpen);E=F.items;}E.forEach(function(x){v=this._mapItemToListItem(x).setVisible(true);w.addItem(v);}.bind(this));if(this._sInputValueBeforeOpen){g(E,F);}e&&this.setLastFocusedListItem(d.getListItem(e));};r.prototype.filterItems=function(v){return f(this,this.getItems(),v,true,this.getFilterSecondaryValues(),this.fnFilter||i);};r.prototype._mapItemToListItem=function(e){var v=d.createListItemFromCoreItem(e,this.getShowSecondaryValues());if(e.isA("sap.ui.core.Item")){this.setSelectable(e,e.getEnabled());}if(e.isA("sap.ui.core.SeparatorItem")){v.addAriaLabelledBy(this._getGroupHeaderInvisibleText().getId());}v.addStyleClass(this.getRenderer().CSS_CLASS_COMBOBOXBASE+"NonInteractiveItem");this._oItemObserver.observe(e,{properties:["text","additionalText","enabled","tooltip"]});return v;};r.prototype.oninput=function(e){a.prototype.oninput.apply(this,arguments);this.syncPickerContent();if(e.isMarked("invalid")){return;}this.loadItems(function(){this.handleInputValidation(e);},{name:"input",busyIndicator:false});if(this.bProcessingLoadItemsEvent&&(this.getPickerType()==="Dropdown")){this.open();}if(this.getLastFocusedListItem()){this.getLastFocusedListItem().removeStyleClass("sapMLIBFocused");this.setLastFocusedListItem(null);}this.addStyleClass("sapMFocus");this._getList().removeStyleClass("sapMListFocus");if(this._getItemsShownWithFilter()){this.toggleIconPressedStyle(true);}};r.prototype.handleInputValidation=function(e){var v,w,F,x,H,y=this.getSelectedItem(),V=e.target.value,E=V==="",z=e.srcControl,A=(this.getPickerType()==="Dropdown"),B=d.getListItem(y),G=this.filterItems(V);if(E&&!this.bOpenedByKeyboardOrButton&&!this.isPickerDialog()){v=this.getItems();}else{v=d.getSelectableItems(G.items);g(this.getItems(),G);}F=v[0];x=v.some(function(J){return J.getKey()===this.getSelectedKey();},this);w=this.intersectItems(this._filterStartsWithItems(V,'getText'),v);H=!E&&F&&F.getEnabled();if(F&&this.getSelectedKey()&&!x){this.setSelection(null);}if(H&&z&&z._bDoTypeAhead){this.handleTypeAhead(z,v,V);}else if(H&&w[0]&&V===w[0].getText()){this.setSelection(w[0]);}else{this.setSelection(null);}if(y!==this.getSelectedItem()){this.fireSelectionChange({selectedItem:this.getSelectedItem()});B=d.getListItem(this.getSelectedItem());}this._sInputValueBeforeOpen=V;if(this.isOpen()){setTimeout(function(){this.highlightList(V);}.bind(this));}if(F){if(E&&!this.bOpenedByKeyboardOrButton){this.close();}else if(A){this.open();s(B,this.getPicker());}}else if(this.isOpen()){if(A&&!this.bOpenedByKeyboardOrButton){this.close();}}else{this.clearFilter();}};r.prototype.handleTypeAhead=function(e,v,V){var w,x=this.getFilterSecondaryValues(),y=t(V,e,v,function(z){w=[z.getText()];if(x){w.push(z.getAdditionalText());}return w;});this.setSelection(y[0]);this.addStyleClass("sapMFocus");this._getList().removeStyleClass("sapMListFocus");};r.prototype.onSelectionChange=function(e){var v=d.getItemByListItem(this.getItems(),e.getParameter("listItem")),P=this.getChangeEventParams(),w=(v!==this.getSelectedItem());v&&this.updateDomValue(v.getText());this.setSelection(v);this.fireSelectionChange({selectedItem:this.getSelectedItem()});if(w){P.itemPressed=true;this.onChange(null,P);}};r.prototype.onItemPress=function(e){var v=e.getParameter("listItem"),w=v.getTitle(),P=this.getChangeEventParams(),x=(v!==d.getListItem(this.getSelectedItem()));if(v.isA("sap.m.GroupHeaderListItem")){return;}this.setLastFocusedListItem(v);this.updateDomValue(w);if(!x){P.itemPressed=true;this.onChange(null,P);}this._setPropertyProtected("value",w,true);if(this.getPickerType()==="Dropdown"&&!this.isPlatformTablet()){this.selectText.bind(this,this.getValue().length,this.getValue().length);}this.close();};r.prototype.onBeforeOpen=function(){a.prototype.onBeforeOpen.apply(this,arguments);var P=this["onBeforeOpen"+this.getPickerType()],e=this.getFocusDomRef();if(this.hasLoadItemsEventListeners()&&!this.bProcessingLoadItemsEvent){this.loadItems();}if(e){e.setAttribute("aria-controls",this.getPicker().getId());e.setAttribute("aria-expanded",true);}this.addContent();P&&P.call(this);};r.prototype.onBeforeOpenDialog=function(){var P=this.getPickerTextField();this._oSelectedItemBeforeOpen=this.getSelectedItem();this._sValueBeforeOpen=this.getValue();this.getSelectedItem()&&g(this.getItems(),this.filterItems(""));P.setValue(this._sValueBeforeOpen);};r.prototype.onAfterOpen=function(){var e=this.getSelectedItem(),v=h(this.getFocusDomRef()),w=this.isPlatformTablet();this.closeValueStateMessage();u.call(this,true);if(!w&&e&&v.start===v.end&&v.start>1){setTimeout(function(){this.selectText(0,v.end);}.bind(this),0);}};r.prototype.onBeforeClose=function(){a.prototype.onBeforeClose.apply(this,arguments);var e=this.getFocusDomRef();if(e){e.removeAttribute("aria-controls");e.setAttribute("aria-expanded",false);}if(document.activeElement===e){this.updateFocusOnClose();}this.toggleIconPressedStyle(false);};r.prototype.onAfterClose=function(){this.clearFilter();this._sInputValueBeforeOpen="";if(this.isPickerDialog()){a.prototype.closeValueStateMessage.apply(this,arguments);}};r.prototype.onItemChange=function(e){var v=this.getAssociation("selectedItem"),N=e.getParameter("newValue"),P=e.getParameter("name");if(v===e.getParameter("id")){switch(P){case"text":if(!this.isBound("value")){this.setValue(N);}break;case"key":if(!this.isBound("selectedKey")){this.setSelectedKey(N);}break;}}};r.prototype.onkeydown=function(e){var v=e.srcControl;a.prototype.onkeydown.apply(v,arguments);if(!v.getEnabled()||!v.getEditable()){return;}var w=K;v._bDoTypeAhead=!D.os.android&&(e.which!==w.BACKSPACE)&&(e.which!==w.DELETE);};r.prototype.oncut=function(e){var v=e.srcControl;a.prototype.oncut.apply(v,arguments);v._bDoTypeAhead=false;};r.prototype.onsapenter=function(e){var v=e.srcControl,w=v.getSelectedItem();if(w&&this.getFilterSecondaryValues()){v.updateDomValue(w.getText());}a.prototype.onsapenter.apply(v,arguments);if(!v.getEnabled()||!v.getEditable()){return;}if(v.isOpen()&&!this.isComposingCharacter()){v.close();}};["onsapup","onsapdown","onsappageup","onsappagedown","onsaphome","onsapend"].forEach(function(N){r.prototype[N]=function(e){this.handleListNavigation(e,N);};});r.prototype.handleListNavigation=function(e,N){var v=e.srcControl;if(!v.getEnabled()||!v.getEditable()){return;}this.syncPickerContent();e.preventDefault();this.loadItems(function(){if(!this.isOpen()){this.handleInlineListNavigation(N);}else{var w=this._getSuggestionsPopover();w&&w.handleListNavigation(this,e,N);}e.setMarked();});};r.prototype.handleInlineListNavigation=function(N){var e=this.getItems(),v=d.getSelectableItems(e),w=this.getSelectedItem(),x;switch(N){case"onsapdown":x=v.indexOf(w)+1;break;case"onsapup":x=w?v.indexOf(w)-1:v.length-1;break;case"onsapend":x=v.length-1;break;case"onsaphome":x=0;break;case"onsappagedown":x=Math.min(v.length-1,v.indexOf(w)+10);break;case"onsappageup":x=Math.max(0,v.indexOf(w)-10);break;}this.handleSelectionFromList(v[x]);};r.prototype.handleSelectionFromList=function(e){if(!e){return;}var v=this.getFocusDomRef(),w=v.value.substring(0,v.selectionStart),x=this.getSelectedItem(),y=this.getLastFocusedListItem(),z,A,B,E;if(e.isA("sap.m.StandardListItem")||e.isA("sap.m.GroupHeaderListItem")){z=e;e=d.getItemByListItem(this.getItems(),e);}else{z=d.getListItem(e);}this.setSelection(e);this.setLastFocusedListItem(z);if(e.isA("sap.ui.core.SeparatorItem")){this.setSelectedItem(null);this.updateDomValue(w);this.fireSelectionChange({selectedItem:null});this._getGroupHeaderInvisibleText().setText(this._oRb.getText("LIST_ITEM_GROUP_HEADER")+" "+e.getText());return;}if(e!==x){A=e.getText();E=y&&y.isA("sap.m.GroupHeaderListItem");B=j(h(v,E),A,w,E);this.updateDomValue(A);this.fireSelectionChange({selectedItem:e});e=this.getSelectedItem();this.selectText(B,v.value.length);}};r.prototype.setLastFocusedListItem=function(e){this._oLastFocusedListItem=e;};r.prototype.getLastFocusedListItem=function(){return this._oLastFocusedListItem;};r.prototype.onsapshow=function(e){var v,w,E=this.getEditable(),x;a.prototype.onsapshow.apply(this,arguments);this.syncPickerContent();if(!this.getValue()&&E){v=d.getSelectableItems(this.getItems());w=v[0];if(w){x=d.getListItem(w);if(this.isOpen()){this._getSuggestionsPopover().updateFocus(this,x);this.setLastFocusedListItem(x);}else{this.addStyleClass("sapMFocus");}this.setSelection(w);this.updateDomValue(w.getText());this.fireSelectionChange({selectedItem:w});setTimeout(function(){this.selectText(0,w.getText().length);}.bind(this),0);}}};r.prototype.onsaphide=r.prototype.onsapshow;r.prototype.ontap=function(e){if(!this.getEnabled()){return;}this.updateFocusOnClose();};r.prototype.updateFocusOnClose=function(){var e=this.getFocusDomRef(),v=this._getSuggestionsPopover();this.setLastFocusedListItem(null);if(v){v.setValueStateActiveState(false);v.updateFocus(this);}e.removeAttribute("aria-activedescendant");};r.prototype.onfocusin=function(e){var v=this.getPickerType()==="Dropdown";if(this._bIsBeingDestroyed){return;}if(e.target===this.getOpenArea()){this.bOpenValueStateMessage=false;if(v&&!this.isPlatformTablet()){this.focus();}}else{if(v){setTimeout(function(){if(document.activeElement===this.getFocusDomRef()&&!this.bIsFocused&&!this.bFocusoutDueRendering&&!this.getSelectedText()){this.selectText(0,this.getValue().length);}this.bIsFocused=true;}.bind(this),0);}if(!this.isOpen()&&this.bOpenValueStateMessage&&this.shouldValueStateMessageBeOpened()){this.openValueStateMessage();}this.bOpenValueStateMessage=true;}if(this.getEnabled()&&(!this.isOpen()||!this.getSelectedItem()||!this._getList().hasStyleClass("sapMListFocus"))){this.addStyleClass("sapMFocus");}};r.prototype.onsapfocusleave=function(e){this.bIsFocused=false;var v,P,R,F,w=this.getSelectedItem();if(w&&this.getFilterSecondaryValues()){this.updateDomValue(w.getText());}a.prototype.onsapfocusleave.apply(this,arguments);if(this.isPickerDialog()){return;}P=this.getPicker();if(!e.relatedControlId||!P){return;}v=this.isPlatformTablet();R=n.byId(e.relatedControlId);F=R&&R.getFocusDomRef();if(c(P.getFocusDomRef(),F)&&!v&&!(this._getSuggestionsPopover().getValueStateActiveState())){this.focus();}};r.prototype.synchronizeSelection=function(){if(this.isSelectionSynchronized()){return;}var e=this.getSelectedKey(),v=this.getItemByKey(""+e);if(v&&(e!=="")){this.setAssociation("selectedItem",v,true);this._setPropertyProtected("selectedItemId",v.getId(),true);this.setValue(v.getText());this._sValue=this.getValue();}};r.prototype.configPicker=function(P){var R=this.getRenderer(),e=R.CSS_CLASS_COMBOBOXBASE;P.setHorizontalScrolling(false).addStyleClass(e+"Picker").addStyleClass(e+"Picker-CTX").attachBeforeOpen(this.onBeforeOpen,this).attachAfterOpen(this.onAfterOpen,this).attachBeforeClose(this.onBeforeClose,this).attachAfterClose(this.onAfterClose,this).addEventDelegate({onBeforeRendering:this.onBeforeRenderingPicker,onAfterRendering:this.onAfterRenderingPicker},this);};r.prototype._configureList=function(e){var R=this.getRenderer();if(!e){return;}e.setMode(p.SingleSelectMaster).addStyleClass(R.CSS_CLASS_COMBOBOXBASE+"List").addStyleClass(R.CSS_CLASS_COMBOBOX+"List");e.attachSelectionChange(this.onSelectionChange,this).attachItemPress(this.onItemPress,this);e.addEventDelegate({onBeforeRendering:this.onBeforeRenderingList,onAfterRendering:this.onAfterRenderingList},this);};r.prototype.destroyItems=function(){this.destroyAggregation("items");if(this._getList()){this._getList().destroyItems();}return this;};r.prototype.getDefaultSelectedItem=function(){return null;};r.prototype.getChangeEventParams=function(){return{itemPressed:false};};r.prototype.clearSelection=function(){this.setSelection(null);};r.prototype.selectText=function(e,v){a.prototype.selectText.apply(this,arguments);return this;};r.prototype.removeAllItems=function(){var e=a.prototype.removeAllItems.apply(this,arguments);this._fillList();return e;};r.prototype.clone=function(e){var v=a.prototype.clone.apply(this,arguments),w=this._getList();if(!this.isBound("items")&&w){v.syncPickerContent();v.setSelectedIndex(this.indexOfItem(this.getSelectedItem()));}return v;};r.prototype.open=function(){this.syncPickerContent();a.prototype.open.call(this);this._getSuggestionsPopover()&&this._getSuggestionsPopover().updateFocus(this,d.getListItem(this.getSelectedItem()));return this;};r.prototype.syncPickerContent=function(){var P,e=this.getPicker(),v=this.getInputForwardableProperties();if(!e){var w,G;e=this.createPicker(this.getPickerType());P=this.getPickerTextField();this._fillList();if(P){v.forEach(function(x){x=x.charAt(0).toUpperCase()+x.slice(1);w="set"+x;G="get"+x;if(P[w]){P[w](this[G]());}},this);}this._getSuggestionsPopover().updateValueState(this.getValueState(),this.getValueStateText(),this.getShowValueStateMessage());}this.synchronizeSelection();return e;};r.prototype.findAggregatedObjects=function(){var e=this._getList();if(e){return L.prototype.findAggregatedObjects.apply(e,arguments);}return[];};r.prototype.setSelectedItem=function(v){if(typeof v==="string"){this.setAssociation("selectedItem",v,true);v=n.byId(v);}if(!(v instanceof I)&&v!==null){return this;}if(!v){v=this.getDefaultSelectedItem();}this.setSelection(v);this.setValue(this._getSelectedItemText(v));return this;};r.prototype.setSelectedItemId=function(v){v=this.validateProperty("selectedItemId",v);if(!v){v=this.getDefaultSelectedItem();}this.setSelection(v);v=this.getSelectedItem();this.setValue(this._getSelectedItemText(v));return this;};r.prototype.setSelectedKey=function(e){e=this.validateProperty("selectedKey",e);var v=(e===""),w=this.isBound("selectedKey")&&this.isBound("value")&&this.getBindingInfo("selectedKey").skipModelUpdate;if(v){this.setSelection(null);if(!w){this.setValue("");}return this;}var x=this.getItemByKey(e);if(x){this.setSelection(x);if(!w){this.setValue(this._getSelectedItemText(x));}return this;}this._sValue=this.getValue();return this._setPropertyProtected("selectedKey",e);};r.prototype._setPropertyProtected=function(P,v,w){try{return this.setProperty(P,v,w);}catch(e){o.warning("setSelectedKey update failed due to exception. Loggable in support mode log",null,null,function(){return{exception:e};});}};r.prototype.getSelectedItem=function(){var v=this.getAssociation("selectedItem");return(v===null)?null:n.byId(v)||null;};r.prototype.removeItem=function(v){v=a.prototype.removeItem.apply(this,arguments);var e;if(this._getList()){this._getList().removeItem(v&&d.getListItem(v));}if(this.isBound("items")&&!this.bItemsUpdated){return v;}var V=this.getValue();if(this.getItems().length===0){this.clearSelection();}else if(this.isItemSelected(v)){e=this.getDefaultSelectedItem();this.setSelection(e);this.setValue(V);}return v;};r.prototype._decoratePopupInput=function(e){a.prototype._decoratePopupInput.apply(this,arguments);if(!e||!e.isA(["sap.m.InputBase"])){return;}e.addEventDelegate({onsapenter:function(){var v=e.getValue();this.updateDomValue(v);this.onChange();if(v){this.updateDomValue(v);this.onChange();this.close();}}},this);return e;};r.prototype.applyShowItemsFilters=function(){var P,e;this.syncPickerContent();P=this.getPicker();e=function(){P.detachBeforeOpen(e,this);P=null;g(this.getItems(),this.filterItems(this.getValue()||"_"));};P.attachBeforeOpen(e,this);};r.prototype.showItems=function(F){var e,v,w=Array.prototype.slice.call(arguments),x=this.fnFilter,y=function(){this.setFilterFunction(F||function(){return true;});v=this.filterItems(this.getValue()||"_");g(this.getItems(),v);this.setFilterFunction(x);e=v.items;if(e&&e.length){a.prototype.showItems.apply(this,w);}}.bind(this);this.attachLoadItems(y);this.loadItems(y);};r.prototype._getFormattedValueStateText=function(){if(this.isOpen()){return this._getSuggestionsPopover()._getValueStateHeader().getFormattedText();}else{return C.prototype.getFormattedValueStateText.call(this);}};return r;});
