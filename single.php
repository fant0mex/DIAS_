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

        <article class="entry">
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

          <div class="excerpt">
            <?php the_content(); ?>
          </div>
        </article>
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