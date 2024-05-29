const mongoose=require("mongoose");

const orderModel=mongoose.Schema(
    {
        customerId:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        items:{type:[
          {
            name:{type:String,required:true},
            category:{type:String,required:true}, // veg or non-veg
            variant:{type:String,required:true}, //size
            quantity:{type:Number,required:true},
            price:{type:Number,required:true}, 
          }

        ],required:true},
        address:{type:String,required:true},
        totalPrice:{type:Number,required:true},
        status:{type:Number,default:0}
    },
    {timestamps : true}
)

const Order=mongoose.model("Order",orderModel);

module.exports=Order;