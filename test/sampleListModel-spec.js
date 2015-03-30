var _ = require('underscore'),
    proxyquire =  require('proxyquire').noCallThru(),
    stubKeystone = require('../stub/stubKeystone'),
    stubListing = require('../stub/stubListing');


describe("SampleListModel", function(){

    var SampleListModel = null;

    beforeEach(function(){

        SampleListModel = proxyquire('../model/SampleListModel', {
            'keystone': stubKeystone
        });
        stubKeystone.lists['SampleListModel'] = SampleListModel;

        // If you only need to mock a function once then you can simply do:
        spyOn(SampleListModel.model,'exec').and.callFake(function(callback){
            callback && callback(null, stubListing.AnotherSampleListModel.listing1);
        });


        // Or, if you need to mock the same function multiple times then you need to be more explicit and
        // mock the entire chain:
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

        // Should make a copy of the test data for each test
        var doc = _.extend({}, stubListing.AnotherSampleListModel.listing1);

        stubKeystone.runHooks(doc);

        expect(doc.name).toBe("Listing One");
    })

});
