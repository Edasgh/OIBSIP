const async_handler = require("express-async-handler");

const Product = require("../models/Productmodel");
const User = require("../models/Usermodel");

//only by logged in admin || isAdmin : true

//function to create  pizza / pizza-crust / pizza-sauce / pizza-toppings / cheese
const createProduct = async_handler(async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await User.findById(userId).select("-password");

        if (user.isAdmin == true) {

            const { name, product_type, quantity, category, price } = req.body;
            let { description, variants, image, extraOptions } = req.body;

            if (!extraOptions || extraOptions.length == 0) {
                extraOptions = [];
            }

            if (!variants) {
                variants = [];
            }
            if (!image) {
                image = " ";
            }
            if (!description) {
                description = " "
            }

            if (!name || !quantity || !category || (typeof product_type != "number" && product_type < 0 && product_type > 3) || !price) {
                res.status(400);
                throw new Error("Please enter all the fields");

            }
            const productExists = await Product.findOne({ name });
            if (productExists) {
                res.status(400);
                throw new Error("This Product already exists!");
            }

            //create an Product object in Product model
            const newProduct = await Product.create({
                name,
                product_type,
                variants,
                extraOptions,
                price,
                quantity,
                description,
                category,
                image

            })
            if (newProduct) {
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
                    success:true

                })

            } else {
                res.status(400);
                throw new Error("Product creation failed!");
            }

        } else {
            res.status(401);
            throw new Error("An unknown error occurred!");
        }
    } catch (error) {
        res.status(error.status);
        throw new Error("An unknown error occurred!");
    }



})


//function to update  pizza / pizza-crust / pizza-sauce / pizza-toppings / cheese
const updateProduct = async_handler(async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await User.findById(userId).select("-password");

        if (user.isAdmin == true) {
            const { name, product_type, variants, price, quantity, description, category, image } = req.body;
            const productId = req.params.id;
            const product = await Product.findById(productId);
            if (!product) {
                res.status(404);
                throw new Error("Product not found!");
            }

            let newProduct = {};
            if (name) { newProduct.name = name };
            if (typeof product_type == "number" && product_type >= 0 && product_type <= 3) { newProduct.product_type = product_type };
            if (variants) { newProduct.variants = variants };
            if (price) { newProduct.prices = price };
            if (typeof quantity == "number" && quantity > 0) { newProduct.quantity = quantity };
            if (description) { newProduct.description = description };
            if (category) { newProduct.category = category };
            if (image) { newProduct.image = image };

            const updatedProduct = await Product.findByIdAndUpdate(productId, { $set: newProduct }, { new: true });
            res.status(201).json({success:true}).send(updatedProduct);
        } else {
            res.status(404);
            throw new Error("An unknown error occurred!");
        }
    } catch (error) {
        res.status(error.status);
        throw new Error(error);
    }


})

//function to delete product
const deleteProduct = async_handler(async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await User.findById(userId).select("-password");
        if (user.isAdmin == true) {
            const productId = req.params.id;
            const product = await Product.findById(productId);
            if (!product) {
                res.status(404);
                throw new Error("Product not found!");

            }

            await Product.findOneAndDelete({ _id: productId });
            res.status(200).json({success:true}).send("Product Deleted Successfully!");
        } else {
            res.status(404);
            throw new Error("An unknown error occurred!");
        }

    } catch (error) {
        res.status(error.status);
        throw new Error(error);
    }

})


//function to view all products || everyone can
const getAllProducts = async_handler(async (req, res) => {
    try {
        const products = await Product.find({});
        res.status(200).send(products);

    } catch (error) {
        res.status(error.status);
        throw new Error("An unknown error occurred!");
    }

})

//function to view a single product || everyone can
const getSingleProduct = async_handler(async (req, res) => {
    try {
        const productId = req.params.id;

        const product = await Product.findById(productId);
        res.status(200).send(product);

    } catch (error) {
        res.status(error.status);
        throw new Error("An unknown error occurred!");
    }
})


module.exports = { getAllProducts, getSingleProduct, createProduct, updateProduct, deleteProduct };