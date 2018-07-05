"use strict";

var mysql           = require("mysql");
var Config          = require("config-js");
var config          = new Config("./config/configuracija.js");

var dbcon = mysql.createPool({
    connectionLimit: config.get('sequel.conlimt'),
    host: config.get('sequel.link'),
    user: config.get('sequel.juzer'),
    password: config.get('sequel.lozinka'),
    database: config.get('sequel.baza'),
    port: config.get('sequel.prt')
});



/****************************************************************************************************
 *                                       Test MySQL CONNECTION                                      *
 ****************************************************************************************************/
/* **********************************************
 *      TEST DATABASE CONNECTION function        *
 * Incomplete function                           *
 * Main purpose is to check connection to        *
 * the database and return result of the         *
 * connection. NOT IMPLEMENTED is the option to  *
 * on fail try to reconnect to the database      *
 *************************************************/

exports.testDataBaseConnection = function (callback) {
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
};


/****************************************************************************************************************
 *                                        API CALLS FUNCTIONS                                                   *
 ****************************************************************************************************************/


/********************************************************************************************
 *                                  VEHICLE CRUD FUNCTIONS                                  *
 ********************************************************************************************/

/* **********************************************
 *         CREATE NEW VEHICLE function          *
 * Create a new vehicle and save                *
 * it in the vehicle table                      *
 ************************************************/
exports.createNewVehicle = function (data, callback) {
    var results = [];
    console.log("POST: createNewVehicle: Incoming from client: ", data); // ipJson.country.names.en,

    dbcon.getConnection(function (err, connection) {
        console.log(data.vehicle);

        connection.query(config.get('vhl.ins'), [data.vehicle.vin, data.vehicle.licensePlate, data.vehicle.make, data.vehicle.model, data.vehicle.year], function (err, crows) {
            if (err) {
                if (err.fatal) {
                    throw err;
                }
                console.error("Processor: createNewVehicle: Insert new vehicle", new Date(), config.get('poruke.konNaBazu'), err.code, err.fatal);
            }
            results = crows;
            console.log('createNewVehicle -> results: ', results);
            var ritrn = JSON.stringify(results);
            callback(ritrn);

        });

        connection.release();
    });
};



/* **********************************************
 *          UPDATE VEHICLE function             *
 * Update vehicle information and save          *
 * it in the vehicle table                      *
 ************************************************/
exports.updateVehicle = function (data, callback) {
    var results = [];
    console.log("PUT: updateVehicle (upd1: Incoming from client: ", data); // ipJson.country.names.en,

    dbcon.getConnection(function (err, connection) {
        console.log(data.vehicle);

        connection.query(config.get('vhl.upd1'), [data.vehicle.vin, data.vehicle.licensePlate, data.vehicle.make, data.vehicle.model, data.vehicle.color, data.vehicle.year, data.vehicle.vin], function (err, crows) {
            if (err) {
                if (err.fatal) {
                    throw err;
                }
                console.error("Processor: updateVehicle1: Update vehicle information", new Date(), config.get('poruke.konNaBazu'), err.code, err.fatal);
            }
            results = crows;
            // console.log('updateVehicle -> results: ', results);
            var ritrn = JSON.stringify(results);
            callback(ritrn);

        });

        connection.release();
    });
};

/* ***********************************************
 *      LIST OF ALL VEHICLES  function           *
 * Getting the list of all available             *
 * vehicles in the database from the vehicle     *
 * table CALLED BY: app.get '/api/vehicles'      *
 *************************************************/
exports.getAllVehicles = function (callback) {
    var results = [];
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

            var ritrn = JSON.stringify(results);
            // console.log('getAvailableVehicles stringified: ', ritrn);
            callback(ritrn);

        });

        connection.release();
    });
};



/********************************************************************************************
 *                                   USERS CRUD FUNCTIONS                                   *
 ********************************************************************************************/
/* **********************************************
 *         LIST OF ALL USERS  function          *
 * Getting the list of all users                *
 * from the user table                          *
 ************************************************/
exports.getAllUsers = function (callback) {
    var results = [];
    // console.log("DATA: getAllUser: Response from client: ");

    dbcon.getConnection(function (err, connection) {

        connection.query(config.get('usr.slt'), function (err, crows) { // changed to get all vehicles in stead to assigned.
            if (err) {
                if (err.fatal) {
                    throw err;
                }
                console.error("Processor: getAllUsers: List of users", new Date(), config.get('poruke.konNaBazu'), err.code, err.fatal);
            }
            results = crows;
            // console.log('getAllUsers', results);

            var ritrn = JSON.stringify(results);
            // console.log('getAllUsers stringified: ', ritrn);
            callback(ritrn);

        });

        connection.release();
    });
};


/* **********************************************
 *         CREATE NEW USER  function          *
 * Getting the list of all users                *
 * from the user table                          *
 ************************************************/
exports.createNewUser = function (data, callback) {
    var results = [];
    console.log("POST: createNewUser: Incoming from client: ", data); // ipJson.country.names.en,

    dbcon.getConnection(function (err, connection) {
        console.log(data.user);

        connection.query(config.get('usr.ins'), [data.user], function (err, crows) {
            if (err) {
                if (err.fatal) {
                    throw err;
                }
                console.error("Processor: createNewUser: Insert new user", new Date(), config.get('poruke.konNaBazu'), err.code, err.fatal);
            }
            results = crows;
            console.log('createNewUser -> results: ', results);
            var ritrn = JSON.stringify(results);
            callback(ritrn);

        });

        connection.release();
    });
};
