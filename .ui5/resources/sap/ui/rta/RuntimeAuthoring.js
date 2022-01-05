/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/thirdparty/jquery","sap/ui/base/ManagedObject","sap/ui/rta/toolbar/Fiori","sap/ui/rta/toolbar/Standalone","sap/ui/rta/toolbar/Personalization","sap/ui/rta/toolbar/FioriLike","sap/ui/dt/DesignTime","sap/ui/dt/Overlay","sap/ui/rta/command/Stack","sap/ui/rta/command/LREPSerializer","sap/ui/rta/Utils","sap/ui/dt/Util","sap/ui/dt/ElementUtil","sap/ui/fl/library","sap/ui/fl/Utils","sap/ui/fl/LayerUtils","sap/ui/fl/Layer","sap/ui/fl/write/api/ReloadInfoAPI","sap/ui/fl/write/api/FeaturesAPI","sap/ui/fl/write/api/VersionsAPI","sap/ui/fl/write/api/PersistenceWriteAPI","sap/m/MessageBox","sap/m/MessageToast","sap/ui/rta/util/PluginManager","sap/ui/rta/util/PopupManager","sap/ui/core/BusyIndicator","sap/ui/dt/DOMUtil","sap/ui/rta/util/StylesLoader","sap/ui/rta/appVariant/Feature","sap/ui/Device","sap/ui/rta/service/index","sap/ui/rta/util/ServiceEventBus","sap/ui/dt/OverlayRegistry","sap/base/strings/capitalize","sap/base/util/UriParameters","sap/ui/performance/Measurement","sap/base/Log","sap/ui/events/KeyCodes","sap/ui/model/json/JSONModel","sap/ui/core/Fragment","sap/ui/rta/util/validateFlexEnabled","sap/ui/rta/util/changeVisualization/ChangeVisualization"],function(q,M,F,S,P,a,D,O,C,L,U,b,E,f,c,d,e,R,g,V,h,i,j,k,l,B,m,n,o,p,r,s,t,u,v,w,x,K,J,y,z,A){"use strict";var G="STARTING";var H="STARTED";var I="STOPPED";var N="FAILED";var Q="SERVICE_STARTING";var T="SERVICE_STARTED";var W="SERVICE_FAILED";var X=M.extend("sap.ui.rta.RuntimeAuthoring",{metadata:{library:"sap.ui.rta",associations:{rootControl:{type:"sap.ui.base.ManagedObject"}},properties:{customFieldUrl:"string",showCreateCustomField:"boolean",showToolbars:{type:"boolean",defaultValue:true},triggeredFromDialog:{type:"boolean",defaultValue:false},showWindowUnloadDialog:{type:"boolean",defaultValue:true},commandStack:{type:"any"},flexSettings:{type:"object",defaultValue:{layer:e.CUSTOMER,developerMode:true}},mode:{type:"string",defaultValue:"adaptation"},metadataScope:{type:"string",defaultValue:"default"}},events:{start:{parameters:{editablePluginsCount:{type:"int"}}},stop:{},failed:{},selectionChange:{parameters:{selection:{type:"sap.ui.dt.Overlay[]"}}},modeChanged:{},undoRedoStackModified:{}}},_sAppTitle:null,_dependents:null,_sStatus:I,constructor:function(){M.apply(this,arguments);this._dependents={};this._mServices={};this._mCustomServicesDictinary={};this.addDependent(new k(),"pluginManager");this.addDependent(new l(),"popupManager");if(this.getShowToolbars()){this.getPopupManager().attachOpen(this.onPopupOpen,this);this.getPopupManager().attachClose(this.onPopupClose,this);this.addDependent(new A(),"changeVisualization");}if(window.parent!==window){this.startService("receiver");}if(this._shouldValidateFlexEnabled()){this.attachEvent("start",z.bind(null,this));}},_RELOAD:{NOT_NEEDED:"NO_RELOAD",VIA_HASH:"CROSS_APP_NAVIGATION",RELOAD_PAGE:"HARD_RELOAD"}});X.prototype._shouldValidateFlexEnabled=function(){var $=document.location.hostname;var a1=$.endsWith(".sap"+".corp")||$==="localhost";if(a1){var b1=v.fromQuery(window.location.search).get("sap-ui-rta-skip-flex-validation");a1=b1!=="true";}return a1;};X.prototype.addDependent=function($,a1,b1){b1=typeof b1==="undefined"?true:!!b1;if(!(a1 in this._dependents)){if(a1&&b1){this["get"+u(a1,0)]=this.getDependent.bind(this,a1);}this._dependents[a1||$.getId()]=$;}else{throw b.createError("RuntimeAuthoring#addDependent",b.printf("Can't add dependency with same key '{0}'",a1),"sap.ui.rta");}};X.prototype.getDependent=function($){return this._dependents[$];};X.prototype.getDependents=function(){return this._dependents;};X.prototype.removeDependent=function($){delete this._dependents[$];};X.prototype.onPopupOpen=function($){var a1=$.getParameters().getSource();if(a1.isA("sap.m.Dialog")&&this.getToolbar().type==="fiori"){this.getToolbar().setColor("contrast");}this.getToolbar().bringToFront();};X.prototype.onPopupClose=function($){if($.getParameters()instanceof sap.m.Dialog){this.getToolbar().setColor();}};X.prototype.setPlugins=function($){if(this._sStatus!==I){throw new Error("Cannot replace plugins: runtime authoring already started");}this.getPluginManager().setPlugins($);};X.prototype.getPlugins=function(){return this.getPluginManager&&this.getPluginManager()&&this.getPluginManager().getPlugins();};X.prototype.getDefaultPlugins=function(){return this.getPluginManager().getDefaultPlugins(this.getFlexSettings());};X.prototype.setFlexSettings=function($){var a1=v.fromQuery(window.location.search);var b1=a1.get("sap-ui-layer");$=q.extend({},this.getFlexSettings(),$);if(b1){$.layer=b1.toUpperCase();}if($.scenario||$.baseId){var c1=c.buildLrepRootNamespace($.baseId,$.scenario,$.projectId);$.rootNamespace=c1;$.namespace=c1+"changes/";}U.setRtaStyleClassName($.layer);this.setProperty("flexSettings",$);};X.prototype.getLayer=function(){return this.getFlexSettings().layer;};X.prototype.getRootControlInstance=function(){if(!this._oRootControl){this._oRootControl=E.getElementInstance(this.getRootControl());}return this._oRootControl;};X.prototype._getTextResources=function(){return sap.ui.getCore().getLibraryResourceBundle("sap.ui.rta");};X.prototype._setVersionsModel=function($){this._oVersionsModel=$;};X.prototype._initVersioning=function(){return V.initialize({selector:this.getRootControlInstance(),layer:this.getLayer()}).then(this._setVersionsModel.bind(this));};X.prototype.start=function(){var $;var a1;if(this._sStatus===I){this._sStatus=G;var b1=this.getRootControlInstance();if(!b1){a1=new Error("Root control not found");x.error(a1);return Promise.reject(a1);}return this._initVersioning().then(this._determineReload.bind(this)).then(function(c1){if(c1){return Promise.reject("Reload triggered");}this._oSerializer=new L({commandStack:this.getCommandStack(),rootControl:this.getRootControl()});this.getPluginManager().preparePlugins(this.getFlexSettings(),this._handleElementModified.bind(this),this.getCommandStack());var d1=this.getPluginManager().getPluginList();$=new Promise(function(e1,f1){w.start("rta.dt.startup","Measurement of RTA: DesignTime start up");this._oDesignTime=new D({scope:this.getMetadataScope(),plugins:d1});this._oDesignTime.addRootElement(this._oRootControl);q(O.getOverlayContainer()).addClass("sapUiRta");if(this.getLayer()===e.USER){q(O.getOverlayContainer()).addClass("sapUiRtaPersonalize");}else{q("body").addClass("sapUiRtaMode");}this._oDesignTime.getSelectionManager().attachChange(function(g1){this.fireSelectionChange({selection:g1.getParameter("selection")});},this);this._oDesignTime.attachEventOnce("synced",function(){e1();w.end("rta.dt.startup","Measurement of RTA: DesignTime start up");},this);this._oDesignTime.attachEventOnce("syncFailed",function(g1){f1(g1.getParameter("error"));});}.bind(this));this._oldUnloadHandler=window.onbeforeunload;window.onbeforeunload=this._onUnload.bind(this);}.bind(this)).then(function(){if(this.getShowToolbars()){return this._getToolbarButtonsVisibility().then(this._createToolsMenu.bind(this));}}.bind(this)).then(this._onStackModified.bind(this)).then(function(){n.loadStyles("InPageStyles").then(function(c1){var d1=c1.replace(/%scrollWidth%/g,m.getScrollbarWidth()+"px");m.insertStyles(d1,O.getOverlayContainer().get(0));});}).then(function(){return $;}).then(function(){this.getPopupManager().setRta(this);if(this.getShowToolbars()){return this.getToolbar().show();}}.bind(this)).then(function(){if(this.getShowToolbars()&&this.getChangeVisualization){this.getChangeVisualization().setRootControlId(this.getRootControl());}}.bind(this)).then(function(){if(p.browser.name==="ff"){q(document).on("contextmenu",_);}}).then(function(){this.fnKeyDown=this._onKeyDown.bind(this);q(document).on("keydown",this.fnKeyDown);var c1=t.getOverlay(this.getRootControl());this._$RootControl=c1.getAssociatedDomRef();if(this._$RootControl){this._$RootControl.addClass("sapUiRtaRoot");}}.bind(this)).then(function(){this._sStatus=H;this.fireStart({editablePluginsCount:this.getPluginManager().getEditableOverlaysCount()});}.bind(this)).catch(function(a1){if(a1!=="Reload triggered"){this._sStatus=N;this.fireFailed(a1);}if(a1){this.destroy();return Promise.reject(a1);}}.bind(this));}};function _(){return false;}X.prototype._getToolbarButtonsVisibility=function(){return g.isPublishAvailable().then(function($){return o.isSaveAsAvailable(this.getRootControlInstance(),this.getLayer(),this._oSerializer).then(function(a1){return{publishAvailable:$,saveAsAvailable:$&&a1};});}.bind(this));};X.prototype._isOldVersionDisplayed=function(){return V.isOldVersionDisplayed({selector:this.getRootControlInstance(),layer:this.getLayer()});};X.prototype._isDraftAvailable=function(){return V.isDraftAvailable({selector:this.getRootControlInstance(),layer:this.getLayer()});};var Y=function($){B.hide();var a1=$.userMessage||$.stack||$.message||$.status||$;var b1=sap.ui.getCore().getLibraryResourceBundle("sap.ui.rta");x.error("Failed to transfer changes",a1);var c1=b1.getText("MSG_LREP_TRANSFER_ERROR")+"\n"+b1.getText("MSG_ERROR_REASON",a1);i.error(c1,{styleClass:U.getRtaStyleClassName()});};X.prototype.setCommandStack=function($){var a1=this.getProperty("commandStack");if(a1){a1.detachModified(this._onStackModified,this);}if(this._oInternalCommandStack){this._oInternalCommandStack.destroy();delete this._oInternalCommandStack;}var b1=this.setProperty("commandStack",$);if($){$.attachModified(this._onStackModified,this);}if(this.getPluginManager&&this.getPluginManager()){this.getPluginManager().provideCommandStack("settings",$);}return b1;};X.prototype.getCommandStack=function(){var $=this.getProperty("commandStack");if(!$){$=new C();this._oInternalCommandStack=$;this.setCommandStack($);}return $;};X.prototype._onStackModified=function(){var $=this._oVersionsModel.getProperty("/backendDraft");var a1=this._oVersionsModel.getProperty("/displayedVersion")===sap.ui.fl.Versions.Draft;var b1=this.getCommandStack();var c1=b1.canUndo();if(!this.getShowToolbars()||!c1||this._bUserDiscardedDraft||a1||!$){return this._modifyStack();}return U.showMessageBox("warning","MSG_DRAFT_DISCARD_AND_CREATE_NEW_DIALOG",{titleKey:"TIT_DRAFT_DISCARD_DIALOG",actions:[i.Action.OK,i.Action.CANCEL],emphasizedAction:i.Action.OK}).then(function(d1){if(d1===i.Action.OK){this._discardDraftConfirmed();}else{this.undo();}}.bind(this));};X.prototype._discardDraftConfirmed=function(){this._bUserDiscardedDraft=true;this._modifyStack();};X.prototype._modifyStack=function(){if(this.getShowToolbars()){var $=this.getCommandStack();var a1=$.canUndo();var b1=$.canRedo();this._oVersionsModel.setDirtyChanges(a1);this._oToolbarControlsModel.setProperty("/undoEnabled",a1);this._oToolbarControlsModel.setProperty("/redoEnabled",b1);this._oToolbarControlsModel.setProperty("/publishEnabled",this.bInitialPublishEnabled||a1);this._oToolbarControlsModel.setProperty("/restoreEnabled",this.bInitialResetEnabled||a1);}this.fireUndoRedoStackModified();return Promise.resolve();};X.prototype._checkToolbarAndExecuteFunction=function($,a1){if(this.getShowToolbars()&&this.getToolbar&&this.getToolbar()){return this.getToolbar()[$](a1);}};X.prototype.getSelection=function(){if(this._oDesignTime){return this._oDesignTime.getSelectionManager().get();}return[];};X.prototype.stop=function($,a1){this._checkToolbarAndExecuteFunction("setBusy",true);return this._handleReloadOnExit(a1).then(function(b1){return(($)?Promise.resolve():this._serializeToLrep(this)).then(this._checkToolbarAndExecuteFunction.bind(this,"hide")).then(function(){this.fireStop();if(b1.reloadMethod&&(b1.reloadMethod!==this._RELOAD.NOT_NEEDED)){b1.deleteMaxLayer=true;b1.onExit=true;b1.triggerHardReload=(b1.reloadMethod===this._RELOAD.RELOAD_PAGE);return this._handleUrlParameterOnExit(b1);}}.bind(this));}.bind(this)).catch(Y).then(function(){this._checkToolbarAndExecuteFunction("setBusy",false);this._sStatus=I;q("body").removeClass("sapUiRtaMode");}.bind(this));};X.prototype.restore=function(){return this._onRestore();};X.prototype.transport=function(){return this._onTransport();};X.prototype.undo=function(){return this._onUndo();};X.prototype.redo=function(){return this._onRedo();};X.prototype.canUndo=function(){return this.getCommandStack().canUndo();};X.prototype.canRedo=function(){return this.getCommandStack().canRedo();};X.prototype._onKeyDown=function($){var a1=p.os.macintosh;var b1=O.getOverlayContainer().get(0).contains(document.activeElement);var c1=this.getShowToolbars()&&this.getToolbar().getDomRef().contains(document.activeElement);var d1=false;q(".sapUiDtContextMenu").each(function(h1,i1){if(i1.contains(document.activeElement)){d1=true;}});var e1=document.body===document.activeElement;var f1=q(document.activeElement).parents(".sapUiRtaEditableField").length>0;if((b1||c1||d1||e1)&&!f1){var g1=a1?$.metaKey:$.ctrlKey;if($.keyCode===K.Z&&$.shiftKey===false&&$.altKey===false&&g1===true){this._onUndo().then($.stopPropagation.bind($));}else if(((a1&&$.keyCode===K.Z&&$.shiftKey===true)||(!a1&&$.keyCode===K.Y&&$.shiftKey===false))&&$.altKey===false&&g1===true){this._onRedo().then($.stopPropagation.bind($));}}};X.prototype._onUnload=function(){var $=this.getCommandStack();var a1=$.canUndo()||$.canRedo();if(a1&&this.getShowWindowUnloadDialog()){return this._getTextResources().getText("MSG_UNSAVED_CHANGES");}window.onbeforeunload=this._oldUnloadHandler;};X.prototype._serializeAndSave=function(){return this._oSerializer.saveCommands(this._oVersionsModel.getProperty("/versioningEnabled"));};X.prototype._serializeToLrep=function(){if(!this._bReloadNeeded){return this._oSerializer.needsReload().then(function($){this._bReloadNeeded=$;return this._serializeAndSave();}.bind(this));}return this._serializeAndSave();};X.prototype._onUndo=function(){this.getPluginManager().handleStopCutPaste();return this.getCommandStack().undo();};X.prototype._onRedo=function(){this.getPluginManager().handleStopCutPaste();return this.getCommandStack().redo();};X.prototype._onActivate=function($){var a1=$.getParameter("versionTitle");if(this._isOldVersionDisplayed()&&this._isDraftAvailable()){return U.showMessageBox("warning","MSG_DRAFT_DISCARD_ON_REACTIVATE_DIALOG",{titleKey:"TIT_DRAFT_DISCARD_ON_REACTIVATE_DIALOG",actions:[i.Action.OK,i.Action.CANCEL],emphasizedAction:i.Action.OK}).then(function(b1){if(b1===i.Action.OK){this._activate(a1);}}.bind(this));}return this._activate(a1);};X.prototype._activate=function($){var a1=this.getLayer();var b1=this.getRootControlInstance();return V.activate({layer:a1,selector:b1,title:$}).then(function(){this._showMessageToast("MSG_DRAFT_ACTIVATION_SUCCESS");this.bInitialResetEnabled=true;this._oToolbarControlsModel.setProperty("/restoreEnabled",true);this.getCommandStack().removeAllCommands();}.bind(this)).catch(function(c1){U.showMessageBox("error","MSG_DRAFT_ACTIVATION_FAILED",{error:c1});});};X.prototype._handleDiscard=function(){var $=this.getLayer();var a1={isDraftAvailable:false,layer:$};X.enableRestart($,this.getRootControlInstance());if(!c.getUshellContainer()){this.getCommandStack().removeAllCommands();return this._triggerHardReload(a1);}var b1=true;this.getCommandStack().removeAllCommands();var c1=this._removeVersionParameterForFLP(a1,c.getParsedURLHash(),b1);this._triggerCrossAppNavigation(c1);return this.stop(true,true);};X.prototype._onDiscardDraft=function(){return U.showMessageBox("warning","MSG_DRAFT_DISCARD_DIALOG",{actions:[i.Action.OK,i.Action.CANCEL],emphasizedAction:i.Action.OK}).then(function($){if($===i.Action.OK){return V.discardDraft({layer:this.getLayer(),selector:this.getRootControlInstance(),updateState:true}).then(this._handleDiscard.bind(this));}}.bind(this));};X.prototype._onSwitchVersion=function($){var a1=$.getParameter("version");var b1=this._oVersionsModel.getProperty("/displayedVersion");if(a1===b1){return;}if(this.canUndo()){this._nSwitchToVersion=a1;return U.showMessageBox("warning","MSG_SWITCH_VERSION_DIALOG",{titleKey:"TIT_SWITCH_VERSION_DIALOG",actions:[i.Action.YES,i.Action.NO,i.Action.CANCEL],emphasizedAction:i.Action.YES}).then(function(c1){switch(c1){case i.Action.YES:return this._serializeToLrep(this).then(this._switchVersion.bind(this,this._nSwitchToVersion));case i.Action.NO:this.getCommandStack().removeAllCommands(true);this._switchVersion(this._nSwitchToVersion);}}.bind(this));}this._switchVersion(a1);};X.prototype._switchVersion=function($){var a1=$.toString();X.enableRestart(this.getLayer(),this.getRootControlInstance());if(!c.getUshellContainer()){if(!R.hasVersionParameterWithValue({value:a1})){var b1={versionSwitch:true,version:a1};return this._triggerHardReload(b1);}return this._reloadPage();}var c1=c.getParsedURLHash();V.loadVersionForApplication({selector:this.getRootControlInstance(),layer:this.getLayer(),version:$});var d1=c1.params[sap.ui.fl.Versions.UrlParameter];if(d1&&d1[0]===a1){c.getUshellContainer().getService("AppLifeCycle").reloadCurrentApp();}else{c1.params[sap.ui.fl.Versions.UrlParameter]=a1;this._triggerCrossAppNavigation(c1);}};X.prototype._setUriParameter=function($){document.location.search=$;};X.prototype._createToolsMenu=function($){if(!this.getDependent("toolbar")){var a1;if(this.getLayer()===e.USER){a1=P;}else if(U.isOriginalFioriToolbarAccessible()){a1=F;}else if(U.getFiori2Renderer()){a1=a;}else{a1=S;}var b1;if(this.getLayer()===e.USER){b1=new a1({textResources:this._getTextResources(),exit:this.stop.bind(this,false,true),restore:this._onRestore.bind(this)});}else{b1=new a1({textResources:this._getTextResources(),exit:this.stop.bind(this,false,false),transport:this._onTransport.bind(this),restore:this._onRestore.bind(this),undo:this._onUndo.bind(this),redo:this._onRedo.bind(this),modeChange:this._onModeChange.bind(this),manageApps:o.onGetOverview.bind(null,true,this.getLayer()),appVariantOverview:this._onGetAppVariantOverview.bind(this),saveAs:o.onSaveAs.bind(o,true,true,this.getLayer(),null),activate:this._onActivate.bind(this),discardDraft:this._onDiscardDraft.bind(this),switchVersion:this._onSwitchVersion.bind(this),toggleChangeVisualization:this.getChangeVisualization?this.getChangeVisualization().toggleActive.bind(this.getChangeVisualization()):function(){}});}this.addDependent(b1,"toolbar");return b1.onFragmentLoaded().then(function(){var c1=$.saveAsAvailable;var d1=c1&&o.isOverviewExtended();this._oToolbarControlsModel=new J({undoEnabled:false,redoEnabled:false,publishVisible:$.publishAvailable,publishEnabled:this.bInitialPublishEnabled,restoreEnabled:this.bInitialResetEnabled,appVariantsOverviewVisible:c1&&d1,appVariantsOverviewEnabled:c1&&d1,saveAsVisible:c1,saveAsEnabled:false,manageAppsVisible:c1&&!d1,manageAppsEnabled:c1&&!d1,modeSwitcher:this.getMode()});if(c1){o.isManifestSupported().then(function(e1){this._oToolbarControlsModel.setProperty("/saveAsEnabled",e1);this._oToolbarControlsModel.setProperty("/appVariantsOverviewEnabled",e1);this._oToolbarControlsModel.setProperty("/manageAppsEnabled",e1);}.bind(this));}this.getToolbar().setModel(this._oVersionsModel,"versions");this.getToolbar().setModel(this._oToolbarControlsModel,"controls");}.bind(this));}return Promise.resolve();};X.prototype._onGetAppVariantOverview=function($){var a1=$.getParameter("item");var b1=a1.getId()==="keyUser";return o.onGetOverview(b1,this.getLayer());};X.prototype.destroy=function(){q.map(this._dependents,function($,a1){this.removeDependent(a1);$.destroy(true);}.bind(this));Object.keys(this._mServices).forEach(function($){this.stopService($);},this);if(this._oDesignTime){this._oDesignTime.destroy();this._oDesignTime=null;q(document).off("keydown",this.fnKeyDown);}if(this._$RootControl){this._$RootControl.removeClass("sapUiRtaRoot");}this.setCommandStack(null);if(this._oServiceEventBus){this._oServiceEventBus.destroy();}if(p.browser.name==="ff"){q(document).off("contextmenu",_);}window.onbeforeunload=this._oldUnloadHandler;M.prototype.destroy.apply(this,arguments);};X.prototype._onTransport=function(){this.getPluginManager().handleStopCutPaste();B.show(500);return this._serializeToLrep().then(function(){B.hide();var $=c.isApplicationVariant(this._oRootControl)&&!c.isVariantByStartupParameter(this._oRootControl);return(($)?o.getAppVariantDescriptor(this._oRootControl):Promise.resolve()).then(function(a1){var b1=[];if(a1){b1.push(a1);}return h.publish({selector:this.getRootControlInstance(),styleClass:U.getRtaStyleClassName(),layer:this.getLayer(),appVariantDescriptors:b1}).then(function(c1){if(c1!=="Error"&&c1!=="Cancel"){j.show(c1);if(this.getShowToolbars()){h.getResetAndPublishInfo({selector:this.getRootControlInstance(),layer:this.getLayer()}).then(function(d1){this._oToolbarControlsModel.setProperty("/publishEnabled",d1.isPublishEnabled);this._oToolbarControlsModel.setProperty("/restoreEnabled",d1.isResetEnabled);}.bind(this));}}}.bind(this));}.bind(this));}.bind(this))["catch"](Y);};X.prototype._deleteChanges=function(){var $=this.getLayer();return h.reset({selector:c.getAppComponentForControl(this.getRootControlInstance()),layer:$}).then(function(){var a1={isDraftAvailable:R.hasVersionParameterWithValue({value:$}),layer:$,deleteMaxLayer:false,triggerHardReload:true};return this._handleUrlParameterOnExit(a1);}.bind(this)).catch(function(a1){if(a1!=="cancel"){U.showMessageBox("error","MSG_RESTORE_FAILED",{error:a1});}});};X.prototype._reloadPage=function(){window.location.reload();};X.prototype._showMessageToast=function($){var a1=this._getTextResources().getText($);j.show(a1);};X.needsRestart=function($){return!!window.sessionStorage.getItem("sap.ui.rta.restart."+$);};X.enableRestart=function($,a1){var b1=c.getComponentClassName(a1);var c1=b1||true;window.sessionStorage.setItem("sap.ui.rta.restart."+$,c1);};X.disableRestart=function($){window.sessionStorage.removeItem("sap.ui.rta.restart."+$);};X.prototype._onRestore=function(){var $=this.getLayer();var a1=$===e.USER?this._getTextResources().getText("FORM_PERS_RESET_MESSAGE_PERSONALIZATION"):this._getTextResources().getText("FORM_PERS_RESET_MESSAGE");var b1=$===e.USER?this._getTextResources().getText("BTN_RESTORE"):this._getTextResources().getText("FORM_PERS_RESET_TITLE");this.getPluginManager().handleStopCutPaste();return U.showMessageBox("warning",a1,{titleKey:b1,actions:[i.Action.OK,i.Action.CANCEL],emphasizedAction:i.Action.OK}).then(function(c1){if(c1===i.Action.OK){X.enableRestart($,this.getRootControlInstance());this._deleteChanges();this.getCommandStack().removeAllCommands();}}.bind(this));};X.prototype._scheduleOnCreated=function($,a1){function b1(c1){var d1=c1.getParameter("elementOverlay");if(d1.getElement().getId()===$){this._oDesignTime.detachEvent("elementOverlayCreated",b1,this);a1(d1);}}this._oDesignTime.attachEvent("elementOverlayCreated",b1,this);};X.prototype._scheduleOnCreatedAndVisible=function($,a1){function b1(d1){var e1=d1.getSource();if(e1.getGeometry()&&e1.getGeometry().visible){e1.detachEvent("geometryChanged",b1);a1(e1);}}function c1(d1){if(!d1.getGeometry()||!d1.getGeometry().visible){d1.attachEvent("geometryChanged",b1);}else{a1(d1);}}this._scheduleOnCreated($,function(d1){if(d1.isRendered()){c1(d1);}else{d1.attachEventOnce("afterRendering",function(e1){c1(e1.getSource());});}});};X.prototype._scheduleRenameOnCreatedContainer=function($,a1){var b1=function(c1){c1.setSelected(true);this.getPluginManager().getPlugin("rename").startEdit(c1);}.bind(this);this._scheduleOnCreatedAndVisible(a1,function(c1){var d1=this.getPluginManager().getPlugin("createContainer").getCreatedContainerId($,c1.getElement().getId());var e1=t.getOverlay(d1);if(e1){b1(e1);}else{this._scheduleOnCreatedAndVisible(d1,b1);}}.bind(this));};X.prototype._handleElementModified=function($){this.getPluginManager().handleStopCutPaste();var a1=$.getParameter("action");var b1=$.getParameter("newControlId");var c1=$.getParameter("command");if(c1 instanceof sap.ui.rta.command.BaseCommand){if(b1){this._scheduleOnCreated(b1,function(d1){var e1=d1.getDesignTimeMetadata();var f1=e1.getData().select;if(typeof f1==="function"){f1(d1.getElement());}});if(a1){this._scheduleRenameOnCreatedContainer(a1,b1);}}return this.getCommandStack().pushAndExecute(c1).catch(function(d1){if(d1&&d1.message&&d1.message.indexOf("The following Change cannot be applied because of a dependency")>-1){U.showMessageBox("error","MSG_DEPENDENCY_ERROR",{error:d1});}x.error("sap.ui.rta: "+d1.message);});}return Promise.resolve();};X.prototype._buildNavigationArguments=function($){return{target:{semanticObject:$.semanticObject,action:$.action,context:$.contextRaw},params:$.params,appSpecificRoute:$.appSpecificRoute,writeHistory:false};};X.prototype._triggerCrossAppNavigation=function($){if(this.getLayer()!==e.USER){return c.ifUShellContainerThen(function(a1){a1[0].toExternal(this._buildNavigationArguments($));return Promise.resolve(true);}.bind(this),["CrossApplicationNavigation"]);}};X.prototype._removeVersionParameterForFLP=function($,a1,b1){var c1=this.getLayer();if(c1===e.USER){return a1;}var d1=c.getParameter(f.Versions.UrlParameter);if(d1){delete a1.params[f.Versions.UrlParameter];}else if((this._isDraftAvailable()||b1)&&!$.hasHigherLayerChanges){c.getUshellContainer().getService("AppLifeCycle").reloadCurrentApp();}return a1;};X.prototype._removeMaxLayerParameterForFLP=function($,a1){if($.deleteMaxLayer&&$.hasHigherLayerChanges){delete a1.params[d.FL_MAX_LAYER_PARAM];}return a1;};X.prototype._handleUrlParameterOnExit=function($){if(!c.getUshellContainer()){return this._triggerHardReload($);}var a1=c.getParsedURLHash();if(!a1){return;}if($.allContexts&&!$.hasHigherLayerChanges){c.getUshellContainer().getService("AppLifeCycle").reloadCurrentApp();}a1=this._removeMaxLayerParameterForFLP($,a1);a1=this._removeVersionParameterForFLP($,a1,false);this._triggerCrossAppNavigation(a1);if($.triggerHardReload){this._reloadPage();}};X.prototype._getReloadMessageOnStart=function($){var a1;var b1=$.layer===e.CUSTOMER;if($.hasHigherLayerChanges&&$.isDraftAvailable){a1=b1?"MSG_VIEWS_OR_PERSONALIZATION_AND_DRAFT_EXISTS":"MSG_HIGHER_LAYER_CHANGES_AND_DRAFT_EXISTS";}else if($.hasHigherLayerChanges&&$.allContexts){a1="MSG_RESTRICTED_CONTEXT_EXIST_AND_PERSONALIZATION";}else if($.hasHigherLayerChanges){a1=b1?"MSG_PERSONALIZATION_OR_PUBLIC_VIEWS_EXISTS":"MSG_HIGHER_LAYER_CHANGES_EXIST";}else if($.isDraftAvailable){a1="MSG_DRAFT_EXISTS";}else if($.allContexts){a1="MSG_RESTRICTED_CONTEXT_EXIST";}return a1;};X.prototype._getReloadMessageOnExit=function($){var a1=$.layer===e.CUSTOMER;if($.hasHigherLayerChanges){if(!a1){return"MSG_RELOAD_WITH_ALL_CHANGES";}if($.isDraftAvailable){return"MSG_RELOAD_WITH_VIEWS_PERSONALIZATION_AND_WITHOUT_DRAFT";}if($.allContexts){return"MSG_RELOAD_WITH_PERSONALIZATION_AND_RESTRICTED_CONTEXT";}return"MSG_RELOAD_WITH_PERSONALIZATION_AND_VIEWS";}if($.initialDraftGotActivated){return"MSG_RELOAD_ACTIVATED_DRAFT";}if($.isDraftAvailable){return"MSG_RELOAD_WITHOUT_DRAFT";}if($.changesNeedReload){return"MSG_RELOAD_NEEDED";}if($.allContexts){return"MSG_RELOAD_WITHOUT_ALL_CONTEXT";}};X.prototype._handleReloadMessageBoxOnExit=function($){var a1=this._getReloadMessageOnExit($);if(a1){return U.showMessageBox("information",a1,{titleKey:"HEADER_RELOAD_NEEDED"});}return Promise.resolve();};X.prototype._triggerReloadOnStart=function($){c.ifUShellContainerThen(function(){if($.isDraftAvailable){V.loadDraftForApplication({selector:$.selector,layer:$.layer});}else{V.loadVersionForApplication({selector:$.selector,layer:$.layer,allContexts:$.allContexts});}},["CrossApplicationNavigation"]);var a1=this._getReloadMessageOnStart($);if(!a1){return Promise.resolve();}return U.showMessageBox("information",a1).then(function(){X.enableRestart($.layer,this.getRootControlInstance());if($.allContexts&&!$.hasHigherLayerChanges){c.getUshellContainer().getService("AppLifeCycle").reloadCurrentApp();}if(c.getUshellContainer()){var b1=R.handleParametersOnStart($);return this._triggerCrossAppNavigation(b1);}return this._triggerHardReload($);}.bind(this));};X.prototype._determineReload=function(){var $={hasHigherLayerChanges:false,isDraftAvailable:false,layer:this.getLayer(),selector:this.getRootControlInstance(),ignoreMaxLayerParameter:false,includeCtrlVariants:true};return R.getReloadReasonsForStart($).then(function($){var a1=h.getResetAndPublishInfoFromSession($.selector);this.bInitialResetEnabled=!!a1.isResetEnabled;this.bInitialPublishEnabled=!!a1.isPublishEnabled;if($.hasHigherLayerChanges||$.isDraftAvailable||$.allContexts){return this._triggerReloadOnStart($);}}.bind(this));};X.prototype._triggerHardReload=function($){$.parameters=document.location.search;var a1=R.handleUrlParametersForStandalone($);if(document.location.search!==a1){this._setUriParameter(a1);return Promise.resolve();}return this._reloadPage();};X.prototype._handleReloadOnExit=function($){if($){return Promise.resolve({reloadMethod:this._RELOAD.NOT_NEEDED});}var a1=this._bReloadNeeded?Promise.resolve(this._bReloadNeeded):this._oSerializer.needsReload();return a1.then(function(b1){var c1={layer:this.getLayer(),selector:this.getRootControlInstance(),changesNeedReload:b1,isDraftAvailable:this._oVersionsModel.getProperty("/draftAvailable"),versioningEnabled:this._oVersionsModel.getProperty("/versioningEnabled"),activeVersion:this._oVersionsModel.getProperty("/activeVersion")};c1=R.getReloadMethod(c1);return this._handleReloadMessageBoxOnExit(c1).then(function(){return c1;});}.bind(this));};X.prototype._onModeChange=function($){this.setMode($.getParameter("item").getKey());};X.prototype.setMode=function($){if(this.getMode()!==$){var a1=$==="adaptation";this._oDesignTime.setEnabled(a1);this.getPluginManager().getPlugin("tabHandling")[a1?"removeTabIndex":"restoreTabIndex"]();this._oToolbarControlsModel.setProperty("/modeSwitcher",$);this.setProperty("mode",$);this.fireModeChanged({mode:$});}};X.prototype.setMetadataScope=function($){if(this._sStatus!==I){x.error("sap.ui.rta: Failed to set metadata scope on RTA instance after RTA is started");return;}this.setProperty("metadataScope",$);};function Z($){if(r.hasOwnProperty($)){return r[$].replace(/\./g,"/");}}X.prototype.startService=function($){if(this._sStatus!==H){return new Promise(function(c1,d1){this.attachEventOnce("start",c1);this.attachEventOnce("failed",d1);}.bind(this)).then(function(){return this.startService($);}.bind(this),function(){return Promise.reject(b.createError("RuntimeAuthoring#startService",b.printf("Can't start the service '{0}' while RTA has been failed during a startup",$),"sap.ui.rta"));});}var a1=Z($);var b1;if(!a1){return Promise.reject(b.createError("RuntimeAuthoring#startService",b.printf("Unknown service. Can't find any registered service by name '{0}'",$),"sap.ui.rta"));}b1=this._mServices[$];if(b1){switch(b1.status){case T:{return Promise.resolve(b1.exports);}case Q:{return b1.initPromise;}case W:{return b1.initPromise;}default:{return Promise.reject(b.createError("RuntimeAuthoring#startService",b.printf("Unknown service status. Service name = '{0}'",$),"sap.ui.rta"));}}}else{this._mServices[$]=b1={status:Q,location:a1,initPromise:new Promise(function(c1,d1){sap.ui.require([a1],function(e1){b1.factory=e1;if(!this._oServiceEventBus){this._oServiceEventBus=new s();}b.wrapIntoPromise(e1)(this,this._oServiceEventBus.publish.bind(this._oServiceEventBus,$)).then(function(f1){if(this.bIsDestroyed){throw b.createError("RuntimeAuthoring#startService",b.printf("RuntimeAuthoring instance is destroyed while initialising the service '{0}'",$),"sap.ui.rta");}if(!q.isPlainObject(f1)){throw b.createError("RuntimeAuthoring#startService",b.printf("Invalid service format. Service should return simple javascript object after initialisation. Service name = '{0}'",$),"sap.ui.rta");}b1.service=f1;b1.exports={};if(Array.isArray(f1.events)&&f1.events.length>0){q.extend(b1.exports,{attachEvent:this._oServiceEventBus.subscribe.bind(this._oServiceEventBus,$),detachEvent:this._oServiceEventBus.unsubscribe.bind(this._oServiceEventBus,$),attachEventOnce:this._oServiceEventBus.subscribeOnce.bind(this._oServiceEventBus,$)});}var g1=f1.exports||{};q.extend(b1.exports,Object.keys(g1).reduce(function(h1,i1){var j1=g1[i1];h1[i1]=typeof j1==="function"?b.waitForSynced(this._oDesignTime,j1):j1;return h1;}.bind(this),{}));b1.status=T;c1(Object.freeze(b1.exports));}.bind(this)).catch(d1);}.bind(this),function(e1){b1.status=W;d1(b.propagateError(e1,"RuntimeAuthoring#startService",b.printf("Can't load service '{0}' by its name: {1}",$,a1),"sap.ui.rta"));});}.bind(this)).catch(function(c1){b1.status=W;return Promise.reject(b.propagateError(c1,"RuntimeAuthoring#startService",b.printf("Error during service '{0}' initialisation.",$),"sap.ui.rta"));})};return b1.initPromise;}};X.prototype.stopService=function($){var a1=this._mServices[$];if(a1){if(a1.status===T){if(typeof a1.service.destroy==="function"){a1.service.destroy();}}delete this._mServices[$];}else{throw b.createError("RuntimeAuthoring#stopService",b.printf("Can't destroy service: unable to find service with name '{0}'",$),"sap.ui.rta");}};X.prototype.getService=function($){return this.startService($);};return X;});
