const  expresso  =  requer ( "expresso" )

const  filmesRoutes  =  require ( "./routes/filmesRoutes" )
const  seriesRoutes  =  require ( "./routes/seriesRoutes" )


 aplicativo  const =  expresso ( )

app . use ( express . json ( ) )

app . use ( "/filmes" ,  filmesRoutes )
app . use ( "/series" ,  seriesRoutes )

módulo . exporta  =  aplicativo