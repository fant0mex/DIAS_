<?php get_header(); ?>

<?php if ( !have_posts() ) : ?>
  <p><?php _e('Sorry, no posts matched your criteria.'); ?></p>
<?php endif; ?>

<?php
while ( have_posts() ) :
  the_post();
?>
  <h1><?php the_title(); ?></h1>
  <?php the_content(); ?>
<?php endwhile; ?>

<?php get_footer(); ?>