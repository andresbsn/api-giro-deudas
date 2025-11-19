const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'postgres',
  port: process.env.DB_PORT || 5432,
  max: 20, // máximo de conexiones
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 60000,
  ssl: process.env.DB_SSL ? { rejectUnauthorized: false } : false
});

// Verificar conexión
const testConnection = async () => {
  try {
    const client = await pool.connect();
    console.log('✅ Conectado a PostgreSQL');
    
    // Probar query
    const result = await client.query('SELECT NOW() as current_time');
    console.log('✅ Query de prueba ejecutada:', result.rows[0].current_time);
    
    client.release();
    return true;
  } catch (err) {
    console.error('❌ Error conectando a PostgreSQL:', err.message);
    console.log('🔍 Detalles:', err.code);
    return false;
  }
};

testConnection();

module.exports = pool;