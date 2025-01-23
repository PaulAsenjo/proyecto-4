require("dotenv").config();
const express = require("express");
const app = express();
const { v4 } = require("uuid");
const fs = require("fs");

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hola mundo');
  });

app.get('/usuarios',(req,res) => {
  res.send('otra cosa')
})

//Ruta GET 
app.get('/productos', (req, res) => {

    const productos = JSON.parse(fs.readFileSync('./basedeproductos.json', 'utf-8' ));

    res.send({
        mensaje:"Productos disponibles",
        productos: productos
    })
})

//Ruta GET Filtro x valor
app.get('/productos/:valor', (req, res) => {
    const valorABuscar = req.params.valor;

    const productos = JSON.parse(fs.readFileSync('./basedeproductos.json', 'utf-8' ));

    const productosFiltrados = productos.filter(producto => producto.valor === valorABuscar);
    
    fs.writeFileSync('./basedeproductos.json', JSON.stringify(productos));

    res.send({
        mensaje: "Productos con valor" ${valorABuscar},
        producto: producto
      })
});


//Ruta por ID
app.get('/productos/:id', (req, res) => {
    const id = req.params.id;

    const productos = JSON.parse(fs.readFileSync('./basedeproductos.json', 'utf-8'));

    const producto = productos.find((prod) => prod.id == id)

    if (producto) {
      res.send({
        mensaje: "Producto encontrado",
        producto: producto
      })
    } else {
      res.send({
        mensaje:"Producto no encontrado"
      })  
    }
})


//Ruta POST
app.post('/productos', (req, res) => {
    const datosProducto = req.body
    const id = v4();

    const productos = JSON.parse(fs.readFileSync('./basedeproductos.json', 'utf-8'));

    productos.push({id: id, ...datosProducto})

    fs.writeFileSync('./basedeproductos.json', JSON.stringify(productos));

    res.send({
        mensaje: "Producto creado",
        producto: {
            id: id,
            ...datosProducto
        }
    })
})


//Ruta DELETE
app.delete('/productos/:id', (req, res) => {
    const id = req.params.id;

    const productos = JSON.parse(fs.readFileSync('./basedeproductos.json', 'utf-8'));

    const nuevoArregloDeProductosSinEliminado = productos.filter((prod) => prod.id != id);

    fs.writeFileSync('./basedeproductos.json', JSON.stringify(nuevoArregloDeProductosSinEliminado));

    res.send({
        mensage: "Producto eliminado",
        id: id
    })
})


//Ruta PUT
app.put('/productos/:id', (req, res) => {
    const id = req.params.id;
    const datosACambiar = req.body;
    const productos = JSON.parse(fs.readFileSync('./basedeproductos.json', 'utf-8'));

    const nuevoArregloProductos = productos.map((prod) => {
      if (prod.id == id) {
        return {
            ...prod,
            ...datosACambiar
        }
    }
    return prod;
})

    fs.writeFileSync('./basedeproductos.json', JSON.stringify(nuevoArregloProductos));

    res.send({
      mensaje: "Producto actualizado",
      producto: {
         id: id,
         ...datosACambiar
      }
    })
})



const port = process.env.PORT
app.listen(port, () => {
    console.log(`Somos tan buenos que levantamos el servidor y está corriendo en el puerto ${port}`)
})