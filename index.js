const express = require("express");
const path = require("path");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);
const port = process.env.NODE_ENV === "production" ? 3000 : 3001;

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/build/index.html"));
});

io.on("connection", socket => {
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });

  socket.on("message", message => {
    io.emit("message", message);
  });
});

// Start the app
http.listen(port, () => console.log(`API listening on ${port}`));
