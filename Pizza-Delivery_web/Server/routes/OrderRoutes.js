const express = require("express");
const fetchUser = require("../middlewares/authMiddlewares");
const isAdmin = require("../middlewares/authMiddlewares");
const { placeOrder, viewOrder, viewAllOrders, updateOrderStatus } = require("../controllers/order");
const router = express.Router();

//By logged in user
// place order, view a single order , view all orders (placed by the user itself)
router.post("/:id/place_order",fetchUser,placeOrder); //id=productId
router.get("/view_orders/:id",fetchUser,viewOrder); //id=orderId
router.get("/view_orders",fetchUser,viewAllOrders);
//Only by logged in admin
// view all orders (of all users) and a single order (placed by any user)
router.get("/view_orders",isAdmin,viewAllOrders);
router.get("/view_orders/:id",isAdmin,viewOrder);
//update order status (of any user)
router.put("/:id/update_status",isAdmin,updateOrderStatus);




module.exports=router;