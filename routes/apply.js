var express = require('express');
var router = express.Router();
var Application = require('../models/application.js');


/* GET application listing. */
router.get('/', function(req, res, next) {
  res.render('apply', {title: 'Apply'});
});

router.post('/', function(req, res, next) {
  var data = req.body;
  var empHistory = [];
  var job1 = {jobTitle: data.jobTitle1,
              employer: data.employer1,
              empCity: data.empCity1,
              empState: data.empState1,
              description: data.description1};
  empHistory.push(job1);
  var job2 = {jobTitle: data.jobTitle2,
              employer: data.employer2,
              empCity: data.empCity2,
              empState: data.empState2,
              description: data.description2};
  empHistory.push(job2);
  var job3 = {jobTitle: data.jobTitle3,
              employer: data.employer3,
              empCity: data.empCity3,
              empState: data.empState3,
              description: data.description3};
  empHistory.push(job3);
  var application = new Application(data.firstName,
                                    data.lastName,
                                    data.desiredJob,
                                    data.desiredLocation,
                                    empHistory,
                                    data.skills);
  console.log(req.body);
  console.log(application);
  application.insertOne(application, function(err, results) {
    if (err) {
      next(err);
    }
    console.log('Results: ' + results);
    res.send('Application Sent');
  });
});

module.exports = router;