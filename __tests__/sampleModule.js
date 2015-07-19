var keystone = require('keystone');

exports.test = function() {

    var SampleListModel = keystone.list('SampleListModel');

    SampleListModel.model.find().sort('name').exec( function (err, data) {
      // handle err/data
        keystone.set('test', 'worked!');
    });
};


