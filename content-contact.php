
<div class="container-fluid" id="contact">

  <script type="text/javascript">
            function initialize() {

                var dias = new google.maps.LatLng(51.5226036, -0.0855062);

                var firstLatlng = new google.maps.LatLng(51.5226036, -0.0855062);

                var firstOptions = {
                    zoom: 16,
                    center: firstLatlng,
                    mapTypeId: google.maps.MapTypeId.ROADMAP,
                    scrollwheel: false
                };

                var map = new google.maps.Map(document.getElementById("map_dias"), firstOptions);

                firstmarker = new google.maps.Marker({
                    map:map,
                    draggable:false,
                    animation: google.maps.Animation.DROP,
                    title: 'DIAS Creative',
                    position: dias
                });

                var contentString1 = '<p>Dias Creative<br />6-8 Bonhill Street<br />London<br />EC2A 4BX</p>';


                var infowindow1 = new google.maps.InfoWindow({
                    content: contentString1
                });

                google.maps.event.addListener(firstmarker, 'click', function() {
                    infowindow1.open(map,firstmarker);
                });

            }
            </script>

            <div class="map">

                <div id="map_dias" style="width: 100%; height: 500px"></div>

            </div>
  <div class="address">
    <p>DIAS Creative<br>3rd Floor,<br>6-8 Bonhill Street<br>London, EC2A 4BX<br>United Kingdom</p><br>
    <p><a href="callto:+442079935746">+44 (0) 20 7993 5746</a></p>
    <p><a href="mailto:info@diascreative.com">info@diascreative.com</a></p>
    <p>#dias_creative</p>
  </div>

  <div id="contact-form">
    <?php query_posts('pagename=contact'); ?>
      <?php if (have_posts()) :
        while (have_posts()) : the_post(); ?>
          <?php the_content(); ?>
  </div>
      <?php endwhile; endif; ?>
</div>

