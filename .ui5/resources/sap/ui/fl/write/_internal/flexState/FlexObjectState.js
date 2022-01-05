/*
 * ! OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/base/util/restricted/_omit","sap/ui/fl/apply/_internal/flexState/FlexState","sap/ui/fl/apply/_internal/flexState/ManifestUtils","sap/ui/fl/apply/_internal/ChangesController","sap/ui/fl/write/_internal/flexState/compVariants/CompVariantState","sap/ui/fl/ChangePersistenceFactory","sap/ui/fl/LayerUtils","sap/ui/fl/apply/_internal/flexState/compVariants/Utils","sap/ui/fl/Utils"],function(_,F,M,C,a,b,L,c,U){"use strict";var d={};function i(p){p.reference=M.getFlexReferenceForControl(p.selector);return F.initialize({componentId:p.componentId||U.getAppComponentForControl(p.selector).getId(),reference:p.reference,componentData:{},manifest:{}});}function g(p){var m=F.getCompVariantsMap(p.reference);var E=[];for(var P in m){var j=m[P];for(var I in j.byId){E.push(j.byId[I]);}}return L.filterChangeOrChangeDefinitionsByCurrentLayer(E,p.currentLayer);}function s(p){var r=M.getFlexReferenceForControl(p.selector);return a.persistAll(r);}function e(p){if(!p.reference){var A=C.getAppComponentForSelector(p.selector);p.reference=M.getFlexReferenceForControl(A);}return b.getChangePersistenceForComponent(p.reference);}function f(p){var o=e(p);return o.getChangesForComponent(_(p,["invalidateCache","selector"]),p.invalidateCache).then(function(P){var D=[];if(p.includeDirtyChanges){D=o.getDirtyChanges();}return P.concat(D);});}function h(p,A){var o=C.getFlexControllerInstance(p.selector);var D=C.getDescriptorFlexControllerInstance(p.selector);return o.saveAll(A,p.skipUpdateCache,p.draft).then(D.saveAll.bind(D,A,p.skipUpdateCache,p.draft));}d.getFlexObjects=function(p){return i(p).then(function(){var j=g(p);var k=f(p);return Promise.all([j,k]).then(function(E){return E[0].concat(E[1]);});});};d.saveFlexObjects=function(p){var A=C.getAppComponentForSelector(p.selector);return Promise.all([s(p),h(p,A)]).then(function(){if(p.layer){p.currentLayer=p.layer;}p.componentId=A.getId();p.invalidateCache=true;return d.getFlexObjects(_(p,"skipUpdateCache"));});};return d;});