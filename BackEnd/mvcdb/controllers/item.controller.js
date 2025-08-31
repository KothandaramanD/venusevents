const Item = require('../models/item.model');

//create new item
exports.createItem = async (req,res) => {
const newItem =  new Item(req.body);
console.log(newItem);
try{
    await newItem.save();
    res.status(201).json(newItem);
} catch(err){
    res.status(400).json({error: err.message});
}
};


// Get all items
exports.getItems = async (req,res) => {
    try{
        const items = await Item.find();
        res.status(200).json(items);
    } catch(err){
        res.status(400).json({error: err.message});
    }
    };

// Get single items
exports.getItemById = async (req,res) => {
    try{
        const item = await Item.findById(req.params.id);
        if(!item) return res.status(404).json({message: 'Item not found'});
        res.status(200).json(item);
    } catch(err){
        res.status(400).json({error: err.message});
    }
    };

// Update items
exports.updateItem = async (req,res) => {
    try{
        const item = await Item.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if(!item) return res.status(404).json({message: 'Item not found'});
        res.status(200).json(item);
    } catch(err){
        res.status(400).json({error: err.message});
    }
    };

// Delete an items
exports.deleteItem = async (req,res) => {
    try{
        const item = await Item.findByIdAndDelete(req.params.id);
        if(!item) return res.status(404).json({message: 'Item not found'});
        res.status(200).json({message : "Item deleted"});
    } catch(err){
        res.status(400).json({error: err.message});
    }
    };


