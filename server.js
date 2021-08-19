//basic constants
const express = require("express");
const fs = require("fs");
const path = require("path");

//PORT call and adding in express
var app = express();
var PORT = 3001;

app.use(express.static('public'));

//encoding and format as JSON
app.use(express.urlencoded({ extended: true}));
app.use(express.json());


//listening to html
app.get("/", function (req, res) {
    res.sendfile(path.join(__dirname, "/public/index.html"));
});

app.get("/public/note", function (req, res) {
    res.sendfile(path.join(__dirname, "/public/note.html"));
});

//I don't know if this will work, I completely looked it up
app.route("/api/note")
    .get(function (req, res) {
        res.json(database);
    })

    .post(function (req, res) {
        path.join(__dirname, "/data/db.json");
        req.body;
        //sets notes a value, maximum of 10
        let id = 10;
        //sets no notes to 0
        for (let i = 0;
            //every added note increases note number
            i < database.length; i++) {
                let notes = database[i];
            }
            //sets notes to increment
            notes.id = highestid + 1;
            database.push(notes);
    });