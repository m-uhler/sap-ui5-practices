/*
 * ! OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["../ChartDelegateNew","../../../util/loadModules","sap/ui/core/Core","sap/m/Text","sap/ui/mdc/library","sap/ui/mdc/odata/v4/ODataMetaModelUtil","sap/base/Log",'sap/ui/mdc/util/FilterUtil','sap/ui/mdc/odata/v4/util/DelegateUtil',"sap/ui/mdc/chartNew/ChartTypeButtonNew","sap/ui/mdc/chartNew/ItemNew","sap/ui/model/Sorter","sap/m/VBox"],function(V,l,C,T,M,O,L,F,D,c,d,S,f){"use strict";var g=Object.assign({},V);var h;var m;var n;var o;var p;var I=[];var q=[];g.getFilterDelegate=function(){return{addItem:function(P,a){return Promise.resolve(null);}};};g.zoomIn=function(v){this._oInnerChart.zoom({direction:"in"});};g.zoomOut=function(v){this._oInnerChart.zoom({direction:"out"});};g.getZoomState=function(){if(this._oInnerChart){return this._oInnerChart.getZoomInfo(this);}};g.getInnerChartSelectionHandler=function(){return{eventId:"_selectionDetails",listener:this._oInnerChart};};g.setLegendVisible=function(v){if(this._oInnerChart){this._oInnerChart.setVizProperties({'legend':{'visible':v},'sizeLegend':{'visible':v}});}else{L.error("Could not set legend visibility since inner chart is not yet initialized!");}};g.getSorterForItem=function(a,s){if(a.getType()==="aggregatable"){return new S(this._getAggregatedMeasureNameForMDCItem(a),s.descending);}else if(a.getType()==="groupable"){return new S(s.name,s.descending);}};g.insertItemToInnerChart=function(a,i){if(a.getType()==="groupable"){this.createInnerDimension(a);var v=this._oInnerChart.getVisibleDimensions();v.splice(i,0,a.getName());this._oInnerChart.setVisibleDimensions(v);}else if(a.getType()==="aggregatable"){this.createInnerMeasure(a);var b=this._oInnerChart.getVisibleMeasures();b.splice(i,0,this._getAggregatedMeasureNameForMDCItem(a));this._oInnerChart.setVisibleMeasures(b);}this._prepareColoringForItem(a);this._updateColoring(this._oInnerChart.getVisibleDimensions(),this._oInnerChart.getVisibleMeasures());this.fetchProperties(a.getParent()).then(function(P){this._updateSemanticalPattern(P);}.bind(this));};g.removeItemFromInnerChart=function(a){if(a.getType()==="groupable"&&this._oInnerChart.getVisibleDimensions().includes(a.getName())){var N=this._oInnerChart.getVisibleDimensions().filter(function(e){return e!==a.getName();});this._oInnerChart.setVisibleDimensions(N);this._oInnerChart.removeDimension(this._oInnerChart.getDimensionByName(a.getName()));}else if(a.getType()==="aggregatable"&&this._oInnerChart.getVisibleMeasures().includes(this._getAggregatedMeasureNameForMDCItem(a))){var b=this._oInnerChart.getVisibleMeasures().filter(function(e){return e!==this._getAggregatedMeasureNameForMDCItem(a);}.bind(this));this._oInnerChart.setVisibleMeasures(b);this._oInnerChart.removeMeasure(this._oInnerChart.getMeasureByName(this._getAggregatedMeasureNameForMDCItem(a)));}this._updateColoring(this._oInnerChart.getVisibleDimensions(),this._oInnerChart.getVisibleMeasures());this.fetchProperties(a.getParent()).then(function(P){this._updateSemanticalPattern(P);}.bind(this));};g.addItem=function(P,a,b,R){if(a.getModel){return Promise.resolve(this._createMDCChartItem(P,a,R));}return Promise.resolve(null);};g.removeItem=function(P,a){return Promise.resolve(true);};g._createMDCChartItem=function(P,a,R){return this.fetchProperties(a).then(function(b){var e=b.find(function(i){return i.name===P;});if(!e){return null;}if(e.groupable){return new d(a.getId()+"--GroupableItem--"+e.name,{name:e.name,label:e.label,type:"groupable",role:R?R:"category"});}if(e.aggregatable){return new d(a.getId()+"--AggregatableItem--"+e.name,{name:e.name,label:e.label,type:"aggregatable",role:R?R:"axis1"});}});};g.initializeInnerChart=function(a){this._oMDCChart=a;return new Promise(function(b,e){this._loadChart().then(function(i){this._oInnerStructure=new f({justifyContent:"Center",alignItems:"Center",height:"100%",width:"100%"});var t=new T();t.setText(a.getNoDataText());this._oInnerStructure.addItem(t);b(this._oInnerStructure);}.bind(this));}.bind(this));};g.createInitialChartContent=function(a){};g._createContentFromItems=function(a){this.fetchProperties(a).then(function(P){var b=[];var v=[];var e=[];a.getItems().forEach(function(i,j){var k=P.find(function(x){return x.name===i.getName();});switch(i.getType()){case"groupable":v.push(i.getName());var s=new m({name:i.getName(),label:i.getLabel(),role:"category"});if(k.textProperty){s.setTextProperty(k.textProperty);s.setDisplayText(true);}this._oInnerChart.addDimension(s);break;case"aggregatable":var t=k.aggregationMethod;var u=k.propertyPath;e.push(this._getAggregatedMeasureNameForMDCItem(i));var w=new n({name:this._getAggregatedMeasureNameForMDCItem(i),label:i.getLabel(),role:"axis1",analyticalInfo:{propertyPath:u,"with":t}});this._oInnerChart.addMeasure(w);break;}b.push(this._prepareColoringForItem(i));}.bind(this));q.forEach(function(k){if(I.indexOf(k)==-1){var i=P.find(function(s){return s.name===k;});var j=new n({name:this._getAggregatedMeasureNameForMDCItem(i),label:i.label,role:"axis1",analyticalInfo:{propertyPath:i.name,"with":i.aggregationMethod}});e.push();this._oInnerChart.addMeasure(j);}}.bind(this));Promise.all(b).then(function(){this._oInnerChart.setVisibleDimensions(v);this._oInnerChart.setVisibleMeasures(e);this._updateColoring(v,e);this._updateSemanticalPattern(P);}.bind(this));}.bind(this));};g.getInnerChart=function(){return this._oInnerChart;};g._prepareColoringForItem=function(i){return this._addCriticality(i).then(function(){I.push(i.getName());if(i.getType==="aggregatable"){this._getPropertyInfosByName(i.getName(),i.getParent()).then(function(P){for(var j=0;j<this._getAdditionalColoringMeasuresForItem(P);j++){if(q.indexOf(this._getAdditionalColoringMeasuresForItem(P)[j])==-1){q.push(this._getAdditionalColoringMeasuresForItem(P)[j]);}}}.bind(this));}});};g._getAdditionalColoringMeasuresForItem=function(P){var a=[];var b=P.datapoint?P.datapoint.criticality:null;if(b&&b.DynamicThresholds){a=b.DynamicThresholds.usedMeasures;}return a;};g._addCriticality=function(i){return this._getPropertyInfosByName(i.getName(),i.getParent()).then(function(P){if(P.criticality||(P.datapoint&&P.datapoint.criticality)){p=p||{Criticality:{DimensionValues:{},MeasureValues:{}}};var a={};if(i.getType()=="groupable"){var b=P.criticality?P.criticality:[];for(var k in b){a[k]={Values:b[k]};}p.Criticality.DimensionValues[i.getName()]=a;}else{var b=P.datapoint&&P.datapoint.criticality?P.datapoint.criticality:[];for(var k in b){a[k]=b[k];}p.Criticality.MeasureValues[i.getName()]=a;}}});};g._updateColoring=function(v,a){var t=jQuery.extend(true,{},p),k;if(t&&t.Criticality){var A;for(k=0;k<v.length;k++){if(p.Criticality.DimensionValues[v[k]]){A={coloring:"Criticality",parameters:{dimension:v[k]}};delete t.Criticality.MeasureValues;break;}}if(!A){delete t.Criticality.DimensionValues;for(var s in t.Criticality.MeasureValues){if(a.indexOf(s)==-1){delete t.Criticality.MeasureValues[s];}}A={coloring:"Criticality",parameters:{measure:a}};}if(A){this._oInnerChart.setColorings(t);this._oInnerChart.setActiveColoring(A);}}};g._updateSemanticalPattern=function(P){var v=this._oInnerChart.getVisibleMeasures();v.forEach(function(s){var a=P.find(function(i){return i.name===s;});if(!a){return;}var b=a.datapoint;if(b){if(b.targetValue||b.foreCastValue){var A=this._oInnerChart.getMeasureByName(s);A.setSemantics("actual");if(b.targetValue!=null){var R=this._oInnerChart.getMeasureByName(b.targetValue);if(R){R.setSemantics("reference");}else{L.error("sap.ui.mdc.Chart: "+b.targetValue+" is not a valid measure");}}if(b.foreCastValue){var e=this._oInnerChart.getMeasureByName(b.foreCastValue);if(e){e.setSemantics("projected");}else{L.error("sap.ui.comp.SmartChart: "+b.ForecastValue.Path+" is not a valid measure");}}A.setSemanticallyRelatedMeasures({referenceValueMeasure:b.targetValue,projectedValueMeasure:b.foreCastValue});}}}.bind(this));};g.getChartTypeInfo=function(){if(!this._oInnerChart){throw'inner chart is not bound';}var t=this._oMDCChart.getChartType(),a=C.getLibraryResourceBundle("sap.ui.mdc");var i={icon:c.mMatchingIcon[t],text:a.getText("chart.CHART_TYPE_TOOLTIP",[t])};return i;};g.getAvailableChartTypes=function(){var a=[];if(this._oInnerChart){var A=this._oInnerChart.getAvailableChartTypes().available;if(a){var b=C.getLibraryResourceBundle("sap.chart.messages");for(var i=0;i<A.length;i++){var t=A[i].chart;a.push({key:t,icon:c.mMatchingIcon[t],text:b.getText("info/"+t),selected:(t==this._oMDCChart.getChartType())});}}}return a;};g.getDrillStackInfo=function(){};g.getDrillStack=function(){return this._oInnerChart.getDrillStack();};g.getSortedDimensions=function(e){return new Promise(function(i,j){this.fetchProperties(e).then(function(P){var k=P.filter(function(a){return a.groupable;});if(k){k.sort(function(a,b){if(a.label&&b.label){return a.label.localeCompare(b.label);}});}i(k);});}.bind(this));};g.getDrillableItems=function(a){var b=a.getItems().filter(function(i){return i.getType()==="groupable";});return b;};g.setChartType=function(s){this._oInnerChart.setChartType(s);};g.createInnerChartContent=function(a,b){this._oInnerChart=new h({id:a.getId()+"--innerChart",chartType:"column",height:"330px",width:"100%",isAnalytical:true});this._createContentFromItems(a);this._oInnerChart.attachRenderComplete(function(){a._updateToolbar();});this._oInnerStructure.removeAllItems();this._oInnerStructure.setJustifyContent(sap.m.FlexJustifyContent.Start);this._oInnerStructure.setAlignItems(sap.m.FlexAlignItems.Stretch);this._oInnerStructure.addItem(this._oInnerChart);this._fnDataLoadedCallback=b;var B=this._getBindingInfo(a);this.updateBindingInfo(a,B);this.rebindChart(a,B);};g.createInnerDimension=function(a){this.fetchProperties(a.getParent()).then(function(P){var b=P.find(function(i){return i.name===a.getName();});var e=new m({name:a.getName(),role:a.getRole()?a.getRole():"category",label:a.getLabel()});if(b.textProperty){e.setTextProperty(b.textProperty);e.setDisplayText(true);}this._oInnerChart.addDimension(e);}.bind(this));};g.createInnerMeasure=function(a){this.fetchProperties(a.getParent()).then(function(P){var b=P.find(function(k){return k.name===a.getName();});var e=b.aggregationMethod;var i=b.propertyPath;var j=new n({name:this._getAggregatedMeasureNameForMDCItem(a),label:a.getLabel(),role:"axis1",analyticalInfo:{propertyPath:i,"with":e}});this._oInnerChart.addMeasure(j);}.bind(this));};g._getAggregatedMeasureNameForProperty=function(P){return P.aggregationMethod+P.name;};g.rebindChart=function(a,b){if(a&&b&&this._oInnerChart){this._addBindingListener(b,"change",this._onDataLoadComplete.bind(this));if(b.binding){b.binding.bHasAnalyticalInfo=true;}this._oInnerChart.bindData(b);this._oBindingInfo=b;this._innerChartBound=true;}};g._getBindingInfo=function(a){if(this._oBindingInfo){return this._oBindingInfo;}var b=a.getDelegate().payload;var e="/"+b.collectionName;var B={path:e,parameters:{entitySet:b.collectionName,useBatchRequests:true,provideGrandTotals:true,provideTotalResultSize:true,noPaging:true}};return B;};g.getInnerChartBound=function(){return!!this._innerChartBound;};g.updateBindingInfo=function(a,b){var e=C.byId(a.getFilter());if(e){var i=e.getConditions();if(i){if(!b){b={};}var P=e.getPropertyInfoSet?e.getPropertyInfoSet():null;var j=D.getParameterNames(e);var k=F.getFilterInfo(e,i,P,j);if(k){b.filters=k.filters;}var s=D.getParametersInfo(e,i);if(s){b.path=s;}}var t=e.getSearch();if(t){if(!b){b={};}if(!b.parameters){b.parameters={};}b.parameters.$search=t;}}};g._getAggregatedMeasureNameForMDCItem=function(a){return a.getName();};g._getLayoutOptionsForType=function(t){var a=sap.ui.getCore().getLibraryResourceBundle("sap.ui.mdc");var A={groupable:[{key:M.ChartItemRoleType.category,text:a.getText('chart.PERSONALIZATION_DIALOG_CHARTROLE_CATEGORY')},{key:M.ChartItemRoleType.category2,text:a.getText('chart.PERSONALIZATION_DIALOG_CHARTROLE_CATEGORY2')},{key:M.ChartItemRoleType.series,text:a.getText('chart.PERSONALIZATION_DIALOG_CHARTROLE_SERIES')}],aggregatable:[{key:M.ChartItemRoleType.axis1,text:a.getText('chart.PERSONALIZATION_DIALOG_CHARTROLE_AXIS1')},{key:M.ChartItemRoleType.axis2,text:a.getText('chart.PERSONALIZATION_DIALOG_CHARTROLE_AXIS2')},{key:M.ChartItemRoleType.axis3,text:a.getText('chart.PERSONALIZATION_DIALOG_CHARTROLE_AXIS3')}]};return A[t];};g.addInnerItem=function(P,a,b){return Promise.resolve(null);};g.insertInnerItem=function(P,a,b){};g.removeInnerItem=function(P,a,b){return Promise.resolve(true);};g.setChartTooltipVisibility=function(b){if(this._oInnerChart){if(b){if(!this._vizTooltip){this._vizTooltip=new o();}this._vizTooltip.connect(this._oInnerChart.getVizUid());}else{if(this._vizTooltip){this._vizTooltip.destroy();}}}else{L.error("Trying to set chart tooltip while inner chart was not yet initialized");}};g._loadChart=function(){return new Promise(function(a){var N=['sap/chart/library','sap/chart/Chart','sap/chart/data/Dimension','sap/chart/data/HierarchyDimension','sap/chart/data/TimeDimension','sap/chart/data/Measure','sap/viz/ui5/controls/VizTooltip'];function b(e,i,j,H,t,k,v){h=i;m=j;n=k;o=v;a();}sap.ui.require(N,b);});};g.initPropertyHelper=function(a){return Promise.all([this.fetchProperties(a),l("sap/ui/mdc/odata/v4/ChartPropertyHelperNew")]).then(function(R){return Promise.all(R.concat(this.fetchPropertyExtensions(a,R[0])));}.bind(this)).then(function(R){var P=R[0];var b=R[1][0];var e=R[2];var j=0;var k=[];for(var i=0;i<P.length;i++){k.push(Object.assign({},P[i],{extension:e[P[i].name]||{}}));if(P[i].name in e){j++;}}if(j!==Object.keys(e).length){throw new Error("At least one property extension does not point to an existing property");}return new b(k,a);});};g.fetchProperties=function(a){var b=this._getModel(a);var e;if(!b){e=new Promise(function(i){a.attachModelContextChange({resolver:i},r,this);}.bind(this)).then(function(b){return this._createPropertyInfos(a,b);}.bind(this));}else{e=this._createPropertyInfos(a,b);}return e.then(function(P){if(a.data){a.data("$mdcChartPropertyInfo",P);}return P;});};function r(e,a){var b=e.getSource();var i=this._getModel(b);if(i){b.detachModelContextChange(r);a.resolver(i);}}g._createPropertyInfos=function(a,b){var e=a.getDelegate().payload;var P=[];var E="/"+e.collectionName;var i=b.getMetaModel();return Promise.all([i.requestObject(E+"/"),i.requestObject(E+"@")]).then(function(R){var j=R[0],k=R[1];var s=k["@Org.OData.Capabilities.V1.SortRestrictions"]||{};var t=O.getSortRestrictionsInfo(s);var u=k["@Org.OData.Capabilities.V1.FilterRestrictions"];var v=O.getFilterRestrictionsInfo(u);for(var K in j){var w=j[K];if(w&&w.$kind==="Property"){if(w.$isCollection){continue;}var x=i.getObject(E+"/"+K+"@");if(!x["@Org.OData.Aggregation.V1.Aggregatable"]&&!x["@Org.OData.Aggregation.V1.Groupable"]){continue;}if(x["@Org.OData.Aggregation.V1.Aggregatable"]){P=P.concat(this._createPropertyInfosForAggregatable(K,x,v,t));}if(x["@Org.OData.Aggregation.V1.Groupable"]){P.push({name:K,propertyPath:K,label:x["@com.sap.vocabularies.Common.v1.Label"]||K,sortable:t[K]?t[K].sortable:true,filterable:v[K]?v[K].filterable:true,groupable:true,aggregatable:false,maxConditions:O.isMultiValueFilterExpression(v.propertyInfo[K])?-1:1,sortKey:K,kind:"Groupable",availableRoles:this._getLayoutOptionsForType("groupable"),role:M.ChartItemRoleType.category,criticality:null,textProperty:x["@com.sap.vocabularies.Common.v1.Text"]?x["@com.sap.vocabularies.Common.v1.Text"].$Path:null});}}}return P;}.bind(this));};g._createPropertyInfosForAggregatable=function(k,P,a,s){var b=[];if(P["@Org.OData.Aggregation.V1.SupportedAggregationMethods"]){P["@Org.OData.Aggregation.V1.SupportedAggregationMethods"].forEach(function(A){b.push({name:A+k,propertyPath:k,label:P["@com.sap.vocabularies.Common.v1.Label"]+" ("+A+")"||k+" ("+A+")",sortable:s[k]?s[k].sortable:true,filterable:a[k]?a[k].filterable:true,groupable:false,aggregatable:P["@Org.OData.Aggregation.V1.Aggregatable"],aggregationMethod:A,maxConditions:O.isMultiValueFilterExpression(a.propertyInfo[k])?-1:1,sortKey:P["@Org.OData.Aggregation.V1.RecommendedAggregationMethod"]+k,kind:"Aggregatable",availableRoles:this._getLayoutOptionsForType("aggregatable"),role:M.ChartItemRoleType.axis1,datapoint:null});}.bind(this));}return b;};g._getPropertyInfosByName=function(N,a){return new Promise(function(b){this.fetchProperties(a).then(function(P){var e=P.find(function(i){return i.name===N;});b(e);});}.bind(this));};g._getModel=function(t){var a=t.getDelegate().payload;return t.getModel(a.model);};g._addBindingListener=function(b,e,H){if(!b.events){b.events={};}if(!b.events[e]){b.events[e]=H;}else{var a=b.events[e];b.events[e]=function(){H.apply(this,arguments);a.apply(this,arguments);};}};g._onDataLoadComplete=function(e){if(e.mParameters.reason==="change"&&!e.mParameters.detailedReason){this._fnDataLoadedCallback.call();}};return g;});