const controller = require("../controllers/seriesController")

const express = require ("express")
const router = express.Router()

router.get("/catalago", controller.getAll)

module.exports = router