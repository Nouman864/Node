const express = require("express");
const router = express.Router();

const hallController = require('../controllers/halls.controllers');
const checkAuth = require('../middleware/check-auth');

// router.get("/", checkAuth,hotelController.getAll);
router.post("/add",checkAuth,hallController.addhall);
router.get("/:owner", checkAuth,hallController.gethall);
router.delete("/:id",checkAuth, hallController.deletehall);
router.put("/:id", checkAuth,hallController.updatehall);
//  router.get("/:owner", checkAuth,hotelController.getHotel);
//  router.put("/:id", checkAuth,hotelController.updateHotel);
// router.delete("/:id",checkAuth, hotelController.deletehotel);
module.exports = router;
