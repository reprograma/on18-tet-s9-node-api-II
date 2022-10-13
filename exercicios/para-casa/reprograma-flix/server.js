const app = require("./src/app");

app.listen(8080, ()=>{
    console.log("servidor ativo")
})

/*


try{
    let filmesJson = await dbConnect();

} catch(error){
    response.status(500).json({message: error.message})
}


*/