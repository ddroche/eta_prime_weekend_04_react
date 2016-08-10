var express = require('express');
var router = express.Router();
var Application = require('../models/application.js');

/* GET application listing. */
router.get('/', function(req, res, next) {
                                console.log('application/');
                // res.render('admin', {title: 'Admin'});
});

/* Search through results */
router.get('/search/:query', function(req, res, next) {
                // note: search is an array of single word strings
                var search = parseSearch(req.params.query);
                console.log(search);
                var application = new Application();
                application.findApps(search, function(err, docs){

                                console.log('Docs: ' + docs);
                                res.send(docs);
                });
});

function parseSearch(query) {
                // this function will take a query string and return an array of individual
                // words to use as search parameters in mongoDB
                return query.split(' ').join(' ');
}

module.exports = router;
