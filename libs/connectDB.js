import mongoose from 'mongoose';
import uri from './setMongodbName';

const connection = {};

async function dbConnect() {
  try {
    if (connection.isConnected) {
      console.log('DB already connect!');
      return;
    }

    const db = await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: true
    });

    connection.isConnected = db.connections[0].readyState;
    console.log('DB connect successfuly');
  } catch (err) {
    console.log(err);
  }
}

export default dbConnect;
