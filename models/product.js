const mongoose = require('mongoose');
const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required:[true, 'Product Name Must Be Provided']
    }, 
    price: {
        type: String,
        required: [true, 'Product Price Must Be Provided']
    }, 
    featured: {
        type: Boolean,
        default: false,
    }, 
    rating: {
        type: Number,
        default: 4.5
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    company: {
        type: String,
        enum: {
            values: ['ikea', 'liddy', 'caressa', 'marcos'],
            message: '{VALUE} Is Not Supported'
        },
    }
});

module.exports = mongoose.model('Product', productSchema);
