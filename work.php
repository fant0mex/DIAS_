<?php

/*

  Template Name: Work Page

*/

get_header(); ?>


<?php

  $args = array(
      'post_type' => 'work'
    );

  $the_query = new WP_Query( $args );
?>

<?php
if ( have_posts() ) :
  while ($the_query->have_posts() ):
    $the_query->the_post();
?>
    <h3><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h3>

    <img src="<?php the_field( 'homepage_slider_image' ); ?>">

    <p><?php the_field( 'description' ); ?></p>

    <hr>

<?php
  endwhile;
else:
?>
  <p>There are no posts or pages here.</p>

<?php endif; ?>

<?php get_footer(); ?>