const fs = require('fs');
const path = require('path');
const jwt = require('jsonwebtoken');


const publicKey = fs.readFileSync(path.join(__dirname, '../config/keys/public.pem'), 'utf8');

function verifyJwtMiddleware(options = {}) {

  const { audience, issuer } = options;

  return (req, res, next) => {
    try {
      const auth = req.headers['authorization'];
      if (!auth) return res.status(401).json({ error: 'No Authorization header' });

      const parts = auth.split(' ');
      if (parts.length !== 2 || parts[0] !== 'Bearer') {
        return res.status(401).json({ error: 'Invalid Authorization format' });
      }
      const token = parts[1];

      const verifyOptions = {
        algorithms: ['RS256'],
        ...(audience ? { audience } : {}),
        ...(issuer ? { issuer } : {}),
      };

      jwt.verify(token, publicKey, verifyOptions, (err, decoded) => {
        if (err) {
          return res.status(401).json({ error: 'Token inválido', details: err.message });
        }
        req.user = decoded;
        next();
      });
    } catch (err) {
      next(err);
    }
  };
}

module.exports = verifyJwtMiddleware;
