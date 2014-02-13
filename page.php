<?php get_header(); ?>

 <div class= "container">
  <div class="row page">
    <div class="col-md-12">

      <?php
      if ( have_posts() ) :
        while ( have_posts() ):
          the_post();
      ?>
          <h3><?php the_title(); ?></h3>


          <p><?php the_content(); ?></p>



      <?php
        endwhile;
      else:
      ?>
        <p>Sorry, this page does not exist.</p>

      <?php endif; ?>

    </div>
  </div>
</div>



<?php get_footer(); ?>