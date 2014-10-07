
/*
        Application Startup and Display: called from index.html

*/

require(['/scripts/main.js'], function () {

   

    require(['infoStore', 'infoConfig', 'infoData'], function (iStore, iConfig, iData) {


        // display hierarchy list 
        $.when(iData.list())
            .then(function (data) {
                iStore.list($('#infodisplay'), data);
            });
    });
})

