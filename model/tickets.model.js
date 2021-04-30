let mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

mongoose.Promise = global.Promise; 

const ticketSchema = new mongoose.Schema({
    _id: {type: String, default: uuidv4 },
    userId:{type:String, required:true},
    description:{type:String},
    isLockedOut:{type:Boolean, required:true}
}); 

module.exports =mongoose.model('ticket',ticketSchema);

