const app = require("express")();
const server = require("http").createServer(app);
const io = require("socket.io")(server);

const PORT = 3000;

app.get("/", (req, res) => {
  res.send("Hello World");
});

server.listen(PORT, () => {
  console.log(`server on: http://localhost:${PORT}`);
});

io.on("connection", function (socket) {
  socket.emit("ping", "connection success");
});
