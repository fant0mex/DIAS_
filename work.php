<?php

/*

  Template Name: Work Page

*/

get_header(); ?>

<div class="container">
  <div class="row work">

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

      <div class="col-md-3">

          <a href="<?php the_permalink(); ?>"><img src="<?php the_field( 'project_image' ); ?>" class="img-responsive" alt="Responsive image"></a>


      </div>

              <?php
              endwhile; endif; ?>
    </div>
</div>



<?php get_footer(); ?>