<?php get_header(); ?>



<?php
if ( have_posts() ) :
  while ( have_posts() ):
    the_post();
?>
    <h3><?php the_title(); ?></h3>

    <img src="<?php the_field( 'project_image' ); ?>">

    <p><?php the_field( 'description' ); ?></p>



    <hr>

<?php
  endwhile;
else:
?>
  <p>There are no posts or pages here.</p>

<?php endif; ?>

<?php get_footer(); ?>