var proxyquire =  require('proxyquire').noCallThru(),
    stubKeystone = require('../index'),
    sampleListings = require('./sampleListings');


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

        // Setup any spies. If you need to mock the same function multiple times then you need to be more explicit and
        // mock the entire chain:
        spyOn(SampleListModel.model,'findOne').and.returnValue(
            {
                sort: function (value) {
                    return {
                        exec: function (callback) {
                            callback && callback(null, sampleListings.SampleListing);
                        }
                    }
                }
            }
        );

    });


    it("should have a name", function(){

        SampleModule.test();

        expect(stubKeystone.get('test')).toBe("worked!");
    })

});
