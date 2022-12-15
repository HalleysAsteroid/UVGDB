const fs = require("fs");
const path = require("path");
const MongoClient = require("mongodb").MongoClient;
const ObjectId = require("mongodb").ObjectId;

//Define Database URL
const dbURL = "mongodb+srv://vscodeLogin:averysecureandcomplexpasswordthatnobodywilleverbeabletoguess@cluster0.epl7xhr.mongodb.net/?retryWrites=true&w=majority";
// const dbURL = "mongodb + srv://vscodeLogin:averysecureandcomplexpasswordthatnobodywilleverbeabletoguess@cluster0.epl7xhr.mongodb.net/test"
// const dbURL = "mongodb + srv://vscodeLogin:averysecureandcomplexpasswordthatnobodywilleverbeabletoguess@cluster0.epl7xhr.mongodb.net/test" || process.env.DB_URI || "mongodb://localhost";

const DATABASE_FILE = path.join(__dirname + "/../server/files/data.txt");

var services = function (app) {
    app.post('/write-record', function (req, res) {
        var id = "uvg" + Date.now();
        var gametitle = req.body.gametitle
        var releaseyear = req.body.releaseyear
        var region = req.body.region
        var platform = req.body.platform
        var publisher = req.body.publisher

        MongoClient.connect(dbURL, { useUnifiedTopology: true }, function (err, client) {
            if (err) {
                return res.status(201).send(JSON.stringify({ msg: "Error: " + err }));
            } else {
                const dbo = client.db("uvgdb");

                var gameData = {

                    id: id,
                    gametitle: req.body.gametitle,
                    releaseyear: req.body.releaseyear,
                    region: req.body.region,
                    platform: req.body.platform,
                    publisher: req.body.publisher
                };

                dbo.collection("games").insertOne(gameData, function (err) {
                    if (err) {
                        client.close();
                        return res.status(201).send(JSON.stringify({ msg: "Error: " + err }))
                    } else {
                        client.close();
                        return res.status(200).send(JSON.stringify({ msg: "SUCCESS" }))
                    }
                })
            }
        })
    });

    app.get('/get-records', function (req, res) {
        MongoClient.connect(dbURL, { useUnifiedTopology: true }, function (err, client) {
            if (err) {
                return res.status(201).send(JSON.stringify({ msg: "Error: " + err }));
            } else {
                const dbo = client.db("uvgdb");
                dbo.collection("games").find().toArray(function (err, data) {
                    if (err) {
                        client.close();
                        return res.status(201).send(JSON.stringify({ msg: "Error: " + err }))
                    } else {
                        client.close();
                        return res.status(200).send(JSON.stringify({ msg: "SUCCESS", games: data }))
                    }
                })
            }
        })
    });

    app.delete('/delete-records', function (req, res) {
        var gameID = req.body.buttonID;
        console.log(gameID);
        var g_id = new ObjectId(gameID);

        var search = { _id: g_id }

        MongoClient.connect(dbURL, { useUnifiedTopology: true }, function (err, client) {
            if (err) {
                return res.status(201).send(JSON.stringify({ msg: "Error: " + err }));
            } else {
                const dbo = client.db("uvgdb");
                dbo.collection("games").deleteOne(search, function (err, data) {
                    if (err) {
                        client.close();
                        return res.status(201).send(JSON.stringify({ msg: "Error: " + err }))
                    } else {
                        client.close();
                        return res.status(200).send(JSON.stringify({ msg: "SUCCESS" }))
                    }
                })
            }
        })
    });
};

module.exports = services;