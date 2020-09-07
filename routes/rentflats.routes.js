const express = require("express");
const router = express.Router();

const rentController = require('../controllers/rentflats.controllers');
const checkAuth = require('../middleware/check-auth');

//router.get("/", checkAuth,flatController.getAll);
router.post("/add",checkAuth,rentController.rentflat);
router.post("/customer",checkAuth,rentController.newcustomer);
router.post("/token",checkAuth,rentController.newtoken);
// router.post("/review",checkAuth,flatController.addreview);
// router.get("/:owner", checkAuth,flatController.getFlat);
// router.put("/:id", checkAuth,flatController.updateBook);
// router.delete("/:id",checkAuth, flatController.deleteBook);
module.exports = router;
  