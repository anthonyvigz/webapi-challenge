const express = require('express')

const server = express();

require('dotenv').config();

const port = process.env.PORT;

server.use(express.json());

server.listen(port, () => {
    console.log(`\n*** Server running on http://localhost:${port} ***\n`)
})

server.get('/', (req, res) => {
    res.status(200).send("Welcome to Anthony's server!")
})