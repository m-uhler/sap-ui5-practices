sap.ui.define([
    "sap/ui/demo/practice/controller/BaseController",
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/UIComponent"
], function (BaseController) {
    "use strict";

    return BaseController.extend("sap.ui.demo.practice.controller.Home", {

        navigateToCorona:function(){
            this.getRouter().getTargets().display("corona");
        },

        navigateToOtherViews:function (){
            this.getRouter().getTargets().display("other");
        },

        onDisplayNotFound : function () {
            //display the "notFound" target without changing the hash
            this.getRouter().getTargets().display("notFound", {
                fromTarget : "home"
            });
        }

    });

});