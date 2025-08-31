const express = require('express');
const router = express.Router();
const eventbilling = require('../controllers/billing.controller');

router.post('/registerbilling', eventbilling.registerbilling);
// Add other user-related routes here

//Get all items
router.get('/getbilling', eventbilling.getbilling);

//Get a single item by ID
router.get('/getitembilling/:id', eventbilling.getItembilling);


//update item by ID
router.put('/updatebilling/:id', eventbilling.updatebilling);

//Delete an item by ID
router.delete('/deletebilling/:id', eventbilling.deletebilling);


module.exports = router;


