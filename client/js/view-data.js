getData();

function showTable(data) {
    var htmlString = "";

    for (var i = 0; i < data.length; i++) {
        htmlString += "<tr onclick='deleteRow(\"" + data[i]._id + "\")'>";
        htmlString += "<td>" + data[i].gametitle + "</td>";
        htmlString += "<td>" + data[i].releaseyear + "</td>";
        htmlString += "<td>" + data[i].region + "</td>";
        htmlString += "<td>" + data[i].platform + "</td>";
        htmlString += "<td>" + data[i].publisher + "</td>";
        htmlString += "</tr>";
    }

    var uvgdbTableContent = document.getElementById("uvgdbTable");
    uvgdbTableContent.innerHTML = htmlString;
}

function getData() {
    $.ajax({
        url: "http://localhost:5500" + "/get-records",
        type: "get",
        success: function (response) {
            var data = JSON.parse(response);
            if (data.msg === "SUCCESS") {
                showTable(data.games)
            } else {
                alert(data.msg)
            }
        },
        error: function (err) {
        }
    })
}
