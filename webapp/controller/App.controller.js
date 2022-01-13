sap.ui.define([
    'sap/ui/demo/practice/controller/BaseController',
    'sap/m/MessageToast',
    'sap/ui/core/Fragment'
], function (BaseController, MessageToast) {
  'use strict';
  return BaseController.extend('sap.ui.demo.practice.controller.App', {
    onInit: function () {
    },
    onShowHello: function () {
      // read msg from i18n model
      const oBundle = this.getView().getModel('i18n').getResourceBundle();
      const sRecipient = this.getView().getModel().getProperty('/recipient/name');
      const sMsg = oBundle.getText('helloMsg', [sRecipient]);

      // show sap toast
      MessageToast.show(sMsg);
    },
    onOpenPartyDialog : function () {
      // create dialog lazily
      if (!this.pDialog) {
        this.pDialog = this.loadFragment({
          name: "sap.ui.demo.practice.view.PartyDialog"
        });
      }
      this.pDialog.then(function(oDialog) {
        oDialog.open();
      });
    }
  });
});
