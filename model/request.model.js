let mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

mongoose.Promise = global.Promise; 

const requestSchema = new mongoose.Schema({
    _id: {type: String, default: uuidv4 },
    productName:{type: String, required: true},
    productId:{type: String, required: true},
    quantity: {type:Number,required: true}
}); 

module.exports =mongoose.model('request',requestSchema);

