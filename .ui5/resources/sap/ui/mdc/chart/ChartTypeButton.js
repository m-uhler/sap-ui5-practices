/*
 * ! OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/m/OverflowToolbarButton","sap/m/ButtonRenderer","sap/ui/base/ManagedObjectObserver","sap/ui/core/library"],function(O,B,M,C){"use strict";var H=C.aria.HasPopup;var R,L,a,S,b,I,D,r;var c=O.extend("sap.ui.mdc.chart.ChartTypeButton",{metadata:{library:"sap.ui.mdc"},constructor:function(o){this.oChart=o;var s={type:"Transparent",press:function(e){this.displayChartTypes(e.getSource(),o);}.bind(this),id:o.getId()+"-btnChartType",icon:'{$chart>/getTypeInfo/icon}',tooltip:'{$chart>/getTypeInfo/text}',text:'{$chart>/getTypeInfo/text}',ariaHasPopup:H.ListBox};O.apply(this,[s]);},renderer:B.render});c.mMatchingIcon={"bar":"sap-icon://horizontal-bar-chart","bullet":"sap-icon://horizontal-bullet-chart","bubble":"sap-icon://bubble-chart","column":"sap-icon://vertical-bar-chart","combination":"sap-icon://business-objects-experience","dual_bar":"sap-icon://horizontal-bar-chart","dual_column":"sap-icon://vertical-bar-chart","dual_combination":"sap-icon://business-objects-experience","dual_horizontal_combination":"sap-icon://business-objects-experience","dual_horizontal_stacked_combination":"sap-icon://business-objects-experience","dual_line":"sap-icon://line-chart","dual_stacked_bar":"sap-icon://full-stacked-chart","dual_stacked_column":"sap-icon://vertical-stacked-chart","dual_stacked_combination":"sap-icon://business-objects-experience","donut":"sap-icon://donut-chart","heatmap":"sap-icon://heatmap-chart","horizontal_stacked_combination":"sap-icon://business-objects-experience","line":"sap-icon://line-chart","pie":"sap-icon://pie-chart","scatter":"sap-icon://scatter-chart","stacked_bar":"sap-icon://full-stacked-chart","stacked_column":"sap-icon://vertical-stacked-chart","stacked_combination":"sap-icon://business-objects-experience","treemap":"sap-icon://Chart-Tree-Map","vertical_bullet":"sap-icon://vertical-bullet-chart","100_dual_stacked_bar":"sap-icon://full-stacked-chart","100_dual_stacked_column":"sap-icon://vertical-stacked-chart","100_stacked_bar":"sap-icon://full-stacked-chart","100_stacked_column":"sap-icon://full-stacked-column-chart","waterfall":"sap-icon://vertical-waterfall-chart","horizontal_waterfall":"sap-icon://horizontal-waterfall-chart"};c.prototype.init=function(){this.oChartModel=this.oChart.getManagedObjectModel();this.setModel(this.oChartModel,"$chart");if(this.oChart.getAutoBindOnInit()){this.bindToInnerChart(this.oChart);}};c.prototype.bindToInnerChart=function(o){this.setEnabled(true);this._oObserver=new M(function(){this.oChartModel.checkUpdate(true);}.bind(this));this._oObserver.observe(this.oChart,{aggregations:["items"],properties:["chartType"]});};c.prototype.displayChartTypes=function(o,d){if(!d||!o){return;}if(this.oPopover){return this.oPopover.openBy(o);}if(!this.oReadyPromise){this.oReadyPromise=new Promise(function(e){if(R){e(true);}else{sap.ui.require(["sap/m/ResponsivePopover","sap/m/List","sap/m/Bar","sap/m/SearchField","sap/m/StandardListItem","sap/ui/core/InvisibleText","sap/ui/Device"],function(f,g,h,i,j,k,l){R=f;L=g;a=h;S=i;b=j;I=k;D=l;if(!r){sap.ui.getCore().getLibraryResourceBundle("sap.ui.mdc",true).then(function(m){r=m;e(true);});}else{e(true);}});}});}this.oReadyPromise.then(function(){this.oPopover=this._createPopover(o,d);return this.oPopover.openBy(o);}.bind(this));};c.prototype._createPopover=function(o,d){var i=new b({title:"{$chart>text}",icon:"{$chart>icon}",selected:"{$chart>selected}"});var l=new L({mode:"SingleSelectMaster",items:{path:"$chart>/getAvailableChartTypes",template:i},selectionChange:function(E){if(E&&E.mParameters&&E.mParameters.listItem){var g=E.mParameters.listItem.getBinding("title");if(g){var h=g.getContext();if(h){var j=h.getObject();if(j&&j.key){sap.ui.require(["sap/ui/mdc/p13n/FlexUtil","sap/ui/mdc/flexibility/Chart.flexibility"],function(F,k){var m=[];m.push(k["setChartType"].changeHandler.createChange({control:d,chartType:j.key}));F.handleChanges(m);});}}}}p.close();}});var s=new a();var e=new S({placeholder:r.getText("chart.CHART_TYPE_SEARCH")});e.attachLiveChange(function(E){if(d){this._triggerSearchInPopover(E,l);}}.bind(this));s.addContentRight(e);var p=new R({placement:"Bottom",subHeader:s,contentWidth:"25rem"});p.setModel(this.oChartModel,"$chart");if(D.system.desktop){var f=new I({text:r.getText("chart.CHART_TYPELIST_TEXT")});p.setShowHeader(false);p.addContent(f);p.addAriaLabelledBy(f);}else{p.setTitle(r.getText("chart.CHART_TYPELIST_TEXT"));}p.addContent(l);if(l.getItems().length<7){s.setVisible(false);}return p;};c.prototype._triggerSearchInPopover=function(e,l){var p,i,t,T,v,d;if(!e||!l){return;}p=e.getParameters();if(!p){return;}v=p.newValue?p.newValue.toLowerCase():"";d=l.getItems();for(i=0;i<d.length;i++){T=d[i].getTooltip();t=d[i].getTitle();if((t&&(t.toLowerCase().indexOf(v)>-1))||(T&&(T.toLowerCase().indexOf(v)>-1))){d[i].setVisible(true);}else{d[i].setVisible(false);}}};c.prototype.exit=function(){O.prototype.exit.apply(this,arguments);if(this.oPopover){this.oPopover.destroy();this.oPopover=null;}};return c;},true);
