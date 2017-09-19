const noteRoutes = require('./user');
module.exports = function(app, db) {
  noteRoutes(app, db);
};