

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

                //it("Information Hierarchy", function (done) {

                //    var $list = $('<div></div>');
                //    iStore.list($list);

                //    setTimeout(function () {
                //        expect($list.find('dt').length).to.be(5);
                //        done();
                //    }, 1000)

                //});

                describe("Information list", function () {

                    it("should display definition list with equal dt as data records", function (done) {

                        var list = mData.list();
                        var $list = $('<div></div>');

                        iStore.list($list, list);

                        setTimeout(function () {
                            expect($list.find('dd').length).to.be(list.length);
                            done();
                        }, 1000)
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