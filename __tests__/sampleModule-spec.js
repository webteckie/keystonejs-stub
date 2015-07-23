var proxyquire =  require('proxyquire').noCallThru();
var stubKeystone = require('../index');
var sampleDocument = require('./sampleDocument');


describe("SampleModule", function(){

    var SampleModule = null;

    beforeEach(function(){

        // require the module to test
        SampleModule = proxyquire('./SampleModule', {
            'keystone': stubKeystone
        });

        // Setup any List Models used by the module under test in keystone
        stubKeystone.lists['SampleListModel'] = proxyquire('./SampleListModel', {
            'keystone': stubKeystone
        });
    });


    it("should have a name", function(){

        // ARRANGE
        spyOn(stubKeystone.lists['SampleListModel'].model,'find').and.returnValue({
            sort: function (value) {
                return {
                    exec: function (callback) {
                        callback && callback(null, new sampleDocument());
                    }
                }
            }
        });

        // ACT
        SampleModule.test();
        var result = stubKeystone.get('test');

        // ASSERT
        expect(stubKeystone.lists['SampleListModel'].model.find).toHaveBeenCalled();
        expect(result).toBe("worked!");
    })
});
