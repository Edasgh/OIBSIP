const express = require("express");
const { createProduct, updateProduct, deleteProduct, getAllProducts, getSingleProduct } = require("../controllers/product");
const fetchUser = require("../middlewares/authMiddlewares");
const router=express.Router();

router.post("/create",fetchUser,createProduct);
router.put("/:id/update",fetchUser,updateProduct);
router.delete("/:id/delete",fetchUser,deleteProduct);
router.get("/view_products",fetchUser,getAllProducts);
router.get("/view_products/:id",fetchUser,getSingleProduct);


module.exports=router;