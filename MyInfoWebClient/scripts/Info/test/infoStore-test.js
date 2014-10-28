/**     -------------------------------------------------------------------------------------------

        Information Storage Test Runner

        /test/index.html

        -------------------------------------------------------------------------------------------         **/

    describe("Display", function () {
        define(['jquery', 'infoForm', 'infoStore', 'infoData', 'infoConfig', 'infoMockData', 'sinon', 'jsrender'],
            function ($, iForm, iStore, iData, iConfig, mData) {

            describe("Information Form", function () {
                it("should contains form fields", function () {

                    var $formMarkup = $(iForm.display());
                    expect($formMarkup.find('input').length).to.be(3);
                });
            });

            describe("Set Configuration", function () {
                describe("ServiceURL", function () {

                    var server, infoServiceHost;
                    before(function () { server = sinon.fakeServer.create(); });
                    after(function () { server.restore(); });

                    it("should store and return the set value", function () {

                        // expect all service calls to be issued:
                        infoServiceHost = "example.info.storage";

                        // set configuration
                        iConfig.serviceURL = infoServiceHost;

                        expect(iConfig.serviceURL).to.be(infoServiceHost);
                    });

                    it("should route data request to the given server", function () {
                        // get information list
                        iData.list();

                        // test the issued url against it expectation
                        expect(server.requests[0].url).to.be(infoServiceHost + "/info");
                    });
                });
            });

            describe("Information Data Request", function () {

                var server;
                beforeEach(function () { server = sinon.fakeServer.create(); });
                afterEach(function () { server.restore(); });

                iConfig.serviceURL = "testInfoHost";

                it("for a list should issue a request to /info", function () {

                    // get information list
                    iData.list();

                    // test the issued url against it expectation
                    expect(server.requests[0].url).to.be(iConfig.serviceURL + "/info");
                });

                it("to get information detail", function () {

                    // get detail information
                    var id = 1;
                    iData.data(id);

                    // test the issued url against it expectation
                    expect(server.requests[0].url).to.be(iConfig.serviceURL + "/info/" + id);
                    expect(server.requests[0].method).to.be("GET");
                });

                it("to create information", function () {

                    // create new information
                    var id = 1;
                    iData.create(id);

                    // test the issued url against it expectation
                    expect(server.requests[0].url).to.be(iConfig.serviceURL + "/info/" + id);
                    expect(server.requests[0].method).to.be("POST");

                });

                it("to update information", function () {

                    // update exsting information
                    var id = 1;
                    iData.update(id);

                    // test the issued url against it expectation
                    expect(server.requests[0].url).to.be(iConfig.serviceURL + "/info/" + id);
                    expect(server.requests[0].method).to.be("PUT");

                });

                it("to delete information", function () {

                    // get information list
                    var id = 1;
                    iData.delete(id);
                       
                    // test the issued url against it expectation
                    expect(server.requests[0].url).to.be(iConfig.serviceURL + "/info/" + id);
                    expect(server.requests[0].method).to.be("DELETE");
                });
            });


            describe("Display", function () {

                describe("Information list", function () {

                    it("should display definition list with equal dt as data records", function (done) {

                        var list = mData.list();
                        var $list = $('<div></div>');

                        iStore.list($list, list);

                        expect($list.find('dd').length).to.be(list.length);
                        done();
                    });
                });

                describe("Information Edit", function () {

                    it("should render a form with the given object properties to edit", function (done) {

                        var infoDetail = {
                            "Id": 10, "parentId": null, "Level": 1, "Name": null, "Key": "testInfoNamem", "Value": "testInfoValue",
                            "Url": null, "iDate": "2014-10-05 15:39:36", "cDate": "0001-01-01T00:00:00"
                        };
                        
                        var $info = $('<div></div>');
                        iStore.edit($info, infoDetail);

                        // Editable Fields: Name, Key, Value, Url
                        expect($info.find('inpKey').val()).to.be(infoDetail.Key);
                        expect($info.find('inpName').val()).to.be(infoDetail.Name);
                        expect($info.find('inpUrl').val()).to.be(infoDetail.Url);
                        expect($info.find('inpValue').val()).to.be(infoDetail.Valuey);
                        done();
                    });

                    it("should render a form to create new information when object is omited", function (done) {

                        var $info = $('<div></div>');
                        iStore.edit($info, null, 5);

                        // Editable Fields: Name, Key, Value, Url
                        expect($info.find('#inpKey').val()).to.be(5);
                        expect($info.find('#inpKey').val()).to.be(infoDetail.Key);
                        expect($info.find('#inpName').val()).to.be(infoDetail.Name);
                        expect($info.find('#inpUrl').val()).to.be(infoDetail.Url);
                        expect($info.find('#inpValue').val()).to.be(infoDetail.Valuey);
                        done();
                    });
                });

                describe("Information Detail", function () {

                    it("should render a info object as definition list", function (done) {

                        var infoDetail = {
                            "Id": 10, "parentId": null, "Level": 1, "Name": null, "Key": "testInfoNamem", "Value": "testInfoValue",
                            "Url": null, "iDate": "2014-10-05 15:39:36", "cDate": "0001-01-01T00:00:00"
                        };
                        var $info = $('<div></div>');
                        iStore.detail($info, infoDetail);

                        expect($info.find('dt').length).to.be(Object.keys(infoDetail).length);
                        done();
                    });
                });

                //describe("Detail", function () {

                //    it("should display as data items", function (done) {

                //        var list = mData.list();
                //        var $list = $('<div></div>');

                //        iStore.list($list, list[0]);

                //        // ceck: for each data field one dd
                //        setTimeout(function () {
                //            expect($list.find('dt').length).to.be(list.length);
                //            done();
                //        }, 1000)

                //    });
                //});
                //it("Information Detail", function (done) {
                //});
            });
        });
});