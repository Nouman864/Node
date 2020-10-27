const express = require("express");
const router = express.Router();

const rentController = require('../controllers/rentflats.controllers');
const checkAuth = require('../middleware/check-auth');


router.post("/add",checkAuth,rentController.rentflat);
router.post("/customer",checkAuth,rentController.newcustomer);
 router.post("/token",checkAuth,rentController.newtoken);
router.post("/notify",checkAuth,rentController.notification);
router.get("/:rent", checkAuth,rentController.getrent);
router.delete("/:id",checkAuth, rentController.deleteflat);
router.post("/flat",checkAuth,rentController.flat);

module.exports = router;
  