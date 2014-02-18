<?php get_header(); ?>


 <div class="blog">

 </div>

    <?php if ( have_posts() ):
      while ( have_posts() )
        : the_post();
      ?>

   <div class="row entry">



      <h2><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h2>

      <?php
            if ( has_post_thumbnail() ) {
              the_post_thumbnail('large', array('class' => 'img-responsive'));
            }
            ?>

          <ul class="info">
            <li>Posted in: <em><?php the_category(', ') ;?></em></li>
            <li>Written by: <?php the_author( );?></li>
            <li>On: <?php the_time('l, F jS, Y'); ?></li>
          </ul>

          <div class="container excerpt">

            <?php the_content(); ?>

          </div>







    <?php endwhile; else: ?>
      <p><?php _e('Sorry, this page does not exist.'); ?></p>
    <?php endif; ?>

    </div>




<?php get_footer(); ?>