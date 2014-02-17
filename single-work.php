<?php get_header(); ?>

<div class="container">
  <div class="row work">
    <div class="col-md-12">
      <?php
      if ( have_posts() ) :
        while ( have_posts() ):
          the_post();
      ?>
          <h3><?php the_title(); ?></h3>

          <img src="<?php the_field( 'project_image' ); ?>">

          <h4><?php the_field( 'project_type' ); ?></h4>

          <p><?php the_field( 'description' ); ?></p>

          <p>Client: <?php the_field( 'client' ); ?></p>

          <a href="<?php the_permalink() ;?>"><p><?php the_field( 'url' ) ;?></p></a>





      <?php endwhile; endif; ?>

       </div>
    </div>
</div>



<?php get_footer(); ?>