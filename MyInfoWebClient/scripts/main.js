

requirejs.config({
  
    paths: {
        /* Load jquery from google cdn. On fail, load local file. */
        // 'jquery': ['//ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min', '/scripts/jquery-1.9.1'],
        'jquery': ['/scripts/jquery-1.9.1'],
        /* Load bootstrap from cdn. On fail, load local file. */
        //'bootstrap': ['//netdna.bootstrapcdn.com/bootstrap/3.1.0/js/bootstrap.min', '/bootstrap/css/bootstrap-min'],
        'bootstrap': ['/bootstrap/css/bootstrap-min'],

        'sinon': ['/scripts/sinon-1.9.1'],
        'jsrender': ['/scripts/jsrender'],

        'infoForm': ['/scripts/info/infoForm']       ,
        'infoStore': ['/scripts/info/infoStore']        ,
        'infoConfig': ['/scripts/info/infoConfig']      ,
        'infoData': ['/scripts/info/infoData'],
        'infoMockData': ['/scripts/info/infoMockData']
    },
    shim: {
        /* Set bootstrap dependencies (just jQuery) */
        'bootstrap': ['jquery'],
        'jsrender':  ['jquery']
    }
});

