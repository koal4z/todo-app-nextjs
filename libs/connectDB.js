import mongoose from 'mongoose';
import uri from './setMongodbName';

const connection = {};

async function dbConnect() {
  try {
    if (connection.isConnected) {
      return;
    }

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
