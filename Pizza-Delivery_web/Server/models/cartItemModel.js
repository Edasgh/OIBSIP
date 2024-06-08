const mongoose = require("mongoose");

const cartItemModel = mongoose.Schema({
    customerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    //add to cart only if its pizza
    name: { type: String, required: true, unique: true },
    variant: {
        type:
        {
            name: { type: String, required: true },
            price: { type: Number, required: true },
        },
    },// variant : size
    extraOptions: {
        type: [
            {
                name: { type: String, required: true },//extra cheeses or sauces
                price: { type: Number, required: true },
                category: { type: String, required: true }
            },
        ]
    },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
    category: { type: String, required: true }
})

const CartItem = mongoose.model("CartItem", cartItemModel);

module.exports = CartItem;