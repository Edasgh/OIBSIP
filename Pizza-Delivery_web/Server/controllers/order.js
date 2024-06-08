const dotenv = require("dotenv");
dotenv.config();

const async_handler = require("express-async-handler");

const Order = require("../models/Ordermodel");
const User = require("../models/Usermodel");

const Razorpay = require("razorpay");
const instance = new Razorpay({
    key_id: process.env.KEY_ID,
    key_secret: process.env.KEY_SECRET,
})



//function to place an order by a single logged in user
const placeOrder = async_handler(async (req, res) => {
    try {
        let customerId,  paymentDone;
        let { items, address, totalPrice } = req.body;
        paymentDone = true;
        const userId = req.user.id; // will be used as customerId | we need token here
        const user = await User.findById(userId).select("-password");
        if (user) {
            customerId = userId;
           
            if (!address) {
                address = user.address;
            }
            //payment gateway : due
            const options = {
                amount: totalPrice,  
                currency: "INR",
                receipt: user.email
            };
            let pmt = await instance.orders.create(options)
            if (pmt.amount == pmt.amount_paid) {
                paymentDone = true;
            }
            if (paymentDone) {
                const newOrder = await Order.create({
                    customerId,
                    items,
                    address,
                    totalPrice
                })

                if (newOrder) {
                    res.status(201).json({
                        _id: newOrder._id,
                        items: newOrder.items,
                        totalPrice: newOrder.totalPrice,
                        address: newOrder.address,
                        customerId: newOrder.customerId
                    })
                } else {
                    res.status(400);
                    throw new Error("Failed to place order !");
                }
            } else {
                res.status(404);
                throw new Error("Payment not done yet!");
            }


        } else {
            res.status(401);
            throw new Error("Can't view user details");
        }

    } catch (error) {
        res.status(401);
        throw new Error(error);
    }
})

//function to view all orders of a single logged in user || and logged in admin
const viewOrder = async_handler(async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await User.findById(userId).select("-password");
        const orderId = req.params.id;
        const order = await Order.findById(orderId);
        if (user) {
            if (user.isAdmin == true) {
                if (order) {
                    res.status(200).send(order);
                } else {
                    res.status(404);
                    throw new Error("This order doesn't exist!");
                }

            } else {
                if (order.customerId == userId) {
                    res.status(200).send(order);
                } else {
                    res.status(404);
                    throw new Error("Not Found!");
                }
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

//function to delete order of a single logged in user
const deleteOrder = async_handler(async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await User.findById(userId).select("-password");
        const orderId = req.params.id;
        const order = await Order.findById(orderId);
        if (user) {

            if (order && order.customerId == userId) {
                await Order.findOneAndDelete({ _id: orderId });
                res.status(200).send("Order Deleted Successfully!");
            } else {
                res.status(404);
                throw new Error("Order Not Found!");
            }

        } else {
            res.status(404);
            throw new Error("Can't find user!");
        }

    } catch (error) {
        res.status(404);
        throw new Error(error);
    }
})

//function to view all orders of an user || and of all users by logged in admin 
const viewAllOrders = async_handler(async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await User.findById(userId).select("-password");
        let orders;
        if (user) {
            if (user.isAdmin == true) {
                orders = await Order.find({});
            } else if (user.isAdmin == false) {
                orders = await Order.find({ customerId: userId });
            }
            if (orders) {
                res.status(200).send(orders);
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

//update order status : only by admin
const updateOrderStatus = async_handler(async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await User.findById(userId).select("-password");
        const orderId = req.params.id;
        const order = await Order.findById(orderId);
        const { status } = req.body;
        let newOrder = {};
        if (user && user.isAdmin == true) {
            if (typeof status !== "undefined" || typeof status !== null) { (newOrder.status = status); };
            const updatedOrder = await Order.findByIdAndUpdate(orderId, { $set: newOrder }, { new: true })
            res.status(201).send(updatedOrder);
        } else {
            res.status(404);
            throw new Error("An unknown error occurred!");
        }
    } catch (error) {
        res.status(401);
        throw new Error(error);
    }
})


module.exports = { placeOrder, viewOrder, viewAllOrders, deleteOrder, updateOrderStatus };
