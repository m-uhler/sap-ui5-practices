// sap.ui.define(["sap/m/HBox",
//     "sap/ui/model/json/JSONModel",
//     "sap/ui/core/IconPool",
//     "sap/ui/core/ListItem",
//     "sap/ui/model/Sorter"], function (HBox, JSONModel, IconPool, ListItem, Sorter) {
//     return {
//         createContent: function () {
//             // button text is bound to Model, "press" action is bound to Controller's event handler
//             return [
//                 HBox.extend("sap.ui.demo.practice.controller.fragments.IconPicker", {
//                 })
//             ]
//         }
//     }
// });

// fragment is located in a file named: my/own/Fragment.fragment.js,
sap.ui.define([
    "sap/m/Button",
    "sap/m/HBox",
    "sap/m/VBox",
    "sap/m/Switch",
    "sap/m/Label",
    "sap/m/Input",
    "sap/ui/model/json/JSONModel",
    "sap/ui/core/IconPool",
    "sap/ui/core/ListItem",
    "sap/ui/model/Sorter",
], function (Button, VBox, HBox, Switch, Label, Input) {
    return {
        createContent: function () {
            // button text is bound to Model, "press" action is bound to Controller's event handler
            return [
                new VBox("customLinkVBox", {
                    width: "100%",
                    items: [
                        new HBox("hboxLinkFields", {
                            width: '100%',
                            items: [
                                new VBox("vboxSwitch", {
                                    alignItems: 'Center',
                                    items: [
                                        new Label("customLinkSwitchLabel", {
                                            text: "Link hinzufügen"
                                        }),
                                        new Switch("customLinkSwitch", {
                                            state: false,
                                            customTextOn: " ",
                                            customTextOff: " ",
                                            width: "auto",
                                            change: function () {
                                                const activeState = this.getState();
                                                const inputFields = sap.ui.getCore().byId("hboxInputFields");
                                                // input fields
                                                inputFields.setVisible(activeState);
                                            }
                                        })
                                    ]
                                }),
                                new HBox("hboxInputFields", {
                                    visible: false,
                                    width: '100%',
                                    items: [
                                        new Input("customLinkText", {
                                            placeholder: "{i18n>customLinkTextPlaceholder}",
                                        }),
                                        new sap.m.Input("customLinkUrl", {
                                            placeholder: "{i18n>customLinkUrlPlaceholder}",
                                            valueStateText: "{i18n>linkURLErrorStateText}",
                                            type: sap.m.InputType.Url
                                        })
                                    ]
                                })
                            ]
                        })
                    ]
                })

            ]
        }
    }
});

// {
//   init: function () {
//     this.setWidth("100%");
//     //this.setFitContainer(true);
//     this.setRenderType("Bare");
//     //this.setWrap("Wrap");
//
//     //load sapui5 icons
//     this._oIconModel = new JSONModel({
//       //selectedIcon: "",
//       //selectedCategoryId: "",
//       allIcons: []
//       //items: []
//     });
//     this._oIconModel.setSizeLimit(999); //default value is 100!!
//     this.loadAllIconsIntoJson();  //initializes this._oIconModel
//     this.setModel(this._oIconModel, "IconPickerModel");
//
//
//     var oSelectIcon = new sap.m.Select({
//       items: {
//         path: "IconPickerModel>/allIcons",
//         template: new ListItem({
//           key: 'sap-icon://{IconPickerModel>iconName}',
//           text: '{IconPickerModel>iconName}',
//           icon: "sap-icon://{IconPickerModel>iconName}"
//         }),
//         sorter: new Sorter("iconName")
//       },
//       width: "100%",
//       // selectedKey: Utils.getBindingOfSaveModelValue(),
//       forceSelection: false
//     });
//
//     oSelectIcon.attachChange(this.selectionChange, this);
//     this.addItem(oSelectIcon);
//   },
//
//   renderer: {},
//
//   loadAllIconsIntoJson: function () {
//     var tempArray = [];
//     for (var i = 0; i < IconPool.getIconNames().length; i++) {
//       tempArray.push({
//         iconName: IconPool.getIconNames()[i]
//       });
//     }
//     this._oIconModel.setProperty("/allIcons", tempArray);
//   },
//
//   selectionChange: function (oEvent) {
//     //var sSelectedKey = oEvent.getSource().getSelectedKey();
//     //this.getModel("IconPickerModel").setProperty("/selectedIcon", sSelectedKey);
//   },
//
//   /*workaround for console error "Assertion failed: oDelegate must be not null or undefined"
//   coming after setting rendertype "Bare" to Flexbox to force correct interpertation of
//   width="100%" for contained sap.m.Selection control ...
//   */
//   _onItemInserted: function (oItem) {
//     if (oItem && !(oItem instanceof HBox)) {
//       oItem.attachEvent("_change", this._onItemChange, this);
//     }
//   }
// }