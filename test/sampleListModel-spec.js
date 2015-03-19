var proxyquire =  require('proxyquire').noCallThru(),
    stubKeystone = require('../stub/stubKeystone'),
    stubListing = require('../stub/stubListing');


describe("SampleListModel", function(){

    var SampleListModel = null;

    beforeEach(function(){

        SampleListModel = proxyquire('../model/SampleListModel', {
            'keystone': stubKeystone
        });
        stubKeystone.lists['SampleListModel'] = SampleListModel;


        spyOn(SampleListModel.model,'findOne').and.returnValue(
            {
                sort: function (value) {
                    return {
                        exec: function (callback) {
                            callback && callback(null, stubListing.SampleList1);
                        }
                    }
                }
            }
        );

    });


    it("should have a name", function(){

        SampleListModel.findOne(function(err, data){

            expect(data.name).toBe("test");
        });
    })

    it("should run all hooks on a doc", function(){

        var doc = {
            "name": "hook test"
        }

        stubKeystone.runHooks(doc);

        expect(doc.name).toBe("hook test pre post");
    })

});
