
// AMD Module to dipslay a form to input info data

define(function () {

    var getInfoForm = function () {

        var form = '<div> <form role="form" class="form-inline">\
                   <div class="form-group">\
                       <label class="sr-only" for="inpParentID">ParentID</label>\
                       <input type="text" class="form-control" id="inpParentID" placeholder="ParentID">\
                   </div>\
                   <div class="form-group">\
                       <label class="sr-only" for="inpTopic">Topic</label>\
                       <input type="text" class="form-control" id="inpTopic" placeholder="Topic">\
                   </div>\
                   <div class="form-group">\
                       <label class="sr-only" for="inpTags">Caption</label>\
                       <input type="text" class="form-control" id="inpTags" placeholder="Tag">\
                   </div>\
                   <button id="saveInfo" class="btn btn-default">Save</button>\
               </form>\
               <div class="form-group">\
                   <label class="sr-only" for="inpText">Text</label>\
                   <textarea class="form-control" id="inpText" placeholder="Text"></textarea>\
               </div></div>';

      
        return form;
    };
    return {

        display: getInfoForm
    };
});
