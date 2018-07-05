/********************************************************
 * Copyright (C) Nikola Kujaca - All Rights Reserved    *
 * Unauthorized copying of this file, via any Nedium    *
 * is strictly prohibited proprietary and confidential  *
 * Written by Nikola Kujaca <nikola.kujaca@gmail.com>,  *
 ********************************************************/


/* *****************************************************
 *                                                      *
 *          Setting up all of the requirements          *
 *                                                      *
 ********************************************************/

// set up ========================
var mysql           = require("mysql");
var express         = require('express');
var router          = express.Router();
var app             = express();                               // create our app w/ express
var morgan          = require('morgan');                         // log requests to the console (express4)
var bodyParser      = require('body-parser');                // pull information from HTML POST (express4)
var methodOverride  = require('method-override');        // simulate DELETE and PUT (express4)
var Config          = require("config-js");                      // Da bi ucitali configuracija.js file, moramo imati ovaj modul ???

var config = new Config("./config/configuracija.js");

// var indexRouter = require('./routers/index.routes.js');
var vehicleRouter = require('./routers/vehicle.routes.js');

var servef          = require('./controllers/server.functions.js');
/*****************************************************************************************************************/

// Configuring the database
const dbConfig = require('./config/database.mongodb.js');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

// Connecting to the database
mongoose.connect(dbConfig.url)
    .then(() => {
    console.log("mongoose successfully connected to the database");
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...');
process.exit();
});

/* ******************************************** *
 * Setting up basic params for mysql connection *
 * ******************************************** */
var dbcon = mysql.createPool({
    connectionLimit: config.get('sequel.conlimt'),
    host: config.get('sequel.link'),
    user: config.get('sequel.juzer'),
    password: config.get('sequel.lozinka'),
    database: config.get('sequel.baza'),
    port: config.get('sequel.prt')
});

var ver = config.get('ver.dev');

console.log("*********************************************\nserver version "+ver+"\n*********************************************\n*********************************************\ninitial components loaded\n*********************************************\n");

/* **********************************
 * Setting up static routes         *
 * and bodyParser for json and      *
 * encoded urls                     *
 ************************************/
