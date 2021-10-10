const express = require('express')
const mongoose = require('mongoose')

const secretRouter = require('./Routes/secret.routes');
const errorHandler = require('./Middlewares/errorHandler.middleware');

const app = express();

app.use(express.json());
app.use(secretRouter);
app.use(errorHandler);

module.exports = app

if (require.main === module) {
    const port = process.env.PORT || 3001
    app.listen(port, () => {
      console.log(`API server listening on port ${port}`)
    })
}

// Init MongoDB
mongoose.connect('mongodb://mongodb:27017/secret-db');
mongoose.Promise = global.Promise;
const db = mongoose.connection;

// MongoDB status
db.on('connecting', function () {
  console.log('connecting to MongoDB...')
});

db.on('error', function (error) {
  console.error('error in MongoDB connection: ' + error)
  mongoose.disconnect()
});

db.on('connected', function () {
  console.log('connected to MongoDB.')
});

db.once('open', function () {
  console.log('MongoDB connection is open.')
});

db.on('reconnected', function () {
  console.log('MongoDB reconnected.')
});

db.on('disconnected', function () {
  console.log('MongoDB disconnected.')
});
