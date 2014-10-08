/*
        Visualize Inforamtion Data

        Input       JSON Data
        Output      Templated HTML Markup

        Testing     
**/
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
    };

    // displays an object as list
    var displayObject = function ($element, infoDetail) {

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

    return {
        list: displayList,
        detail: displayObject
    }
});

