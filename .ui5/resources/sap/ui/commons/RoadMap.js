/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['sap/ui/thirdparty/jquery','./library','sap/ui/core/Control','./RoadMapRenderer','sap/ui/core/ResizeHandler','sap/ui/Device'],function(q,l,C,R,a,D){"use strict";var b=C.extend("sap.ui.commons.RoadMap",{metadata:{library:"sap.ui.commons",properties:{numberOfVisibleSteps:{type:"int",group:"Misc",defaultValue:null},firstVisibleStep:{type:"string",group:"Misc",defaultValue:null},selectedStep:{type:"string",group:"Misc",defaultValue:null},width:{type:"sap.ui.core.CSSSize",group:"Dimension",defaultValue:'100%'}},defaultAggregation:"steps",aggregations:{steps:{type:"sap.ui.commons.RoadMapStep",multiple:true,singularName:"step"}},events:{stepSelected:{parameters:{stepId:{type:"string"}}},stepExpanded:{parameters:{stepId:{type:"string"}}}}}});(function(){b.prototype.init=function(){this.iStepWidth=-1;this.sCurrentFocusedStepRefId=null;};b.prototype.exit=function(){if(this.sResizeListenerId){a.deregister(this.sResizeListenerId);this.sResizeListenerId=null;}};b.prototype.setNumberOfVisibleSteps=function(n){var i=this.getDomRef()?true:false;this.setProperty("numberOfVisibleSteps",n,i);if(i){R.updateScrollArea(this,true);}return this;};b.prototype.setFirstVisibleStep=function(F){var i=this.getDomRef()?true:false;if(i){if(F){var S=sap.ui.getCore().byId(F);if(S&&S.getParent()&&(S.getParent()===this||S.getParent().getParent()===this)&&S.getVisible()){this.setProperty("firstVisibleStep",F,true);R.updateScrollArea(this);}}else{this.setProperty("firstVisibleStep","",true);R.updateScrollArea(this);}}else{this.setProperty("firstVisibleStep",F);}return this;};b.prototype.setWidth=function(w){var i=this.getDomRef()?true:false;this.setProperty("width",w,i);if(i){R.setRoadMapWidth(this,w);R.updateScrollArea(this,true);}return this;};b.prototype.setSelectedStep=function(S){var i=this.getDomRef()?true:false;if(i){if(S){var o=sap.ui.getCore().byId(S);if(o&&o.getParent()&&(o.getParent()===this||o.getParent().getParent()===this)&&o.getEnabled()&&o.getVisible()){R.selectStepWithId(this,S);this.setProperty("selectedStep",S,true);}}else{R.selectStepWithId(this,"");this.setProperty("selectedStep","",true);}}else{this.setProperty("selectedStep",S);}return this;};b.prototype.onThemeChanged=function(e){this.iStepWidth=-1;if(this.getDomRef()){this.invalidate();}};b.prototype.doBeforeRendering=function(){var I=false;var c=false;var S=this.getSteps();for(var i=0;i<S.length;i++){var o=S[i];if(o.getSubSteps().length==0||!o.getEnabled()){o.setProperty("expanded",false,true);}if(!o.getEnabled()&&!o.getVisible()&&this.getSelectedStep()==o.getId()){this.setProperty("selectedStep","",true);}else if(o.getEnabled()&&o.getVisible()&&this.getSelectedStep()==o.getId()){I=true;}if(o.getVisible()&&this.getFirstVisibleStep()==o.getId()){c=true;}var d=o.getSubSteps();for(var j=0;j<d.length;j++){var e=d[j];e.setProperty("expanded",false,true);if(!e.getEnabled()&&!e.getVisible()&&this.getSelectedStep()==e.getId()){this.setProperty("selectedStep","",true);}else if(e.getEnabled()&&e.getVisible()&&this.getSelectedStep()==e.getId()){I=true;}if(e.getVisible()&&this.getFirstVisibleStep()==e.getId()){c=true;}}}if(!I){this.setProperty("selectedStep","",true);}if(!c){this.setProperty("firstVisibleStep","",true);}if(this.sResizeListenerId){a.deregister(this.sResizeListenerId);this.sResizeListenerId=null;}};b.prototype.onAfterRendering=function(){var S=this.getSteps();if(this.iStepWidth==-1&&S.length>0){var c=S[0].$();this.iStepWidth=c.outerWidth();}for(var i=0;i<S.length;i++){var o=S[i];R.addEllipses(o);var d=o.getSubSteps();for(var j=0;j<d.length;j++){R.addEllipses(d[j]);}}R.updateScrollArea(this);this.sResizeListenerId=a.register(this.getDomRef(),q.proxy(this.onresize,this));};b.prototype.onresize=function(e){var d=function(){if(this.getDomRef()){R.updateScrollArea(this,true);r(this,"prev");this.sResizeInProgress=null;}}.bind(this);if(D.browser.firefox){d();}else{if(!this.sResizeInProgress){this.sResizeInProgress=setTimeout(d,300);}}};b.prototype.onclick=function(e){h(this,e);};b.prototype.onsapselect=function(e){h(this,e);};b.prototype.onfocusin=function(e){var t=q(e.target);var T=t.attr("id");if(T&&T.endsWith("-box")){this.sCurrentFocusedStepRefId=T.slice(0,-4);}else if(T&&(T.endsWith("-Start")||T.endsWith("-End"))){}else{this.sCurrentFocusedStepRefId=R.getFirstVisibleRef(this).attr("id");r(this);}this.$().attr("tabindex","-1");};b.prototype.onfocusout=function(e){this.$().attr("tabindex","0");};b.prototype.onsapprevious=function(e){f(e,this,"prev");};b.prototype.onsapnext=function(e){f(e,this,"next");};b.prototype.onsaphome=function(e){f(e,this,"first");};b.prototype.onsapend=function(e){f(e,this,"last");};var h=function(t,e){e.stopPropagation();e.preventDefault();var T=q(e.target);var c=T.attr("id");if(!c){return;}var i=c.lastIndexOf("-expandend");if(i!=-1){var S=sap.ui.getCore().byId(c.substring(0,i));if(S&&t.indexOfStep(S)>=0){S.handleSelect(e,true);return;}}if(c==t.getId()+"-Start"){if(T.hasClass("sapUiRoadMapStartScroll")){s(t,"prev",true);}else{r(t);}}else if(c==t.getId()+"-End"){if(T.hasClass("sapUiRoadMapEndScroll")){s(t,"next",true);}else{r(t);}}};var s=function(t,d,u){R.scrollToNextStep(t,d,function(F){var i=F.lastIndexOf("-expandend");if(i!=-1){F=F.substring(0,i);}t.setProperty("firstVisibleStep",F,true);if(u){r(t,d);}});};var f=function(e,t,d){if(e){e.stopPropagation();e.preventDefault();}if(!t.sCurrentFocusedStepRefId){return;}var F=d+"All";var i=false;if(d=="first"){F="prevAll";i=true;}else if(d=="last"){F="nextAll";i=true;}var c=q(document.getElementById(t.sCurrentFocusedStepRefId));var j=c[F](":visible");var g=q(j.get(i?j.length-1:0)).attr("id");if(g){if(!R.isVisibleRef(t,g)){s(t,d);}document.getElementById(g+"-box").focus();}};var r=function(t,d){if(!t.sCurrentFocusedStepRefId){return;}if(d&&!R.isVisibleRef(t,t.sCurrentFocusedStepRefId)){f(null,t,d);}else{document.getElementById(t.sCurrentFocusedStepRefId+"-box").focus();}};}());return b;});
