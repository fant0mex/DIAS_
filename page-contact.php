<?php
  get_header();
  the_post();
  get_template_part('content', 'hero-image');
?>

<div class="container-fluid" id="contact">
  <div class="row">
    <div class="col-sm-8 col-sm-push-4">
      <div id="address">
        <h3>Address</h3>

        <p>3rd Floor, 6-8 Bonhill Street, London, EC2A 4BX</p>
        <p>Tel: <a href="callto:+442079935746">+44 (0) 20 7993 5746</a></p>
        <p>Email: <a href="mailto:info@diascreative.com">info@diascreative.com</a></p>
      </div>

      <div id="map"></div>
      <a id="navigate"
        target="_blank"
        href="http://maps.google.com/maps?daddr=3rd+Floor,+6-8+Bonhill+Street,+London,+EC2A+4BX&amp;saddr=">
        <i class="icon navigate"></i>
      </a>
    </div>
    <div class="col-sm-4 col-sm-pull-8" id="contact-form">
      <div>
        <h3 class="page-head">Talk to us</h3>
        <?php the_content(); ?>
      </div>
    </div>
  </div>
</div>

<div>
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

<?php get_footer(); ?>