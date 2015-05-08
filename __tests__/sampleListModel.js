var keystone = require('keystone');

var SampleListModel = new keystone.List('SampleListModel', {
});

SampleListModel.add({
    name: { type: String }
});


SampleListModel.schema.pre('save', function(next) {

    this.name = 'pre-save';
});

SampleListModel.schema.post('save', function(doc) {
    doc.name = doc.name + ' post-save';
});


// Provide access to Keystone
SampleListModel.schema.virtual('canAccessKeystone').get(function() {
  return this.isAdmin;
});

SampleListModel.defaultColumns = 'name';

SampleListModel.register();


// NEED TO DO THIS!!!
module.exports = SampleListModel;
