/*const express = require("express")
const app = express()*/

//SUBSTITUI AS DUAS LINHAS POR
const app = require("./src/app")

app.listen(7070, () => {
    console.log("Opa, rodou!")
})