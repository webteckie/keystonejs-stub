# keystonejs-stub
Keystonejs-stub is a stubbing system for keystonejs to be used with unit testing frameworks like Jasmine.  Using this
stubbing system you can test any module that requires keystone.  Although Jasmine is used to demonstrate how the
stubbing system works it should be testing-framework agnostic.  The setup of the testing framework itself is outside
the scope of this project.

## Usage
Install it:

        npm install keystonejs-stub --save-dev

Require it in your test spec:

        stubKeystone = require('keystonejs-stub'),

Use it--the following example uses proxyquire:

        SampleModule = proxyquire('./SampleModule', {
            'keystone': stubKeystone
        });

For more usage examples please checkout the samples in the __tests__ folder.  You may need to "npm install" in the
keystonejs-stub directory to install dev dependencies.  You can execute the sample tests by running "npm test".


## Notes
1. If you are testing List Models you need to export the list model:

        var keystone = require('keystone');

        var SampleListModel = new keystone.List('SampleListModel', {});

        SampleListModel.add({name: { type: String } });

        SampleListModel.register();

        module.exports = SampleListModel;

2. When testing modules that use a particular mongoose API once you can spy on the exec method.

        //Jasmine:
        spyOn(SampleListModel.model,'exec').and.callFake(function(callback){
            callback && callback(null, stubListing.SampleListing);
        });

3. When testing modules that use a particular mongoose API more than once you need to spy  on the entire API chain.

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
