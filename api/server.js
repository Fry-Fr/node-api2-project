const express = require('express'); // implement your server here
const postsRouter = require('./posts/posts-router');  // require your posts router and connect it here

const server = express();

server.use(express.json());

server.use('/api/posts', postsRouter)

server.get('/', (req,res) => {
    res.send(`
        <h1>Hello from express! :)</h1>
    `)
});

module.exports = server;