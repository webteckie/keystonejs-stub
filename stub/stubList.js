var debug = require('debug')('list');
var stubModel = require("./stubModel");
var stubSchema = require("./stubSchema");

// The List Class
function List(key, options) {

    debug("creating list: "+key);

    self = this;

    this.key = key;

    this.schema = new stubSchema(this);

    this.model = new stubModel(this.schema);

    this.doc = null;
}

List.prototype.register = function(fields) {};

List.prototype.add = function(fields) {};

List.prototype.relationship = function() {};

// this method is used to activate the document in the list
List.prototype.setDoc = function(doc) {
    debug("attaching doc["+doc.name+"] to list: "+ this.key);

    this.model.setDoc(doc);

    doc['init'] = this.model.init.bind(this.model);
    doc['validate'] = this.model.validate.bind(this.model);
    doc['save'] = this.model.save.bind(this.model);
    doc['remove'] = this.model.remove.bind(this.model);

    this.applyMethods(doc);
    this.applyStatics(doc);

    this.doc = doc;
};

List.prototype.applyMethods = function(doc) {
    debug("applying methods");
    for (var method in this.schema.methods) {
        if (typeof this.schema.methods[method] === 'function') {
            // FIXME: assign to doc prototype (not doc), instead
            doc[method] = this.schema.methods[method];
            debug("assigned method to document: " + method);
        } else {
            (function(_method) {
                // FIXME: assign to doc prototype (not doc), instead
                Object.defineProperty(doc, _method, {
                    get: function() {
                        var h = {};
                        for (var k in this.schema.methods[_method]) {
                            h[k] = this.schema.methods[_method][k].bind(this);
                        }
                        return h;
                    },
                    configurable: true
                });
                debug("defined method property in document: " + _method);
            })(method);
        }
    }
};

List.prototype.applyStatics = function(doc) {
    debug("applying statics");
    for (var static in this.schema.statics) {
        doc[static] = this.schema.statics[static];
        debug("assigned instance static method to document: " + static);
    }
};


module.exports = List;