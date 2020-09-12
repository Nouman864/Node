const express = require("express");
const router = express.Router();

const menusController = require('../controllers/menus.controllers');
const checkAuth = require('../middleware/check-auth');

router.post("/add",checkAuth,menusController.ad);
router.put("/:id",checkAuth,menusController.update);
router.get("/:restrnid", checkAuth,menusController.getmenu);
module.exports = router;