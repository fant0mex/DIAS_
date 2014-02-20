var map = L.map('map').setView([51.522755, -0.086504], 17);

L.tileLayer('http://{s}.tile.cloudmade.com/a0750f484fc24abc9d141c74cba0613a/997/256/{z}/{x}/{y}.png', {

    maxZoom: 18
}).addTo(map);


//Get context with jQuery - using jQuery's .get() method.
var ctx = $("#myChart").get(0).getContext("2d");
//This will get the first returned node in the jQuery collection.
var myNewChart = new Chart(ctx);