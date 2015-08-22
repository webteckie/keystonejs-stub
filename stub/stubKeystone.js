var debug = require('debug')('keystone');
var List = require('./stubList');


module.exports = new Keystone();

function Keystone() {
  console.log("****NEW INSTANCE****");
  // Add any canned config (or test can do a stubKeystone.set('sample config', 'sample-value')
  this.config = {
    'sample entry': "test-stub"
  };

  // For doing stubKeystone.set('sample config', 'sample-value')
  // List Model Instances
  this.lists = {};

  // Fied Type stubbing
  this.Field = {
    Types: {}
  };
}

Keystone.prototype.init = function() {

};

Keystone.prototype.set = function(key, value) {
  if (key) {
    console.log("***ks:set "+key+" = " + value);
    this.config[key] = value;
  }
};

// For doing stubKeystone.get('sample config')
Keystone.prototype.get = function(key) {
  if (key in this.config) {
    console.log("***ks:get "+key+" = " + this.config[key]);
    return this.config[key];
  } else {
    return "";
  }
};

// List Model Getter
Keystone.prototype.list = function(arg) {

  //from \keystone\lib\core\list.js
  if (arg && arg.constructor === this.List) {
    this.lists[arg.key] = arg;
    this.paths[arg.path] = arg.key;
    return arg;
  }
  var ret = this.lists[arg] || this.lists[this.paths[arg]];
  if (!ret) throw new ReferenceError('Unknown keystone list ' + JSON.stringify(arg));
  return ret;
};

Keystone.prototype.List = List;
