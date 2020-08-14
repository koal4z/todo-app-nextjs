import dbConnect from '../../../libs/connectDB';
import Todo from '../../../models/todo';
import List from '../../../models/list';

dbConnect();

export default async (req, res) => {
  const {
    query: { listName },
    method
  } = req;

  switch (method) {
    case 'GET':
      try {
        const todos = await Todo.find({ listName: listName }).select('-__v');
        res.status(200).json({
          status: 'success',
          data: todos
        });
      } catch (err) {
        res.status(500).json({
          status: 'fail',
          message: err.message
        });
      }
      break;
    case 'POST':
      try {
        const data = await Todo.create(req.body);
        const listData = await List.findOne({ name: req.body.listName });

        listData.todo.push(data._id);
        listData.save();
        res.status(201).json({
          status: 'success',
          data
        });
      } catch (err) {
        res.status(500).json({
          status: 'fail',
          message: err.message
        });
      }
      break;
    case 'PUT':
      try {
        Promise.all(
          req.body.map(
            async (obj) => await Todo.findByIdAndUpdate({ _id: obj._id }, { name: obj.name })
          )
        );

        res.status(204).json({
          status: 'success'
        });
      } catch (err) {
        res.status(500).json({
          status: 'fail',
          message: err.message
        });
      }
      break;
    case 'DELETE':
      try {
        if (req.body.type === 'deleteAll') {
          await Todo.deleteMany({ listName: req.body.listName });
          return res.status(204).json({
            status: 'success',
            message: 'Deleting in this todo success!'
          });
        }
        await Todo.findByIdAndDelete({ _id: req.body.id });
        res.status(204).json({
          status: 'success'
        });
      } catch (err) {
        res.status(500).json({
          status: 'fail',
          message: err.message
        });
      }
      break;
    default:
      res.status(500).json({
        status: 'fail',
        message: 'Some thing is  wrong!'
      });
  }
};
