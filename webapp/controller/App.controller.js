sap.ui.define(['sap/ui/core/mvc/Controller', 'sap/m/MessageToast', 'sap/ui/core/Fragment'], function (Controller, MessageToast, Fragment) {
  'use strict';
  return Controller.extend('sap.ui.demo.practice.controller.App', {
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
