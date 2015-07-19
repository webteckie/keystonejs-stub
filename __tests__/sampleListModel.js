var debug = require('debug')('listmodel');
var keystone = require('keystone');

var SampleListModel = new keystone.List('SampleListModel', {
});

SampleListModel.add({
    name: { type: String }
});

SampleListModel.schema.methods.changeName = function(name) {
    this.name = name;
    return this;
};

SampleListModel.schema.statics.prefixName = function(prefix) {
    this.name = prefix+this.name;
    return this;
};

SampleListModel.schema.pre('save', function(next) {
    debug("SampleListModel: running pre-save");
    this.name = 'pre-save';
});

SampleListModel.schema.post('save', function(doc) {
    debug("SampleListModel: running post-save");
    doc.name = doc.name + ' post-save';
});

// Provide access to Keystone
SampleListModel.schema.virtual('reverse').get(function() {
    return this.name.split('').reverse().join('');
});

SampleListModel.defaultColumns = 'name';

SampleListModel.register();


// NEED TO DO THIS!!!
module.exports = SampleListModel;
