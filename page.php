<?php get_header(); ?>


<div class="row">
  <div class="col-md-12">

  <p>This is the page.php</p>

<?php
if ( have_posts() ) :
  while ( have_posts() ):
    the_post();
?>
    <h3><?php the_title(); ?></h3>

    <p><?php the_content(); ?></p>

    <hr>

<?php
  endwhile;
else:
?>
  <p>Sorry, this page does not exist.</p>

<?php endif; ?>



<?php get_footer(); ?>