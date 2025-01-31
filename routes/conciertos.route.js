const express = require("express");
const { obtenerConciertos, obtenerConciertoPorID, crearConcierto, eliminarConcierto, actualizarConcierto, cancelarConcierto, obtenerConciertosPorGenero, obtenerConciertosPorEI, obtenerConciertosPorLugar, obtenerConciertosPorRangoDeFechas } = require('../controllers/conciertos.controller.js');
const conciertosRouter = express.Router();

/**
 * @swagger
 * /conciertos:
 *   get:
 *     summary: Obtener todos los conciertos
 *     responses:
 *       200:
 *         description: Conciertos disponibles
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                   example: "Conciertos disponibles"
 *                 conciertos:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         example: "e4740ccd-4b2f-494a-ac11-5268f7482f29"
 *                       nombre:
 *                         type: string
 *                         example: "Ñengo Flow"
 *                       fecha:
 *                         type: string
 *                         format: date
 *                         example: "2025-03-23"
 *                       entradas disponibles:
 *                         type: integer
 *                         example: 7000
 *                       lugar:
 *                         type: string
 *                         example: "Movistar Arena"
 *                       genero:
 *                         type: string
 *                         example: "Reggaetón"
 *                       productora:
 *                         type: string
 *                         example: "Iguana"
 *                       inclusivo:
 *                         type: string
 *                         example: "Si"
 *                       estado:
 *                         type: string
 *                         example: "CANCELADO"
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                   example: "Error al obtener los conciertos"
 */
conciertosRouter.get('/', obtenerConciertos);

/**
 * @swagger
 * /conciertos/{id}:
 *   get:
 *     summary: Obtener un concierto por su ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del concierto
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Concierto encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                   example: "Concierto encontrado"
 *                 concierto:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: "e4740ccd-4b2f-494a-ac11-5268f7482f29"
 *                     nombre:
 *                       type: string
 *                       example: "Ñengo Flow"
 *       404:
 *         description: Concierto no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                   example: "Concierto no encontrado"
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                   example: "Error al buscar el concierto por ID"
 */
conciertosRouter.get('/:id', obtenerConciertoPorID);


/**
 * @swagger
 * /conciertos/genero/{genero}:
 *   get:
 *     summary: Obtener conciertos por género
 *     parameters:
 *       - in: path
 *         name: genero
 *         required: true
 *         description: Género de los conciertos a buscar
 *         schema:
 *           type: string
 *           example: "Reggaetón"
 *     responses:
 *       200:
 *         description: Conciertos encontrados para el género especificado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                   example: "Conciertos encontrados para el género Reggaetón"
 *                 conciertos:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         example: "e4740ccd-4b2f-494a-ac11-5268f7482f29"
 *                       nombre:
 *                         type: string
 *                         example: "Ñengo Flow"
 *       404:
 *         description: No se encontraron conciertos para el género especificado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                   example: "No se encontraron conciertos para el género Reggaetón"
 *       500:
 *         description: Error al obtener conciertos por género
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                   example: "Error al obtener conciertos por género"
 */
conciertosRouter.get('/genero/:genero', obtenerConciertosPorGenero);

/**
 * @swagger
 * /conciertos/inclusivo/{inclusivo}:
 *   get:
 *     summary: Obtener conciertos por espacios inclusivos
 *     parameters:
 *       - in: path
 *         name: inclusivo
 *         required: true
 *         description: Indicar si se busca conciertos con espacios inclusivos "Si" o "No"
 *         schema:
 *           type: string
 *           example: "Si"
 *     responses:
 *       200:
 *         description: Conciertos encontrados con espacios inclusivos
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                   example: "Conciertos encontrados con espacios inclusivos Si"
 *                 conciertos:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         example: "e4740ccd-4b2f-494a-ac11-5268f7482f29"
 *                       nombre:
 *                         type: string
 *                         example: "Ñengo Flow"
 *       404:
 *         description: No se encontraron conciertos con espacios inclusivos
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                   example: "No se encontraron conciertos con espacios inclusivos Si"
 *       500:
 *         description: Error al obtener conciertos por espacios inclusivos
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                   example: "Error al obtener conciertos por espacios inclusivos"
 */
conciertosRouter.get('/inclusivo/:inclusivo', obtenerConciertosPorEI);


/**
 * @swagger
 * /conciertos/lugar/{lugar}:
 *   get:
 *     summary: Obtener conciertos por lugar
 *     parameters:
 *       - in: path
 *         name: lugar
 *         required: true
 *         description: Lugar donde se realizará el concierto
 *         schema:
 *           type: string
 *           example: "Movistar Arena"
 *     responses:
 *       200:
 *         description: Conciertos encontrados en el lugar especificado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                   example: "Conciertos encontrados en Movistar Arena"
 *                 conciertos:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         example: "e4740ccd-4b2f-494a-ac11-5268f7482f29"
 *                       nombre:
 *                         type: string
 *                         example: "Ñengo Flow"
 *       404:
 *         description: No se encontraron conciertos en el lugar especificado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                   example: "No se encontraron conciertos en Movistar Arena"
 *       500:
 *         description: Error al obtener conciertos por lugar
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                   example: "Error al obtener conciertos por lugar"
 */
