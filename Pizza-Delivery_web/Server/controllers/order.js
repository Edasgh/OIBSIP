const async_handler = require("express-async-handler");

const Order = require("../models/Ordermodel");


//function to place an order by a single logged in user
const placeOrder=async_handler(async(req,res)=>{

})

//function to view all orders of a single logged in user || and logged in admin
const viewOrder=async_handler(async(req,res)=>{

})


//function to view all orders of an user || and of all users by logged in admin 
const viewAllOrders=async_handler(async(req,res)=>{

})

//update order status : only by admin
const updateOrderStatus=async_handler(async(req,res)=>{

})


module.exports={placeOrder,viewOrder,viewAllOrders,updateOrderStatus};
