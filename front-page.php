<?php
  get_header();
  the_post();
  get_template_part('content', 'hero-image');

  $recentWork = new WP_Query(array(
    'post_type' => 'work'
  ));

  wp_reset_postdata();
?>

<div class="box-secondary box-full-width">
  <div class="container">
    <?php the_content(); ?>
  </div>
</div>

<div class="box-full-width">
  <div id="projects"></div>

  <div class="container">
      <h2>Our projects</h2>
  </div>

  <div id="our-projects">
  <?php
  while( $recentWork->have_posts() ):
    $recentWork->the_post();

    $image = get_field('project_image');
  ?>
    <a href="<?php the_permalink(); ?>" class="our-projects">
      <img src="<?= $image['sizes']['medium'] ?>">
      <div>
        <h3><?php the_title() ?></h3>
        <h4><?php the_field( 'client' ); ?></h4>
      </div>
    </a>
    <?php endwhile; wp_reset_postdata(); ?>
  </div>
</div>

<div class="box-tertiary box-full-width">
  <div class="container">
    <h2 id="our-partners">Who we work with</h2>

    <div class="row" id="company-logos">
      <?php the_field("company_logos");?>
    </div>
  </div>
</div>

<div class="container-fluid" id="contact">
  <div class="row">
    <div class="col-sm-4" id="contact-form">
      <div>
        <h3>Address</h3>

        <p>3rd Floor, 6-8 Bonhill Street, London, EC2A 4BX</p>
        <p>Tel: <a href="callto:+442079935746">+44 (0) 20 7993 5746</a></p>
        <p>Email: <a href="mailto:info@diascreative.com">info@diascreative.com</a></p>
      </div>
    </div>

    <div class="col-sm-8">
      <div id="address"></div>

      <div id="map"></div>
      <a class="icon navigate"
        target="_blank"
        href="http://maps.google.com/maps?daddr=3rd+Floor,+6-8+Bonhill+Street,+London,+EC2A+4BX&amp;saddr=">
      </a>
    </div>
  </div>
</div>

<?php get_footer(); ?>