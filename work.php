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

<div class= "container">
  <div class="row work">


    <a href="<?php the_permalink(); ?>"><img src="<?php the_field( 'project_image' ); ?>" class="img-responsive" alt="Responsive image"></a>


<?php
  endwhile;
else:
?>
  <p>There are no posts or pages here.</p>

<?php endif; ?>

  </div>
</div>

<?php get_footer(); ?>