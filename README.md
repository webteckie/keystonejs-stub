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

For more usage examples please checkout the samples in the "__tests__" folder.  You may need to run "npm install" in the
keystonejs-stub directory to install dev dependencies.  You can execute the sample tests by running "npm test" under
the keystonejs-stub directory.


## Notes
 
- The intent of this stub system is not for doing integration or end-to-end testing, which can be accomplished in a slightly
different manner.  The stub system is specifically for unit testing.  That assumes that you have adhered as much as possible to the
[Single Responsibility Principle](https://en.wikipedia.org/wiki/Single_responsibility_principle) when designing/implementing
your application modules. The stub system heavily relies on mocking stubbed methods that return results, which affect subsequent
logic in the module.



- If you are testing List Models you need to export the list model:

        var keystone = require('keystone');

        var SampleListModel = new keystone.List('SampleListModel', {});

        SampleListModel.add({name: { type: String } });

        SampleListModel.register();

        module.exports = SampleListModel;


- When testing modules that use a particular mongoose API once you can spy on the exec method.

        //Jasmine:
        spyOn(SampleListModel.model,'exec').and.callFake(function(callback){
            callback && callback(null, stubListing.SampleListing);
        });


- When testing modules that use a particular mongoose API more than once you need to spy  on the entire API chain.

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


- To test list hooks you must call:

        stubKeystone.runHooks(doc);


- To test list virtuals you must first set a document item in the list:
 
        SampleListModel.setDoc(doc);



Feel free to send improvements!


# License

MIT. Copyright (c) 2015 Carlos Colon (webteckie)
