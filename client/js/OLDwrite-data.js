function submitDB() {

    var gametitle = $('#gametitle').val();
    var releaseyear = $('#releaseyear').val();
    var region = $('#region').val();
    var platform = $('#platform').val();
    var publisher = $('#publisher').val();

    var jsonString = {
        gametitle: gametitle,
        releaseyear: releaseyear,
        region: region,
        platform: platform,
        publisher: publisher
    };

    console.log(JSON.stringify(jsonString));
    $.ajax({
        url: "http://localhost:5500" + "/write-record",
        type: "post",
        data: jsonString,
        success: function (response) {
            var data = JSON.parse(response);
            if (data.msg === "SUCCESS") {
                alert(data.msg);
                clearDB();
            } else {
                alert(data.msg);
            }
        },
        error: function (err) {
            alert(err);
        }
    })
}


function clearDB() {
    document.getElementById("dbInputForm").reset();
}