$( document ).ready(function() {
  let res = "";
  $.get("js/products.json", function(data) {

    res += data.map((obj) => {
      return "<p class='product'>" + obj.product + "</p>"
    }).join("");

      $("#product-container").append(res);
  }, "json");

});

$(window).scroll(function() {
	let scrollHeight = $(document).height();
	let scrollPosition = $(window).height() + $(window).scrollTop();
	if ((scrollHeight - scrollPosition) / scrollHeight === 0) {

    let res = "";
    $.get("js/products.json", function(data) {
      // console.log(data);
      res += data.map((obj) => {
        return "<p class='product'>" + obj.product + "</p>"
      }).join("");
        $("#product-container").append(res);
    }, "json");

	}
});
