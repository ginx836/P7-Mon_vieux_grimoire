const dotenv = require('dotenv');
const result = dotenv.config();

const http = require('http');

const server = http.createServer((req, res) => {
  res.end('Voila la reponse du serveur !');
});

server.listen(process.env.PORT || 3000);