conciertosRouter.get('/lugar/:lugar', obtenerConciertosPorLugar);

/**
 * @swagger
 * /conciertos/fecha/{fechaInicio}/{fechaFin}:
 *   get:
 *     summary: Obtener conciertos por rango de fechas
 *     parameters:
 *       - in: path
 *         name: fechaInicio
 *         required: true
 *         description: Fecha de inicio en formato YYYY-MM-DD
 *         schema:
 *           type: string
 *           example: "2025-03-01"
 *       - in: path
 *         name: fechaFin
 *         required: true
 *         description: Fecha de fin en formato YYYY-MM-DD
 *         schema:
 *           type: string
 *           example: "2025-06-01"
 *     responses:
 *       200:
 *         description: Conciertos encontrados en el rango de fechas especificado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                   example: "Conciertos encontrados entre 2025-03-01 y 2025-06-01"
 *                 conciertos:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         example: "e4740ccd-4b2f-494a-ac11-5268f7482f29"
 *                       nombre:
 *                         type: string
 *                         example: "Ñengo Flow"
 *       404:
 *         description: No se encontraron conciertos en el rango de fechas especificado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                   example: "No se encontraron conciertos entre 2025-03-01 y 2025-06-01"
 *       500:
 *         description: Error al obtener conciertos por rango de fechas
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                   example: "Error al leer los datos de conciertos"
 */
conciertosRouter.get('/fecha/:fechaInicio/:fechaFin', obtenerConciertosPorRangoDeFechas);

/**
 * @swagger
 * /conciertos:
 *   post:
 *     summary: Crear un nuevo concierto
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *                 example: "Nuevo Concierto"
 *               fecha:
 *                 type: string
 *                 format: date
 *                 example: "2025-06-15"
 *               entradas disponibles:
 *                 type: integer
 *                 example: 5000
 *               lugar:
 *                 type: string
 *                 example: "Teatro Caupolicán"
 *               genero:
 *                 type: string
 *                 example: "Pop"
 *               productora:
 *                 type: string
 *                 example: "SA producciones"
 *               inclusivo:
 *                 type: string
 *                 example: "Si"
 *     responses:
 *       201:
 *         description: Concierto creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                   example: "Concierto creado exitosamente"
 *                 concierto:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: "b075369e-f593-4b33-ad63-1e9138ffb6f3"
 *       500:
 *         description: Error al crear el concierto
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                   example: "Error al crear el concierto"
 */
conciertosRouter.post('/', crearConcierto);

/**
 * @swagger
 * /conciertos/{id}:
 *   delete:
 *     summary: Eliminar un concierto por su ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del concierto
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Concierto eliminado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                   example: "Concierto eliminado"
 *                 id:
 *                   type: string
 *                   example: "e4740ccd-4b2f-494a-ac11-5268f7482f29"
 *       404:
 *         description: Concierto no encontrado para eliminar
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                   example: "Concierto no encontrado para eliminar"
 *       500:
 *         description: Error al eliminar el concierto
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                   example: "Error al eliminar el concierto"
 */
conciertosRouter.delete('/:id', eliminarConcierto);
/**
 * @swagger
 * /conciertos/{id}:
 *   put:
 *     summary: Actualizar un concierto por su ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del concierto
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *                 example: "Nuevo nombre del concierto"
 *               fecha:
 *                 type: string
 *                 format: date
 *                 example: "2025-06-15"
 *     responses:
 *       200:
 *         description: Concierto actualizado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                   example: "Concierto actualizado"
 *                 concierto:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: "e4740ccd-4b2f-494a-ac11-5268f7482f29"
 *       404:
 *         description: Concierto no encontrado para actualizar
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                   example: "Concierto no encontrado para actualizar"
 *       500:
 *         description: Error al actualizar el concierto
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                   example: "Error al actualizar el concierto"
 */
conciertosRouter.put('/:id', actualizarConcierto);

/**
 * @swagger
 * /conciertos/{id}/cancelar:
 *   patch:
 *     summary: Cancelar un concierto por su ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del concierto
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               estado:
 *                 type: string
 *                 example: "CANCELADO"
 *     responses:
 *       200:
 *         description: Concierto cancelado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                   example: "Concierto CANCELADO"
 *                 concierto:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: "e4740ccd-4b2f-494a-ac11-5268f7482f29"
 *       404:
 *         description: Concierto no encontrado para cancelar
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                   example: "Concierto no encontrado para cancelar"
 *       500:
 *         description: Error al cancelar el concierto
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                   example: "Error al cancelar el concierto"
 */
conciertosRouter.patch('/:id', cancelarConcierto);


module.exports = conciertosRouter;