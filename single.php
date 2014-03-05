<?php
  get_header();
  get_template_part('content', 'hero-image');
?>

<div class="container">
  <div class="row">
    <div class="col-sm-9">
    <?php
    if ( have_posts() ):
      while ( have_posts() ):
        the_post();
    ?>

        <article class="blog-post">
          <h2><?php the_title(); ?></h2>

          <div class="info">
            <?php the_time('F jS, Y'); ?> by <?php the_author( );?>
          </div>

          <div class="main-text">
            <?php the_content(); ?>
          </div>
        </article>

        <div class="next-post pull-right">
          <?php
            next_post_link();
          ?>
        </div>

        <div class="prev-post pull-left">
          <?php
            previous_post_link();
          ?>
        </div>
    <?php
      endwhile;
    else:
    ?>
      <p><?php _e('Sorry, this page does not exist.'); ?></p>
    <?php endif; ?>
    </div>

    <div class="col-sm-3">
      <?php get_sidebar() ?>
    </div>
  </div>
</div>

<?php get_footer(); ?>