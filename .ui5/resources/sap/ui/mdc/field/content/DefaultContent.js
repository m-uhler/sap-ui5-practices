/*
 * ! OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/m/library"],function(l){"use strict";var E=l.EmptyIndicatorMode;var D={getDisplay:function(){return["sap/m/Text"];},getEdit:function(){return["sap/ui/mdc/field/FieldInput"];},getEditMulti:function(){return["sap/ui/mdc/field/FieldMultiInput","sap/m/Token"];},getEditMultiLine:function(){return["sap/m/TextArea"];},getEditOperator:function(){return[null];},getUseDefaultEnterHandler:function(){return true;},getUseDefaultFieldHelp:function(){return{name:"defineConditions",oneOperatorSingle:false,oneOperatorMulti:false};},getControlNames:function(c,o){var C;switch(c){case"Display":C=this.getDisplay();break;case"EditMulti":C=this.getEditMulti();break;case"EditMultiLine":C=this.getEditMultiLine();break;case"EditOperator":if(this.getEditOperator()){C=this.getEditOperator()[o]?this.getEditOperator()[o].name:[null];}else{C=[null];}break;default:C=this.getEdit();}if(C){return Array.isArray(C)?C:[C];}throw new Error("No control defined for content mode "+c);},create:function(c,C,o,a,i){switch(C){case"Display":return this.createDisplay(c,a,i);case"EditMulti":return this.createEditMulti(c,a,i);case"EditMultiLine":return this.createEditMultiLine(c,a,i);case"EditOperator":if(this.getEditOperator()){return this.getEditOperator()[o]?this.getEditOperator()[o].create.call(this,c,a,i):[null];}return[null];default:return this.createEdit(c,a,i);}},createEdit:function(c,C,i){var I=C[0];var o=c.getConditionsType();var a=new I(i,{value:{path:"$field>/conditions",type:o},placeholder:"{$field>/placeholder}",textAlign:"{$field>/textAlign}",textDirection:"{$field>/textDirection}",required:"{$field>/required}",editable:{path:"$field>/editMode",formatter:c.getMetadata()._oClass._getEditable},enabled:{path:"$field>/editMode",formatter:c.getMetadata()._oClass._getEnabled},valueState:"{$field>/valueState}",valueStateText:"{$field>/valueStateText}",valueHelpIconSrc:c.getFieldHelpIcon(),showValueHelp:"{$field>/_fieldHelpEnabled}",ariaAttributes:"{$field>/_ariaAttributes}",width:"100%",tooltip:"{$field>/tooltip}",autocomplete:false,change:c.getHandleContentChange(),liveChange:c.getHandleContentLiveChange(),valueHelpRequest:c.getHandleValueHelpRequest()});a._setPreferUserInteraction(true);c.setBoundProperty("value");c.setAriaLabelledBy(a);return[a];},createEditMulti:function(c,C,i){var I=C[0];var T=C[1];var o=c.getConditionType();var t=new T(i+"-token",{text:{path:'$field>',type:o}});var m=new I(i,{placeholder:"{$field>/placeholder}",textAlign:"{$field>/textAlign}",textDirection:"{$field>/textDirection}",required:"{$field>/required}",editable:{path:"$field>/editMode",formatter:c.getMetadata()._oClass._getEditable},enabled:{path:"$field>/editMode",formatter:c.getMetadata()._oClass._getEnabled},valueState:"{$field>/valueState}",valueStateText:"{$field>/valueStateText}",showValueHelp:"{$field>/_fieldHelpEnabled}",valueHelpIconSrc:c.getFieldHelpIcon(),ariaAttributes:"{$field>/_ariaAttributes}",width:"100%",tooltip:"{$field>/tooltip}",tokens:{path:"$field>/conditions",template:t},dependents:[t],autocomplete:false,change:c.getHandleContentChange(),liveChange:c.getHandleContentLiveChange(),tokenUpdate:c.getHandleTokenUpdate(),valueHelpRequest:c.getHandleValueHelpRequest()});m._setPreferUserInteraction(true);c.setAriaLabelledBy(m);return[m];},createEditMultiLine:function(c,C,i){var T=C[0];var o=c.getConditionsType();var t=new T(i,{value:{path:"$field>/conditions",type:o},placeholder:"{$field>/placeholder}",textAlign:"{$field>/textAlign}",textDirection:"{$field>/textDirection}",required:"{$field>/required}",editable:{path:"$field>/editMode",formatter:c.getMetadata()._oClass._getEditable},enabled:{path:"$field>/editMode",formatter:c.getMetadata()._oClass._getEnabled},valueState:"{$field>/valueState}",valueStateText:"{$field>/valueStateText}",width:"100%",rows:4,tooltip:"{$field>/tooltip}",change:c.getHandleContentChange(),liveChange:c.getHandleContentLiveChange()});t._setPreferUserInteraction(true);c.setBoundProperty("value");c.setAriaLabelledBy(t);return[t];},createDisplay:function(c,C,i){var T=C[0];var o=c.getConditionsType();var t=new T(i,{text:{path:"$field>/conditions",type:o},textAlign:"{$field>/textAlign}",textDirection:"{$field>/textDirection}",wrapping:"{$field>/multipleLines}",width:"100%",tooltip:"{$field>/tooltip}",emptyIndicatorMode:E.Auto});c.setBoundProperty("text");return[t];}};return D;});
