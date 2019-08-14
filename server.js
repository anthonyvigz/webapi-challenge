const express = require('express')

const server = express();

require('dotenv').config();

const port = process.env.PORT;

server.listen(port, () => {
    console.log(`\n*** Server running on http://localhost:${port} ***\n`)
})