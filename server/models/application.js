'use strict';

const MONGO_DB = 'mongodb://localhost:27017/eta_weekend04';

// NOTE: Created text index on database (not in this model)

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
        this.dateApplied = new Date();

        this.getApp = function() {
                return {'firstName': this.firstName,
                                                'lastName': this.lastName,
                                                'desiredJob': this.desiredJob,
                                                'desiredLocation': this.desiredLocation,
                                                'empHistory': this.empHistory,
                                                'skills': this.skills,
                                                'dateApplied': this.dateApplied};
        };

        // find apps from query
        // note: search is an array of single word strings
        this.findApps = function(search, callback) {
                mongoClient.connect(MONGO_DB, function(err, db) {

                        if (err) {
                                return callback(err, null);
                        }
                        console.log('findApps');

                        var collection = db.collection('applications');

                        var applicants = [];

                        collection.find({$text: {$search: search}}).toArray(function(err, docs) {
                                        if (err) {
                                                return callback(err);
                                        }if(docs) {
                                                docs.forEach(function(elem) {
                                                        applicants.push(elem);
                                                });
                                        }
                                        return callback(null, applicants);
                                });

                });

        };

        //get all applications
        this.getAll = function(callback) {
                // connect to mongo
                mongoClient.connect(MONGO_DB, function(err, db) {

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
        };

        // insert new application
        this.insertApp = function(application, callback) {
                // connect to mongo
                mongoClient.connect(MONGO_DB, function(err, db) {
                        if (err) {
                                next(err);
                        }

                        //use collection named applications
                        var collection = db.collection('applications');

                        // insert one application into applications collection
                        collection.insertOne(application, {w: 1}, callback);

                });
        };

};

// make available through require
module.exports = Application;
