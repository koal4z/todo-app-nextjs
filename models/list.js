import mongoose from 'mongoose';
import Todo from './todo';

const listSchema = mongoose.Schema(
  {
    name: {
      type: String,
      require: [true, 'List must have a word'],
      unique: [true, "List can't have duplicated"],
      maxlength: [40, 'List must not too long length']
    },
    todo: [
      {
        type: mongoose.Schema.ObjectId,
        ref: 'Todo'
      }
    ]
  },
  {
    toJSON: { virtuals: true }
  }
);

// listSchema.virtual('inList', {
//   ref: 'Todo',
//   localField: '_id',
//   foreignField: 'listName'
// });

// listSchema.pre(/^find/, function (next) {
//   this.populate({
//     path: 'guides',
//     select: '-__v -passwordChangedAt'
//   });

//   next();
// });

listSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'todo',
    select: '-__v -listName',
    model: Todo
  });

  next();
});
module.exports = mongoose.models.List || mongoose.model('List', listSchema);
