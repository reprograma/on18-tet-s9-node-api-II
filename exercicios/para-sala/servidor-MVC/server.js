/* não preciso mais disso 
const express = require("express")
const app = express() */

//invoquei o meu app.js
const app = require("./src/app")

app.listen(1313, ()=>{
    console.log("opa! tamo aí no servidor MVC")
})