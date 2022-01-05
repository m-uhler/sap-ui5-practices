sap.ui.define([
    "sap/ui/core/ComponentContainer"
], function (ComponentContainer) {
    "use strict";

    new ComponentContainer({
        name: "sap.ui.demo.practice",
        settings: {
            id: "walkthrouhg"
        },
        async: true
    }).placeAt("content");
});