import mongoose from 'mongoose';
import uri from './setMongodbName';

const connection = {};

async function dbConnect() {
  if (connection.isConnected) {
    console.log('DB already connect!');
    return;
  }

  const db = await mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  });

  connection.isConnected = db.connections[0].readyState;
  console.log('DB connect successfuly');
}

export default dbConnect;
