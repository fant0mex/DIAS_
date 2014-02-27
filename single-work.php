<?php
  get_header();
  get_template_part('content', 'hero-image');
?>

<div class="container">
  <div class="row">
  <?php
  if ( have_posts() ) :
    while ( have_posts() ):
      the_post();
  ?>
    <article class="blog-post work-post">
      <h2><?php the_title(); ?></h2>

      <div class="info">
        <?php the_time('F jS, Y'); ?> by <?php the_author( );?>
      </div>

      <div class="main-text">
        <?php the_content(); ?>
      </div>
    </article>
  <?php
    endwhile;
  endif;
  ?>
<?php get_footer(); ?>