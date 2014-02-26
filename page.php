<?php get_header(); ?>

<?php if( get_field('hero_image') ): ?>
<div id="hero">
  <img src="<?php the_field('hero_image'); ?>">
  <div class="carousel-caption">
    <h1><?php the_title();?></h1>

    <p><?php the_field("hero_description");?></p>
  </div>
</div>
<?php endif; ?>

<article class="container">
  <?php if ( !have_posts() ) : ?>
    <p>Sorry, this page does not exist.</p>
  <?php endif; ?>

  <?php
  while ( have_posts() ):
    the_post();
  ?>
    <?php if( !get_field('hero_image') ): ?>
    <h2><?php the_title(); ?></h2>
    <?php endif; ?>
    <p><?php the_content(); ?></p>
  <?php endwhile; ?>
</article>

<?php get_footer(); ?>