// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import dbConnect from '../../libs/connectDB';
import List from '../../models/list';

dbConnect();

export default async (req, res) => {
  const { method } = req;

  switch (method) {
    case 'GET':
      try {
        const data = await List.find().select('-__v');
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
        const data = await List.create(req.body);
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
        const data = await List.findByIdAndUpdate(
          { _id: req.body._id },
          { name: req.body.name },
          { new: true, runValidators: true }
        );
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
    case 'DELETE':
      try {
        await List.findByIdAndDelete({ _id: req.body._id });
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
        message: 'something wrong in this api'
      });
  }
};
