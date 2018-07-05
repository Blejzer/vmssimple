var express = require('express');
var router = express.Router();
var path = require("path");
var absolutePath = path.resolve("Relative file path");

/* GET users listing. */
router.get('/', function (req, res) {
    console.log('This is res.statusCode: ', res.statusCode);
    var testLink = __dirname + './views/index.html';
    console.log(testLink);
    res.sendFile( __dirname + '../views/index.html');
});

module.exports = router;