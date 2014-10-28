
/*
        Application Startup and Display: called from index.html

*/

require(['/scripts/main.js'], function () {

    require(['infoStore', 'infoConfig', 'infoData', 'amplify'], function (iStore, iConfig, iData) {


        // display hierarchy list 
        $.when(iData.list())
            .then(function (data) {
                iStore.list($('#infodisplay'), data);
            });

        // display information (not editable)
        //$.when(iData.data(1))
        //    .then(function (data) {
        //        iStore.detail($('#infoDetail'), data);
        //    });

        // (edit information)
        
        // listen to select event from the istore display#@°
        amplify.subscribe("info.select", function (infoId) {
            $.when(iData.data(infoId))
            .then(function (data) {
                iStore.edit($('#infoEdit'), data);
            });
        });


        amplify.subscribe("info.delete", function (infoId) {

            $.when(iStore.delete(infoId))
                .then(function () {
                    $('#infodisplay').find('#' + infoId).remove();
                });
        });


    });
})

