const server = require("http").createServer();
const io = require("socket.io")(server, {
  cors: { origin: "*" },
});

io.on("connection", (socket) => {
  console.log("user connected");
  socket.on("message", (msg) => {
    io.emit("message", `${socket.id.substring(0, 3)} said ${msg}`);
  });
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

const port = 3000;
server.listen(port, () => {
  console.log(`listening on port ${port}`);
});
