var _ = require('underscore');
var proxyquire =  require('proxyquire').noCallThru();
var stubKeystone = require('../index');
var sampleDocument = require('./sampleDocument');


describe("SampleListModel", function(){

    var SampleListModel = null;

    beforeEach(function(){

        // Setup the List Models in keystone
        SampleListModel = proxyquire('./SampleListModel', {
            'keystone': stubKeystone
        });

        stubKeystone.lists['SampleListModel'] = SampleListModel;

        // If you only need to mock a function once then you can simply do something like:
        //spyOn(SampleListModel.model,'exec').and.callFake(function(callback){
        //    callback && callback(null, new sampleDocument());
        //});
    });


    it("should run all pre/post-save hooks on a doc is saved", function(){

        // ARRANGE
        var doc = new sampleDocument();
        SampleListModel.setDoc(doc);

        // ACT
        doc.save();

        // ASSERT
        expect(doc.name).toBe("pre-save post-save");
    });


    it("should call a virtual that reverses the document name", function(){

        // ARRANGE
        var doc = new sampleDocument();
        SampleListModel.setDoc(doc);

        // ACT
        var reversedName = SampleListModel.reverse;

        // ASSERT
        expect(SampleListModel.reverse).toBe(doc.name.split('').reverse().join(''));
    });


    it("should call a schema method that changes the document name", function(){

        // ARRANGE
        var doc = new sampleDocument();
        SampleListModel.setDoc(doc);

        // ACT
        doc.changeName('foo bar');

        // ASSERT
        expect(doc.name).toBe('foo bar');
    });


    it("should call a schema static method that prefixes the document name", function(){

        // ARRANGE
        var doc = new sampleDocument();
        SampleListModel.setDoc(doc);

        // ACT
        doc.prefixName('***');

        // ASSERT
        expect(doc.name).toBe('***test');
    });
});
