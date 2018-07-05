/*******************************************************
 * Copyright (C) Nikola Kujaca - All Rights Reserved    *
 * Unauthorized copying of this file, via any medium    *
 * is strictly prohibited proprietary and confidential  *
 * Written by Nikola Kujaca <nikola.kujaca@gmail.com>,  *
 * 1411972                                              *
 ********************************************************/
var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var VehicleSchema = new Schema(
    {
        vin:{type: String, required: true, max: 17},
        licensePlate: {type: String, max: [10, 'License plate cannot have more than 10 characters'], required: [true, 'Vehicle must have a license plate']},
        make: {type: String, required: true, max: 20},
        model:{type: String, required: true, max:20},
        color:{type: String, required: false, max: 20},
        mYear:{type: Number, required: false, max: 4}

    }
);

// Virtual for vehicle's URL
VehicleSchema
    .virtual('url')
    .get(function () {
        return '/vehicles/' + this._id;
    });

var Vehicle = mongoose.model('Vehicle', VehicleSchema);

//Export model
module.exports = {
    Vehicle: Vehicle
};