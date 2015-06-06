var _ = require('underscore'),
    proxyquire =  require('proxyquire').noCallThru(),
    stubKeystone = require('../index'),
    sampleListings = require('./sampleListings');


describe("SampleListModel", function(){

    var SampleListModel = null;

    beforeEach(function(){

        // Setup the List Models in keystone
        SampleListModel = proxyquire('./SampleListModel', {
            'keystone': stubKeystone
        });
        stubKeystone.lists['SampleListModel'] = SampleListModel;

        // If you only need to mock a function once then you can simply do:
        spyOn(SampleListModel.model,'exec').and.callFake(function(callback){
            callback && callback(null, sampleListings.AnotherSampleListing.listing1);
        });

        spyOn(SampleListModel.schema,'virtual').and.returnValue(doc.name.split('').reverse().join(''));

    });


    it("should run all hooks on a doc", function(){

        // Should make a copy of the test data for each test
        var doc = _.extend({}, sampleListings.AnotherSampleListing.listing1);

        stubKeystone.runHooks(doc);

        expect(doc.name).toBe("pre-save post-save");
    })


    it("should test mongoose schema methods", function(){

        // Should make a copy of the test data for each test
        var doc = _.extend({}, sampleListings.AnotherSampleListing.listing1);

        stubKeystone.runHooks(doc);

        expect(doc.name).toBe("pre-save post-save");
    })

});
