import dbConnect from '../../../libs/connectDB';
import Todo from '../../../models/todo';
import List from '../../../models/list';

dbConnect();

export default async (req, res) => {
  const { method } = req;

  switch (method) {
    case 'GET':
      try {
        const data = await Todo.find();
        res.status(200).json({
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
    case 'POST':
      try {
        const data = await Todo.create(req.body);
        const listData = await List.findOne({ name: req.body.listName });

        listData.todo.push(data._id);
        listData.save();

        res.status(201).json({
          status: 'success',
          data,
          listData
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
        message: 'something wrong in this api'
      });
  }
};
