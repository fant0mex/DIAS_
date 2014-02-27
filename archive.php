<?php get_header(); ?>

<div class="container">
  <div class="row">
    <div class="col-sm-9">
      <?php if ( !have_posts() ) : ?>
        <p><?php _e('Sorry, no posts matched your criteria.'); ?></p>
      <?php endif; ?>

      <?php
      while ( have_posts() ):
        the_post();
      ?>
        <div class="post entry">
          <h2><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h2>

          <?php
          if ( has_post_thumbnail() ) {
            the_post_thumbnail('thumb');
          }
          ?>

          <div class="summary">
            <div class="info">
              <?php the_time('F jS, Y'); ?> by <?php the_author( );?>
            </div>

            <div class="excerpt">
              <?php the_excerpt(); ?>
            </div>
          </div>
        </div>
      <?php endwhile; ?>
    </div>

    <div class="col-sm-3">
      <?php get_sidebar() ?>
    </div>
</div>

<?php get_footer(); ?>