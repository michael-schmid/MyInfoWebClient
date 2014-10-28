/*
        Visualize Inforamtion Data

        Input       JSON Data
        Output      Templated HTML Markup

        Testing     
**/
define(['jquery', 'infoData', 'jsrender', 'amplify'], function ($, iData) {

    // display a list of information
    var displayList = function ($element, data) {

        // compile needed templates
        $.templates({
          
            itemTemplateDL: '<dt class="info" id={{:Id}}><span style="padding-left:{{:Level}}em">{{:Name}}</span></dt>\
                             <dd>\
                                <div style="padding-left:{{:Level}}em">\
                                    <div>{{:Key}}</div>\
                                    {{if (Url || "") !== ""}}<a target="_blank" href="{{:Url}}">{{:Value}}</a>{{else}}{{:Value}}{{/if}}\
                                </div>\
                            </dd>'
        });



        // render data to data items
        var infolistMarkup = '<div id="infoDisplay"><dl>' + $.render.itemTemplateDL(data) + ' </dl></div>';

        // change edit object
        $($element)
            .on('click', '.info', function () {
                
                amplify.publish("info.select", $(this).attr('Id'));
                
            });

        $element.append(infolistMarkup);
    };

    // displays an object as list
    var displayInfo = function ($element, infoDetail) {

        // create a wrapper object to access the infoDetail with .infoDetail notation
        var infoRoot = [{ info: infoDetail }];

        // compile needed templates
        $.templates({
            detailTemplateDL: '{{props info}}\
                                 <dl>\
                                     <dt>{{>key}}</dt>\
                                     <dd>{{>prop}}</dd>\
                                 </dt>\
                            {{/props}}'
        });

         
//<dt><span style="padding-left:{{:Level}}em">{{:Name}}</span></dt>\
//             <dd>\
//                <div style="padding-left:{{:Level}}em">\
//                    <div>{{:Key}}</div>\
//{{if (Url || "") !== ""}}<a target="_blank" href="{{:Url}}">{{:Value}}</a>{{else}}{{:Value}}{{/if}}\
//                                </div>\
//                            </dd>'

        // render data to data items
        var infolistMarkup = '<div><dl>' + $.render.detailTemplateDL(infoRoot) + ' </dl></div>';

        $element.append(infolistMarkup);
        
    };

    
    // create a new information
    var createInfo = function (Id, info) {
        $.when(iData.create(Id, info))
           .then(function (data) {
               // iStore.edit($('#infoEdit'), data);
           })
           .fail(function (xhr) {
               alert(xhr);
           });
    };

    // delete an existing information
    var deleteInfo = function (Id) {
        $.when(iData.delete(Id))
           .then(function (data) {
               // iStore.edit($('#infoEdit'), data);
           })
           .fail(function (xhr) {
               alert(xhr);
           });
    };
    
   
    // send the information to the server
    var saveInfo = function (Id, info) {

        $.when(iData.update(Id, info))
            .then(function (data) {
                // iStore.edit($('#infoEdit'), data);
            })
            .fail(function (xhr) {
                alert(xhr);
            });
    };

    // display edit and input mask
    var editInfo = function ($element, infoDetail, parentId) {

        // create a wrapper object to access the infoDetail with .infoDetail notation
        var infoRoot = [{ info: infoDetail }];

        // compile needed templates

        if (!infoDetail)
            var infoDetail = { ParentId: parentId, Key: "", Value:"", Url:"", Name: "Name" };

        // compile needed templates
        $.templates({
            editTemplate:   '<div>\
                                <form role="form" class="form-inline">\
                        <div class="form-group">\
                            <div id="InfoId">{{:Id}}</div>\
                            <label for="inpParentID">ParentID</label>\
                            <input type="text" value="{{:ParentId}}" class="form-control" id="inpParentID" placeholder="ParentID">\
                        </div>\
                        <div class="form-group">\
                            <label for="inpName">Name</label>\
                            <input type="text" value="{{:Name}}" class="form-control" id="inpName" placeholder="Name">\
                        </div>\
                        <div class="form-group">\
                            <label for="inpKey">Key</label>\
                            <input type="text" value="{{:Key}}" class="form-control" id="inpKey" placeholder="Key">\
                        </div>\
                    </form>\
                    <div class="form-group">\
                        <label for="inpValue">Value</label>\
                        <textarea    value="{{:Value}}" class="form-control" id="inpValue" placeholder="Value"></textarea>\
                    </div>\
                    <div class="form-group">\
                        <label for="inpUrl">Url</label>\
                        <textarea value="{{:Url}}"  class="form-control" id="inpUrl" placeholder="Url"></textarea>\
                    </div>\
                        <button id="saveInfo" class="btn btn-default">Save</button>\
                        <button id="deleteInfo" class="btn btn-default">Delete</button>\
                        <button id="newInfo" class="btn btn-default">New</button>\
                    </div>'
        });
    
        // add the form to the element
        var $editForm = $('<div><dl>' + $.render.editTemplate(infoDetail) + ' </dl></div>');
        $element.empty().append($editForm);


        // save event triggers save action
        $editForm.find('#saveInfo').on('click', function (e) {
            e.preventDefault();

            // create a new object0
            info = {};
            
            info.ParentID = $('#inpParentID').val()
            info.Name = $('#inpName').val();
            info.Key = $('#inpKey').val();
            info.Value = $('#inpValue').val();
            info.Url = $('#inpUrl').val();

            // save new information
            saveInfo( $('#InfoId').text(), info);
        });

        // delete an information
        $editForm.find('#deleteInfo').on('click', function (e) {
            e.preventDefault();

            var infoID = $('#InfoId').text();
            amplify.publish("info.delete", infoID);
        });

        //// create a new item
        //$editForm.find('#newInfo').on('click', function (e) {
        //    e.preventDefault();

        //    // create a new object0
        //    info = {};

        //    info.ParentID = $('#inpParentID').val()
        //    info.Name = $('#inpName').val();
        //    info.Key = $('#inpKey').val();
        //    info.Value = $('#inpValue').val();
        //    info.Url = $('#inpUrl').val();

        //    // save new information
        //    saveInfo($('#newInfo').text(), info);
        //});
    };
    
return {
    list: displayList   ,
    detail: displayInfo ,
    edit: editInfo      ,
    delete: deleteInfo
}
});


