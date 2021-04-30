let mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

mongoose.Promise = global.Promise; 

const orderSchema = new mongoose.Schema({
    _id: {type: String, default: uuidv4 },
    product:{type: Array, default:[]},
    userId:{type:String, required:true},
    status: {type:String, required:true},
    Comments: {type:String, default:''},
    sellDate:{type:Date, required: true},
    total : {type : Number, required: true}
    
}); 

module.exports =mongoose.model('order',orderSchema);

