const { Pool } = require("pg");
require('dotenv').config();

// Verifica que las variables estén bien cargadas
console.log("Host:", process.env.DB_HOST);
console.log("User:", process.env.DB_USER);
console.log("Password:", process.env.DB_PASSWORD ? "conectado" : "error");
console.log("Database:", process.env.DB_NAME);
console.log("Port:", process.env.DB_PORT);

// Configuración usando variables de entorno
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: parseInt(process.env.DB_PORT, 10)
});

module.exports = pool;
