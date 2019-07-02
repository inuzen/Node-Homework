$("#getContent").click(function() {
  console.log("requested html");
  //get = упрощенный вариант ajax запроса с методом get
  $.get("ajax.html", function(data) {
    $("#container1").html(data);

  }, "html");
});

$("#getJSON").click(function() {
  console.log("requested json");

  $.get("users.json", function(data) {
    console.log(data);
    let res = "<ul>"
    res += data.map((obj) => {
      return "<li>" + obj.user + "</li>"
    }).join("");
    res += "</ul>"
      $("#container2").html(res);
  }, "json");
});
