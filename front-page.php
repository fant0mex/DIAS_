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

  <h2>Our work</h2>

  <div id="our-work">
  <?php
  while( $recentWork->have_posts() ):
    $recentWork->the_post();

    $image = get_field('project_image');
  ?>
    <a href="<?php the_permalink(); ?>" class="our-work">
      <img src="<?= $image['sizes']['medium'] ?>">
      <div>
        <h3><?php the_title() ?></h3>
        <h4><?php the_field( 'client' ); ?></h4>
        -<?php the_excerpt() ?>-
      </div>
    </a>
    <?php endwhile; wp_reset_postdata(); ?>
  </div>
</div>

<div class="box-tertiary box-full-width">
  <div class="container">
    <div class="row">
      <div class="col-12-xs">
        <h2 id="our-partners">Our partners</h2>
      </div>
    </div>
    <div class="row" id="company-logos">
      <?php the_field("company_logos");?>
    </div>
  </div>
</div>

<?php get_footer(); ?>