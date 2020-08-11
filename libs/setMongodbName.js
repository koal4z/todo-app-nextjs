module.exports = process.env.MONGODB_URI.replace(
  '<password>',
  process.env.MONGODB_PASSWORD
).replace('<dbname>', process.env.MONGODB_DB);
