import mongoose from 'mongoose';

const productSchema: mongoose.Schema = new mongoose.Schema({
    name: {
        type: mongoose.Schema.Types.String,
        required: true
    },
    category: {
        type: mongoose.Schema.Types.String,
        required: true
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
});

const Product = mongoose.model('Product', productSchema);

export default Product;