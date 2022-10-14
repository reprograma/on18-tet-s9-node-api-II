const controller = require("../controllers/seriesController");

const express = require("express");
const router = express.Router();

router.get("", controller.getAll);
router.get("/search", controller.getByGenre);

module.exports = router;