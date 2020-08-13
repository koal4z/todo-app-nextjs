import dbConnect from '../../../libs/connectDB';
import Todo from '../../../models/todo';

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
    default:
      res.status(500).json({
        status: 'fail',
        message: 'Some thing is  wrong!'
      });
  }
};
