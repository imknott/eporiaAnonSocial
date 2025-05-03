var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('mission', { title: 'Our Mission' });
});


module.exports = router;
