var debug = require('debug')('model');

function isFunction(functionToCheck) {
    var getType = {};
    return functionToCheck && getType.toString.call(functionToCheck) === '[object Function]';
}

function Model(schema) {

    debug("creating model for list: " + schema.list.key);

    this.schema = schema;

    this.doc = null;

    this.setDoc = function (doc) {
        debug(schema.list.key + ": setting doc["+doc.name+"] in model");
        this.doc = doc;
    };


    this.$where = function (js) {
        return this;
    };

    this.$where = function (js) {
        return this;
    };

    this.all = function (path, val) {
        return this;
    };

    this.and = function (array) {
        return this;
    };

    this.batchSize = function (val) {
        return this;
    };

    this.box = function (val, upper) {
        return this;
    };

    this.cast = function (model, obj) {
        return this;
    };

    this.circle = function (path, area) {
        return this;
    };

    this.comment = function (val) {
        return this;
    };

    this.count = function(){
        return this;
    };

    this.distinct = function (field, criteria, callback) {
        if (isFunction(callback)) {
            callback && callback(null, "TO OVERRIDE SPY ON THIS CALLBACK---SEE BELOW");
        } else {
            return this;
        }
    };

    this.elemMatch = function (path, criteria) {
        return this;
    };

    this.equals = function (val) {
        return this;
    };

    this.virtual = function (name, options) {
        return this;
    };

    this.exists = function (path, val) {
        return this;
    };

    this.find = function (criteria) {
        if (isFunction(criteria)) {
            criteria && criteria(null, "TO OVERRIDE SPY ON THIS CALLBACK---SEE BELOW");
        } else {
            return this;
        }
    };

    this.findById = function (id, callback) {
        if (callback && isFunction(callback)) {
            callback && callback(null, "TO OVERRIDE SPY ON THIS CALLBACK---SEE BELOW");
        } else {
            return this;
        }
    };

    this.findOne = function (criteria) {
        if (isFunction(criteria)) {
            criteria && criteria(null, "TO OVERRIDE SPY ON THIS CALLBACK---SEE BELOW");
        } else {
            return this;
        }
    };

    this.findOneAndUpdate = function (query, doc, options, callback) {
        if (isFunction(criteria)) {
            callback && callback(null, "TO OVERRIDE SPY ON THIS CALLBACK---SEE BELOW");
        } else {
            return this;
        }
    };

    this.findOneAndRemove = function (conditions, options, callback) {
        if (isFunction(criteria)) {
            callback && callback(null, "TO OVERRIDE SPY ON THIS CALLBACK---SEE BELOW");
        } else {
            return this;
        }
    };

    this.geometry = function (object) {
        return this;
    };

    this.gt = function (path, val) {
        return this;
    };

    this.gte = function (path, val) {
        return this;
    };

    this.hint = function (val) {
        return this;
    };

    this.in = function (path, val) {
        return this;
    };

    this.intersects = function (arg) {
        return this;
    };

    this.lean = function (bool) {
        return this;
    };

    this.limit = function (val) {
        return this;
    };

    this.lt = function (path, val) {
        return this;
    };

    this.lte = function (path, val) {
        return this;
    };

    this.maxDistance = function (path, val) {
        return this;
    };

    this.maxScan = function (val) {
        return this;
    };

    this.merge = function (source) {
        return this;
    };

    this.mod = function (path, val) {
        return this;
    };

    this.ne = function (path, val) {
        return this;
    };

    this.near = function (path, val) {
        return this;
    };

    this.nin = function (path, val) {
        return this;
    };

    this.nor = function (array) {
        return this;
    };

    this.or = function (array) {
        return this;
    };

    this.polygon = function (path, coordinatePairs) {
        return this;
    };

    this.polygon = function (path, coordinatePairs) {
        return this;
    };

    this.populate = function (path, select, model, match, options) {
        return this;
    };

    this.read = function(pref, tags){
        return this;
    };

    this.regex = function(path, val){
        return this;
    };

    this.remove = function(criteria, callback){
        if (isFunction(callback)) {
            callback && callback(null, "TO OVERRIDE SPY ON THIS CALLBACK---SEE BELOW");
        } else {
            return this;
        }
    };

    this.select = function () {
        return this;
    };

    this.selected = function () {
        return this;
    };

    this.selectedExclusively = function () {
        return this;
    };

    this.selectedInclusively = function () {
        return this;
    };

    this.setOptions = function (options) {
        return this;
    };

    this.size = function (path, val) {
        return this;
    };

    this.slice = function (path, val) {
        return this;
    };

    this.snapshot = function () {
        return this;
    };

    this.stream = function (options) {
        return this;
    };

    this.tailable = function (bool) {
        return this;
    };

    this.tailable = function (bool) {
        return this;
    };

    this.update = function (criteria, doc, options, callback) {
        if (isFunction(callback)) {
            callback && callback(null, "TO OVERRIDE SPY ON THIS CALLBACK---SEE BELOW");
        } else {
            return this;
        }
    };

    this.where = function (path, val) {
        return this;
    };

    this.within = function () {
        return this;
    };

    this.aggregate = function (ops) {
        return this;
    };

    this.allowDiskUse = function(value, tags){
        return this;
    };

    this.append = function(ops){
        return this;
    };

    this.cursor = function(options){
        return this;
    };

    this.group = function(arg){
        return this;
    };

    this.match = function(arg){
        return this;
    };

    this.near = function(params){
        return this;
    };

    this.project = function(){
        return this;
    };

    this.unwind = function(){
        return this;
    };

    this.skip = function(num){
        return this;
    };

    this.sort = function (arg) {
        return this;
    };

    this.exec = function (callback) {
        callback && callback(null, "TO OVERRIDE SPY ON THIS CALLBACK---SEE BELOW");
    }
}

