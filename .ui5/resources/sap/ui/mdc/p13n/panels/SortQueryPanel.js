/*
 * ! OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./QueryPanel","sap/m/Text","sap/m/List","sap/m/SegmentedButton","sap/m/SegmentedButtonItem","sap/m/VBox","sap/m/library"],function(Q,T,L,S,a,V,l){"use strict";var F=l.FlexJustifyContent;var b=Q.extend("sap.ui.mdc.p13n.panels.SortQueryPanel",{renderer:{}});b.prototype._createRemoveButton=function(){var r=Q.prototype._createRemoveButton.apply(this,arguments);r.addStyleClass("sapUiSmallMarginBegin");return r;};b.prototype._getAdditionalQueryRowContent=function(i){var s=this._createOrderSwitch(i.name,i.descending);var o=this._createSortOrderText(i.descending);return[s,o];};b.prototype._createOrderSwitch=function(k,d){var s=new S({enabled:k?true:false,items:[new a({key:"asc",icon:"sap-icon://sort-ascending"}),new a({key:"desc",icon:"sap-icon://sort-descending"})],select:function(e){var c=e.getParameter("key");var t=e.getSource().getParent().getItems()[2].getItems()[0];t.setText(this._getSortOrderText(c==="desc"));var k=e.oSource.getParent().getItems()[0].getSelectedItem().getKey();this._changeOrder(k,c=="desc");}.bind(this)}).addStyleClass("sapUiSmallMarginEnd");s.setSelectedItem(d?s.getItems()[1]:s.getItems()[0]);return s;};b.prototype._createSortOrderText=function(d){var s=new V({width:"40%",justifyContent:F.Center,items:[new T({text:this._getSortOrderText(d)})]});return s;};b.prototype._selectKey=function(e){Q.prototype._selectKey.apply(this,arguments);var o=e.getSource().getParent().getParent();var n=e.getParameter("selectedItem").getKey();o.getContent()[0].getItems()[1].setEnabled(n!==this.NONE_KEY);};b.prototype._getSortOrderText=function(d){return d?this.getResourceText("sort.PERSONALIZATION_DIALOG_OPTION_DESCENDING"):this.getResourceText("sort.PERSONALIZATION_DIALOG_OPTION_ASCENDING");};b.prototype._changeOrder=function(k,d){var i=this.getP13nModel().getProperty("/items").filter(function(I){return I.name===k;});i[0].descending=d;};return b;});