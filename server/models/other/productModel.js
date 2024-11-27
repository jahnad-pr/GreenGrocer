const mongoose = require('mongoose');


const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    pics: {
        type: Object,
        // required: false,
        default:{
            one:'',
            tow:'',
            three:''
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
    category:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Categorie'
    },
    productCollection:{
        type: mongoose.Schema.Types.ObjectId,
        // required: true
        ref: 'Collection'
    },
    description:{
        type: String,
        required: true
    },
    regularPrice:{
        type: Number,
        required: true
    },
    salePrice:{
        type: Number,
        required: true
    }
    ,
    stock:{
        type: Number,
        required: true
    },
    freshness:{
        type: String,
        required: true
    },
    harvestedTime:{
        type: Date,
        required: true
    },
    from:{
        type: String,
        required: true
    },
    featured:{
        type: Boolean,
        required: true,
        default: false
    }


});

module.exports = mongoose.model('Product', productSchema);
