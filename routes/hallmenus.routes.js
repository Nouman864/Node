const express = require("express");
const router = express.Router();

const hallController = require('../controllers/hallmenus.controllers');
const checkAuth = require('../middleware/check-auth');

// router.get("/", checkAuth,hotelController.getAll);
router.post("/add",checkAuth,hallController.add);
router.get("/:restrnid", checkAuth,hallController.getmenu);
router.post("/hal",checkAuth,hallController.get);
//  router.get("/:owner", checkAuth,hotelController.getHotel);
//  router.put("/:id", checkAuth,hotelController.updateHotel);
// router.delete("/:id",checkAuth, hotelController.deletehotel);
module.exports = router;
