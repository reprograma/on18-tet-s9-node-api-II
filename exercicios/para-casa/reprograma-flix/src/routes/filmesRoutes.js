const express = require("express");
const controller = require("../controllers/filmesController");

const router = express.Router();

router.get("/", controller.get);
router.post("/", controller.post);
router.patch("/", controller.patch);
router.put("/", controller.put);

module.exports = router;
