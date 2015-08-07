var debug = require('debug')('modelspec');
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
    });


    it("should run pre-save hook when a doc is saved", function(){

        // ARRANGE
        var doc = new sampleDocument();
        SampleListModel.setDoc(doc);

        // ACT
        doc.save(function(err){
            // ASSERT
            expect(doc.name).toBe("pre-save");
        });
    });


    it("should run all pre/post-save hooks when a doc is saved", function(){

        // ARRANGE
        var doc = new sampleDocument();
        SampleListModel.setDoc(doc);

        // ACT
        doc.save(function(err){
            // ASSERT
            // NOTE:  Mongoose will run the post after it invokes our callback!!!
            setTimeout(function(){
                expect(doc.name).toBe("pre-save post-save");
            },1);
        });
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
