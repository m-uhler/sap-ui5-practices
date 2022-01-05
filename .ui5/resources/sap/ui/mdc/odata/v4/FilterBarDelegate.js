/*
 * ! OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['./ODataMetaModelUtil','sap/ui/mdc/enum/FieldDisplay',"sap/ui/fl/Utils","sap/ui/mdc/FilterBarDelegate",'sap/base/util/ObjectPath','sap/base/util/merge','sap/ui/mdc/odata/v4/TypeUtil','sap/ui/mdc/condition/FilterOperatorUtil',"sap/ui/model/FilterOperator","sap/ui/model/Filter",'sap/ui/mdc/util/IdentifierUtil','sap/ui/core/util/reflection/JsControlTreeModifier','sap/base/Log'],function(O,F,a,b,c,m,T,d,M,e,I,J,L){"use strict";var f=Object.assign({},b);var D={"Edm.Boolean":"Bool","Edm.Byte":"Int","Edm.DateTime":"Date","Edm.DateTimeOffset":"DateTimeOffset","Edm.Decimal":"Decimal","Edm.Double":"Float","Edm.Float":"Float","Edm.Guid":"Guid","Edm.Int16":"Int","Edm.Int32":"Int","Edm.Int64":"Int","Edm.SByte":"Int","Edm.Single":"Float","Edm.String":"String","Edm.Time":"TimeOfDay"};var g={};f._fetchPropertiesByMetadata=function(C,p){var o,h,i,j,k;if(p){var l=p.modifier;o=l.getProperty(C,"delegate");h=o.payload.modelName===null?undefined:o.payload.modelName;i=o.payload.collectionName;j=p.appComponent.getModel(h);}else{o=C.getProperty("delegate");h=o.payload.modelName===null?undefined:o.payload.modelName;i=o.payload.collectionName;j=C.getModel(h);}k=C.getId?C.getId():C.id;var n={getDelegate:function(){return{payload:{modelName:h,collectionName:i}};},getModel:function(s){return j;},getId:function(){return k;}};return p?this.fetchProperties(n):C.getControlDelegate().fetchProperties(C);};f._ensureSingleRangeEQOperators=function(){var o;if(!d.getOperator("SINGLE_RANGE_EQ")){o=m({},d.getOperator("EQ"));o.name="SINGLE_RANGE_EQ";o.getModelFilter=function(C,s){return new e({filters:[new e(s,M.GE,C.values[0]),new e(s,M.LE,C.values[0])],and:true});};d.addOperator(o);}if(!d.getOperator("SINGLE_RANGE_EQ")){o=m({},d.getOperator("EQ"));o.name="SINGLE_RANGE_EQ";o.getModelFilter=function(C,s){return new e({filters:[new e(s,M.GE,C.values[0]),new e(s,M.LE,C.values[0])],and:true});};d.addOperator(o);}};f._ensureMultiRangeBTEXOperator=function(){if(!d.getOperator("MULTI_RANGE_BTEX")){var o=m({},d.getOperator("BT"));o.name="MULTI_RANGE_BTEX";o.getModelFilter=function(C,s){return new e({filters:[new e(s,M.GT,C.values[0]),new e(s,M.LT,C.values[1])],and:true});};d.addOperator(o);}};f._getFilterOperators=function(s){var o=null,h=null;switch(s){case"SingleValue":case"MultiValue":o="EQ";break;case"SingleRange":o="SINGLE_RANGE_EQ,SINGLE_RANGE_EQ,LE,GE";this._ensureSingleRangeEQOperators();break;case"MultiRange":o="EQ,LE,LT,GE,GT,BT,MULTI_RANGE_BTEX";this._ensureMultiRangeBTEXOperator();break;case"SearchExpression":o="StartsWith,EndsWith,Contains";break;case"MultiRangeOrSearchExpression":o="StartsWith,EndsWith,Contains,EQ,LE,LT,GE,GT,BT,MULTI_RANGE_BTEX";this._ensureMultiRangeBTEXOperator();break;default:break;}if(o){h=o.split(',');}return h;};f._createFilterField=function(p,o,P){var h=P?P.modifier:J;var A=P?P.appComponent:a.getAppComponentForControl(o);var v=(P&&P.view)?P.view:a.getViewForControl(o);var V=P?P.viewId:null;var n=p.path||p.name;var s={};if(o.getId){s.id=o.getId();}else{s.id=o.id;}var S=h.getControlIdBySelector(s,A);var i=S+"--filter--"+I.replace(n);var E=sap.ui.getCore().byId(i);if(E){return Promise.resolve(E);}return h.createControl("sap.ui.mdc.FilterField",A,v,i,{dataType:p.typeConfig.className,conditions:"{$filters>/conditions/"+n+'}',required:p.required,label:p.label||p.name,maxConditions:p.maxConditions,delegate:{name:"sap/ui/mdc/odata/v4/FieldBaseDelegate",payload:{}}},true).then(function(j){if(p.fieldHelp){var k=p.fieldHelp;if(!V){k=v.createId(p.fieldHelp);}else{k=V+"--"+p.fieldHelp;}h.setAssociation(j,"fieldHelp",k);}if(p.filterOperators){if(o.getId){h.setProperty(j,"operators",p.filterOperators);}else{h.setProperty(j,"operators",p.filterOperators.join(','));}}if(p.tooltip){h.setProperty(j,"tooltip",p.tooltip);}if(p.constraints){h.setProperty(j,"dataTypeConstraints",p.constraints);}if(p.formatOptions){h.setProperty(j,"dataTypeFormatOptions",p.formatOptions);}if(p.display){h.setProperty(j,"display",p.display);}return j;});};f._createFilter=function(p,o,P){return this._fetchPropertiesByMetadata(o,P).then(function(h){var i=h.find(function(j){return(I.getPropertyKey(j)===p);});if(!i){return null;}return Promise.resolve(this._createFilterField(i,o,P));}.bind(this));};f.addItem=function(p,o,P){return Promise.resolve(this._createFilter(p,o,P));};f.removeItem=function(o,h,p){return Promise.resolve(true);};f._getFieldGroupsByFilterFacetsAnnotation=function(o,E){};f._getNavigationPropertyForParameter=function(E){var o;for(var k in E){o=E[k];if(o){if(o.$kind==="NavigationProperty"){return k;}}}return null;};f._fetchPropertyInfo=function(o,E,n,h,k){var i=o.getObject(E+"/"+"@com.sap.vocabularies.UI.v1.TextArrangement");var H=false;if(o.getObject(E+"/"+k+"@com.sap.vocabularies.UI.v1.HiddenFilter")){H=true;}var j=false;if(o.getObject(E+"/"+k+"@com.sap.vocabularies.Common.v1.IsDigitSequence")){j=true;}var l=null;var p=o.getObject(E+"/"+k+"@com.sap.vocabularies.Common.v1.FilterDefaultValue");if(p){var v=p["$"+D[h.$Type]];switch(h.$Type){case"Edm.DateTimeOffset":l=v;break;default:l=v;}}var s=o.getObject(E+"/"+k+"@com.sap.vocabularies.Common.v1.Label")||k;var t=o.getObject(E+"/"+k+"@com.sap.vocabularies.Common.v1.QuickInfo")||null;var C={};if(h.$MaxLength||h.$Precision||h.$Scale||j){if(h.$MaxLength){C.maxLength=h.$MaxLength;}if(h.$Precision){C.precision=h.$Precision;}if(h.$Scale){C.scale=h.$Scale;}if(j){C.isDigitSequence=j;}}else{C=null;}var q,r=o.getObject(E+"/"+k+"@com.sap.vocabularies.Common.v1.Text");if(r){var u=o.getObject(E+"/"+k+"@com.sap.vocabularies.Common.v1.Text@com.sap.vocabularies.UI.v1.TextArrangement")||i;if(u){if(u.$EnumMember==="com.sap.vocabularies.UI.v1.TextArrangementType/TextOnly"){q=F.Description;}else if(u.$EnumMember==="com.sap.vocabularies.UI.v1.TextArrangementType/TextLast"){q=F.ValueDescription;}else{q=F.DescriptionValue;}}else{q=F.DescriptionValue;}}var P={name:k,label:s,tooltip:t,hiddenFilter:H};if(q){P.display=q;}if(h.$Type==="Edm.DateTimeOffset"){if(!C){C={};}C.V4=true;}if(C){P.constraints=C;}if(l){P.defaultFilterConditions=[{fieldPath:k,operator:"EQ",values:[l]}];}P.name=n?n+"/"+k:k;P.typeConfig=T.getTypeConfig(h.$Type,P.formatOptions,P.constraints);return P;};f._fetchEntitySet=function(o,E,v,n,p){return Promise.all([o.requestObject(E+"/"),o.requestObject(E+"@")]).then(function(r){var h=r[0];var i=r[1]||{};if(!h){return Promise.resolve([]);}var j,P,k=[],l=[],N=[],R=[],s=[],A={},q={},t=false;var u=o.getObject(E);if(u&&u.$NavigationPropertyBinding){q=u.$NavigationPropertyBinding;}var w=i["@Org.OData.Capabilities.V1.FilterRestrictions"];if(w){if(w.NonFilterableProperties){N=w.NonFilterableProperties.map(function(C){return C.$PropertyPath;});}if(w.RequiredProperties){R=w.RequiredProperties.map(function(C){return C.$PropertyPath;});}if(w.FilterExpressionRestrictions){w.FilterExpressionRestrictions.forEach(function(C){A[C.Property.$PropertyPath]=C.AllowedExpressions;});}}w=o.getObject(E+"/"+"@com.sap.vocabularies.UI.v1.SelectionFields");if(w){s=w.map(function(C){return C.$PropertyPath;});}var x=o.getObject(E+"/@sapui.name");var G=x;var y=o.getObject(E+"@com.sap.vocabularies.Common.v1.Label");if(!y){y=G.split(".")[1];}v.push(x);w=o.getObject(E+"/"+"@com.sap.vocabularies.Common.v1.ResultContext");if(w){t=true;p.parameterNavigationName=f._getNavigationPropertyForParameter(h);}if(!n){var S=x.split('.');p.parameterEntityType=S[S.length-1];}for(var K in h){j=h[K];if(j){if(t&&(K==="$Key")){p.parameters=m([],j);}else if(j.$kind==="Property"){if(N.indexOf(K)>=0){continue;}if(o.getObject(E+"/"+K+"@com.sap.vocabularies.UI.v1.Hidden")){continue;}if(j.$isCollection){L.warning("Complex property with type "+j.$Type+" has been ignored");continue;}P=f._fetchPropertyInfo(o,E,n,j,K,p);if(P){P.group=G;P.groupLabel=y;P.required=R.indexOf(K)>=0;P.visible=s.indexOf(K)>=0;if(A[K]){var z=f._getFilterOperators(A[K]);if(z){P.filterOperators=z;}}P.maxConditions=O.isMultiValueFilterExpression(A[K])?-1:1;if(t&&p&&(p.parameters.indexOf(K)>-1)){P.path=null;P.name=K;P.required=true;p.parameterTypes[K]=j.$Type;k.push(P);}else if(!t){k.push(P);}}}else if(!t&&(j.$kind==="NavigationProperty")&&(!j.$isCollection)){var B=q[K];if(B&&(v.indexOf(j.$Type)===-1)){l.push(f._fetchEntitySet(o,'/'+B,v,K,p));}}}}return Promise.all(l).then(function(C){C.forEach(function(H){k=k.concat(H);});return k;});});};f._waitForMetaModel=function(o,p){return new Promise(function(r,h){var i=function(){var s=p===null?undefined:p;var k=o.getModel(s);if(k){r(k);}return k;};var j=function(){if(i()){o.detachModelContextChange(j);}};if(!i()){if(!o.attachModelContextChange){h();return;}o.attachModelContextChange(j);}});};f.fetchProperties=function(o){var s=o.getDelegate().payload.modelName;var E=o.getDelegate().payload.collectionName;return new Promise(function(r,h){var i;var C=o.getId()+'->'+E;if(g[C]){r(g[C]);return;}this._waitForMetaModel(o,s).then(function(j){if(!j||!E){h("model or entity set name not available");return;}i=j.getMetaModel();if(!i){h("metadata model not available");}else{var v=[];var p={parameterNavigationName:null,parameters:[],parameterTypes:{}};f._fetchEntitySet(i,'/'+E,v,null,p).then(function(P){if(p.parameterNavigationName&&(p.parameters.length>0)){window[o.getId()+'->'+E+"-Parameters"]=p;P.sort(function(l,n){var q=l.path||l.name;var t=n.path||n.name;if((!(p.parameters.indexOf(q)>-1)&&!(p.parameters.indexOf(t)>-1))||((p.parameters.indexOf(q)>-1)&&(p.parameters.indexOf(t)>-1))){return 0;}if((p.parameters.indexOf(q)>-1)&&!(p.parameters.indexOf(t)>-1)){return-1;}if(!(p.parameters.indexOf(q)>-1)&&(p.parameters.indexOf(t)>-1)){return 1;}});}var k=P.reduce(function(l,n){l[n.name]=n;return l;},{});P=Object.keys(k).map(function(n){return k[n];});g[C]=P;r(P);});}},function(){h("model not obtained");});}.bind(this));};f.cleanup=function(o){var s=o.getId()+"->";Object.keys(g).forEach(function(k){if(k.indexOf(s)===0){delete window[s+k+"-Parameters"];delete g[k];}});};f.getTypeUtil=function(p){return T;};return f;});
