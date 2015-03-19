var stubListing = require('./stubListing');

exports = module.exports = stubMongooseAggregate = {

    unwind: function(){ return this; },
    project: function(){ return this; },
    limit: function(){ return this; },
    exec: function(callback){ callback && callback(null, "TO OVERRIDE SPY ON THIS CALLBACK---SEE BELOW"); }
};


/*
 TO jasmine spyOn exec callback do something like this:

 spyOn(stubMongooseAggregate,'exec').and.callFake(function(callback){
 callback && callback(null, stubListing.SampleList1);
 });
 */
