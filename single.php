<?php get_header(); ?>

 <div class= "container">
  <div class="row page">
    <div class="col-md-12">

    <?php if ( have_posts() ) : while ( have_posts() ) : the_post(); ?>

      <h2><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h2>

          <ul class="info">
            <li>Posted in: <?php the_category(', ') ;?></li>
            <li>Written by: <?php the_author( );?></li>
            <li>On: <em><?php the_time('l, F jS, Y'); ?></em></li>
          </ul>

        <?php the_content(); ?>

        <hr>

      <?php comments_template(); ?>

    <?php endwhile; else: ?>
      <p><?php _e('Sorry, this page does not exist.'); ?></p>
    <?php endif; ?>

    </div>
  </div>
</div>

<?php get_footer(); ?>