app.use(morgan('dev'));
app.use('/scripts', express['static']('./node_modules/'));
app.use('/angular', express['static']('./angular/'));
app.use('/images', express['static']('./views/images/'));
app.use('/views', express['static']('./views/'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
// app.use('/vehicles',vehicleRouter);
// app.use('/', indexRouter);


/****************************************************************************
 *                                                                          *
 *                          SERVING PAGES START                             *
 *                                                                          *
 ***************************************************************************/

/* **************************************
 *      GET getCurrentMileage           *
 * ==================================== *
 * This app.get has middleware          *
 * 'basicAuthMiddleware' that verifies  *
 * if the user exists in ICITAP LDAP    *
 * and if the credentials are correct,  *
 * user can continue to the index.html  *
 ***************************************/
app.get('/', function (req, res) {
    console.log('This is res.statusCode: ', res.statusCode);
    res.sendFile(__dirname + '/views/index.html');
});


/****************************************************************************************************
 *                                             API CALLS                                            *
 ****************************************************************************************************/

/****************************************************
 *                  VEHICLE table                   *
 ****************************************************/
/* **************************************
 *      API GET getAllVehicles          *
 *      =======================         *
 *   get the list of all vehicles       *
 *     from the vehicle table           *
 ************************************** */
app.get('/api/vehicles/', function (req, res) {
    console.log('API GET getAllVehicles');
    servef.getAllVehicles(function (rezultatc) {
        setTimeout((function()
        {
            res.send(rezultatc);
        }), 2000);

    });
});

/* **************************************
 *         API GET getVehicle           *
 *      =======================         *
 *   Get the form to update             *
 *   a new vehicle and insert           *
 *     it in the VEHICLE table          *
 ************************************** */
app.get('/api/vehicles/{vin}', function (req, res) {
    console.log('API GET getVehicle');
    getVehicle(function (rezultatc) {
        res.send(rezultatc);
    });
});

/* **************************************
 *      API PUT updateNewVehicle        *
 *      =======================         *
 *  update vehicle and save changes     *
 *       in the VEHICLE table           *
 ************************************** */
app.put('/api/vehicles/{vin}', function (req, res) {
    console.log('API PUT updateNewVehicle');
    updateNewVehicle(req.body, function (rezultatc) {
        res.send(rezultatc);
    });
});

/* **************************************
 *     API POST createNewVehicle        *
 *      =======================         *
 *   create a new vehicle and insert    *
 *     it in the VEHICLE table          *
 ************************************** */
app.post('/api/vehicles/{vin}', function (req, res) {
    console.log('API POST createNewVehicle');
    createNewVehicle(req.body, function (rezultatc) {
        res.send(rezultatc);
    });
});

/* **************************************
 *       API DELETE deleteVehicle       *
 *      =======================         *
 *   delete a new vehicle and remove    *
 *     it from the VEHICLE table        *
 ************************************** */
app.delete('/api/vehicles/{vin}', function (req, res) {
    console.log('API DELETE deleteVehicle');
    deleteVehicle(req.body, function (rezultatc) {
        res.send(rezultatc);
    });
});


/****************************************************
 *                     USER table                   *
 ****************************************************/
/* **************************************
 *      API GET getAllUsers             *
 *      =======================         *
 *    get the list of all users         *
 *        from the user table           *
 ************************************** */
app.get('/api/users/', function (req, res) {
    console.log('API GET getAllUsers');
    servef.getAllUsers(function (rezultatc) {
        res.send(rezultatc);
    });
});

/* **************************************
 *            API GET getUser           *
 *      =======================         *
 *   Get the form to update             *
 *   a new vehicle and insert           *
 *     it in the VEHICLE table          *
 ************************************** */
app.get('/api/users/{id}', function (req, res) {
    console.log('API GET getUser');
    getUser(function (rezultatc) {
        res.send(rezultatc);
    });
});

/* **************************************
 *          API PUT updateUser          *
 *      =======================         *
 *     update user and save changes     *
 *          in the USER table           *
 ************************************** */
app.put('/api/users/{id}', function (req, res) {
    console.log('API PUT updateUser');
    updateUser(req.body, function (rezultatc) {
        res.send(rezultatc);
    });
});

/* **************************************
 *       API POST createNewUser         *
 *      =======================         *
 *    create a new user and insert      *
 *       it in the USER table           *
 ************************************** */
app.post('/api/users/{id}', function (req, res) {
    console.log('API POST createNewUser');
    createNewUser(req.body, function (rezultatc) {
        res.send(rezultatc);
    });
});

/* **************************************
 *        API DELETE deleteUser         *
 *      =======================         *
 *       delete a user and remove       *
 *     it from the VEHICLE table        *
 ************************************** */
app.delete('/api/users/{id}', function (req, res) {
    console.log('API DELETE deleteUser');
    deleteUser(req.body, function (rezultatc) {
        res.send(rezultatc);
    });
});




/****************************************************************************
 *                                                                          *
 *                          SERVING PAGES END                               *
 *                                                                          *
 ***************************************************************************/

/* ***********************************
 *  Testing mysql connection         *
 ********************************** */
servef.testDataBaseConnection(function (test) {
    if(test){
        console.log("SERVER: Connection to the database established... ");
    }else{
        console.log('ERROR')
    }
});

/* ***********************************
 *     Starting server on port 80    *
 * ================================  *
 *********************************** */

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.requestedResource = req.url;
    res.locals.message = err.status + ' ' + err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('../views/error.html');
});

app.listen(80, function () {
    console.log(ver, " Initialization sequence complete. ");
    console.log('********************************************* '+ new Date(), ' - vms server started listening on port:80 *********************************************');
});

