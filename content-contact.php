
<script type="text/javascript">
  function initialize() {

    var dias = new google.maps.LatLng(51.5226036, -0.0855062);

    var firstLatlng = new google.maps.LatLng(51.5226036, -0.0855062);

    var firstOptions = {
        zoom: 16,
        center: firstLatlng,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        scrollwheel: false,
        draggable: false,
        styles: [
                  {
                    "featureType": "poi",
                    "stylers": [
                      { "visibility": "off" }
                    ]
                  },{
                    "featureType": "administrative",
                    "stylers": [
                      { "visibility": "on" }
                    ]
                  },{
                    "featureType": "landscape.man_made",
                    "stylers": [
                      { "visibility": "simplified" },
                      { "color": "#c6c6c6" }
                    ]
                  },{
                    "featureType": "road",
                    "elementType": "geometry.stroke",
                    "stylers": [
                      { "color": "#ffffff" },
                      { "visibility": "off" }
                    ]
                  },{
                    "featureType": "road.highway",
                    "stylers": [
                      { "color": "#dad9d9" }
                    ]
                  },{
                    "featureType": "water",
                    "elementType": "geometry",
                    "stylers": [
                      { "color": "#3dadf4" }
                    ]
                  },{
                    "featureType": "water",
                    "elementType": "labels.text.stroke",
                    "stylers": [
                      { "color": "#3dadf4" }
                    ]
                  },{
                  },{
                    "featureType": "poi",
                    "elementType": "labels.text.fill",
                    "stylers": [
                      { "visibility": "on" }
                    ]
                  }
                ]
        };

    var map = new google.maps.Map(document.getElementById("map_dias"), firstOptions);

    firstmarker = new google.maps.Marker({
        map:map,
        draggable: false,
        animation: google.maps.Animation.DROP,
        title: 'DIAS Creative',
        position: dias
    });

    var contentString1 = '<p>Dias Creative<br />6-8 Bonhill Street<br />London<br />EC2A 4BX<br /></p>';


    var infowindow1 = new google.maps.InfoWindow({
        content: contentString1
    });

    google.maps.event.addListener(firstmarker, 'click', function() {
        infowindow1.open(map,firstmarker);
    });
    infowindow1.open(map,firstmarker);

    google.maps.event.addDomListener(window, 'resize', function() {
        map.panTo(firstLatlng);
    });
  }
</script>

<div>
  <div class="map">
    <div id="map_dias">
    </div>
  </div>
</div>

<div class="box-tertiary box-full-width dial">
  <div class="container">
    <div id="contact">
      <div class="col-lg-4">
        <div class="address">
          <div>
            <h3>CHAT TO US</h3>
            <h4>Dias Creative<br />6-8 Bonhill Street<br />London<br />EC2A 4BX<br />United Kingdom<br /></h4>
            <p><a href="tel:+442079935746">+44(0)2079935746</a></p>
            <p><a href="mailto:info@diascreative.com">info@diascreative.com</a></p>
            <p><a href="https://twitter.com/DIASCreative">#dias_creative</a></p>
          </div>
        </div>
      </div>

      <div class="col-lg-8">
        <div id="contact-form">
          <?php query_posts('pagename=contact'); ?>
          <?php if (have_posts()) :
          while (have_posts()) : the_post(); ?>
            <?php the_content(); ?>
          <?php endwhile; endif; ?>
        </div>
      </div>
    </div>
  </div>
</div>



