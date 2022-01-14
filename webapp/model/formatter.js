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
        // https://stackoverflow.com/questions/5731193/how-to-format-numbers
        number: function (numberValue){
            return (numberValue).toLocaleString(
                undefined, // leave undefined to use the visitor's browser
                // locale or a string like 'en-US' to override it.
                { minimumFractionDigits: 0 }
            );
        }
    };
});