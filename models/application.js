'use strict';

const MONGO_DB = 'mongodb://localhost:27017/eta_weekend04';

// Retrieve the mongo client
var mongoClient = require('mongodb').MongoClient;

var Application = function(firstName, lastName, desiredJob, desiredLocation,
                           empHistory, skills) {
  this.firstName = firstName;
  this.lastName = lastName;
  this.desiredJob = desiredJob;
  this.desiredLocation = desiredLocation;
  this.empHistory = empHistory; //array
  this.skills = skills;

  //get all applications
  function getAll(callback) {
    // connect to mongo
    mongoClient.connect(MONGO_DB, function (err, db) {

      if (err) {
        return callback(err, null);
      }

      //use collection named applications
      var collection = db.collection('applications');

      //find applications in collection
      collection.find().toArray(function(err, results) {
        return callback(err, results);
      });
    });
  }

  // insert new application
  function insertApp(application, callback) {
    // connect to mongo
    mongoClient.connect(MONGO_DB, function(err, db) {
      if (err) {
        return callback(err, null);
      }

      //use collection named applications
      var collection = db.collection('applications');

      // insert one application into applications collection
      collection.insertOne(application, function(err, results) {
        return callback(err, results);
      });

    });
  }

};

// make available through require
module.exports = Application;
