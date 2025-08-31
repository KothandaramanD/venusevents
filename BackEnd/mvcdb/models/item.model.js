const mongoose = require ('mongoose');
const Schema = mongoose.Schema;
const itemSchema = new Schema(
    {
	    username: { type: String, required: true },
    	mobilenumber: { type: String, required: true },
    	email: { type: String, required: true },
    	subject: { type: String, required: true },
    	message: { type: String, required: true },
    },
    {
        timestamps: true,
    }
);

const Item = mongoose.model('Item', itemSchema);
module.exports = Item;
