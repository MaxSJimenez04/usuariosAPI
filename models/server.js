const express = require('express');
const cors = require('cors');
require('dotenv').config();
const connection = require('./database');
const setupSwagger = require('../swagger');

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT || 3000;

        this.middlewares();
        this.routes();
        this.swagger();
    }

    middlewares() {
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(express.static('public'));
    }

    routes() {
        this.app.use('/api/usuarios', require('../routes/usuarios'));
    }

    swagger() {
        setupSwagger(this.app);
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Server listening on port ${this.port}`);
        });
    }
}

module.exports = Server;
