const express = require("express");
const mysql = require("mysql");
const http = require("http");
const socketIo = require("socket.io");
const port = process.env.PORT || 4001;
const app = express();
const server = http.createServer(app);
const cors = require("cors");
server.listen(4001);
app.use(cors()); // CORS 미들웨어 추가

const io = socketIo(server, {
  cors: {
    origin: "http://localhost:19006/",
    methods: ["GET", "POST"],
  },
});

const db = mysql.createPool({
  host: "localhost",
  user: "dureotkd",
  password: "@slsksh33@",
  database: "native",
});

io.on("connection", function (socket) {
  socket.emit("test", { asd: "zzzzzzzzzzzzz" });
  socket.on("my other event", function (data) {
    console.log("response to my other event: ", data);
  });
});

app.get("/", function (req, res) {
  res.send("express-!!");
});

app.get("/getPhotoShop", (req, res) => {
  db.query(`SELECT * FROM photo_shop`, (err, data) => {
    if (!err) res.send(data);
    else res.send(err);
  });
});

app.get("/getUser", function (req, res) {
  db.query(`SELECT * FROM native.photo_shop`, (err, data) => {
    if (!err) res.send(data);
    else res.send(err);
  });
});

io.on("connection", function (socket) {
  socket.emit("news", { message: "Hello World?" });
  socket.on("my other event", function (data) {
    console.log("response to my other event: ", data);
  });
});
