/*
 * ! OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./BaseController","sap/ui/mdc/p13n/P13nBuilder","sap/ui/mdc/p13n/panels/ChartItemPanel"],function(B,P,C){"use strict";var r=sap.ui.getCore().getLibraryResourceBundle("sap.ui.mdc");var a=B.extend("sap.ui.mdc.p13n.subcontroller.ChartItemController");a.prototype.getAdaptationUI=function(p){var c=new C();c.setP13nModel(this._getP13nModel(p));return Promise.resolve(c);};a.prototype.getDelta=function(p){p.deltaAttributes.push("role");return B.prototype.getDelta.apply(this,arguments);};a.prototype.getContainerSettings=function(){return{title:r.getText("chart.PERSONALIZATION_DIALOG_TITLE")};};a.prototype.mixInfoAndState=function(p){var i=this.getCurrentState();var I=P.arrayToMap(i);var o=P.prepareAdaptationData(p,function(m,b){var e=I[b.name];m.visible=!!e;m.position=e?e.position:-1;m.role=e?e.role:b.role;m.kind=b.kind;if(b.availableRoles){m.availableRoles=b.availableRoles;}return b.visible;});P.sortP13nData({visible:"visible",position:"position"},o.items);o.items.forEach(function(b){delete b.position;});return o;};a.prototype.getChangeOperations=function(){return{add:"addItem",remove:"removeItem",move:"moveItem"};};return a;});
