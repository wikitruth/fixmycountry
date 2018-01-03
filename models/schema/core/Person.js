'use strict';

exports = module.exports = function(app, mongoose) {
  var schema = new mongoose.Schema({
    firstName: { type: String, default: '' },
    lastName: { type: String, default: '' },
    title: { type: String, default: '' },
    content: { type: String, default: '' },
    references: { type: String, default: '' },
    createDate: { type: Date, default: Date.now },
    createUserId: { type: mongoose.Schema.ObjectId, ref: 'User' },
    editDate: { type: Date, default: Date.now },
    editUserId: { type: mongoose.Schema.ObjectId, ref: 'User' },
    occupationType: { type: Number, default: -1 }
  });
  schema.methods.getFullName = function() {
    return this.firstName + ' ' + this.lastName;
  };
  schema.plugin(require('../plugins/pagedFind'));
  schema.index({ firstName: 1 });
  schema.index({ lastName: 1 });
  schema.set('autoIndex', (app.get('env') === 'development'));
  app.db.model('Person', schema);
};