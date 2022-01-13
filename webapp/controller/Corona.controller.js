sap.ui.define([
    "sap/ui/demo/practice/controller/BaseController"
], function (BaseController) {
    "use strict";
    return BaseController.extend("sap.ui.demo.practice.controller.Corona", {
        // override the parent's onNavBack (inherited from BaseController)
        onNavBack : function () {
            this.getRouter().getTargets().display("home");
        }

    });
});