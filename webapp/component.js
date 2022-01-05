sap.ui.define(['sap/ui/core/UIComponent', 'sap/ui/model/json/JSONModel', 'sap/ui/model/resource/ResourceModel'], function (UIComponent, JSONModel, ResourceModel) {
  'use strict';
  return UIComponent.extend('sap.ui.demo.walkthrough.Component', {
    metadata: {
      interfaces: ['sap.ui.core.IAsyncContentCreation'],
      rootView: {
        viewName: 'sap.ui.demo.walkthrough.view.App',
        type: 'XML',
        /*"async": true, // implicitly set via the sap.ui.core.IAsyncContentCreation interface*/
        id: 'app',
      },
    },
    init: function () {
      // call the init function of the parent
      UIComponent.prototype.init.apply(this, arguments);
      // set data model
      const oData = {
        recipient: {
          name: 'World',
        },
      };
      const oModel = new JSONModel(oData);
      this.setModel(oModel);

      const aColors = {
        election: [
          {
            name: 'SPD',
            info: 'Sozialdemokratische Partei Deutschland',
            color: '#f00',
            value: 26,
            oldValue: 24,
          },
          {
            name: 'GRÜNE',
            info: 'Bündnis 90 die Grünen',
            color: '#0f0',
            value: 14,
            oldValue: 8,
          },
          {
            name: 'FDP',
            info: 'Freie Demokratische Partei',
            color: '#ff0',
            value: 8,
            oldValue: 6,
          },
          {
            name: 'CDU',
            info: 'Christlich Demokratische Union',
            color: '#000',
            value: 22,
            oldValue: 30,
          },
          {
            name: 'CSU',
            info: 'Christlich Soziale Union',
            color: '#222',
            value: 6,
            oldValue: 7,
          },
          {
            name: 'AFD',
            info: 'Alternative für Deutschland',
            color: '#00f',
            value: 10,
            oldValue: 11,
          },
          {
            name: 'LINKE',
            info: 'Die Linke',
            color: '#f0f',
            value: 5,
            oldValue: 9,
          },
        ],
      };
      const oColorModel = new JSONModel(aColors);
      this.setModel(oColorModel, 'data');

      // load corona data synchronously
      const aCoronaRaw = new JSONModel(),
        aCoronaProcessed = [];
      aCoronaRaw.loadData('https://api.covidtracking.com/v1/us/daily.json', false);

      $.each(aCoronaRaw, function (value, index, array) {});

      this.setModel(aCoronaRaw, 'corona');
      this.setModel(aCoronaProcessed, 'coronaProcessed');

      // set i18n model
      const i18nModel = new ResourceModel({
        bundleName: 'sap.ui.demo.walkthrough.i18n.i18n',
      });
      this.setModel(i18nModel, 'i18n');
    },
  });
});
