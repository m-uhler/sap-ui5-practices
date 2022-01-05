/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/rta/command/BaseCommand","sap/ui/core/util/reflection/JsControlTreeModifier","sap/ui/fl/Utils"],function(B,J,f){"use strict";var C=B.extend("sap.ui.rta.command.ControlVariantSave",{metadata:{library:"sap.ui.rta",properties:{model:{type:"object"}},associations:{},events:{}}});C.prototype.prepare=function(){this.oAppComponent=f.getAppComponentForControl(this.getElement());this.sVariantManagementReference=J.getSelector(this.getElement(),this.oAppComponent).id;return true;};C.prototype.execute=function(){var c=this.getModel().getCurrentVariantReference(this.sVariantManagementReference);this._aControlChanges=this.getModel().getVariant(c,this.sVariantManagementReference).controlChanges;this._aDirtyChanges=this.getModel()._getDirtyChangesFromVariantChanges(this._aControlChanges);this._aDirtyChanges.forEach(function(o){if(o.getFileType()==="change"){o.assignedToVariant=true;}});this.getModel().oData[this.sVariantManagementReference].modified=false;this.getModel().checkUpdate(true);return Promise.resolve();};C.prototype.undo=function(){this._aDirtyChanges.forEach(function(c){if(c.getFileType()==="change"){c.assignedToVariant=false;}});this.getModel().checkDirtyStateForControlModels([this.sVariantManagementReference]);return Promise.resolve();};return C;});
