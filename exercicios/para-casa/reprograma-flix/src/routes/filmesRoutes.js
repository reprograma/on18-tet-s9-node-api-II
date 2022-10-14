const controller = require("../controllers/filmesController");

const express = require("express");

const router = express.Router();

router.get("/pesquisar", controller.getAll);
router.get("/pesquisar/:id", controller.getById);
router.put("/update/generico/:id", controller.updateGenerico);
router.get("/genero", controller.getByGenre);
router.get("/pesquisar/titulo", controller.getByTitle);
router.patch("/editar/:id", controller.patchEditar);
router.post("/cadastrar", controller.postByFilme);
module.exports = router;