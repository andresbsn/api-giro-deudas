const express = require('express');
const cors = require('cors');
require('dotenv').config();

const datosRoutes = require('./routes/datosroutes');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Logging de requests
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// Rutas
app.use('/api/datos', datosRoutes);

// Health check
app.get('/health', (req, res) => {
  res.json({
    success: true,
    message: 'API funcionando correctamente',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV
  });
});

// Manejo de rutas no encontradas - FORMA CORRECTA
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: 'Endpoint no encontrado',
    path: req.path,
    method: req.method
  });
});

// Manejo de errores global
app.use((error, req, res, next) => {
  console.error('Error global:', error);
  res.status(500).json({
    success: false,
    error: 'Error interno del servidor'
  });
});

module.exports = app;