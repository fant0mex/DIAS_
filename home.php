<?php get_header(); ?>

  <h1>DIAS__SAID</h1>

<?php
if ( have_posts() ) :
  while ( have_posts() ):
    the_post();
?>
    <h2><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h2>
    <p><em><?php the_time('l, F jS, Y'); ?></em></p>
    <p><?php the_content(); ?></p>

    <hr>

<?php
  endwhile;
else:
?>
  <p>“Sorry, there are no posts.”</p>

<?php endif; ?>

<?php get_footer(); ?>