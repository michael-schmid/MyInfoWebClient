

/*  ------------------------------------------------------------------------------------------------------------------

    Test Module :   Test all Data API for information management

    URL             http://localhost:49760/test/testDataService.html

    -------------------------------------------------------------------------------------------------------------------*/

   
  

// test web service methods for getting and setting data 
define(['infoForm', 'infoStore', 'infoConfig'], function (iForm, iStore, iConfig) {

    var serviceURL = iConfig.serviceURL;

    // create a new object for root
    var info = {};
    info.Id = null;
    info.Key = "testInfoName";
    info.Value = "testInfoValue";
    info.Url = "testInfoUrl";


    // var to create the child on the root
    var createdRootId;

    describe("Create information", function () {
        describe("root node", function () {
            it("should return if of created root information", function (done) {

                var action = serviceURL + "/info";

                // information object = root without parent id
                // /info      Post data: parentId=&Key=KeyValue&Value=valuevalue&Url=urlValue
                var info = { parentId: null, Key: 'testInfoNamem', Value: 'testInfoValue', url: 'testInfoUrl' };

                // send test information object to the server
                $.when($.ajax({ url: action, data: info, type: "post", datatype: "json" }))
                       .then(function (response, textstatus, xhr) {
                           expect(response).to.be.a('number');
                           expect(response).to.be.above(0);
                           createdRootId = response;
                           done();
                       })
                    .fail(function () {
                        // not so good, error happened
                    });
            });
        });

        describe("child node", function () {
            it("should return if of created child information", function (done) {

                var action = serviceURL + "/info";

                // information object = root without parent id
                // /info      Post data: parentId=ExistentId&Key=KeyValue&Value=valuevalue&Url=urlValue
                var info = { parentId: createdRootId, Name: 'testInfoName', Key: 'testInfoKey', Value: 'testInfoValue', url: 'testInfoUrl' };

                // send test information object to the server
                $.when($.ajax({ url: action, data: info, type: "POST", datatype: "json" }))
                       .then(function (response, textstatus, xhr) {
                           expect(response).to.be.a('number');
                           expect(response).to.be.above(0);
                           done();
                       })
                    .fail(function () {
                        // not so good, error happened
                    });
            });
        });

      
    });
    
    describe("Get information", function () {
        describe("root list without id", function () {
            it("should return and array of information objects with properties: Id, Value, Key, Url, Level", function (done) {

                // /info
                var action = serviceURL + "/info";
           
                $.when($.ajax({ url: action, type: "GET", contentType: "application/json;charset=utf-8" }))
                    .then(function (data, textstatus, xhr) {
                        expect(data[0]).to.have.keys('Value', 'Key', 'Id', 'Url', 'Level');
                        done();
                    })
                    .fail(function () { });
            });
        });

        describe("detail", function () {
                    
            it("should return requested information object properties: Id, Value, Key, Url, Level", function (done) {

                var action = serviceURL + "/info/" +createdRootId;

                // Success Return
                $.when($.ajax({ url: action, type: "GET", contentType: "application/json;charset=utf-8" }))
                    .then(function (data, textstatus, xhr) {
                        expect(data).to.have.keys('Value', 'Key', 'Id', 'Url', 'Level');
                        done();
                    })
                    .fail(function () { });
            });
        });
    });
    
    

    describe("Update information", function () {
        it("should return 204 success", function (done) {

            var action = serviceURL + "/info/" + createdRootId;
           
            var info = { Name: 'testInfoNameUpdated', Key: 'testInfoKeyUpdated', Value: 'testInfoValueUpdated', url: 'testInfoUrlUpdated' };

            // send test information object to the server
            $.when($.ajax({
                url: action,
                data: info, type: "PUT", datatype: "json"
            }))
            .then(function (response, textstatus, xhr) {

                done();
            })
            .fail(function () { });
        });
    });


    describe("Delete information", function () {
        it("should return HTTP Status 204 nocontent", function (done) {

            var action = serviceURL + "/info/" + createdRootId;

            $.when($.ajax({ url: action, type: "DELETE", contentType: "application/json;charset=utf-8" }))
                .then(function (data, textstatus, xhr) {
                    done();
                })
                .fail(function () { });
        });
    });
});