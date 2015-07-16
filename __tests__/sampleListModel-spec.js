var _ = require('underscore');
var proxyquire =  require('proxyquire').noCallThru();
var stubKeystone = require('../index');
var sampleListings = require('./sampleListings');


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
    });


    it("should run all hooks on a doc", function(){

        // Should make a copy of the test data for each test
        var doc = _.extend({}, sampleListings.AnotherSampleListing.listing1);

        stubKeystone.runHooks(doc);

        expect(doc.name).toBe("pre-save post-save");
    });


    it("should test mongoose schema methods", function(){

        // Should make a copy of the test data for each test
        var doc = _.extend({}, sampleListings.AnotherSampleListing.listing1);

        stubKeystone.runHooks(doc);

        expect(doc.name).toBe("pre-save post-save");
    });


    it("should call a virtual that reverses the name", function(){

        // Should make a copy of the test data for each test
        var doc = _.extend({}, sampleListings.AnotherSampleListing.listing1);

        // Virtuals rely on a document to operate on
        SampleListModel.setDoc(doc);

        stubKeystone.runHooks(doc);

        expect(SampleListModel.reverse).toBe(doc.name.split('').reverse().join(''));
    });


});
