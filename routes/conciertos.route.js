const express = require("express");
const { obtenerConciertos, obtenerConciertoPorID, crearConcierto, eliminarConcierto, actualizarConcierto, cancelarConcierto, obtenerConciertosPorGenero, obtenerConciertosPorEI, obtenerConciertosPorLugar, obtenerConciertosPorRangoDeFechas } = require('../controllers/conciertos.controller');
const conciertosRouter = express.Router();

conciertosRouter.get('/', obtenerConciertos)
conciertosRouter.get('/:id', obtenerConciertoPorID)
conciertosRouter.get('/genero/:genero', obtenerConciertosPorGenero)
conciertosRouter.get('/inclusivo/:inclusivo', obtenerConciertosPorEI)
conciertosRouter.get('/lugar/:lugar', obtenerConciertosPorLugar)
conciertosRouter.get('/fecha/:fechaInicio/:fechaFin', obtenerConciertosPorRangoDeFechas)
conciertosRouter.post('/', crearConcierto)
conciertosRouter.delete('/:id', eliminarConcierto)
conciertosRouter.put('/:id', actualizarConcierto)
conciertosRouter.patch('/:id', cancelarConcierto)

module.exports = conciertosRouter;