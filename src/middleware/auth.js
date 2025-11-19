const authenticateApiKey = (req, res, next) => {
  const apiKey = req.headers['x-api-key'];
  
  if (!apiKey) {
    return res.status(401).json({
      success: false,
      error: 'API key requerida'
    });
  }
  
  if (apiKey !== process.env.API_KEY) {
    return res.status(401).json({
      success: false,
      error: 'API key inválida'
    });
  }
  
  next();
};

module.exports = { authenticateApiKey };