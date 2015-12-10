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
  for (var i = 1; i <= 3; i++) {
    empHistory.push({
      jobTitle: data['jobTitle' + i],
      employer: data['employer' + i],
      empCity: data['empCity' + i],
      empState: data['empState' + i],
      description: data['description' + i]
    });
  }

  var application = new Application(data.firstName,
                                    data.lastName,
                                    data.desiredJob,
                                    data.desiredLocation,
                                    empHistory,
                                    data.skills);
  application.insertApp(application.getApp(), function(err, results) {
    if (err) {
      console.log(err);
      next(err);
    }
    console.log('Results: ' + results);
    res.send('Application Sent');
  });
});

module.exports = router;
