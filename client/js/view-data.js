var app = angular.module('viewGamesApp', []);
app.controller('viewGamesCtrl', function ($scope, $http) {
    $scope.games = [];
    $scope.regions = [];
    $scope.deleteModeDisabled = true;
    $scope.editModeDisabled = true;
    $scope.formHidden = true;

    $scope.getData = function () {
        $http({
            method: 'GET',
            url: 'http://localhost:5500/get-records'
        }).then(function (response) {
            if (response.data.msg === "SUCCESS") {
                $scope.games = response.data.games;
                $scope.regions = getRegions(response.data.games);
                $scope.selectedRegion = $scope.regions[0];
            } else console.log(response.data.msg)
        }, function (response) {
            console.error(response.data.msg)
        });
    }

    $scope.showTable = function () {
        var region = $scope.selectedRegion.value;

        $http({
            method: 'get',
            url: "http://localhost:5500/get-gamesByRegion",
            params: { region: region }
        }).then(function (response) {
            if (response.data.msg === "SUCCESS") {
                $scope.games = response.data.games;
            }
            else {
                console.error(response.data.msg);
            }
        }, function (response) {
            console.error(response);
        })
    };

    $scope.enterDeleteMode = function () {
        $scope.deleteModeDisabled = false;
    }

    $scope.exitDeleteMode = function () {
        $scope.deleteModeDisabled = true;
    }

    $scope.enterEditMode = function () {
        $scope.editModeDisabled = false;
    }

    $scope.exitEditMode = function () {
        $scope.editModeDisabled = true;
    }

    $scope.openForm = function (gameIndex) {
        $scope.gametitle = $scope.games[gameIndex].gametitle;
        $scope.releaseyear = $scope.games[gameIndex].releaseyear;
        $scope.region = $scope.games[gameIndex].region;
        $scope.platform = $scope.games[gameIndex].platform;
        $scope.publisher = $scope.games[gameIndex].publisher;
        $scope._id = $scope.games[gameIndex]['_id']

        $scope.editModeDisabled = true;
        $scope.formHidden = false;
    }

    $scope.closeForm = function () {
        $scope.formHidden = true;
        $scope.editModeDisabled = false;

        $scope.gametitle = "";
        $scope.releaseyear = "";
        $scope.region = "";
        $scope.platform = "";
        $scope.publisher = "";
    }

    $scope.updateGame = function () {
        if ($scope.gametitle === "" || $scope.releaseyear === "" || $scope.region === "" || $scope.platform === "" || $scope.publisher === "") {
            alert("All fields are required.");
            return;
        }

        $http({
            method: "put",
            url: "http://localhost:5500/update-records",
            data: {
                _id: $scope._id,
                gametitle: $scope.gametitle,
                releaseyear: $scope.releaseyear,
                region: $scope.region,
                platform: $scope.platform,
                publisher: $scope.publisher
            }

        }).then(function (response) {
            if (response.data.msg === "SUCCESS") {
                $scope.closeForm();
                $scope.showTable();
            } else {
                console.error(response.data.msg);
            }

        }, function (response) {
            console.error(response)
        })
    }

    $scope.deleteRow = function (buttonID) {
        $http({
            url: "http://localhost:5500/delete-records",
            method: "delete",
            params: { buttonID: buttonID }
        }).then(function (response) {
            if (response.data.msg === "SUCCESS") {
                console.log("Deleted Entry " + buttonID);
                if ($scope.games.length === 1)
                    $scope.selectedRegion = $scope.regions[0];
                $scope.showTable();
            } else {
                console.error(response.data.msg);
            }
        }, function (response) {
            console.error(response.data.msg);
        });
    }
    $scope.getData();
});

function getRegions(gameTableData) {
    var regionExists;

    regionsArray = [{ value: "", display: "ALL" }]

    for (var i = 0; i < gameTableData.length; i++) {
        regionExists = regionsArray.find(function (element) {
            return (element.value === gameTableData[i].region);
        });

        if (regionExists) {
            continue;
        }
        else {
            regionsArray.push({ value: gameTableData[i].region, display: gameTableData[i].region })
        }
    }

    return regionsArray;
}