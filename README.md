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


- Regarding mocking and assuming you have the following chained mongoose call:

        SomeList.model.findOne({'slug': 'xxx'}).sort('-yyy').populate('zzz').exec(function (err, item) {
            ...
        });

    
    Then you can mock that chain in various ways:
    
    - You can assume keystonejs-stub's default mocking for .sort() and .populate() and just mock the .exec() as follows:
    
            spyOn(SomeList.model,'exec').and.callFake(function(callback){
                callback && callback(null, <result listing data>);
            });

    - You can mock either .sort() or .populate() along with .exec() as follows:

            spyOn(stubKeystone.lists['SampleListModel'].model,'find').and.returnValue({
                sort: function (value) {
                    <do-whatever-sort>
                    return {
                        exec: function (callback) {
                            <do-whatever-before-callback>
                            callback && callback(null, <result listing data>);
                        }
                    }
                }
            });

    - The previous mock can also be done as independent mocks as follows:

            spyOn(stubKeystone.lists['SampleListModel'].model,'sort').and.callFake(function(arg){
                <do-whatever-sort>
                return this;
            });

            spyOn(stubKeystone.lists['SampleListModel'].model,'exec').and.callFake(function(callback){
                <do-whatever-before-callback>
                callback && callback(null, <result listing data>);
            });

    - You can mock all .sort(), .populate(), and .exec() as follows:

            spyOn(stubKeystone.lists['SampleListModel'].model,'find').and.returnValue({
                sort: function (value) {
                    <do-whatever-sort>
                    return {
                        populate: function (callback) {
                            <do-whatever-populate>
                            return {
                                exec: function (callback) {
                                    <do-whatever-before-callback>
                                    callback && callback(null, <result listing data>);
                                }
                            }
                        }
                    }
                }
            });

    - or you can break the above as independent mocks as previously described


- When mocking models you can just assign them directly to the lists object in the keystone stub:
 
        stubKeystone.lists['SampleListModel'] = proxyquire('./SampleListModel', {
            'keystone': stubKeystone
        });
    
    NOTE:  However, if the model is the SUT then you don't need to assign it to lists!
    

- To test list virtuals, methods, and statics you must first set a document item in the list:
 
        SampleListModel.setDoc(doc);


If you need to enable logging on keystonejs-stub then set (windows) or export (linux) any of the following debug tags:

    keystone
    list
    model
    schema


For example:

    export DEBUG=keystone,list,schema,model && npm test
    
     

This is work-in-progress and based on current needs.  Feel free to send improvements!


# License

MIT. Copyright (c) 2015 Carlos Colon (webteckie)
