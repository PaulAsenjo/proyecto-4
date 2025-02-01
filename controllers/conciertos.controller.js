const { v4 } = require("uuid");
const fs = require("fs");

const rutaArchivoBase = './models/basedeconciertos.json';


//MÉTODOS PARA ADMINISTRADOR

//GET 
const obtenerConciertos = (req, res) => {
    try {
        const conciertos = JSON.parse(fs.readFileSync(rutaArchivoBase, 'utf-8'));

        res.status(200).send({
        mensaje:"Conciertos disponibles",
        conciertos: conciertos
        });

    } catch(error) {
        console.error(error);
        res.status(500).send({mensaje:'Error al obtener los datos de conciertos'});

    }
};    


//GET-ID
const obtenerConciertoPorID = (req, res) => {
    try {
        const id = req.params.id;
        const conciertos = JSON.parse(fs.readFileSync(rutaArchivoBase, 'utf-8'));

        const concierto = conciertos.find((conc) => conc.id == id);

        if (concierto) {
            res.status(200).send({
                mensaje: "Concierto encontrado",
                concierto: concierto
            });
        } else {
            res.status(404).send({
                mensaje: "Concierto no encontrado"
            });
        };

    } catch (error) {
        console.error(error);
        res.status(500).send({ mensaje: 'Error al buscar el concierto por ID' });
    }
};


//POST
 const crearConcierto = (req, res) => {
    try {
        const datosConcierto = req.body
        const id = v4();

        const conciertos = JSON.parse(fs.readFileSync(rutaArchivoBase, 'utf-8'));

        conciertos.push({id: id, ...datosConcierto})

        fs.writeFileSync(rutaArchivoBase, JSON.stringify(conciertos));
       
        res.status(201).send({
            mensaje: "Concierto creado exitosamente",
            concierto: {
                id: id,
                ...datosConcierto
            }
        });

    } catch (error) {
        console.error(error);
        res.status(500).send({ mensaje: 'Error al crear el concierto' });
    }
};


//DELETE
const eliminarConcierto = (req, res) => {
     try {
        const id = req.params.id;

        const conciertos = JSON.parse(fs.readFileSync(rutaArchivoBase, 'utf-8'));

        const nuevoArregloDeConciertosSinEliminado = conciertos.filter((conc) => conc.id != id);

        if (nuevoArregloDeConciertosSinEliminado.length === conciertos.length) {
            return res.status(404).send({
                mensaje: "Concierto no encontrado para eliminar"
            });
        };

        fs.writeFileSync(rutaArchivoBase, JSON.stringify(nuevoArregloDeConciertosSinEliminado));

        res.status(200).send({
            mensaje: "Concierto eliminado",
            id: id
        });

    } catch (error) {
        console.error(error);
        res.status(500).send({ mensaje: 'Error al eliminar el concierto' });
    }
};


//PUT
const actualizarConcierto = (req, res) => {
    try{
        const id = req.params.id;
        const datosACambiar = req.body;

        const conciertos = JSON.parse(fs.readFileSync(rutaArchivoBase, 'utf-8'));

        const nuevoArregloConciertos = conciertos.map((conc) => {
            if (conc.id == id) {
                return { 
                    ...conc, 
                    ...datosACambiar };
            }
            return conc;
        });

        const conciertoActualizado = nuevoArregloConciertos.find((conc) => conc.id == id);

        if (!conciertoActualizado) {
            return res.status(404).send({
                mensaje: "Concierto no encontrado para actualizar"
            });
        };

        fs.writeFileSync(rutaArchivoBase, JSON.stringify(nuevoArregloConciertos));

        res.status(200).send({
            mensaje: "Concierto actualizado",
            concierto: { 
                id: id,
                ...datosACambiar 
            }
        });

    } catch (error) {
        console.error(error);
        res.status(500).send({ mensaje: 'Error al actualizar el concierto' });
    }
};


//PATCH CANCELAR concierto
const cancelarConcierto = (req, res) => {
    try {
        const id = req.params.id;
        const estadoACambiar = req.body;

        const conciertos = JSON.parse(fs.readFileSync(rutaArchivoBase, 'utf-8'));

        const nuevoArregloConciertos = conciertos.map((conc) => {
            if (conc.id == id) {
                return { 
                    ...conc, 
                    ...estadoACambiar 
                };
            }
            return conc;
        });

        const conciertoCancelado = nuevoArregloConciertos.find((conc) => conc.id == id);

        if (!conciertoCancelado) {
            return res.status(404).send({
                mensaje: "Concierto no encontrado para cancelar"
            });
        };

        fs.writeFileSync(rutaArchivoBase, JSON.stringify(nuevoArregloConciertos));

        res.status(200).send({
            mensaje: "Concierto CANCELADO",
            concierto: { 
                id: id, 
                ...estadoACambiar 
            }
        });

    } catch (error) {
        console.error(error);
        res.status(500).send({ mensaje: 'Error al cancelar el concierto' });
    }
};


//MÉTODOS PARA USUARIO

//GET por género
const obtenerConciertosPorGenero = (req, res) => {
    try {
        const generoABuscar = req.params.genero;

        const conciertos = JSON.parse(fs.readFileSync(rutaArchivoBase, 'utf-8'));

        const conciertosEncontrados = conciertos.filter((conc) => conc.genero === generoABuscar);

        if (conciertosEncontrados.length > 0) {
            res.status(200).send({
                mensaje: `Conciertos encontrados para el género ${generoABuscar}`,
                conciertos: conciertosEncontrados
            });
        } else {
            res.status(404).send({
                mensaje: `No se encontraron conciertos para el género ${generoABuscar}`
            });
        };

    } catch (error) {
        console.error(error);
        res.status(500).send({ mensaje: 'Error al obtener conciertos por género' });
    }
};
 


//GET por espacios inclusivos
const obtenerConciertosPorEI = (req, res) => {
    try {
        const inclusivoABuscar = req.params.inclusivo;

        const conciertos = JSON.parse(fs.readFileSync(rutaArchivoBase, 'utf-8'));

        const conciertosEncontrados = conciertos.filter((conc) => conc.inclusivo === inclusivoABuscar);

        if (conciertosEncontrados.length > 0) {
            res.status(200).send({
                mensaje: `Conciertos encontrados con espacios inclusivos ${inclusivoABuscar}`,
                conciertos: conciertosEncontrados
            });
        } else {
            res.status(404).send({
                mensaje: `No se encontraron conciertos con espacios inclusivos ${inclusivoABuscar}`
            });
        };

    } catch (error) {
        console.error(error);
        res.status(500).send({ mensaje: 'Error al obtener conciertos por espacios inclusivos' });
    }
};


//GET por lugar
const obtenerConciertosPorLugar = (req, res) => {
    try {
        const porLugarABuscar = req.params.lugar;

        const conciertos = JSON.parse(fs.readFileSync(rutaArchivoBase, 'utf-8'));

        const conciertosEncontrados = conciertos.filter((conc) => conc.lugar === porLugarABuscar);

        if (conciertosEncontrados.length > 0) {
            res.status(200).send({
                mensaje: `Conciertos encontrados en ${porLugarABuscar}`,
                conciertos: conciertosEncontrados
            });
        } else {
            res.status(404).send({
                mensaje: `No se encontraron conciertos en ${porLugarABuscar}`
            });
        };

    } catch (error) {
        console.error(error);
        res.status(500).send({ mensaje: 'Error al obtener conciertos por lugar' });
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
