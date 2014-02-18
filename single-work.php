<?php get_header(); ?>

<div class="container">
  <div class="row work">
    <div class="col-md-6">
      <?php
      if ( have_posts() ) :
        while ( have_posts() ):
          the_post();
      ?>
            <img src="<?php the_field( 'project_image' ); ?>" class="img-responsive" alt="Responsive image">


      </div>

      <div class="col-md-6 single">

        <h1><?php the_title(); ?></h1>

        <ul>

          <li>Client: <?php the_field( 'client' ); ?></li>
          <li><?php the_field( 'project_type' ); ?></li>
          <li><a href="<?php the_permalink() ;?>"><p><?php the_field( 'url' ) ;?></p></a></li>

        </ul>

        <hr>

        <p><?php the_field( 'description' ); ?></p>





        <?php
        endwhile;
      else:
      ?>
        <img src="">

      <?php endif; ?>

       </div>
    </div>
</div>



<?php get_footer(); ?>