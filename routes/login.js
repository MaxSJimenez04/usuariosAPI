const express = require('express');
const fs = require('fs');
const path = require('path');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const router = express.Router();

// Cargar la clave privada RSA
const privateKeyPath = process.env.JWT_PRIVATE_KEY_PATH || './config/keys/private.pem';
const privateKey = fs.readFileSync(path.resolve(privateKeyPath), 'utf8');


router.post('/', async (req, res) => {
  const { email, password } = req.body;

  try {


    const payload = {
      sub: email,               
    };

    const signOptions = {
      algorithm: 'RS256',
      expiresIn: process.env.JWT_EXPIRATION || '1h',
      audience: process.env.JWT_AUDIENCE,
      issuer: process.env.JWT_ISSUER,
    };

    // Generar el token firmado
    const token = jwt.sign(payload, privateKey, signOptions);

    // Enviar token al cliente
    res.status(200).json({
      message: 'Inicio de sesión exitoso',
      token,
      type: 'Bearer'
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al generar el token' });
  }
});

module.exports = router;
