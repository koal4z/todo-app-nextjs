require('dotenv').config();
const uri = require('./libs/setMongodbName');

module.exports = {
  env: {
    MONGO_URI: uri
  }
};
