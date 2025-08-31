const mongoose = require('mongoose');
const users = require('../models/billing.model');

//create new item
exports.registerbilling = async (req,res) => 
    {
    const newItem1 =  new users(req.body);
    console.log(newItem1);
    try{
        await newItem1.save();
        res.status(201).json(newItem1);
    } catch(err){
        res.status(400).json({error: err.message});
    }
    };

    // Get all items
exports.getbilling = async (req,res) => {
    try{
        const user = await users.find();
        res.status(200).json(user);
    } catch(err){
        res.status(400).json({error: err.message});
    }
    };

// Get single items

exports.getItembilling = async (req, res) => {
    try {
      const userId = req.params.id;
  
      // Validate that the ID is a valid MongoDB ObjectId
      if (!mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(400).json({ message: 'Invalid ID format' });
      }
  
      // Find user by ID
      const user = await users.findById(userId);
  
      // If user not found
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Return the found user
      res.status(200).json(user);
    } catch (err) {
      // Handle server errors
      res.status(500).json({ error: err.message });
    }
  };


// Update items
exports.updatebilling = async (req,res) => {
    try{
        const user = await users.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if(!user) return res.status(404).json({message: 'Item not found'});
        res.status(200).json(user);
    } catch(err){
        res.status(400).json({error: err.message});
    }
    };

// Delete an items
exports.deletebilling = async (req,res) => {
    try{
        const user = await users.findByIdAndDelete(req.params.id);
        if(!user) return res.status(404).json({message: 'Item not found'});
        res.status(200).json({message : "Item deleted"});
    } catch(err){
        res.status(400).json({error: err.message});
    }
    };