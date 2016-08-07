"use strict";

var http = require("http"),
    express = require("express"),
    socketIo = require("socket.io");

// create express
const app = express();

app.set("view engine", "jade");

// browser -> node -> express -> M1 -> M2 -> handler
//         <-      <-         <-    <-    <-


app.use((request, response, next) => {
    console.log("In middleware 1");
    next();
    console.log("Out of middleware 1");
});

app.use(express.static("./public")); 


app.use((request, response, next) => {
    console.log("---In middleware 2");
    next();
    console.log("---Out of middleware 2");
});

// config express
app.get("/", (request, response) => {
    response.end("Hello World");
    console.log("In handler"); 
});

app.get("/home", (request, response) => {
    response.render("index", {title: "TITLE!"});
});

//create server
const server = new http.Server(app);
const io = socketIo(server);

// tell server to listen
const port = 3000;
server.listen(port, () => {
    console.log(`Server started on port ${port}`);
});


