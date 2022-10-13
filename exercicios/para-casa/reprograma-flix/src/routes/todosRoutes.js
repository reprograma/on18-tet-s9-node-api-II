const controller = require("../controllers/todosRoutes")
const express = require("express")
const router = express.Router()
//router+HTTP -> função
router.get("/catalogo",controller.getAllBoth)
//exportar
module.exports = router