const pool = require('../config/database');

const datosController = {
  getAllDatos: async (req, res) => {
    try {
      const { limit = 100, offset = 0 } = req.query;
      
      // PostgreSQL usa $1, $2 para parámetros
      const query = `
        SELECT * FROM treasure.uv_debt_draft  
        LIMIT $1 OFFSET $2
      `;
      
      const result = await pool.query(query, [parseInt(limit), parseInt(offset)]);
      
      res.json({
        success: true,
        data: result.rows,
        total: result.rowCount,
        limit: parseInt(limit),
        offset: parseInt(offset),
        timestamp: new Date().toISOString()
      });
      
    } catch (error) {
      console.error('Error en getAllDatos:', error);
      res.status(500).json({
        success: false,
        error: 'Error interno del servidor'
      });
    }
  },

  getDatoById: async (req, res) => {
    try {
      const { id } = req.params;
      
      const query = 'SELECT * FROM tu_tabla WHERE id = $1 AND activo = true';
      const result = await pool.query(query, [id]);
      
      if (result.rows.length === 0) {
        return res.status(404).json({
          success: false,
          error: 'Registro no encontrado'
        });
      }
      
      res.json({
        success: true,
        data: result.rows[0]
      });
      
    } catch (error) {
      console.error('Error en getDatoById:', error);
      res.status(500).json({
        success: false,
        error: 'Error interno del servidor'
      });
    }
  },

  searchDatos: async (req, res) => {
    try {
      const { q, campo = 'nombre' } = req.query;
      
      if (!q) {
        return res.status(400).json({
          success: false,
          error: 'Parámetro de búsqueda (q) requerido'
        });
      }
      
      const camposPermitidos = ['nombre', 'email', 'codigo'];
      if (!camposPermitidos.includes(campo)) {
        return res.status(400).json({
          success: false,
          error: 'Campo de búsqueda no válido'
        });
      }
      
      const query = `SELECT * FROM tu_tabla WHERE ${campo} ILIKE $1 AND activo = true`;
      const result = await pool.query(query, [`%${q}%`]);
      
      res.json({
        success: true,
        data: result.rows,
        total: result.rowCount,
        query: q,
        campo: campo
      });
      
    } catch (error) {
      console.error('Error en searchDatos:', error);
      res.status(500).json({
        success: false,
        error: 'Error interno del servidor'
      });
    }
  }
};

module.exports = datosController;