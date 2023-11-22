const mongoose = require('mongoose');

const tareaEsquema = new mongoose.Schema({
  titulo: String,
  descripcion: String,
  fecha: Date,
  completado: Boolean
  // ... otros campos según tus necesidades
});

const Tarea = mongoose.model('Tarea', tareaEsquema);

module.exports = Tarea;