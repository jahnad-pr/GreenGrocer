const { type } = require('express/lib/response');
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    username: {
        type: String,
    },
    tag_name: {
        type: String,
    },
    phone: {
        type: Number,
    },
    place: {
        type: String,
    },
    gender: {
        type: String,
    },
    pic:{
        type:String
    },
    createdAt:{
        type:Date,
        default:Date.now()
    },
    isVerified:{
        type:Boolean,
        default:false
    },
    isListed:{
        type:Boolean,
        default:false
    },
    googleMail:{
        type:String,
        default:''
    }
});

module.exports = mongoose.model('User', userSchema);


// createdAt: Date.now(),
//         isVrified: false,
//         isListed: false,