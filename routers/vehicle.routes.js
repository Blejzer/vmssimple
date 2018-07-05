module.exports = (app) => {
    const vehicles = require('../controllers/vehicle.controller.js');

    // Create a new Note
    app.post('/vehicles', vehicles.create);

    // Retrieve all Notes
    app.get('/vehicles', vehicles.findAll);

    // Retrieve a single Note with noteId
    app.get('/vehicles/:vin', vehicles.findOne);

    // Update a Note with noteId
    app.put('/vehicles/:vin', vehicles.update);

    // Delete a Note with noteId
    app.delete('/vehicles/:vin', vehicles.delete);
}