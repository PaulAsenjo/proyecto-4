require("dotenv").config();
const express = require("express");
const app = express();
const conciertosRouter = require('./routes/conciertos.route');



app.use(express.json());

app.use('/conciertos', conciertosRouter);


app.get('/', (req, res) => {
    res.send('Hola amiguitos');
  });



const port = process.env.PORT
app.listen(port, () => {
    console.log(`Somos tan buenos que levantamos el servidor y está corriendo en el puerto ${port}`)
})