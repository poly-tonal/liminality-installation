//required node modules
const http = require("http");
const express = require("express");
const fs = require("fs");
const path = require("path");
const bodyParser = require("body-parser");
const { nextTick } = require("process");

//server setup
const app = express();
const port = 8080;
app.use(express.static("public"));

//GET requests - serve static pages
app.get("/", function (req, res) {
    res.sendFile("./public/index.html");
});

app.get("/input", function (req, res) {
    res.sendFile("input.html", { root: "./public/pages" });
});

app.get("/output", function (req, res) {
    res.sendFile("output.html", { root: "./public/pages" });
});

app.get("/counter", function (req, res) {
    res.sendFile("counter.html", { root: "./public/pages" });
});

//POST requests - handle commands from scripts
app.use(bodyParser.json());
app.post("/clear", function (req, res) {
    //request to clear data from server

    //write file
    fs.writeFileSync("./data.json", '[{"id": "000", "choice": "0"}]');
});

app.post("/add", function (req, res) {
    //request to add data to server
    //add data to server

    let ID = req.body.id;
    let choice = req.body.choice;
    let data = { id: ID, choice: choice };

    let fileStream = fs.readFileSync("./data.json");
    const read = JSON.parse(fileStream);
    for (let index in read) {
        if (read[index].id === ID) {
            read.splice(index, 1);
        }
    }

    read.push(data);
    let file = JSON.stringify(read);

    fs.writeFileSync("./data.json", file, (err) => {
        if (err) {
            console.log(err);
        }
    });
});

app.post("/output", function (req, res) {
    //request to read data to server
    //read data from server

    //check for result from ID
    let ID = req.body.id;

    const fileStream = fs.readFileSync("./data.json", "utf8");
    const read = JSON.parse(fileStream);
    for (let index in read) {
        if (read[index].id === ID) {
            var data = read[index].choice;
        }
    }

    if (data) {
        let result = Math.floor(Math.random() * 9);
        if (result == data) {

            res.setHeader("Content-Type", "Application/JSON");
            res.send(JSON.stringify({ result: 1, choice: data }));
        } else {

            res.setHeader("Content-Type", "Application/JSON");
            res.send(JSON.stringify({ result: 0, choice: data }));
        }
    } else {
        console.log("error");
        res.setHeader("Content-Type", "Application/JSON");
        res.send(JSON.stringify({ error: 1 }));
    }
});

//Server
const server = app.listen(port, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log(`Listening at http://${host}:${port}`);
});
