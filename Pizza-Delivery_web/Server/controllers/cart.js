const async_handler = require("express-async-handler");

const CartItem = require("../models/cartItemModel");
const User = require("../models/Usermodel");
const Product = require("../models/Productmodel");


const addToCart = async_handler(async (req, res) => {
    try {
        const userId = req.user.id; // user should be logged in
        const user = await User.findById(userId).select("-password");

        if (user) {

            const { name, quantity, category, price,variant , productId} = req.body;
            let { extraOptions } = req.body;

            if (!extraOptions || extraOptions.length == 0) {
                extraOptions = [];
            }

            if (!name || !quantity || !category || !price || !variant||!productId) {
                res.status(400);
                console.log(name, quantity, category, price, variant);
                throw new Error("Please enter all the fields");

            }
            const existsInCart = await CartItem.findOne({ name });
            const productExits = await Product.findOne({ name });

            if (!existsInCart && productExits) {
                //create an cartItem object in cartItem model
                const newProduct = await CartItem.create({
                    customerId: userId,
                    name,
                    variant,
                    extraOptions,
                    price,
                    quantity,
                    category,
                    productId
                })

                let updatedProduct = {};
                let productQty = await productExits.quantity;
                updatedProduct.quantity = (productQty - quantity);
                const updatedQty = await Product.findOneAndUpdate({ name }, { $set: updatedProduct }, { new: true });
                if (newProduct && updatedQty) {

                    res.status(201).json({
                        _id: newProduct._id,
                        name: newProduct.name,
                        product_type: newProduct.product_type,
                        variants: newProduct.variants,
                        price: newProduct.price,
                        quantity: newProduct.quantity,
                        description: newProduct.description,
                        category: newProduct.category,
                        image: newProduct.image,

                    })



                } else {
                    res.status(400);
                    throw new Error("Failed to add to cart!");
                }
            } else {
                res.status(400);
                throw new Error("This Item already exists in cart!");
            }

        } else {
            res.status(401);
            throw new Error("Action not allowed!");
        }
    } catch (error) {
        res.status(error.status);
        throw new Error(error);
    }



})


const updateItemQuantity = async_handler(async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await User.findById(userId).select("-password");

        const { quantity, } = req.body;
        const cartItemId = req.params.id;//we need id parameter here
        const cartItem = await CartItem.findById(cartItemId);
        let cartItemQty=await cartItem.quantity;
        let cartItemName = await cartItem.name;
        const product = await Product.findOne({ name: cartItemName });
        let productQty = await product.quantity;
        
    
        if (user && cartItem && (userId == cartItem.customerId)) {
            let newProduct = {};
            let newCartItem = {};
            let increment_decrement;
            if (typeof quantity == "number" && quantity > 0) {
                newCartItem.quantity = quantity;
                if(quantity>cartItemQty){
                    increment_decrement=quantity-cartItemQty;
                    newProduct.quantity = (productQty - increment_decrement);
                }else if(cartItemQty>quantity){
                    increment_decrement=cartItemQty-quantity;
                    newProduct.quantity = (productQty + increment_decrement);
                }
                
            };

            const updatedCartItem = await CartItem.findByIdAndUpdate(cartItemId, { $set: newCartItem }, { new: true });
            const updatedProduct = await Product.findOneAndUpdate({ name: cartItemName }, { $set: newProduct }, { new: true });
            if (updatedCartItem && updatedProduct) {
                res.status(201).send(updatedCartItem);
            } else {
                res.status(404);
                throw new Error("Something went wrong!");
            }

        } else {
            res.status(404);
            throw new Error("Action not allowed!");
        }
    } catch (error) {
        res.status(error.status);
        throw new Error(error);
    }
})


const removeFromCart = async_handler(async (req, res) => {
    try {
        const userId = req.user.id; //we need auth-token here
        const user = await User.findById(userId).select("-password");

        const cartItemId = req.params.id; //we need cartItem id as parameter here
        const cartItem = await CartItem.findById(cartItemId);
        let cartItemName = await cartItem.name;
        let cartItemQty = await cartItem.quantity;


        const product = await Product.findOne({ name: cartItemName });
        let productQty = await product.quantity;
        let newProduct = {};
        newProduct.quantity = productQty + cartItemQty;


        if (user && cartItem) {
            if (userId == cartItem.customerId) {
                await Product.findOneAndUpdate({ name: cartItemName }, { $set: newProduct }, { new: true });
                await CartItem.findOneAndDelete({ _id: cartItemId });
                res.status(200).send("Item removed from cart Successfully!");
            } else {
                res.status(401);
                throw new Error("Action not allowed!");
            }
        } else {
            res.status(404);
            throw new Error("An unknown error occurred!");
        }
    } catch (error) {
        res.status(error.status);
        throw new Error(error);
    }
})

const getCartItems = async_handler(async (req, res) => {
    try {
        let totalPrice;
        const userId = req.user.id;
        const user = await User.findById(userId).select("-password");
        let cartItems;
        if (user) {

            cartItems = await CartItem.find({ customerId: userId });
            totalPrice = 0;
            for (let i = 0; i < cartItems.length; i++) {
               totalPrice += (cartItems[i].variant.price);

                if (cartItems[i].extraOptions) {

                    for (let j = 0; j < cartItems[i].extraOptions.length; j++) {
                        totalPrice += (cartItems[i].extraOptions[j].price) * (cartItems[i].quantity);

                    }
                }

                totalPrice += cartItems[i].price;
            }
            if (cartItems) {
                res.status(200).send({cartItems:cartItems,totalPrice:totalPrice});
            } else {
                res.status(404);
                throw new Error("An unknown error occurred!");
            }
        } else {
            res.status(404);
            throw new Error("Can't find user!");
        }

    } catch (error) {
        res.status(401);
        throw new Error(error);
    }
})

module.exports = { addToCart, removeFromCart, getCartItems, updateItemQuantity };