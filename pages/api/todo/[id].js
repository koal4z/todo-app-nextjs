import dbConnect from '../../../libs/connectDB';
import Todo from '../../../models/list';

dbConnect();

export default async (req, res) => {
  const {
    query: { id },
    method
  } = req;

  console.log(req.query.id);
  console.log(req.method);

  res.status(200).json({
    status: 'success'
  });
};
