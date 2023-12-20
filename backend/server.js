const dotenv = require('dotenv');
const result = dotenv.config();

const app = require('./app');

app.set('port', process.env.PORT || 3000);

const http = require('http');

const server = http.createServer(app);

server.listen(process.env.PORT || 3000);