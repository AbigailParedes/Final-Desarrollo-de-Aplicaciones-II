const express = require('express');

const tareaController = require('../controllers/tareaControlers');

const router = express.Router();

router.get('/tareas', tareaController.getTareas);
router.post('/tareas', tareaController.postTareas);
router.put('/tareas/:id', tareaController.updateTareas);
router.delete('/tareas/:id', tareaController.deleteTarea);

module.exports = router;