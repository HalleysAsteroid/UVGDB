var games = []
var activeGame = 0;

var app = angular.module("browseGamesApp", []);

app.controller('browseGamesCtrl', function ($scope, $http) {
    $scope.obj = [];

    $scope.get_records = function () {
        console.log("test");
        $http({
            method: 'get',
            url: "http://localhost:5500" + "/get-records",
        }).then(function (response) {
            if (response.data.msg === "SUCCESS") {
                games = response.data.games;
                console.log(response.data.games)
                $scope.obj = games[activeGame];
                $scope.showHide();

            } else console.log(response.data.msg);
        }, function (response) {
            console.log(response);
        })
    };

    $scope.showHide = function () {
        $scope.hidePrev = (activeGame === 0) ? true : false;
        $scope.hideNext = (activeGame === (games.length - 1)) ? true : false;
    };

    $scope.changeGame = function (direction) {
        activeGame += direction;
        $scope.obj = games[activeGame];
        $scope.showHide();
    }

    $scope.get_records();
});