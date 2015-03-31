# keystonejs-stub
Keystonejs-stub is a stubbing system for keystonejs to be used with unit testing frameworks like Jasmine.  Using this
stubbing system you can test any module that requires keystone.  Although Jasmine is used to demonstrate how the
stubbing system works it should be testing-framework agnostic.  The setup of the testing framework itself is outside
the scope of this project.

## Usage
Install it:

        npm install keystonejs-stub --save-dev

Require it in your test spec:

        keystoneStub = require('keystonejs-stub'),

Follow the samples in the __tests__ folder as a guide.


## Notes
1. A good base set of DB data listings is important.

        exports.SimpleListingObject = {
            "name": "Test Data"
        }

        exports.NestedObjectListing = {
            listing: {
                "name": "Test Data"
            }
        }

        exports.ArrayListing = [
            {
                "name": "Test Data"
            }
        ]

2. If you are testing List Models you need to export the list model.

        module.exports = SampleListModel;

3. Tests should make a copy of a data listing.  This allows each test to change its values to mimic usage scenarios:

        var doc = _.extend({}, stubListing.SampleListing);

4. When testing modules that use a particular mongoose API once you can spy on the exec method.

        //Jasmine:
        spyOn(SampleListModel.model,'exec').and.callFake(function(callback){
            callback && callback(null, stubListing.SampleListing);
        });

5. When testing modules that use a particular mongoose API more than once you need to spy  on the entire API chain.

        //Jasmine:
        spyOn(SampleListModel.model,'findOne').and.returnValue(
            {
                sort: function (value) {
                    return {
                        exec: function (callback) {
                            callback && callback(null, stubListing.SampleListing);
                        }
                    }
                }
            }
        );



Feel free to recommend improvements or better approaches!


# License

MIT. Copyright (c) 2015 Carlos Colon (webteckie)