// init middleware
//Model.prototype.init = function (opts, cb) {
Model.prototype.init = function (cb) {

    self = this;

    debug(self.schema.list.key+": initing document: " + self.doc.name);

    var preHook = null;
    var postHook = null;

    // run any action pre/post-init hooks
    for (hook in self.schema.hooks) {
        if ( self.schema.hooks[hook].action === 'init' && self.schema.hooks[hook].type === 'pre' ) {
            preHook = self.schema.hooks[hook].pre;
        }

        if ( self.schema.hooks[hook].action === 'init' && self.schema.hooks[hook].type === 'post' ) {
            postHook = self.schema.hooks[hook].post;
        }
    }

    if (preHook) {
        debug("calling init pre-hook on " + self.schema.list.key);
        preHook.apply(self.doc, function(err){
            if ( err ) {
                error("pre-init hook failed");
            }
            cb && cb(err);
            if (postHook) {
                debug("calling init post-hook on " + self.schema.list.key);
                postHook(self.doc);
            }
        });
    }

    if (!preHook && !postHook) {
        debug("no init hooks configured in "+self.schema.list.key);
    }
};


// validate middleware
//Model.prototype.validate = function (opts, cb) {
Model.prototype.validate = function (cb) {

    self = this;

    debug(self.schema.list.key+": validating document: " + self.doc.name);

    var preHook = null;
    var postHook = null;

    // run any action pre/post-validate hooks
    for (hook in self.schema.hooks) {
        if ( self.schema.hooks[hook].action === 'validate' && self.schema.hooks[hook].type === 'pre' ) {
            preHook = self.schema.hooks[hook].pre;
        }

        if ( self.schema.hooks[hook].action === 'validate' && self.schema.hooks[hook].type === 'post' ) {
            postHook = self.schema.hooks[hook].post;
        }
    }

    if (preHook) {
        debug("calling validate pre-hook on " + self.schema.list.key);
        preHook.apply(self.doc, function(err){
            if ( err ) {
                error("pre-validate hook failed");
            }
            cb && cb(err);
            if (postHook) {
                debug("calling validate post-hook on " + self.schema.list.key);
                postHook(self.doc);
            }
        });
    }

    if (!preHook && !postHook) {
        debug("no validate hooks configured in "+self.schema.list.key);
    }
};

// save middleware
//Model.prototype.save = function (opts, cb) {
Model.prototype.save = function (cb) {

    self = this;

    debug(self.schema.list.key+": saving document: " + self.doc.name);

    var preHook = null;
    var postHook = null;

    // run any action pre/post-save hooks
    for (hook in self.schema.hooks) {
        if ( self.schema.hooks[hook].action === 'save' && self.schema.hooks[hook].type === 'pre' ) {
            preHook = self.schema.hooks[hook].pre;
        }

        if ( self.schema.hooks[hook].action === 'save' && self.schema.hooks[hook].type === 'post' ) {
            postHook = self.schema.hooks[hook].post;
        }
    }

    if (preHook) {
        debug("calling save pre-hook on " + self.schema.list.key);
        preHook.call(self.doc, function(err){
            if ( err ) {
                error("pre-save hook failed");
            }
            cb && cb(err);
            if (postHook) {
                debug("calling save post-hook on " + self.schema.list.key);
                postHook(self.doc);
            }
        });
    }

    if (!preHook && !postHook) {
        debug("no save hooks configured in "+self.schema.list.key);
    }
};

// remove middleware
//Model.prototype.remove = function (opts, cb) {
Model.prototype.remove = function (cb) {

    self = this;

    debug(self.schema.list.key+": removing document: " + self.doc.name);

    var preHook = null;
    var postHook = null;

    // run any action pre/post-remove hooks
    for (hook in self.schema.hooks) {
        if ( self.schema.hooks[hook].action === 'remove' && self.schema.hooks[hook].type === 'pre' ) {
            preHook = self.schema.hooks[hook].pre;
        }

        if ( self.schema.hooks[hook].action === 'remove' && self.schema.hooks[hook].type === 'post' ) {
            postHook = self.schema.hooks[hook].post;
        }
    }

    if (preHook) {
        debug("calling remove pre-hook on " + self.schema.list.key);
        preHook.apply(self.doc, function(err){
            if ( err ) {
                error("pre-remove hook failed");
            }
            cb && cb(err);
            if (postHook) {
                debug("calling remove post-hook on " + self.schema.list.key);
                postHook(self.doc);
            }
        });
    }

    if (!preHook && !postHook) {
        debug("no remove hooks configured in "+self.schema.list.key);
    }
};

module.exports = Model;
