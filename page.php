<?php
  get_header();
  the_post();
  get_template_part('content', 'hero-image');
?>

<article class="container">
  <article class="textual">
    <?php if( !get_field('hero_image') ): ?>
    <h2><?php the_title(); ?></h2>
    <?php endif; ?>
    <p><?php the_content(); ?></p>
  </article>
</article>

<?php get_footer(); ?>