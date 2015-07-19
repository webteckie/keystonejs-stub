var proxyquire =  require('proxyquire').noCallThru();
var stubKeystone = require('../index');
var sampleDocument = require('./sampleDocument');


describe("SampleModule", function(){

    var SampleListModel = null,
        SampleModule = null;

    beforeEach(function(){

        // require the module to test
        SampleModule = proxyquire('./SampleModule', {
            'keystone': stubKeystone
        });

        // Setup any List Models used by the module under test in keystone
        SampleListModel = proxyquire('./SampleListModel', {
            'keystone': stubKeystone
        });

        stubKeystone.lists['SampleListModel'] = SampleListModel;
    });


    it("should have a name", function(){

        // ARRANGE
        spyOn(SampleListModel.model,'findOne').and.returnValue(
            {
                sort: function (value) {
                    return {
                        exec: function (callback) {
                            callback && callback(null, new sampleDocument());
                        }
                    }
                }
            }
        );

        // ACT
        SampleModule.test();
        var result = stubKeystone.get('test');

        // ASSERT
        expect(result).toBe("worked!");
    })

});
