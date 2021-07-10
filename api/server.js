const express = require('express'); // implement your server here
  // require your posts router and connect it here
const server = express();

server.get('/', (req,res) => {
    res.send(`
        <h1>from express server! :)</h1>
    `)
});

module.exports = server;