"use strict";

var http = require("http"),
    express = require("express"),
    socketIo = require("socket.io");

// create express
const app = express();

app.set("view engine", "jade");
app.use(express.static("./public")); 

// config express
app.get("/", (request, response) => {
    response.end("Hello World");
});

app.get("/home", (request, response) => {
    response.render("index", {title: "TITLE!"});
});

//create server
const server = new http.Server(app);
const io = socketIo(server);

io.on("connection", socket => {
    console.log("Client connected");
    socket.on("chat:add", data => {
        console.log(data);
        io.emit("chat:added", data);
    });
});

// tell server to listen
const port = 3000;
server.listen(port, () => {
    console.log(`Server started on port ${port}`);
});


