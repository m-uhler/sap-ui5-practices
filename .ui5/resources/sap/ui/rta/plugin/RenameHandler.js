/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/base/BindingParser","sap/ui/thirdparty/jquery","sap/ui/Device","sap/ui/rta/plugin/Plugin","sap/ui/dt/Overlay","sap/ui/dt/ElementUtil","sap/ui/dt/OverlayRegistry","sap/ui/rta/Utils","sap/ui/dt/DOMUtil","sap/ui/events/KeyCodes"],function(B,q,D,P,O,E,a,U,b,K){"use strict";var e="\xa0";function c(n,o){if(o===n){throw Error("sameTextError");}var d;var f;try{d=B.complexParser(n,undefined,true);}catch(g){f=true;}if(d&&typeof d==="object"||f){throw Error(sap.ui.getCore().getLibraryResourceBundle("sap.ui.rta").getText("RENAME_BINDING_ERROR_TEXT"));}}var R={errorStyleClass:"sapUiRtaErrorBg",validators:{noEmptyText:{validatorFunction:function(n){return n!==e;},errorMessage:sap.ui.getCore().getLibraryResourceBundle("sap.ui.rta").getText("RENAME_EMPTY_ERROR_TEXT")}},_manageClickEvent:function(v){var o=v.getSource?v.getSource():v;if(o.isSelected()&&this.isRenameAvailable(o)&&this.isRenameEnabled([o])){o.attachBrowserEvent("click",R._onClick,this);}else{o.detachBrowserEvent("click",R._onClick,this);}},startEdit:function(p){this.setBusy(true);this._oEditedOverlay=p.overlay;var o=p.overlay.getElement();var d=this._oEditedOverlay.getDesignTimeMetadata();var v=d.getAssociatedDomRef(o,p.domRef);if(!U.isElementInViewport(v)){v.get(0).scrollIntoView();}this._$oEditableControlDomRef=q(v);var w=0;var f=a.getOverlay(v instanceof q?v.get(0).id:v.id);if(!f){f=this._oEditedOverlay;var _=q(E.getDomRef(o));var g=this._$oEditableControlDomRef.parent();var C=parseInt(_.outerWidth());if(!isNaN(C)){var i=parseInt(this._$oEditableControlDomRef.outerWidth());var h=parseInt(g.outerWidth());w=C-i;if(w<0&&h){if(g.get(0).id!==_.get(0).id&&g.children(":visible").length===1&&g.children(":visible").get(0).id===this._$oEditableControlDomRef.get(0).id&&C>h){w=C-h;}else{w=0;}}}}var j=q("<div class='sapUiRtaEditableField'></div>").css({"white-space":"nowrap",overflow:"hidden",width:"calc(100% - ("+w+"px))"}).appendTo(f.$());this._$editableField=q("<div contentEditable='true'></div>").appendTo(j);if(this._$oEditableControlDomRef.text()===""){this._$oEditableControlDomRef.text("_?_");this._$editableField.text("");}else{this._$editableField.text(this._$oEditableControlDomRef.text());}this.setOldValue(R._getCurrentEditableFieldText.call(this));b.copyComputedStyle(this._$oEditableControlDomRef,this._$editableField);this._$editableField.children().remove();this._$editableField.css("visibility","hidden");this._$editableField.css({"-moz-user-modify":"read-write","-webkit-user-modify":"read-write","-ms-user-modify":"read-write","user-modify":"read-write","text-overflow":"clip","white-space":"nowrap"});if(D.browser.name==="ed"&&o.getMetadata().getName()==="sap.ui.fl.variants.VariantManagement"){this._$editableField.css({"line-height":"normal"});}O.getMutationObserver().ignoreOnce({target:this._$oEditableControlDomRef.get(0)});this._$editableField.one("focus",R._onEditableFieldFocus.bind(this));this._$editableField.on("blur",R._onEditableFieldBlur.bind(this));this._$editableField.on("keydown",R._onEditableFieldKeydown.bind(this));this._$editableField.on("dragstart",R._stopPropagation.bind(this));this._$editableField.on("drag",R._stopPropagation.bind(this));this._$editableField.on("dragend",R._stopPropagation.bind(this));this._$editableField.on("click",R._stopPropagation.bind(this));this._$editableField.on("mousedown",R._stopPropagation.bind(this));this._$oEditableControlDomRef.css("visibility","hidden");j.offset({left:this._$oEditableControlDomRef.offset().left});this._$editableField.offset({left:this._$oEditableControlDomRef.offset().left});this._$editableField.offset({top:this._$oEditableControlDomRef.offset().top});this._$editableField.css("visibility","");this._$editableField.trigger("focus");p.overlay.setSelected(true);sap.ui.getCore().getEventBus().publish("sap.ui.rta",p.pluginMethodName,{overlay:p.overlay,editableField:this._$editableField});},_setDesignTime:function(d){this._aSelection=[];var o=this.getDesignTime();if(o){o.getSelectionManager().detachChange(R._onDesignTimeSelectionChange,this);}P.prototype.setDesignTime.apply(this,arguments);if(d){d.getSelectionManager().attachChange(R._onDesignTimeSelectionChange,this);this._aSelection=this.getSelectedOverlays();}},_onDesignTimeSelectionChange:function(o){var s=o.getParameter("selection");this._aSelection.forEach(R._manageClickEvent,this);s.forEach(R._manageClickEvent,this);this._aSelection=s;},_stopPropagation:function(o){o.stopPropagation();},_preventDefault:function(o){o.preventDefault();},_onEditableFieldFocus:function(o){var d=o.target;var r=document.createRange();r.selectNodeContents(d);var s=window.getSelection();s.removeAllRanges();s.addRange(r);},_stopEdit:function(r,p){var o;this.setBusy(false);if(this._$oEditableControlDomRef.text()==="_?_"){this._$oEditableControlDomRef.text("");}this._oEditedOverlay.$().find(".sapUiRtaEditableField").remove();O.getMutationObserver().ignoreOnce({target:this._$oEditableControlDomRef.get(0)});this._$oEditableControlDomRef.css("visibility","visible");if(r){o=this._oEditedOverlay;o.setSelected(true);o.focus();}delete this._$editableField;delete this._$oEditableControlDomRef;delete this._oEditedOverlay;delete this._bBlurOrKeyDownStarted;sap.ui.getCore().getEventBus().publish("sap.ui.rta",p,{overlay:o});},_onEditableFieldBlur:function(){return R._handlePostRename.call(this,false);},_handlePostRename:function(r,o){if(!this._bBlurOrKeyDownStarted){this._oEditedOverlay.removeStyleClass(R.errorStyleClass);this._bBlurOrKeyDownStarted=true;if(o){R._preventDefault.call(this,o);R._stopPropagation.call(this,o);}return Promise.resolve().then(R._validateNewText.bind(this)).then(this._emitLabelChangeEvent.bind(this)).catch(function(d){if(d.message==="sameTextError"){return;}throw d;}).then(function(f){this.stopEdit(r);if(typeof f==="function"){f();}}.bind(this)).catch(function(d){return R._handleInvalidRename.call(this,d.message,r);}.bind(this));}return Promise.resolve();},_handleInvalidRename:function(s,r){return U.showMessageBox("error",s,{titleKey:"RENAME_ERROR_TITLE"}).then(function(){var o=this._oEditedOverlay;o.addStyleClass(R.errorStyleClass);this.stopEdit(r);this.startEdit(o);}.bind(this));},_validateNewText:function(){var s;var n=R._getCurrentEditableFieldText.call(this);c(n,this.getOldValue());var r=this.getResponsibleElementOverlay(this._oEditedOverlay);var o=this.getAction(r);var v=o&&o.validators||[];v.some(function(V){var d;if(typeof V==="string"&&R.validators[V]){d=R.validators[V];}else{d=V;}if(!d.validatorFunction(n)){s=d.errorMessage;return true;}});if(s){throw Error(s);}},_onEditableFieldKeydown:function(o){switch(o.keyCode){case K.ENTER:return R._handlePostRename.call(this,true,o);case K.ESCAPE:this._oEditedOverlay.removeStyleClass(R.errorStyleClass);this.stopEdit(true);R._preventDefault.call(this,o);break;case K.DELETE:R._stopPropagation.call(this,o);break;default:}return Promise.resolve();},_getCurrentEditableFieldText:function(){var t=this._$editableField.text().trim();return t===""?e:t;},_onClick:function(o){var d=sap.ui.getCore().byId(o.currentTarget.id);if(this.isRenameEnabled([d])&&!o.metaKey&&!o.ctrlKey){this.startEdit(d);R._preventDefault.call(this,o);}},_exit:function(){if(this._$oEditableControlDomRef){this.stopEdit(false);}}};return R;},true);