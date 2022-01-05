/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define([],function(){"use strict";var N={apiVersion:2};N.render=function(r,n){var l=n.isLoading(),t=n.getToolbar(),T=n._isInsideGridContainer()?"-1":"0";r.openStart("div",n).class("sapFCardHeader").class("sapFCardNumericHeader");if(l){r.class("sapFCardHeaderLoading");}if(n.hasListeners("press")){r.class("sapFCardClickable");}r.attr("tabindex",T);r.accessibilityState(n,{role:n._sAriaRole,labelledby:{value:n._getHeaderAccessibility(),append:true},roledescription:{value:n._sAriaRoleDescritoion,append:true},level:{value:n._sAriaHeadingLevel}});r.openEnd();r.openStart("div").class("sapFCardHeaderContent").openEnd();N.renderHeaderText(r,n);N.renderIndicators(r,n);N.renderDetails(r,n);r.close("div");if(t){r.openStart("div").class("sapFCardHeaderToolbarCont").openEnd();r.renderControl(t);r.close("div");}r.close("div");};N.renderHeaderText=function(r,n){var t=n.getAggregation("_title"),s=n.getAggregation("_subtitle"),u=n.getAggregation("_unitOfMeasurement"),S=n.getStatusText(),b=n.mBindingInfos;r.openStart("div").class("sapFCardHeaderText").openEnd();r.openStart("div").class("sapFCardHeaderTextFirstLine").openEnd();if(t){if(b.title){t.addStyleClass("sapFCardHeaderItemBinded");}t.addStyleClass("sapFCardTitle");r.renderControl(t);}if(S){r.openStart("span",n.getId()+'-status').class("sapFCardStatus");if(b.statusText){r.class("sapFCardHeaderItemBinded");}r.openEnd().text(S).close("span");}r.close("div");if(((s&&s.getText())||(b&&b.subtitle))||((u&&u.getText())||(b&&b.unitOfMeasurement))){r.openStart("div").class("sapFCardSubtitle").openEnd();if(s){if(b.subtitle){s.addStyleClass("sapFCardHeaderItemBinded");}r.renderControl(s);}if(u){u.addStyleClass("sapFCardHeaderUnitOfMeasurement");if(b.unitOfMeasurement){u.addStyleClass("sapFCardHeaderItemBinded");}r.renderControl(u);}r.close("div");}r.close("div");};N.renderIndicators=function(r,n){var m=n.getAggregation("_mainIndicator"),s=n.getAggregation("sideIndicators"),b=n.mBindingInfos;if((m&&m.getValue())||s.length!==0){r.openStart("div").class("sapFCardHeaderIndicators").openEnd();if(m){r.openStart("div").class("sapFCardHeaderMainIndicator").openEnd();if(b.scale||b.number||b.trend||b.state){m.addStyleClass("sapFCardHeaderItemBinded");}else{m.removeStyleClass("sapFCardHeaderItemBinded");}r.renderControl(m);r.close("div");r.openStart("div").class("sapFCardHeaderIndicatorsGap").openEnd().close("div");}if(s.length!==0){r.openStart("div").class("sapFCardHeaderSideIndicators").openEnd();s.forEach(function(i){r.renderControl(i);});r.close("div");}r.close("div");}};N.renderDetails=function(r,n){var b=n.mBindingInfos,d=n.getAggregation("_details"),h=n.getDetails()||b.details,D=n.getAggregation("_dataTimestamp"),H=n.getDataTimestamp()||b.dataTimestamp;if(!h&&!H){return;}r.openStart("div").class("sapFCardHeaderDetailsWrapper");if(H){r.class("sapFCardHeaderLineIncludesDataTimestamp");}r.openEnd();if(h){if(b.details){d.addStyleClass("sapFCardHeaderItemBinded");}d.addStyleClass("sapFCardHeaderDetails");r.renderControl(d);}if(H){r.renderControl(D);}r.close("div");};return N;},true);