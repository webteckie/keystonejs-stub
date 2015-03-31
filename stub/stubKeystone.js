var _ = require('underscore'),
    stubMongoose = require("./stubMongoose");

exports = module.exports = stubKeystone = {

    // Add any canned config (or test can do a stubKeystone.set('sample config', 'sample-value')
    config: {
        'sample entry': "test-stub"
    },

    // Any hooks defined for the list schema
    schema_hooks: [],

    // For doing stubKeystone.set('sample config', 'sample-value')
    set: function(key, value) {
        if ( key ) {
            stubKeystone.config[key] = value;
        }
    },

    // For doing stubKeystone.get('sample config')
    get: function(key) {

        if ( key in stubKeystone.config ) {
            return stubKeystone.config[key];
        } else {
            return "";
        }
    },

    // The List Constructor
    List: function(key, options){

        this.register = function(fields){};

        this.add = function() {};

        this.relationship = function() {};

        // the encapsulated mongoose schema
        this.schema = {
            methods: {},

            pre: function(action, pre){
                var hook = {
                    type: 'pre',
                    pre: pre
                }
                stubKeystone.schema_hooks.push(hook);
            },
            post: function(action, post){
                var hook = {
                    type: 'post',
                    post: post
                }
                stubKeystone.schema_hooks.push(hook);
            }
        };

        this.model = new stubMongoose();
    },

    // List Model Instances
    lists: {},

    // List Model Getter
    list: function (arg) {

        //from \keystone\lib\core\list.js
        if (arg && arg.constructor === this.List) {
            this.lists[arg.key] = arg;
            this.paths[arg.path] = arg.key;
            console.log("returning arg")
            return arg;
        }
        var ret = this.lists[arg] || this.lists[this.paths[arg]];
        if (!ret) throw new ReferenceError('Unknown keystone list ' + JSON.stringify(arg));
        return ret;
    },

    // Fied Type stubbing
    Field: {
        Types: {}
    },

    // Runs configured schema hooks
    runHooks: function (doc){
        _.each(stubKeystone.schema_hooks, function(hook) {
            if ( hook.type === 'pre') {
                hook.pre.apply(doc);
            } else if (hook.type == 'post') {
                hook.post(doc);
            } else {
                console.log('*** INVALID HOOK: ' + hook.type);
            }
        });
    }
}
