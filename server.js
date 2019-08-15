/// defining middleware

const express = require('express');
const server = express();
const helmet = require('helmet');
const morgan = require("morgan");

/// defining routes to server

const projectsRouter = require('./projects/projectsRoutes.js');
const actionsRouter = require('./actions/actionsRoutes.js')

/// created environment

require('dotenv').config();
const port = process.env.PORT || 4000;

/// applying middleware to server

server.use(express.json());
server.use(helmet());

/// applying routes to server

server.use('/api/projects', projectsRouter);

/// main server get request

server.get('/', (req, res) => {
    const messageOfTheDay = process.env.MOTD || "Catch 'em all";
    res.status(200).send(messageOfTheDay);
})

/// listening for server

server.listen(port, () => {
    console.log(`\n*** Server running on http://localhost:${port} ***\n`)
})
