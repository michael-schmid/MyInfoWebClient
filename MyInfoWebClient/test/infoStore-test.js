
// once loaded this file set the base url to the path
// where all other modules are located
require.config({
    baseUrl: "/scripts"
});

define(['infoForm', 'infoStore'], function (iForm) {

    describe("Information Form", function () {
        it("should contains form fields", function () {

            var $formMarkup = $(iForm.display());

           expect($formMarkup.find('input').length).to.be(3);
        });
    });
    
   

});