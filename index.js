require("dotenv").config();
const express = require("express");
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const app = express();
const conciertosRouter = require('./routes/conciertos.route.js');

const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'API de Conciertos',
      description: 'API para gestionar conciertos',
      version: '1.0.0',
    },
    servers: [
      {
        url: 'http://localhost:9000', 
      },
    ],
  },
  apis: ['./routes/conciertos.route.js'], 
};

const swaggerDocs = swaggerJSDoc(swaggerOptions);
console.log(swaggerDocs);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use(express.json());

app.use('/conciertos', conciertosRouter);


// app.get('/', (req, res) => {
    // res.send('Hola amiguitos');
  // });


const port = process.env.PORT
app.listen(port, () => {
    console.log(`Somos tan buenos que levantamos el servidor y está corriendo en el puerto ${port}`)
    console.log(`Documentación de la API: http://localhost:${port}/api-docs`);
})
