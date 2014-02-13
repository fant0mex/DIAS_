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

          <p><?php the_field( 'description' ); ?></p>

          <a href="<?php the_permalink() ;?>"><p><?php the_field( 'url' ) ;?></p></a>





      <?php endwhile; endif; ?>

       </div>
    </div>
</div>

<?php get_footer(); ?>