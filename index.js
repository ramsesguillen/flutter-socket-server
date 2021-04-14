const express = require('express');
const app = express();
require('dotenv').config();


// SOCKET SERVER
const server = require('http').createServer(app);
module.exports.io = require('socket.io')(server);
require('./sockets/socket');




// INDEX.HTML
app.use(express.static('public'));




server.listen( process.env.PORT, () => {
    console.log('Server online in port', process.env.PORT);
});
