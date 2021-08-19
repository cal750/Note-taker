const express = require("express");
const fs = require("fs");
const path = require("path");

var app = express();
var PORT = 3001;

app.use(express.static('public'));

app.use(express.urlencoded({ extended: true}));
app.use(express.json());


//listening to html
app.get("/", function (req, res) {
    res.sendfile(path.join(__dirname, "/public/index.html"));
});

app.get("/public/note", function (req, res) {
    res.sendfile(path.join(__dirname, "/public/note.html"));
});