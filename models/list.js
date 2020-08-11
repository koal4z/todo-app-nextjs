import mongoose from 'mongoose';

const listSchema = mongoose.Schema({
  name: {
    type: String,
    require: [true, 'List must have a word'],
    unique: [true, "List can't have duplicated"],
    maxlength: [40, 'List must not too long length']
  }
});

module.exports = mongoose.models.List || mongoose.model('List', listSchema);
