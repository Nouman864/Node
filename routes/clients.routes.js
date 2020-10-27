const express = require("express");
const router = express.Router();

const ClientController = require('../controllers/clients.controllers');
router.post("/login",ClientController.loginUser);
router.post("/signup",ClientController.registerUser);
router.get("/clientverify/:email",ClientController.verifyUser);
router.post("/clientpass",ClientController.clientpass);
router.post("/pay",ClientController.payme);
router.get("/:ownerr",ClientController.getclient);
// router.get("/:_id",UserController.getSingleUser);
// // router.post("/",UserController.addUser);
// router.put("/:_id", UserController.updateUser);
// router.delete("/:_id", UserController.deleteUser);
// router.post("/verify",UserController.verifyUser);
// router.post("/updatepass",UserController.updatepass);
// router.get("/",UserController.sampleUser);
//router.get("/",UserController.getAll);
//router.post("/login",UserController.loginUser);
//router.post("/signup",UserController.registerUser);
//router.get("/:_id",UserController.getSingleUser);
// router.post("/",UserController.addUser);
//router.put("/:_id", UserController.updateUser);
//router.delete("/:_id", UserController.deleteUser);


module.exports = router;