/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/Element","./utils/TableUtils","sap/ui/thirdparty/jquery"],function(E,T,q){"use strict";var R=Object.freeze({Standard:"Standard",Summary:"Summary",GroupHeader:"GroupHeader"});function a(){var c=null;var t=R.Standard;var C=false;var d="";var e=false;var f=false;var l=0;Object.defineProperties(this,{context:{get:function(){return c;},set:function(_){c=_||null;}},Type:{get:function(){return R;}},type:{get:function(){return t;},set:function(_){if(!(_ in R)){throw Error("Is not a valid type for sap.ui.table.Row: "+_);}t=_;}},empty:{get:function(){return this.context==null;}},contentHidden:{get:function(){return this.empty?true:C;},set:function(_){C=_===true;}},title:{get:function(){return this.empty?"":d;},set:function(_){d=(typeof _==="string"?_:"");}},expandable:{get:function(){return this.empty?false:f;},set:function(_){f=_===true;}},expanded:{get:function(){return this.expandable?e:false;},set:function(_){e=_===true;}},level:{get:function(){return this.empty?0:l;},set:function(_){l=(typeof _==="number"?Math.max(1,_||1):1);}},reset:{value:function(){c=null;t=R.Standard;C=false;d="";f=false;e=false;l=1;}}});}var S=new window.WeakMap();function s(r){if(!S.has(r)){S.set(r,Object.seal(new a()));}return S.get(r);}var b=E.extend("sap.ui.table.Row",{metadata:{library:"sap.ui.table",defaultAggregation:"cells",aggregations:{cells:{type:"sap.ui.core.Control",multiple:true,singularName:"cell"},_rowAction:{type:"sap.ui.table.RowAction",multiple:false,visibility:"hidden"},_settings:{type:"sap.ui.table.RowSettings",multiple:false,visibility:"hidden"}}}});b.prototype.init=function(){this.initDomRefs();};b.prototype.exit=function(){this.initDomRefs();};b.prototype.getFocusInfo=function(){var t=this.getTable();return t?t.getFocusInfo():E.prototype.getFocusInfo.apply(this,arguments);};b.prototype.applyFocusInfo=function(f){var t=this.getTable();if(t){t.applyFocusInfo(f);}else{E.prototype.applyFocusInfo.apply(this,arguments);}return this;};b.prototype._setFocus=function(f){var F=T.getFirstInteractiveElement(this);if(f===true&&F){F.focus();}else{this.getDomRef("col0").focus();}};b.prototype.addStyleClass=function(c){this.getDomRefs(true).row.addClass(c);};b.prototype.removeStyleClass=function(c){this.getDomRefs(true).row.removeClass(c);};b.prototype.initDomRefs=function(){this._mDomRefs={};};b.prototype.getIndex=function(){var t=this.getTable();if(!t){return-1;}var r=t.indexOfRow(this);var m=t._getRowCounts();if(m.fixedTop>0&&r<m.fixedTop){return r;}if(m.fixedBottom>0&&r>=m.count-m.fixedBottom){var i=t._getTotalRowCount();if(i>=m.count){return i-(m.count-r);}else{return r;}}return t._getFirstRenderedRowIndex()+r;};b.prototype.getDomRefs=function(j,c){j=j===true;c=c===true;var k=j?"jQuery":"dom";var d=this._mDomRefs;if(!d[k]){var t=this.getTable();var g=function(i){var e=document.getElementById(i);if(e){return j?q(e):e;}return null;};var G=function(e){if(e){return j?e.parent():e.parentNode;}return null;};d[k]={};if(t){var r=t.indexOfRow(this);d[k].rowSelector=g(t.getId()+"-rowsel"+r);d[k].rowAction=g(t.getId()+"-rowact"+r);}d[k].rowHeaderPart=G(d[k].rowSelector);d[k].rowFixedPart=g(this.getId()+"-fixed");d[k].rowScrollPart=g(this.getId());d[k].rowActionPart=G(d[k].rowAction);d[k].rowSelectorText=g(this.getId()+"-rowselecttext");if(j){d[k].row=q().add(d[k].rowHeaderPart).add(d[k].rowFixedPart).add(d[k].rowScrollPart).add(d[k].rowActionPart);}else{d[k].row=[d[k].rowHeaderPart,d[k].rowFixedPart,d[k].rowScrollPart,d[k].rowActionPart].filter(Boolean);}}var K=d[k];if(c){return Object.keys(K).map(function(k){return k==="row"?null:K[k];}).filter(Boolean);}return K;};b.prototype._updateSelection=function(){var t=this.getTable();var i=t._getSelectionPlugin().isIndexSelected(this.getIndex());this._setSelected(i);t._getAccExtension().updateSelectionStateOfRow(this);};b.prototype.setRowBindingContext=function(c,t){var B=t.getBindingInfo("rows");var m=B?B.model:undefined;var o=s(this);o.reset();o.context=c;if(o.context){T.Hook.call(t,T.Hook.Keys.Row.UpdateState,o);}this.setBindingContext(o.context,m);this.getDomRefs(true).row.toggleClass("sapUiTableRowHidden",this.isContentHidden());this._updateTableCells(t);};b.prototype.getRowBindingContext=function(){return s(this).context;};b.prototype.setBindingContext=function(c,m){return E.prototype.setBindingContext.call(this,c||null,m);};b.prototype._updateTableCells=function(t){var c=this.getCells(),A=this.getIndex(),h=!!t._updateTableCell,C,$,H,B=this.getRowBindingContext();for(var i=0;i<c.length;i++){C=c[i];H=!!C._updateTableCell;$=H||h?C.$().closest("td"):null;if(H){C._updateTableCell(C,B,$,A);}if(h){t._updateTableCell(C,B,$,A);}}};b.prototype.getType=function(){return s(this).type;};b.prototype.isGroupHeader=function(){return this.getType()===R.GroupHeader;};b.prototype.isSummary=function(){return this.getType()===R.Summary;};b.prototype.isGroupSummary=function(){return this.isSummary()&&this.getLevel()>1;};b.prototype.isTotalSummary=function(){return this.isSummary()&&this.getLevel()===1;};b.prototype.isEmpty=function(){return s(this).empty;};b.prototype.isContentHidden=function(){return s(this).contentHidden;};b.prototype.getLevel=function(){return s(this).level;};b.prototype.getTitle=function(){return s(this).title;};b.prototype.isExpandable=function(){return s(this).expandable;};b.prototype.isExpanded=function(){return s(this).expanded;};b.prototype.destroy=function(){this.removeAllCells();return E.prototype.destroy.apply(this,arguments);};b.prototype.invalidate=function(){return this;};b.prototype.getDragGhost=function(){var t=this.getTable();var o=t.getDomRef();var r=this.getDomRefs();var g;var G;var c;var d=t._getSelectionPlugin().getSelectedCount();function e(j){j.removeAttribute("id");j.removeAttribute("data-sap-ui");j.removeAttribute("data-sap-ui-related");var k=j.children.length;for(var i=0;i<k;i++){e(j.children[i]);}}function f(o,i){var j=o.cloneNode();var k=o.querySelector("thead").cloneNode(true);var l=o.querySelector("tbody").cloneNode();var m=i.cloneNode(true);l.appendChild(m);j.appendChild(k);j.appendChild(l);return j;}g=o.cloneNode();g.classList.add("sapUiTableRowGhost");g.classList.remove("sapUiTableVScr");g.classList.remove("sapUiTableHScr");g.style.width=o.getBoundingClientRect().width+"px";if(r.rowSelector){G=t.getDomRef("sapUiTableRowHdrScr").cloneNode();c=r.rowSelector.cloneNode(true);G.appendChild(c);g.appendChild(G);}if(r.rowFixedPart){G=t.getDomRef("sapUiTableCtrlScrFixed").cloneNode();c=f(t.getDomRef("table-fixed"),r.rowFixedPart);G.appendChild(c);g.appendChild(G);}if(r.rowScrollPart){var h=t.getDomRef("sapUiTableCtrlScr");G=h.cloneNode();c=f(t.getDomRef("table"),r.rowScrollPart);G.appendChild(t.getDomRef("tableCtrlCnt").cloneNode());G.firstChild.appendChild(c);g.appendChild(G);}if(r.rowAction){G=t.getDomRef("sapUiTableRowActionScr").cloneNode();c=r.rowAction.cloneNode(true);G.appendChild(c);g.appendChild(G);}if(d>1){G=document.createElement("div");G.classList.add("sapUiTableRowGhostCount");var C=document.createElement("div");C.textContent=d;G.appendChild(C);g.appendChild(G);}e(g);return g;};b.prototype._setSelected=function(c){var t=this.getTable();if(c){this.addStyleClass("sapUiTableRowSel");}else{this.removeStyleClass("sapUiTableRowSel");}if(t){T.dynamicCall(t._getSyncExtension,function(o){o.syncRowSelection(t.indexOfRow(this),c);},this);}};b.prototype._setHovered=function(h){var t=this.getTable();if(h){this.addStyleClass("sapUiTableRowHvr");}else{this.removeStyleClass("sapUiTableRowHvr");}if(t){T.dynamicCall(t._getSyncExtension,function(o){o.syncRowHover(t.indexOfRow(this),h);},this);}};b.prototype.getRowAction=function(){return this.getAggregation("_rowAction");};b.prototype.getTable=function(){var p=this.getParent();return T.isA(p,"sap.ui.table.Table")?p:null;};b.prototype.expand=function(){if(this.isExpandable()&&!this.isExpanded()){T.Hook.call(this.getTable(),T.Hook.Keys.Row.Expand,this);}};b.prototype.collapse=function(){if(this.isExpandable()&&this.isExpanded()){T.Hook.call(this.getTable(),T.Hook.Keys.Row.Collapse,this);}};b.prototype.toggleExpandedState=function(){if(this.isExpanded()){this.collapse();}else{this.expand();}};b.prototype.Type=R;return b;});