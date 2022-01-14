sap.ui.define([
    "sap/ui/demo/practice/controller/BaseController",
    "sap/ui/demo/practice/model/formatter"
], function (BaseController, formatter) {
    "use strict";
    return BaseController.extend("sap.ui.demo.practice.controller.Corona", {
        formatter: formatter,
        // override the parent's onNavBack (inherited from BaseController)
        onNavBack : function () {
            this.getRouter().getTargets().display("home");
        }

    });
});