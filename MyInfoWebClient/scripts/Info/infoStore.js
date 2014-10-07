

define(['jquery', 'jsrender'], function ($) {

    // display a list of information
    var displayList = function ($element, data) {

        // compile needed templates
        $.templates({
          
            itemTemplateDL: '<dt><span style="padding-left:{{:Level}}em">{{:Name}}</span></dt>\
                             <dd>\
                                <div style="padding-left:{{:Level}}em">\
                                    <div>{{:Key}}</div>\
                                    {{if (Url || "") !== ""}}<a target="_blank" href="{{:Url}}">{{:Value}}</a>{{else}}{{:Value}}{{/if}}\
                                </div>\
                            </dd>'
           
        });


        // render data to data items
        var infolistMarkup = '<div><dl>' + $.render.itemTemplateDL(data) + ' </dl></div>';

        $element.append(infolistMarkup);


        //// get data
        //$.when(iData.list())
        //  .then(function (data, textstatus, xhr) {

        //      var infoItems = $.render.infoDL(data);
        //      var infoContainer = '<dt id="infolist">'
        //                          + infoItems + '</dt>';

        //      $element.append(infoContainer);
        //  })
        //  .fail(function () { });
    };
    return {
        list: displayList
    }
});

