/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['./Table',"./TableRenderer",'sap/ui/model/ClientTreeBindingAdapter','sap/ui/model/TreeBindingCompatibilityAdapter','./library','./utils/TableUtils',"./plugins/BindingSelection","sap/base/Log","sap/base/assert"],function(T,c,C,d,l,e,B,L,f){"use strict";var g=T.extend("sap.ui.table.TreeTable",{metadata:{library:"sap.ui.table",properties:{expandFirstLevel:{type:"boolean",defaultValue:false,deprecated:true},useGroupMode:{type:"boolean",group:"Appearance",defaultValue:false},groupHeaderProperty:{type:"string",group:"Data",defaultValue:null},collapseRecursive:{type:"boolean",defaultValue:true,deprecated:true},rootLevel:{type:"int",group:"Data",defaultValue:0,deprecated:true}},events:{toggleOpenState:{parameters:{rowIndex:{type:"int"},rowContext:{type:"object"},expanded:{type:"boolean"}}}}},renderer:"sap.ui.table.TableRenderer"});g.prototype.init=function(){T.prototype.init.apply(this,arguments);e.Grouping.setTreeMode(this);e.Hook.register(this,e.Hook.Keys.Row.UpdateState,u,this);e.Hook.register(this,e.Hook.Keys.Row.Expand,h,this);e.Hook.register(this,e.Hook.Keys.Row.Collapse,j,this);};g.prototype._bindRows=function(b){if(!b.parameters){b.parameters={};}if(!("rootLevel"in b.parameters)){b.parameters.rootLevel=this.getRootLevel();}if(!("collapseRecursive"in b.parameters)){b.parameters.collapseRecursive=this.getCollapseRecursive();}if(!("numberOfExpandedLevels"in b.parameters)){b.parameters.numberOfExpandedLevels=this.getExpandFirstLevel()?1:0;}return T.prototype._bindRows.call(this,b);};function u(s){var b=this.getBinding();var n=s.context;s.context=n.context;if(!s.context){return;}s.level=n.level+1;if(b.nodeHasChildren){s.expandable=b.nodeHasChildren(n);}else{s.expandable=b.hasChildren(n.context);}s.expanded=n.nodeState.expanded;if(e.Grouping.isGroupMode(this)){var H=this.getGroupHeaderProperty();if(H){s.title=s.context.getProperty(H);}if(s.expandable){s.type=s.Type.GroupHeader;s.contentHidden=true;}}}function h(r){var i=r.getIndex();var I=t(this,i,true);if(typeof I==="boolean"){this._onGroupHeaderChanged(i,I);}}function j(r){var i=r.getIndex();var I=t(this,i,false);if(typeof I==="boolean"){this._onGroupHeaderChanged(i,I);}}function t(o,r,E){var I=[];var k=o.getBinding();if(!k||r==null){return null;}if(typeof r==="number"){I=[r];}else if(Array.isArray(r)){if(E==null&&r.length>1){return null;}I=r;}var m=o._getTotalRowCount();var v=I.filter(function(a){var b=k.isExpanded(a);var n=true;if(k.nodeHasChildren){if(k.getNodeByIndex){n=!k.nodeHasChildren(k.getNodeByIndex(a));}else{n=false;}}return a>=0&&a<m&&!n&&E!==b;}).sort(function(a,b){return a-b;});if(v.length===0){return null;}for(var i=v.length-1;i>0;i--){if(E){k.expand(v[i],true);}else{k.collapse(v[i],true);}}if(E===true){k.expand(v[0],false);}else if(E===false){k.collapse(v[0],false);}else{k.toggleIndex(v[0]);}return k.isExpanded(v[0]);}g.prototype.setFixedRowCount=function(r){L.warning("TreeTable: the property \"fixedRowCount\" is not supported and will be ignored!");return this;};g.prototype.isTreeBinding=function(n){n=n||"rows";if(n==="rows"){return true;}return T.prototype.isTreeBinding.apply(this,arguments);};g.prototype.getBinding=function(n){n=n==null?"rows":n;var b=T.prototype.getBinding.call(this,n);if(b&&n==="rows"&&!b.getLength){if(b.isA("sap.ui.model.odata.ODataTreeBinding")){d(b,this);}else if(b.isA("sap.ui.model.odata.v2.ODataTreeBinding")){b.applyAdapterInterface();}else if(b.isA("sap.ui.model.ClientTreeBinding")){C.apply(b);}else{L.error("Binding not supported by sap.ui.table.TreeTable");}}return b;};g.prototype._getContexts=function(s,i,a){var b=this.getBinding();if(b){return b.getNodes(s,i,a);}else{return[];}};g.prototype._getRowContexts=function(){var o=this._getTotalRowCount();var r=T.prototype._getRowContexts.apply(this,arguments);var n=this._getTotalRowCount();if(e.isVariableRowHeightEnabled(this)&&o!==n){return T.prototype._getRowContexts.apply(this,arguments);}return r;};g.prototype._onGroupHeaderChanged=function(r,E){this.fireToggleOpenState({rowIndex:r,rowContext:this.getContextByIndex(r),expanded:E});};g.prototype.expand=function(r){t(this,r,true);return this;};g.prototype.collapse=function(r){t(this,r,false);return this;};g.prototype.collapseAll=function(){var b=this.getBinding();if(b){b.collapseToLevel(0);this.setFirstVisibleRow(0);}return this;};g.prototype.expandToLevel=function(i){var b=this.getBinding();f(b&&b.expandToLevel,"TreeTable.expandToLevel is not supported with your current Binding. Please check if you are running on an ODataModel V2.");if(b&&b.expandToLevel){b.expandToLevel(i);}return this;};g.prototype.isExpanded=function(r){var b=this.getBinding();if(b){return b.isExpanded(r);}return false;};g.prototype.getContextByIndex=function(r){var b=this.getBinding();if(b){return b.getContextByIndex(r);}};g.prototype.setRootLevel=function(r){this.setFirstVisibleRow(0);var b=this.getBinding();if(b){f(b.setRootLevel,"rootLevel is not supported by the used binding");if(b.setRootLevel){b.setRootLevel(r);}}this.setProperty("rootLevel",r,true);return this;};g.prototype.setCollapseRecursive=function(b){var o=this.getBinding();if(o){f(o.setCollapseRecursive,"Collapse Recursive is not supported by the used binding");if(o.setCollapseRecursive){o.setCollapseRecursive(b);}}this.setProperty("collapseRecursive",!!b,true);return this;};g.prototype.setUseGroupMode=function(G){this.setProperty("useGroupMode",!!G);if(!!G){e.Grouping.setGroupMode(this);}else{e.Grouping.setTreeMode(this);}return this;};g.prototype.setEnableGrouping=function(){L.warning("The property enableGrouping is not supported by the sap.ui.table.TreeTable control");return this;};g.prototype.setGroupBy=function(){L.warning("The groupBy association is not supported by the sap.ui.table.TreeTable control");return this;};g.prototype.setUseFlatMode=function(F){F=!!F;if(F!=this._bFlatMode){this._bFlatMode=F;if(this.getDomRef()&&e.Grouping.isTreeMode(this)){this.invalidate();}}return this;};g.prototype._createLegacySelectionPlugin=function(){return new B();};return g;});
