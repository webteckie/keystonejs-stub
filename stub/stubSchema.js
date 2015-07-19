var debug = require('debug')('schema');

// will use its prototype to dynamically capture any method defined in the list model
function Method() {
}

// will use its prototype to dynamically capture any instance static methods defined in the list model
function Static() {
}

function Schema (list) {

   debug("creating schema for list: " + list.key);

    this.list = list;

    this.methods = Method.prototype;

    this.statics = Static.prototype;

    this.virtuals = {};

    this.hooks = {};
}

Schema.prototype.virtual = function(prop, options) {

    self = this;

    // Virtuals rely on a document being set on the list object to operate on
    return  {
        get: function(fn) {

            var listProp = Object.defineProperty(self.list, prop, {
                get: function() {
                    self.virtuals[prop] = fn;
                    return fn.call(self.list.doc);
                },
                set: function(val) {
                    var fn = self.virtuals[prop];
                    fn.call(self.list.doc, val);
                }
            });
        }
    };
};

Schema.prototype.pre = function(action, fn) {

    if (action && fn) {
       debug("configuring pre"+action+ " hook in schema for list: " + this.list.key);
        var hook = {
            action: action,
            type: 'pre',
            pre: fn
        };

        this.hooks['pre'+action] = hook;
    }
};

Schema.prototype.post = function(action, fn) {

    if (action && fn) {
       debug("configuring post"+action+ " hook in schema for list: " + this.list.key);
        var hook = {
            action: action,
            type: 'post',
            post: fn
        };

        this.hooks['post'+action] = hook;
    }
};

Schema.prototype.plugin = function (fn, opts) {
    fn(this, opts);
    return this;
};

Schema.prototype.method = function (name, fn) {
   debug("defining class method: "+name);
    if ('string' != typeof name)
        for (var i in name)
            this.methods[i] = name[i];
    else
        this.methods[name] = fn;
    return this;
};

Schema.prototype.static = function(name, fn) {
    debug("defining instance static method: "+name);
    if ('string' != typeof name)
        for (var i in name)
            this.statics[i] = name[i];
    else
        this.statics[name] = fn;
    return this;
};

module.exports = Schema;