const express = require("express");
const router = express.Router();
const calController = require("../controllers/cal");
const { ensureAuth, ensureGuest } = require("../middleware/auth");


router.get("/", ensureAuth, calController.get);

router.post("/", calController.post);

router.delete("/:id", calController.delete);

module.exports = router;