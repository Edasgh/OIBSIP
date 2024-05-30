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
            variant:{type:{
              name : {type:String,required:true},
              price : {type:Number,required:true}
            },required:true}, //size ||  0-> Small , 1-> Medium, 2-> Full
            quantity:{type:Number,required:true},
            price:{type:Number,required:true}, 
          }

        ],required:true},
        address:{type:String,required:true},
        totalPrice:{type:Number,required:true},
        status:{type:Number,default:0} // 0-> Order Placed , 1-> Packed , 2-> Out for delivery , 3->Delivered
    },
    {timestamps : true}
)

const Order=mongoose.model("Order",orderModel);

module.exports=Order;