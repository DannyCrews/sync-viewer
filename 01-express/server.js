"use strict";

var http = require("http"),
    express = require("express");

// create express
const app = express();

// config express
app.get("/", (request, response) => {
    response.end("Hello World");
});

//create server
const server = new http.Server(app);

// tell server to listen
const port = 3000;
server.listen(port, () => {
    console.log(`Server started on port ${port}`);
});


