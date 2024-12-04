const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    items: {
        type: Object,
        default:{
            collections:[],
            products:[]
        }
    },
    isListed:{
        type: Boolean
    },
    createdAt:{
        type: Date
    },
    updatedAt:{
        type: Date
    },
    discount:{
        type:{
            type:String,
            required: true,
            enum: ['percentage', 'flat','BOGO','free shipping']
        },
        isPercentage:{
            type: Boolean,
            required: true,
            default: false
        },
        value: {
            type: Number,
            required: true
        },
        description: {
            type: String,
            // required: true
        },
        minQuantity: {
            type: Number,
            required: true
        },
        maxAmount: {
            type: Number,
            // required: true
        },
        updatedAt:{
            type: Date
        }

    }


});

module.exports = mongoose.model('Categorie', categorySchema);
