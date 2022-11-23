function deleteRow(buttonID) {
    alert(buttonID);
    $.ajax({
        url: "http://localhost:5500" + "/delete-records",
        type: "delete",
        data: buttonID,
        success: function (response) {
            var data = JSON.parse(response);
            if (data.msg === "SUCCESS") {
                getData();
            }
            else {
                alert(data.msg)
            }
        },
        error: function (err) { }
    })
}