const express = require('express');
const fs = require('fs');
const path = require('path');
const os = require('os');

const app = express();
const PORT = process.env.PORT || 3000;
const CONTENT_FILE = path.join(__dirname, 'content.json');

// Middleware to parse JSON bodies and serve static files
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Helper to get local network IP address
function getLocalIpAddress() {
  const interfaces = os.networkInterfaces();
  for (const name of Object.keys(interfaces)) {
    for (const iface of interfaces[name]) {
      // Skip internal (loopback) and non-IPv4 addresses
      if (iface.family === 'IPv4' && !iface.internal) {
        return iface.address;
      }
    }
  }
  return 'localhost';
}

// Endpoint to get content
app.get('/api/content', (req, res) => {
  fs.readFile(CONTENT_FILE, 'utf8', (err, data) => {
    if (err) {
      // If file doesn't exist, we will return an error or empty structure
      return res.status(500).json({ error: 'No se pudo leer el archivo de contenido.' });
    }
    try {
      const parsedData = JSON.parse(data);
      res.json(parsedData);
    } catch (e) {
      res.status(500).json({ error: 'Error al parsear el contenido JSON.' });
    }
  });
});

// Endpoint to save content
app.post('/api/content', (req, res) => {
  const newContent = req.body;
  
  if (!newContent) {
    return res.status(400).json({ error: 'El contenido está vacío.' });
  }

  // Basic validation that we got a valid object
  if (typeof newContent !== 'object') {
    return res.status(400).json({ error: 'Formato de contenido inválido.' });
  }

  fs.writeFile(CONTENT_FILE, JSON.stringify(newContent, null, 2), 'utf8', (err) => {
    if (err) {
      console.error('Error al escribir content.json:', err);
      return res.status(500).json({ error: 'No se pudo guardar el contenido en el servidor.' });
    }
    console.log('Contenido actualizado correctamente por el administrador.');
    res.json({ success: true, message: '¡Guía publicada y actualizada para todos!' });
  });
});

// Start server
app.listen(PORT, '0.0.0.0', () => {
  const localIp = getLocalIpAddress();
  console.log(`==================================================`);
  console.log(` PORTAL DE CAJEROS - LA ESCALERA EXPRESS`);
  console.log(`==================================================`);
  console.log(` Servidor corriendo localmente en: http://localhost:${PORT}`);
  if (localIp !== 'localhost') {
    console.log(` Acceso desde otros cajeros/celulares en la misma red:`);
    console.log(` http://${localIp}:${PORT}`);
  }
  console.log(`==================================================`);
});
