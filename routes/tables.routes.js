const express = require("express");
const router = express.Router();

const tablesController = require('../controllers/tables.controllers');
const checkAuth = require('../middleware/check-auth');

router.post("/add",checkAuth,tablesController.ad);
router.put("/:id",checkAuth,tablesController.update);
router.get("/:tablid", checkAuth,tablesController.gettable);
router.post("/del",checkAuth,tablesController.delete);
router.post("/edit",checkAuth,tablesController.edit);
module.exports = router;