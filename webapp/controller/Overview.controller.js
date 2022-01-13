sap.ui.define([
    "sap/ui/demo/practice/controller/BaseController"
], function (BaseController) {
    "use strict";
    return BaseController.extend("sap.ui.demo.practice.controller.Overview", {

        onNavBack : function () {
            this.getRouter().getTargets().display("home");
        }

    });
});