const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    username: { type: String, required: true, unique:true},
    password: { type: String, required: true },
    admin:{type:Boolean,default:false},
    membership_status: { 
        type: String, 
        required: true, 
        enum: ['guest', 'member'],
        default:'guest' 
    }
});

module.exports = mongoose.model('User',userSchema);
