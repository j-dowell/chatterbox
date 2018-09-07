const express = require('express');
const SocketServer = require('ws').Server;
const uuidv1 = require('uuid/v1');
const WebSocket = require('ws');

// Set the port to 3001
const PORT = 3001;

// Create a new express server
const server = express()
   // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new SocketServer({ server }); 

// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.

wss.broadcast = function broadcast(data) {
  wss.clients.forEach(function each(client) {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(data));
    }
  });
};

// Color list to choose user color from
const colorList = ['red', 'blue', 'green', 'yellow'];

// When a client connects
wss.on('connection', (ws) => {
  // Assign random color and send to client
  let color = {
    type: 'incomingColor',
    color: colorList[Math.floor(Math.random() * 4)]
  };
  ws.send(JSON.stringify(color));

  // Grabbing current client size and broadcasting to clients
  let info = {
    type: 'incomingClientSize',
  };
  info.usersOnline = wss.clients.size;
  wss.broadcast(info);
  console.log('Client connected. Clients currently connected: ', wss.clients.size);

  // Receiving a message
  ws.on('message', function incoming(data) {
    let parsedData = JSON.parse(data);

    if (parsedData.type === 'postMessage') {
      parsedData.id = uuidv1(); // Assigning random ID
      parsedData.type = 'incomingMessage';
      wss.broadcast(parsedData);
    } else if (parsedData.type === 'postNotification') {
      parsedData.type = 'incomingNotification';
      wss.broadcast(parsedData);
    }
  });
  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => {
    info.usersOnline = wss.clients.size;
    wss.broadcast(info);
    console.log('Client disconnected. Clients currently connected:', wss.clients.size);
  });

});