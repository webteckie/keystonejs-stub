var keystone = require('keystone');

var SampleListModel = new keystone.List('SampleListModel', {
});

SampleListModel.add({
    name: { type: String }
});


SampleListModel.schema.pre('save', function(next) {
    this.name = this.name + ' pre';
});

SampleListModel.schema.post('save', function(doc) {
    doc.name = doc.name + ' post';
});


SampleListModel.defaultColumns = 'name';

SampleListModel.register();


// NEED TO DO THIS!!!
module.exports = SampleListModel;
