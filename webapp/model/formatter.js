sap.ui.define([], function () {
    "use strict";
    return {
        date: function(dateString) {
           return new Date(dateString).toLocaleDateString()
        },
        death: function(dailyStat){
            if(dailyStat.death){
                const deathNumber = (dailyStat.death).toLocaleString()
                return deathNumber + ' (+'+ dailyStat.deathIncrease + ')';
            } else{
                return '-'
            }
        },
        number: function (numberValue){
            if(numberValue){
                return (numberValue).toLocaleString();
            } else{
                return 0;
            }

        }
    };
});