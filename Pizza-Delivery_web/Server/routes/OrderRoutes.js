const express = require("express");
const fetchUser = require("../middlewares/fetchUser");
const { placeOrder, viewOrder, viewAllOrders, updateOrderStatus, deleteOrder } = require("../controllers/order");
const router = express.Router();

//By logged in user
// place order, view a single order , view all orders (placed by the user itself)
router.post("/place_order",fetchUser,placeOrder); 
router.get("/view_orders/:id",fetchUser,viewOrder); //id=orderId
router.delete("/delete_order/:id",fetchUser,deleteOrder);//id=orderId
router.get("/view_orders",fetchUser,viewAllOrders);

//update order status (of any user) //only by admin
router.put("/:id/update_status",fetchUser,updateOrderStatus);




module.exports=router;