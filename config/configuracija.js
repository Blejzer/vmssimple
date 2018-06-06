/*******************************************************
 * Copyright (C) Nikola Kujaca - All Rights Reserved    *
 * Unauthorized copying of this file, via any medium    *
 * is strictly prohibited proprietary and confidential  *
 * Written by Nikola Kujaca <nikola.kujaca@gmail.com>,  *
 * 1411972                                              *
 ********************************************************/
module.exports = {

    /*************************************
     * versioning information
     *************************************/
    ver: {
        prod: 'v1.0.0',
        dev: 'v1.0.0'
    },


    /**************************************
     *   Database configuration parameters
     *
     *   contains two versions:
     *   - localhost testing version
     *   - production version (localhost)
     ***************************************/
    sequel: {
        conlimt: '10',
        link: 'localhost',
        baza: 'vehicleManagementSystem',
        juzer: 'root',
        lozinka: '',
        prt: 3306
    },
    // sequel : {
    //     conlimt: '10',
    //     link : 'localhost',
    //     baza: 'vehicleManagementSystem',
    //     juzer: 'mileage',
    //     lozinka: 'mileage2017',
    //     prt: 3306
    // },
    /**************************************
     * END OF Database configuration parameters
     **************************************/

    /**************************************
     * List of MySQL queries required for
     * normal work of the application
     * *************************************/

    /*  ======================
    *   events queries
    *   ======================*/
    reg: {
        slt: 'SELECT * FROM registration;',
        slt1: 'SELECT * FROM registration WHERE id=?;',
        slt2: 'SELECT * FROM registration WHERE vin=?;',
        ins: 'INSERT INTO registration (date, vin) VALUES (?, ?);',
        upd1: 'UPDATE registration SET date = ? WHERE vin=?',
        upd2: 'UPDATE registration SET date = ? WHERE id=?',
        dlt1: 'DELETE FROM registration WHERE id=?',
        dlt2: 'DELETE FROM registration WHERE vin=?'
    },
    usr: {
        slt: 'SELECT * FROM user;',
        slt1: 'SELECT * FROM user WHERE id=?;',
        ins: 'INSERT INTO user (name, surname, email) VALUES (?, ?, ?, ?);',
        upd: 'UPDATE user SET name=?, surname=?, email=? WHERE id=?',
        dlt: 'DELETE FROM user WHERE id=?'
    },
    vhl: {
        slt: 'SELECT * FROM vehicle;',
        slt2: 'SELECT * FROM vehicle WHERE vin=?;',
        ins: 'INSERT INTO vehicle (vin, licenseplate, make, model, color, year) VALUES (?, ?, ?, ?, ?, ?);',
        upd1: 'UPDATE vehicle SET vin=?, licenseplate=?, make=?, model=?, color=?, year=? WHERE vin=?',
        upd2: 'UPDATE vehicle SET vin=?, licenseplate=?, make=?, model=?, color=?, year=? WHERE id=?',
        dlt1: 'DELETE FROM vehicle WHERE id=?',
        dlt2: 'DELETE FROM vehicle WHERE vin=?'
    },

    mlg: {
        slt: 'SELECT * FROM mileage;',
        slt1: 'SELECT * FROM mileage WHERE id=?;',
        slt2: 'SELECT * FROM mileage WHERE vin=?;',
        ins: 'INSERT INTO mileage (vin, surname, email) VALUES (?, ?, ?, ?);',
        upd: 'UPDATE user SET name=?, surname=?, email=? WHERE id=?',
        dlt: 'DELETE FROM user WHERE id=?'

    },


    /**************************************
     * Application messages
     **************************************/
    /*  ======================
     *   database messages
     *   ======================*/
    poruke: {
        konNaBazu: 'Could not connect to the db. Check if the DB is running?',
        upitNijeOK: 'Error executing code on the db. Check if the DB is running, and then verify that the code is correct?'
    }

}

