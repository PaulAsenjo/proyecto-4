const { v4 } = require("uuid");
const fs = require("fs");

const rutaArchivoBase = './models/basedeconciertos.json';


//MÉTODOS PARA ADMINISTRADOR

//GET 
const obtenerConciertos = (req, res) => {

    const conciertos = JSON.parse(fs.readFileSync(rutaArchivoBase, 'utf-8'));

    res.send({
        mensaje:"Conciertos disponibles",
        conciertos: conciertos
    })
}


//GET-ID
const obtenerConciertoPorID = (req, res) => {
    const id = req.params.id;

    const conciertos = JSON.parse(fs.readFileSync(rutaArchivoBase, 'utf-8'));

    const concierto = conciertos.find((conc) => conc.id == id)

    if (concierto) {
      res.send({
        mensaje: "Concierto encontrado",
        concierto: concierto
      })
    } else {
      res.send({
        mensaje:"Concierto no encontrado"
      })  
    }
}


//POST
 const crearConcierto = (req, res) => {
    const datosConcierto = req.body
    const id = v4();

    const conciertos = JSON.parse(fs.readFileSync(rutaArchivoBase, 'utf-8'));

    conciertos.push({id: id, ...datosConcierto})

    fs.writeFileSync(rutaArchivoBase, JSON.stringify(conciertos));

    res.send({
        mensaje: "Concierto creado",
        concierto: {
            id: id,
            ...datosConcierto
        }
    })
}


//DELETE
const eliminarConcierto = (req, res) => {
    const id = req.params.id;

    const conciertos = JSON.parse(fs.readFileSync(rutaArchivoBase, 'utf-8'));

    const nuevoArregloDeConciertosSinEliminado = conciertos.filter((conc) => conc.id != id);

    fs.writeFileSync(rutaArchivoBase, JSON.stringify(nuevoArregloDeConciertosSinEliminado));

    res.send({
        mensage: "Concierto eliminado",
        id: id
    })
}


//PUT
const actualizarConcierto = (req, res) => {
    const id = req.params.id;
    const datosACambiar = req.body;
    const conciertos = JSON.parse(fs.readFileSync(rutaArchivoBase, 'utf-8'));

    const nuevoArregloConciertos = conciertos.map((conc) => {
      if (conc.id == id) {
        return {
            ...conc,
            ...datosACambiar
        }
    }
    return conc;
})

    fs.writeFileSync(rutaArchivoBase, JSON.stringify(nuevoArregloConciertos));

    res.send({
      mensaje: "Concierto actualizado",
      concierto: {
         id: id,
         ...datosACambiar
      }
    })
}


//PATCH CANCELAR concierto
const cancelarConcierto = (req, res) => {
  const id = req.params.id;
  const estadoACambiar = req.body;
  const conciertos = JSON.parse(fs.readFileSync(rutaArchivoBase, 'utf-8'));

  const nuevoArregloConciertos = conciertos.map((conc) => {
    if (conc.id == id) {
      return {
          ...conc,
          ...estadoACambiar
      }
  }
  return conc;
})

  fs.writeFileSync(rutaArchivoBase, JSON.stringify(nuevoArregloConciertos));

  res.send({
    mensaje: "Concierto CANCELADO",
    concierto: {
       id: id,
       ...estadoACambiar
    }
  })
}


//MÉTODOS PARA USUARIO

//GET por género
const obtenerConciertosPorGenero = (req, res) => {
    const generoABuscar = req.params.genero

    const conciertos = JSON.parse(fs.readFileSync(rutaArchivoBase, 'utf-8'));

    const conciertosEncontrados = conciertos.filter((conc) => conc.genero === generoABuscar);

    if (conciertosEncontrados.length > 0) {
        res.send({
            mensaje: `Conciertos encontrados para el género ${generoABuscar}`,
            conciertos: conciertosEncontrados
        });
    } else {
        res.send({
            mensaje: `No se encontraron conciertos para el género ${generoABuscar}`
        });
    }
};  


//GET por espacios inclusivos
const obtenerConciertosPorEI = (req, res) => {
  const inclusivoABuscar = req.params.inclusivo

  const conciertos = JSON.parse(fs.readFileSync(rutaArchivoBase, 'utf-8'));

  const conciertosEncontrados = conciertos.filter((conc) => conc.inclusivo === inclusivoABuscar);

  if (conciertosEncontrados.length > 0) {
      res.send({
          mensaje: `Conciertos encontrados con espacios inclusivos ${inclusivoABuscar}`,
          conciertos: conciertosEncontrados
      });
  } else {
      res.send({
          mensaje: `No se encontraron conciertos con espacios inclusivos ${inclusivoABuscar}`
      });
  }
}; 


//GET por lugar
const obtenerConciertosPorLugar = (req, res) => {
  const porLugarABuscar = req.params.lugar

  const conciertos = JSON.parse(fs.readFileSync(rutaArchivoBase, 'utf-8'));

  const conciertosEncontrados = conciertos.filter((conc) => conc.lugar === porLugarABuscar);

  if (conciertosEncontrados.length > 0) {
      res.send({
          mensaje: `Conciertos encontrados en ${porLugarABuscar}`,
          conciertos: conciertosEncontrados
      });
  } else {
      res.send({
          mensaje: `No se encontraron conciertos en ${porLugarABuscar}`
      });
  }
}; 


//GET por fecha
const obtenerConciertosPorRangoDeFechas = (req, res) => {
  const { fechaInicio, fechaFin } = req.params;

  // Validar formato de fechas
  const inicio = new Date(fechaInicio);
  const fin = new Date(fechaFin);

  if (isNaN(inicio) || isNaN(fin)) {
      return res.status(400).send({ mensaje: 'Fechas inválidas. Use el formato YYYY-MM-DD.' });
  }

  try {
      const conciertos = JSON.parse(fs.readFileSync(rutaArchivoBase, 'utf-8')) || [];

      // Filtrar conciertos en el rango
      const conciertosEncontrados = conciertos.filter((conc) => {
          const fechaConcierto = new Date(conc.fecha);
          return fechaConcierto >= inicio && fechaConcierto <= fin;
      });

      res.send({
          mensaje: conciertosEncontrados.length > 0 
              ? `Conciertos encontrados entre ${fechaInicio} y ${fechaFin}` 
              : `No se encontraron conciertos entre ${fechaInicio} y ${fechaFin}`,
          conciertos: conciertosEncontrados,
      });
  } catch (error) {
      console.error(error);
      res.status(500).send({ mensaje: 'Error al leer los datos de conciertos.' });
  }
};



module.exports = {
    obtenerConciertos,
    obtenerConciertoPorID,
    crearConcierto,
    eliminarConcierto,
    actualizarConcierto,
    cancelarConcierto,
    obtenerConciertosPorGenero,
    obtenerConciertosPorEI,
    obtenerConciertosPorLugar,
    obtenerConciertosPorRangoDeFechas
}