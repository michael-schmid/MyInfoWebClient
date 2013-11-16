//require.config(
//{
//    paths:
//    {
//        "jquery": "jquery-1.9.1.min"
//    }

//});



requirejs.config({
  
    paths: {
        /* Load jquery from google cdn. On fail, load local file. */
        'jquery': ['//ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min', 'jquery-1.9.1.min'],
        /* Load bootstrap from cdn. On fail, load local file. */
        'bootstrap': ['//netdna.bootstrapcdn.com/twitter-bootstrap/2.3.0/js/bootstrap.min', '/bootstrap/css/bootstrap-min']
    },
    shim: {
        /* Set bootstrap dependencies (just jQuery) */
        'bootstrap': ['jquery']
    }
});

require([
    'jquery', 'bootstrap',
],
function ($)
{
    console.log("Loaded :)");
    return {};
});


// code requiring the jquery lib

require(["exJRequireJS"], function ()
{
    
});

// <script src="Scripts/exJRequireJS.js"></script>