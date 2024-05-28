const express = require("express");
const { registerUser, loginUser, getUser, updateUser, changePassword } = require("../controllers/auth");
const  fetchUser  = require("../middlewares/authMiddlewares");
const User = require("../models/Usermodel");
const router = express.Router();

router.post("/signup",registerUser);
router.post("/login",loginUser);
router.get("/",fetchUser,getUser);
router.put("/edit_details",fetchUser,updateUser);
router.put("/change_password",fetchUser,changePassword);

module.exports = router;