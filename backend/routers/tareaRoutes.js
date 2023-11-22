const express = require('express');
const router = express.Router();
const tareaController = require('../controllers/tareaControlers');
// Agrega rutas para crear, actualizar y eliminar tareas
router.get('/', tareaController.getTareas);
router.post('/tareas', tareaController.postTareas);

router.put('/tareas/:id', tareaController.updateTarea);
router.delete('/tareas/:id', tareaController.deleteTarea);

module.exports = router;
