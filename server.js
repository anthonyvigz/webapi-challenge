/// defining middleware

const express = require('express');
const server = express();
const helmet = require('helmet');
const morgan = require("morgan");

/// defining routes to server

const projectsRouter = require('./projects/projectsRoutes');
const actionsRouter = require('./actions/actionsRoutes')

/// created environment

require('dotenv').config();
const port = process.env.PORT;

/// applying middleware to server

server.use(express.json());
server.use(helmet());
server.use(morgan('dev'));

/// applying routes to server

server.use('/api/projects', projectsRouter);
server.use('/api/actions', actionsRouter);


/// listening for server

server.listen(port, () => {
    console.log(`\n*** Server running on http://localhost:${port} ***\n`)
})

/// main server get request

server.get('/', (req, res) => {
    res.status(200).send("Welcome to Anthony's server!")
})
