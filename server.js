const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const dbConfig = require('./config/db');

const app = express();
const port = 8000;
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.Promise = global.Promise;
const options = {
  promiseLibrary: global.Promise,
  useMongoClient: true,
};
mongoose.connect(dbConfig.url, options).then(() => {
  const admin = new mongoose.mongo.Admin(mongoose.connection.db);
  admin.buildInfo((err, info) => {
    if (err) {
      console.err(`Error getting MongoDB info: ${err}`);
    } else {
      console.log(`Connection to MongoDB (version ${info.version}) opened successfully!`);
      require('./app/routes')(app, mongoose.connection.db);
      app.listen(port, () => {
        console.log('We are live on ' + port);
      });
    }
  });
}, (err) => {
  console.error(`Error connecting to MongoDB: ${err}`)
});