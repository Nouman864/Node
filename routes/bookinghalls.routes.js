const express = require("express");
const router = express.Router();

const bookedhallController = require('../controllers/bookinghalls.controllers');
const checkAuth = require('../middleware/check-auth');

// router.get("/", checkAuth,hotelController.getAll);
router.post("/book",checkAuth,  bookedhallController.book);
router.get("/:owner", checkAuth, bookedhallController.getbooking);
router.post("/marraige",checkAuth,  bookedhallController.gethal);
router.delete("/:id",checkAuth, bookedhallController.deletehall);
module.exports = router;