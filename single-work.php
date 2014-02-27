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
    <div class="col-sx-12">
      <article class="blog-post work-post textual">
        <h2><?php the_title(); ?></h2>

        <div class="info">
          <?php the_time('F jS, Y'); ?> by <?php the_author( );?>
        </div>

        <div class="main-text">
          <?php the_content(); ?>
        </div>
      </article>
    </div>
  <?php
    endwhile;
  endif;
  ?>
<?php get_footer(); ?>