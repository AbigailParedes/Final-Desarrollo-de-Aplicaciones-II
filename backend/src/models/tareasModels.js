const mongoose = require('mongoose');

// Definición del esquema de la tarea
const tareaSchema = new mongoose.Schema({
    titulo : String,
    cuerpo : String,
    fecha: String,
    completado: Boolean
});

// Creación del modelo Tarea usando el esquema definido
const Tarea = mongoose.model('tarea', tareaSchema);

// Exportación del modelo Tarea para su uso en otras partes del código
module.exports = Tarea;
