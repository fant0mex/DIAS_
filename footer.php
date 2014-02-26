    <footer id="footer">
      <div class="container-fluid">
        <div class="navbar-text pull-left">
          <a href="#">&copy; <?php echo date( 'Y' ) ;?> <?php bloginfo('name'); ?></a>
        </div>

        <div class="navbar-text pull-right">
          <a href="https://www.facebook.com/DIAScreative"><i class="largeIcon fa fa-facebook"></i></a>
          <a href="https://twitter.com/DIASCreative"><i class="largeIcon fa fa-twitter"></i></a>
          <a href="http://www.linkedin.com/company/dias-creative"><i class="largeIcon fa fa-linkedin"></i></a>
        </div>
      </div>
    </footer>

    <script type="text/javascript" src="<?php bloginfo('template_url'); ?>/leaflet/js/leaflet.js"></script>
    <script type="text/javascript" src="<?php bloginfo('template_url'); ?>/chart/Chart.js"></script>
    <script type="text/javascript" src="<?php bloginfo('template_url'); ?>/leaflet/js/dias.js"></script>
    <?php wp_footer(); ?>

  </body>
</html>