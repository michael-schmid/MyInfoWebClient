﻿

// Returns data on request
define(['jquery', 'infoConfig'], function ($, iConfig) {

    var infoList = function () {

        var action = iConfig.serviceURL + "/info";

        return $.ajax({ url: action, type: "GET", contentType: "application/json;charset=utf-8" });
              
    };

    var data = function (id) {

        var action = iConfig.serviceURL + "/info/" + id;
        return $.ajax({ url: action, type: "GET", contentType: "application/json;charset=utf-8" });

    };
    var del = function (id) {

        var action = iConfig.serviceURL + "/info/" + id;
        return $.ajax({ url: action, type: "DELETE", contentType: "application/json;charset=utf-8" });

    };
    var update = function (parentId, info) {

        // just return the ajax promise
        // call: $.when(iData.update(Id, info)).then(function (data) {});
        var action = iConfig.serviceURL + "/info/" + parentId;
        return $.ajax({ url: action, type: "PUT", datatype: "json" , data : info });
    };
    var create = function (id, info) {

        var action = iConfig.serviceURL + "/info/" + id;
        return $.ajax({ url: action, type: "POST", 
            contentType: "application/json;charset=utf-8" });

    };
    return {
        list: infoList  ,
        delete: del     ,
        update: update  ,
        create: create  ,
        data: data

    }
});

