const Vehicle = require('../models/vehicle.model.js');

// Create and Save a new Vehicle
exports.create = (req, res) => {
    // Validate request
    if(!req.body.vin) {
        return res.status(400).send({
            message: "Vehicle VIN can not be empty"
        });
    }

    // Create a Vehicle
    const vehicle = new Vehicle({
        vin: req.body.vin,
        licensePlate: req.body.licensePlate,
        make: req.body.make,
        model:req.body.model,
        color:req.body.color,
        mYear:req.body.mYear
    });

    // Save Vehicle in the database
    vehicle.save()
        .then(data => {
            res.send(data);
        }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Vehicle."
        });
    });
};

// Retrieve and return all vehicles from the database.
exports.findAll = (req, res) => {
    Vehicle.find()
        .then(vehicles => {
            res.send(vehicles);
        }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving vehicles."
        });
    });
};

// Find a single vehicle with a vin
exports.findOne = (req, res) => {
    Vehicle.findById(req.params.vin)
        .then(vehicle => {
            if(!vehicle) {
                return res.status(404).send({
                    message: "Vehicle not found with id " + req.params.vin
                });
            }
            res.send(vehicle);
        }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Vehicle not found with id " + req.params.vin
            });
        }
        return res.status(500).send({
            message: "Error retrieving vehicle with id " + req.params.vin
        });
    });
};

// Update a vehicle identified by the vin in the request
exports.update = (req, res) => {
    // Validate Request
    if(!req.body.vin) {
        return res.status(400).send({
            message: "Vehicle VIN can not be empty"
        });
    }

    // Find vehicle and update it with the request body
    Vehicle.findByIdAndUpdate(req.params.vin, {
        vin: req.body.vin,
        licensePlate: req.body.licensePlate,
        make: req.body.make,
        model:req.body.model,
        color:req.body.color,
        mYear:req.body.mYear
    }, {new: true})
        .then(vehicle => {
            if(!vehicle) {
                return res.status(404).send({
                    message: "Vehicle not found with vin " + req.params.vin
                });
            }
            res.send(vehicle);
        }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Vehicle not found with vin " + req.params.vin
            });
        }
        return res.status(500).send({
            message: "Error updating vehicle with id " + req.params.vin
        });
    });
};

// Delete a vehicle with the specified vin in the request
exports.delete = (req, res) => {
    Vehicle.findByIdAndRemove(req.params.vin)
        .then(vehicle => {
            if(!vehicle) {
                return res.status(404).send({
                    message: "Vehicle not found with vin " + req.params.vin
                });
            }
            res.send({message: "Vehicle deleted successfully!"});
        }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Vehicle not found with vin " + req.params.vin
            });
        }
        return res.status(500).send({
            message: "Could not delete vehicle with vin " + req.params.vin
        });
    });
};
