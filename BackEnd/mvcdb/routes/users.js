const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');

router.post('/registerusers', userController.registeruser);
// Add other user-related routes here

//Get all items
router.get('/getusers', userController.getusers);

//Get a single item by ID
router.get('/getitem1/:id', userController.getItemById1);

router.get('/getitembyMobile/:mobile', userController.getItemByMobile);

//update item by ID
router.put('/updateusers/:id', userController.updateusers);

//Delete an item by ID
router.delete('/deleteusers/:id', userController.deleteusers);


module.exports = router;


