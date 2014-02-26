(function ($) {
  'use strict';

  var $map = $('#map'),
      $chart = $("#myChart"),
      $carousels = $('.carousel');

  if( $carousels.length ) {
    $carousels.carousel({
      interval: false
    });
  }

  if( $map.length ) {
    var map = L.map('map').setView([51.522755, -0.086504], 17);

    L.tileLayer('http://{s}.tile.cloudmade.com/a0750f484fc24abc9d141c74cba0613a/997/256/{z}/{x}/{y}.png', {
        maxZoom: 18
    }).addTo(map);

    var marker = L.marker([51.522555, -0.085304]).addTo(map);
  }

  if( $chart.length ) {
    var ctx = $chart.get(0).getContext("2d"),
        myNewChart = new Chart(ctx);
  }

}(jQuery));