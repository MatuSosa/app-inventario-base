const mongoose = require('mongoose');

const dns = require('dns');
dns.setServers(['8.8.8.8', '8.8.4.4']); // Fuerza a Node a usar el DNS de Google

const conectarDB = async () => {
  try {
    console.log('[DATABASE] Intentando conectar a MongoDB...');
    await mongoose.connect(process.env.MONGO_URI);
    console.log('[DATABASE] Conectado exitosamente a MongoDB Atlas');
  } catch (error) {
    console.error('[DATABASE ERROR] Fallo al conectar a la base de datos:', error.message);
    process.exit(1);
  }
};

module.exports = conectarDB;