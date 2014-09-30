
(function () {
    // var serviceURL = "http://infoapi.domemory.net/api/info";    // 
    var serviceURL = "http://localhost:49993/api/info";
    var $domInfoColection = $('#infodisplay');                  // element which visualizes the information collection

    $.support.cors = true

    /* Compile markup as named templates */
    $.templates({
        titleTemplate: "<tr><td colspan=3>{{>name}}</td></tr>",
        detailTemplate: "<tr><td>{{>name}}</td><td>Released: {{>releaseYear}}</td><td>director: {{>director}}</td></tr>",
        taskTemplate: "<tr><td>{{>Id}}</td><td>{{>Name}}</td><td>{{>Description}}</td><td>{{>Status}}</td></tr>",
        infoTable: "<tr><td>{{:Topic}}</td><td>{{:Tags}}<td>{{:Text}}</td></td><td>{{:iDate}}</td></tr>",
        infoTemplate: "<li  id='{{:ID}}'>{{:Text}}</li>",

        infoDL: "<dt>{{:Topic}} - {{:Tags}}</dt><dd id='info{{:ID}}'>{{:Text}}</dd>",
        infoTemplate: "<li  id='{{:ID}}'>{{:Text}}</li>"

    });


    // save event
    $('#saveInfo').on('click', function (e) {
        e.preventDefault();

        // save new information
        save($('#inpText').val(), $('#inpTopic').val(), $('#inpTags').val(), $('#inpParentID').val());
    });


    // output the information object to the dom
    var displayInfo = function (infoArray, $domelement) {

        var type = 'definitionList';

        switch (type) {

            case "definitionList":
                var infoItems = $.render.infoDL(infoArray.InfoList);
                var infoContainer = '<dt id="infolist">'
                                    + infoItems + '</dt>';
                break;

            default:
                var infoItems = $.render.infoTable(infoArray.InfoList);

                var infoContainer = '<table  class="table table-condensed"><tr><th>Topic</th><th>Caption<th>Text</th><th>iDate</th></tr><tbody id="inforecords">'
                                    + infoItems + '</tbody></table>';
                break;
        }


        // add to the dom
        $domInfoColection.html(infoContainer);

        // get the clicked id
        $('dd').on('click', function (e) {

            // alert($(this).attr('id'));

            $('#inpParentID').val($(this).attr('id').substring(4));

        });

        $('#mesage').addClass('alert alert-danger').text('Successful stored information');

        var newRecord = $.render.infoTable(infoArray);
        $('#inforecords').before(newRecord);

    };


    var displayMessage = function (text, boostrapAlertClass) {
        $('#mesage')
            .text('Successful stored information')
            .addClass()
    }

    // send the information to the server
    var save = function (text, topic, tags, parentID) {
        // create a new object0
        info = {};
        info.parentID = parentID
        info.Text = text;
        info.Topic = topic;
        info.Tags = tags;

        // send object to the server
        $.when($.ajax({ url: serviceURL, data: info, type: "post", datatype: "json" }))
               .then(function (response, textstatus, xhr) {
                   displayInfo([info]);
                   displayMessage('Successful stored information', 'alert alert-danger');
               })
            .fail(function () {
                displayMessage('Error happended whilst processing information', 'alert alert-danger')
            });
    }

    // get saved information from the database
    var getInfo = function () {
        // get info and visualize
        var serviceURL = "http://infoapi.domemory.net/api/info/0";

        // Success Return
        // Failed Service
        $.when($.ajax({ url: serviceURL, type: "GET", contentType: "application/json;charset=utf-8" }))
            .then(function (data, textstatus, xhr) {
                displayInfo(data);
            })
            .fail(function () {
                displayMessage('Error happended whilst processing information', 'alert alert-danger')
            });

    }

    getInfo();

})();