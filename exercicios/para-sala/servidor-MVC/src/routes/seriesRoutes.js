const controller = require("../controllers/seriesControllers")

const express = require("express")
const router = express.Router()

router.get("/catalogo", controller.getAll)

module.exports = router