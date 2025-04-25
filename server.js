// server.js

const express = require('express');
const fs = require('fs');
const path = require('path');
require('dotenv').config(); // Para poder usar variables de entorno (.env)

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para permitir CORS (importante si tu tienda está en otro dominio)
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*'); // Permitir cualquier origen
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// Ruta principal para probar
app.get('/', (req, res) => {
  res.send('API PaMiCasa Online 🏪');
});

// Ruta para obtener los productos
app.get('/api/productos', (req, res) => {
  const productosPath = path.join(__dirname, 'productos.json');

  fs.readFile(productosPath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error al leer productos:', err);
      return res.status(500).json({ error: 'No se pudieron leer los productos' });
    }
    
    try {
      const productos = JSON.parse(data);
      res.json(productos);
    } catch (parseErr) {
      console.error('Error al parsear productos:', parseErr);
      res.status(500).json({ error: 'Error de formato en productos.json' });
    }
  });
});

// Levantar servidor
app.listen(PORT, () => {
  console.log(`Servidor API escuchando en http://localhost:${PORT}`);
});
