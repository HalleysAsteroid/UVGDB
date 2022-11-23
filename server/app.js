const express = require("express");
const cors = require("cors");
const path = require("path");
const bodyParser = require("body-parser")

const app = express();

app.use(cors());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))

app.use("/client", express.static(path.resolve(__dirname + "/../client/")))

// Make the server
var server;
var port = process.env.PORT || process.env.NODE_PORT || 5500;

//Page listeners (our router)
var router = require("./router.js");
router(app);

//Service listeners (our data processess)
var services = require("./services.js");
services(app);

//Start the server
server = app.listen(port, function (err) {
    if (err) throw err;

    console.log("Listening on port: " + port);
})