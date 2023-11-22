// controllers/tareaController.js (Lógica de Negocio)
const mongoose = require('mongoose');
const { ObjectId } = mongoose.Types; // Importa ObjectId desde mongoose.Types
const Tarea = require('../models/tarea');

// GET: Devuelve todas las tareas en la base de datos
const getTareas = async (req, res) => {
  try {
    const tareas = await Tarea.find({});
    res.status(200).json(tareas);
  } catch (error) {
    console.log(error);
    res.status(500).send('Error al obtener las tareas');
  }
};

// Implementa funciones similares para crear, actualizar y eliminar tareas
// POST: crea las tareas
const postTareas = async (req, res) => {
  try {
    const nuevaTarea = new Tarea(req.body);
    const guardarTarea = await nuevaTarea.save();
    res.status(201).json(guardarTarea);
  } catch (error) {
    console.log(error);
    res.status(500).send('Error al crear la tarea');
  }
};

// UPDATE: actualiza las tareas
const updateTarea = async (req, res) => {
  try {
    const tareaId = req.params.id;

    if (!ObjectId.isValid(tareaId)) {
      return res.status(400).json({ error: 'ID de tarea no válido' });
    }

    const actualizarTarea = await Tarea.findByIdAndUpdate(tareaId, req.body, { new: true });

    if (!actualizarTarea) {
      return res.status(404).json({ error: 'Tarea no encontrada' });
    }

    res.status(200).json(actualizarTarea);
  } catch (error) {
    console.log(error);
    res.status(500).send('Error al actualizar la tarea');
  }
};

// DELETE: Borra las tareas
const deleteTarea = async (req, res) => {
  try {
    await Tarea.findByIdAndDelete(req.params.id);
    res.send('Tarea eliminada correctamente');
  } catch (error) {
    console.log(error);
    res.status(500).send('Error al borrar la tarea');
  }
};

module.exports = {
  getTareas,
  postTareas,
  updateTarea,
  deleteTarea,
};
