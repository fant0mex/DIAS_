(function ($, $win) {
  'use strict';

  var $map = $('#map'),
      $chart = $("#myChart"),
      $contact = $('#contact-form>div'),
      MAXWIDTH = 1160;

  if( $map.length ) {
    var map = L.map('map').setView([51.522755, -0.086504], 17);

    L.tileLayer('http://otile4.mqcdn.com/tiles/1.0.0/osm/{z}/{x}/{y}.png', {
        maxZoom: 18
    }).addTo(map);

    var marker = L.marker([51.522555, -0.085304]).addTo(map);
  }

  if( $chart.length ) {
    var ctx = $chart.get(0).getContext("2d"),
        myNewChart = new Chart(ctx);
  }

  if( $contact.length ) {
    // "complex" layout in contact page requires some JS
    // to make sure the contact form is aligned left with content
    // when the browser is wider than our max width
    $win.resize(function() {
      var left = 0,
          sideMargin = $win.width() - MAXWIDTH;

      if( sideMargin > 0 ) {
        left = sideMargin / 2;
      }

      $contact.css('paddingLeft', left + 'px');
    }).resize();
  }

}(jQuery, jQuery(window)));