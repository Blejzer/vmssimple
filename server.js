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
var mysql = require("mysql");
var express  = require('express');
var app      = express();                               // create our app w/ express
var morgan = require('morgan');                         // log requests to the console (express4)
var bodyParser = require('body-parser');                // pull information from HTML POST (express4)
var methodOverride = require('method-override');        // simulate DELETE and PUT (express4)
var Config = require("config-js");                      // Da bi ucitali configuracija.js file, moramo imati ovaj modul ???
var config = new Config("config/configuracija.js");

/*****************************************************************************************************************/

/* **********************************
 * Setting up basic params          *
 * for mysql connection             *
 ***********************************/
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
app.use('/scripts', express['static']('./node_modules/'));
app.use('/angular', express['static']('./frontend/angular/'));
app.use('/images', express['static']('./views/images/'));
app.use('/views', express['static']('./views/'));
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded


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
    console.log('This is req.url: ', req.url);
    res.sendFile(__dirname + '/views/index.html');
});



/* **************************************
 *      API GET getAllVehicles          *
 *      =======================         *
 *   get the list of all vehicles       *
 *     from the vehicle table           *
 ************************************** */
app.get('/api/vehicles/get', function (req, res) {
    console.log('API GET getAllVehicles');
    getAllVehicles(function (rezultatc) {
        // console.log("DATA: getAvailableVehicles: end of getAvailableVehicles - result: ", rezultatc);

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
testDataBaseConnection(function (test) {
    if(test){
        console.log("SERVER: Connection to the database established... ");
    }else{
        console.log('ERROR')
    }
});

/* ***********************************
 *      Palimo server na portu 80    *
 * ================================  *
 *********************************** */
app.listen(80, function () {
    console.log(ver, " Initialization sequence complete. ");
    console.log('********************************************* '+ new Date(), ' - vms server started listening on port:80 *********************************************');
});


/* **********************************************
 *      TEST DATABASE CONNECTION function        *
 * Incomplete function                           *
 * Main purpose is to check connection to        *
 * the database and return result of the         *
 * connection. NOT IMPLEMENTED is the option to  *
 * on fail try to reconnect to the database      *
 *************************************************/

function testDataBaseConnection(callback) {
    dbcon.getConnection(function (err, connection) {

        dbcon.query('SELECT 1+0 AS selection', function (err, rows) { //function (err, rows, fields)
            if (err) {
                if (err.fatal) {
                    console.log("Processor: ", new Date(), 'Doslo je do prekida komunikacije sa bazom podataka');
                    throw err;
                }
                console.error("Processor: ", new Date(), 'Could not connect to the db. Check if the DB is running?', err.code, err.fatal);
                callback(false);
            } else {
                console.log("Processor: ", new Date(), 'Connection successful', rows[0].selection);
                console.log("Processor: Database is set.");
                callback(true);
            }
        });
        connection.release();
    });


}



/* **********************************************
 *    LIST OF ALL VEHICLES  function       *
 * Getting the list of all available             *
 * vehicles in the database from                 *
 * the mileage.vehicle table (checked=0)         *
 *************************************************/
function getAllVehicles(callback) {
    results = [];
    // console.log("DATA: getAvailableVehicles: Response from client: "); // ipJson.country.names.en,

    dbcon.getConnection(function (err, connection) {

        connection.query(config.get('vhl.slt'), function (err, crows) { // changed to get all vehicles in stead to assigned.
            if (err) {
                if (err.fatal) {
                    throw err;
                }
                console.error("Processor: getAllVehicles: List of vehicles", new Date(), config.get('poruke.konNaBazu'), err.code, err.fatal);
            }
            results = crows;
            // console.log('getAvailableVehicles', results);

            ritrn = JSON.stringify(results);
            // console.log('getAvailableVehicles stringified: ', ritrn);
            callback(ritrn);

        });

        connection.release();
    });
}