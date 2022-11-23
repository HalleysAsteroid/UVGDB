const path = require("path");

// Page listeners
var router = function (app) {
    app.get("/", function (req, res) {
        res.status(200).sendFile(path.join(__dirname + "/../client/index.html"));

    });

    app.get("/write-data", function (req, res) {
        res.status(200).sendFile(path.join(__dirname + "/../client/write-data.html"));

    });

    app.get("/view-data", function (req, res) {
        res.status(200).sendFile(path.join(__dirname + "/../client/view-data.html"));

    });

    app.get("/browse-data", function (req, res) {
        res.status(200).sendFile(path.join(__dirname + "/../client/browse-data.html"));
    });
}

module.exports = router;