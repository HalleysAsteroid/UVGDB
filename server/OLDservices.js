const fs = require("fs");
const path = require("path");

const DATABASE_FILE = path.join(__dirname + "/../server/files/data.txt");

var services = function (app) {
    app.post('/write-record', function (req, res) {
        var id = "uvg" + Date.now();

        var gameData = {
            id: id,
            gametitle: req.body.gametitle,
            releaseyear: req.body.releaseyear,
            region: req.body.region,
            platform: req.body.platform,
            publisher: req.body.publisher
        };

        var libraryData = [];

        if (fs.existsSync(DATABASE_FILE)) {
            //Read in current data
            fs.readFile(DATABASE_FILE, "UTF-8", function (err, data) {
                if (err) {
                    res.send(JSON.stringify({ msg: err }));
                } else {
                    libraryData = JSON.parse(data);

                    libraryData.push(gameData);

                    fs.writeFile(DATABASE_FILE, JSON.stringify(libraryData), function (err) {
                        if (err) {
                            res.send(JSON.stringify({ msg: err }));
                        } else {
                            res.send(JSON.stringify({ msg: "SUCCESS" }))
                        }
                    });
                }
            });
        }

        else {

            libraryData.push(gameData);

            fs.writeFile(DATABASE_FILE, JSON.stringify(libraryData), function (err) {
                if (err) {
                    console.log(err);
                    res.send(JSON.stringify({ msg: err }));
                } else {
                    res.send(JSON.stringify({ msg: "SUCCESS" }))
                }
            });
        }
    });

    app.get('/get-records', function (req, res) {
        if (fs.existsSync(DATABASE_FILE)) {
            fs.readFile(DATABASE_FILE, "UTF-8", function (err, data) {
                if (err)
                    res.send(JSON.stringify({ msg: err }));
                else {
                    var libraryData = JSON.parse(data);
                    res.send(JSON.stringify({ msg: "SUCCESS", libraryData: libraryData }))
                }

            }

            )
        } else {
            data = [];
            res.send(JSON.stringify({ msg: "SUCCESS", libraryData: data }))
        }
    })

    app.delete('/delete-records', function (req, res) {
        fs.readFile(DATABASE_FILE, "UTF-8", function (err, data) {
            if (err) {
                res.send(JSON.stringify({ msg: err }));
            } else {
                libraryData = JSON.parse(data);

                libraryData.splice(req, 1);

                fs.writeFile(DATABASE_FILE, JSON.stringify(libraryData), function (err) {
                    if (err) {
                        res.send(JSON.stringify({ msg: err }));
                    } else {
                        res.send(JSON.stringify({ msg: "SUCCESS" }))
                    }
                });
            }
        }

        )
    })

};

module.exports = services;