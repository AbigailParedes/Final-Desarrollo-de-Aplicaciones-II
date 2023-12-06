// Importaciones de los módulos necesarios
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Importación de las rutas definidas en el archivo index.js dentro de la carpeta routers
const routes = require('./src/routers/index');

// Creación de la aplicación Express
const app = express();
const port = 3000; // Puerto en el que se ejecutará el servidor

// Configuración de CORS
const corsOptions = {
  origin: '*', // Permitir solicitudes desde cualquier origen
  optionsSuccessStatus: 200,
};

// Aplicación de middleware para habilitar CORS y procesar datos en formato JSON
app.use(cors(corsOptions));
app.use(express.json());

// Conexión a la base de datos MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/todo');

const db = mongoose.connection;

db.on('error', (error) => {
  console.error('Error de conexión a MongoDB:', error);
});

db.once('open', () => {
  console.log('Conexión exitosa a MongoDB');
});

// Aplicación de las rutas definidas en el archivo index.js
app.use('/todo', routes);

// Inicio del servidor en el puerto especificado
app.listen(port, () => {
  console.log(`Servidor corriendo en el puerto ${port}`);
});
