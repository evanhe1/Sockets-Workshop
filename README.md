# WebSockets Introduction
## Table of Contents

[Introduction](#introduction)

## Introduction

Traditional HTTP (hypertext transfer protocol) follows a request/response paradigm. The client establishes a connection with the server, and then submits a request via this connection. The server will respond to this request with the appropriate response, and then the connection will close. 

![HTTP Request/Response Cycle Diagram](images/http_process_explained.jpg)

There are several limitations to relying exclusively on this model of communcation. This limitation that we will focus on is in regards to realtime communication. Take a stock trading app as an example. During trading hours, stock prices will constantly be updating on the server. Using the HTTP model, in order to remain in sync with the latest prices, the client will need to perform many requests in rapid succession. However, since the connection closes after each request, we will need to re-establish the connection every time we make a new request, creating a lot of additional overhead.

![WebSockets Connection Diagram](images/Websocket_connection.png)

WebSockets come in handy for addressing this issue. Under this protocol, the client will establish a connection to the server with an HTTP request. However, after a connection is established, it will persist under one side explicitly closes it. While the connection is open, both the server and client will be able to continuously send data back and forth, avoiding the aforementioned overhead.

## Creating our Chat App Demo

We will be further exploring the WebSocket protocol using Socket.io, a JavaScript library that will make setting up realtime two-way connections much easier! Our demo will be a basic implementation of one of the primary uses realtime communication: a chat application.

### Server Setup

As discussed in the introduction, we will need both a server and client to create a socket. Let's set up the server first. Create a new ```server``` folder in your project directory and navigate to it. Then run the following commands:

```
yarn init -y
yarn add socket.io
```

The first command creates the ```package.json``` file that will contain information about our project, and the second command will add ```socket.io``` to ```package.json``` as a dependency of the project. 

## Writing Server Code

With ```socket.io``` correctly set up as a dependency, we can begin writing the code for the server. Create a new ```index.js``` file in the ```server``` folder, and add the necessary imports:

```javascript
const server = require("http").createServer();
const io = require("socket.io")(server, {
  cors: { origin: "*" },
});
```

The code above initializes an http server, and then creates ```io```, a new instance of ```socket.io``` using the server. The ```cors``` object that we initialize enables cross-origin resource sharing (CORS), which will allow any client to request resources from this server. This capability is disabled by default for security purposes, so we need to manually enable it. 

Now we will need to specify how the socket operates. Socket.io is event-driven, meaning that we will produce and consume events as necessary to communicate data. We will implement the socket's event handling as follows:

```javascript
io.on("connection", (socket) => {
  console.log("user connected");
  
  socket.on("message", (msg) => {
    socket.emit("message", `${socket.id.substring(0, 3)} said ${msg}`);
  });
  
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});
```

The ```connection``` and ```disconnect``` event are predefined for us, so we simply listen for then and print a confirmation once we detect either event. We will later define ```message``` events on our own to trigger when a user submits a chat message. In the server we simply format the message by attaching its author's unique ID before re-emitting the event.

Finally we will set the server to listen to port 3000 on our local machine:

```javascript
const port = 3000;
server.listen(port, () => {
  console.log(`listening on port ${port}`);
});
```
