let mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');
const { db } = require('./request.model');

mongoose.Promise = global.Promise; 

const ProductSchema = new mongoose.Schema({
    _id: {type: String, default: uuidv4 },
    name:{type: String, required: true},
    price:{type:Number,required: true},
    quantity: {type:Number,required: true},
    description: {type:String, required: true}
}); 

module.exports =mongoose.model('product',ProductSchema);



