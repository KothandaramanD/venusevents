const express = require ('express');
const router = express.Router();
const itemController = require('../controllers/item.controller');

//Create a new item
router.post('/createitem', itemController.createItem);

//Get all items
router.get('/getallitems', itemController.getItems);

//Get a single item by ID
router.get('/getitem/:id', itemController.getItemById);

//update item by ID
router.put('/updateitem/:id', itemController.updateItem);

//Delete an item by ID
router.delete('/deleteitem/:id', itemController.deleteItem);



module.exports = router;
