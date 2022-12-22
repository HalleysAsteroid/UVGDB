var app = angular.module("writeGamesApp", []);

app.controller('writeGamesCtrl', function ($scope, $http) {

    $scope.submitDB = function () {

        var gametitle = document.getElementById('gametitle').value;
        var releaseyear = document.getElementById('releaseyear').value;
        var region = document.getElementById('region').value;
        var platform = document.getElementById('platform').value;
        var publisher = document.getElementById('publisher').value;

        var jsonString = {
            gametitle: gametitle,
            releaseyear: releaseyear,
            region: region,
            platform: platform,
            publisher: publisher
        };

        console.log(JSON.stringify(jsonString));
        $http({
            url: "http://localhost:5500" + "/write-record",
            method: "post",
            data: jsonString
        }).then(function (response) {
            var data = response.data;
            if (data.msg === "SUCCESS") {
                $scope.clearDB();
            } else {
                console.error(data.msg);
            }
        }).catch(function (err) {
            console.error(err);
        });
    }

    $scope.clearDB = function () {
        document.getElementById("dbInputForm").reset();
    }
})