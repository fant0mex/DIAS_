<?php
  get_header();
  the_post();
  get_template_part('content', 'hero-image');
?>

<div class="container-fluid" id="contact-page">
  <div class="row">
    <div class="col-sm-4" id="contact-form">
      <div>
        <h3 class="page-head">Talk to us</h3>
        <?php the_content(); ?>
      </div>
    </div>

    <div class="col-sm-8">
      <div id="address">
        <h3>Address</h3>

        <p>3rd Floor, 6-8 Bonhill Street, London, EC2A 4BX</p>
        <p>Tel: <a href="callto:+442079935746">+44 (0) 20 7993 5746</a></p>
        <p>Email: <a href="mailto:info@diascreative.com">info@diascreative.com</a></p>
      </div>

      <div id="map"></div>
    </div>
  </div>
</div>

<div id="jobs">
  <div class="container">
    <div class="row jobs">
      <div class="col-sm-6">
        <?php the_field('contact_page_left_box'); ?>
      </div>

      <div class="col-sm-6">
        <?php the_field('contact_page_right_box'); ?>
      </div>
    </div>
  </div>
</div>

<script type="text/javascript" src="<?php bloginfo('template_url'); ?>/js/libs/leaflet/leaflet.js"></script>

<?php get_footer(); ?>