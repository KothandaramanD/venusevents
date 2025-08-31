const express = require('express');
const router = express.Router();
const eventservice = require('../controllers/eventservice.controller');

router.post('/registerservice', eventservice.registerservice);
// Add other user-related routes here

//Get all items
router.get('/getservice', eventservice.getservice);

//Get a single item by ID
router.get('/getitemservice/:id', eventservice.getItemservice);


//update item by ID
router.put('/updateservice/:id', eventservice.updateservice);

//Delete an item by ID
router.delete('/deleteservice/:id', eventservice.deleteservice);


module.exports = router;


