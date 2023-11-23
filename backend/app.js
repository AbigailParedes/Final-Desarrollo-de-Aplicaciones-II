const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const routes = require('./src/routers/index');

const app = express();
const port = 3000;

// Configuración de CORS
const corsOptions = {
  origin: '*', // Permitir solicitudes desde cualquier origen
  optionsSuccessStatus: 200,
};


app.use(cors(corsOptions));
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/todo');

const db = mongoose.connection;

db.on('error', (error) => {
  console.error('Error de conexión a MongoDB:', error);
});

db.once('open', () => {
  console.log('Conexión exitosa a MongoDB');
});

app.use('/upso', routes);

app.listen(port, () => {
  console.log(`Servidor corriendo en el puerto ${port}`);
});
