<?php
  get_header();

  $heroImage = new WP_Query(array(
                'post_type' => 'hero',
                'posts_per_page' => 1
                ));

  $imageCount = $heroImage->post_count;

  $recentWork = new WP_Query(array(
        'post_type' => 'work'
      ));

?>

<?php if( $imageCount ): ?>
  <?php
  while ( $heroImage->have_posts() ) :
    $heroImage->the_post();
    $count++;
  ?>
  <div id="hero">
    <img src="<?php the_field('slide'); ?>">
    <div class="carousel-caption">
      <h1><?php the_title();?></h1>

      <p><?php the_field("excerpt");?></p>
      <p><a class="btn btn-large btn-primary" href="#">View More</a></p>
    </div>
  </div>
  <?php
  endwhile;
  wp_reset_postdata();
  ?>
<?php endif; ?>

<div class="box-secondary box-full-width">
  <div class="container">
    <?php the_content(); ?>
  </div>
</div>

<div class="box-tertiary box-full-width">
  <div class="container">
    <div class="row" id="company-logos">
      <?php the_field("company_logos");?>
    </div>
  </div>
</div>

<?php get_footer(); ?>