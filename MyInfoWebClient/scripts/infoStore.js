


(function ()
{
    function info (text, topic, tags) {
        this.topic = topic;
        this.text = text;
        this.tags = tags;
    }

    var serviceURL = "http://infoapi.domemory.net/api/info";  // 
    // var serviceURL = "http://localhost:49993/api/info";
    
    $.support.cors = true

    /* Compile markup as named templates */
    $.templates({
        titleTemplate: "<tr><td colspan=3>{{>name}}</td></tr>",
        detailTemplate: "<tr><td>{{>name}}</td><td>Released: {{>releaseYear}}</td><td>director: {{>director}}</td></tr>",
        taskTemplate: "<tr><td>{{>Id}}</td><td>{{>Name}}</td><td>{{>Description}}</td><td>{{>Status}}</td></tr>",
        infoTable: "<tr><td>{{:Id}}</td><td>{{:Text}}</td><td>{{:Topic}}</td><td>{{:Tags}}</td><td>{{:iDate}}</td></tr>",
        infoTemplate: "<li  id='{{:ID}}'>{{:Text}}</li>"
    });


    // save event
    $('#saveInfo').on('click', function (e) {
        e.preventDefault();

        // save new information
        save($('#inpText').val(), $('#inpTopic').val(), $('#inpTags').val());
    });
    
    // send the information to the server
    var save = function (text, topic, tags) 
    {
        // create a new object
        info = {};
        info.parentid = null;
        info.text = text;
        info.topic = topic;
        info.tags = tags;

        // send object to the server
        $.when($.ajax({ url: serviceURL, data: info, type: "post", datatype: "json" }))
               .then(function (response, textstatus, xhr) {
                   // add task to the list
                   // $('#tasklist').append($.render.tasktemplate(task));
               })
                .fail(function(err)   {
                    console.log("error");
                });
    }

    // get saved information from the database
    var getInfo = function () {
        // get info and visualize

        var serviceURL = "http://infoapi.domemory.net/api/info/0";

        $.when($.ajax({ url: serviceURL, type: "GET", contentType: "application/json;charset=utf-8" }))
            .then(function (data, textstatus, xhr) {
            // console.log(response);
            $('#infodisplay').html('<table class="table table-condensed">' + $.render.infoTable(data.InfoList) + '</table>');
        });

    }

    getInfo();


})();