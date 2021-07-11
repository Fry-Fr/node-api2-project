const server = require('./api/server');// require your server and launch it here

server.listen(4000, () => {
  console.log('\n*** Server Running on http://localhost:4000 ***\n');
});
