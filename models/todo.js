import mongoose from 'mongoose';

const todoSchema = mongoose.Schema({
  name: {
    type: String,
    require: [true, 'List must have a word'],
    maxlength: [40, 'List must not too long length']
  },
  listName: {
    type: String,
    require: [true, 'List must have a word'],
    maxlength: [40, 'List must not too long length']
  }
});

module.exports = mongoose.models.Todo || mongoose.model('Todo', todoSchema);
