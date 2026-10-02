const cacheService = require('../services/cacheService');

function cacheMiddleware(req, res, next) {
  const data = cacheService.get(req.originalUrl);

  if (data) {
    return res.json(data);
  }

  next();
}

module.exports = cacheMiddleware;
