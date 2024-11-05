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
    }


});

module.exports = mongoose.model('Categorie', categorySchema);
