let mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

mongoose.Promise = global.Promise; 

const employeeSchema = new mongoose.Schema({
    _id: {type: String, default: uuidv4 },
    hashedPassword:{type: String, required: true},
    firstName:{type:String,required: true},
    lastName: {type:String,required: true},
    email:{type:String, required: true},
    isAdmin:{type:Boolean, default: false}
}); 

module.exports = mongoose.model('employee',employeeSchema);



