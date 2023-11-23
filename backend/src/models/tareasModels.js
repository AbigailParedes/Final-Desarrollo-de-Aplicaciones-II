const mongoose = require('mongoose');

const tareaSchema = new mongoose.Schema({
    titulo : String,
    cuerpo : String,
    fecha: String,
    completado: Boolean
});

const Tarea = mongoose.model('tarea', tareaSchema);

module.exports = Tarea;
