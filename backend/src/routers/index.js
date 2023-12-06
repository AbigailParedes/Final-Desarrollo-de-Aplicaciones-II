const express = require('express');

// Importación del controlador de tareas
const tareaController = require('../controlers/tareaControllers');

// Creación de un enrutador utilizando Express
const router = express.Router();

// Definición de las rutas para las operaciones CRUD
router.get('/tareas', tareaController.getTareas);
router.post('/tareas', tareaController.postTareas);
router.put('/tareas/:id', tareaController.updateTareas);
router.delete('/tareas/:id', tareaController.deleteTarea);

// Exportación del enrutador para su uso en otras partes del código
module.exports = router;
