let mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

mongoose.Promise = global.Promise;

const UserSchema = new mongoose.Schema({
    _id: { type: String, default: uuidv4 },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    birthday: { type: Date },
    Phone: { type: String },
    address: { type: JSON },
    email: { type: String, required: true },
    hashedPassword: { type: String, required: true },
    funds: { type: Number, default: 100 },
    cart: { type: Array, default: [] },
    orders: { type: Array, default: [] },
    isLockedOut: { type: Boolean, default: false },
    numberOfTries: { type: Number, default: 0 },
    account: { type: JSON, default: { "accNum": 12345, "amount": 5000 } }
});

module.exports = mongoose.model('user', UserSchema);


