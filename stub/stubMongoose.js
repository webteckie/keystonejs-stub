/*
    Add more mongoose methods as needed.
*/


function isFunction(functionToCheck) {
    var getType = {};
    return functionToCheck && getType.toString.call(functionToCheck) === '[object Function]';
}

exports = module.exports = function mongooseStub() {

    this.find = function (criteria) {
        if (isFunction(criteria)) {
            callback && callback(null, "TO OVERRIDE SPY ON THIS CALLBACK---SEE BELOW");
        } else {
            return this;
        }
    }

    this.findById = function (id, callback) {
        if (callback && isFunction(callback)) {
            callback && callback(null, "TO OVERRIDE SPY ON THIS CALLBACK---SEE BELOW");
        } else {
            return this;
        }
    }

    this.findOne = function (criteria) {
        if (isFunction(criteria)) {
            callback && callback(null, "TO OVERRIDE SPY ON THIS CALLBACK---SEE BELOW");
        } else {
            return this;
        }
    }

    this.findOneAndUpdate = function (query, doc, options, callback) {
        if (isFunction(criteria)) {
            callback && callback(null, "TO OVERRIDE SPY ON THIS CALLBACK---SEE BELOW");
        } else {
            return this;
        }
    }

    this.findOneAndRemove = function (conditions, options, callback) {
        if (isFunction(criteria)) {
            callback && callback(null, "TO OVERRIDE SPY ON THIS CALLBACK---SEE BELOW");
        } else {
            return this;
        }
    }

    this.select = function () {
        return this;
    }

    this.sort = function (arg) {
        return this;
    }

    this.project = function () {
        return this;
    }

    this.limit = function () {
        return this;
    }

    this.populate = function (path, select, model, match, options) {
        return this;
    }

    this.aggregate = function (ops) {
        return this;
    }

    this.unwind = function(){
        return this;
    }

    this.project = function(){
        return this;
    }

    this.limit = function(){
        return this;
    }

    this.count = function(){
        return this;
    }

    this.exec = function (callback) {
        callback && callback(null, "TO OVERRIDE SPY ON THIS CALLBACK---SEE BELOW");
    }
};


/*
 JASMINE:  tO spyOn exec callback do something like this:

 spyOn(<list>.model,'exec').and.callFake(function(callback){
 callback && callback(null, <list-data>);
 });

 */
