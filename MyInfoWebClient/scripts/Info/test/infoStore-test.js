

define(['infoForm'], function (iForm) {

    describe("Information Form", function () {
        it("should contains form fields", function () {

            var $formMarkup = $(iForm.display());

           expect($formMarkup.find('input').length).to.be(3);
        });
    });
    
   

});