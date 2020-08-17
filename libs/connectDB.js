import mongoose from 'mongoose';
import uri from './setMongodbName';

const connection = {};

async function dbConnect() {
  if (connection.isConnected) {
    return;
  }
  try {
    const db = await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false
    });

    connection.isConnected = db.connections[0].readyState;
  } catch (err) {
    console.log(err);
  }
}

export default dbConnect;
