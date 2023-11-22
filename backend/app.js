// app.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const PORT = 3000;

// Conexión a MongoDB
mongoose.connect('mongodb://localhost:27017/todo');
const db = mongoose.connection;

db.on('error', (error) => {
    console.error('Error de conexión a MongoDB:', error);
});

db.once('open', () => {
    console.log('Conexión exitosa a MongoDB');
});

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas
const tareaRoutes = require('./routers/tareaRoutes');
app.use('/todo', tareaRoutes);

// Manejo de errores
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Algo salió mal!');
});

// Inicio del servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
