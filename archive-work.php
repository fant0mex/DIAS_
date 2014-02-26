<?php get_header(); ?>

<?php
  $the_query = new WP_Query(array(
    'post_type' => 'work'
  ));
?>

<div class="container">
  <div class="row work">
    <?php if ( !have_posts() ) : ?>
      <p>There are no posts or pages here. </p>
    <?php endif; ?>

    <?php
    while ($the_query->have_posts() ):
      $the_query->the_post();
    ?>
      <div class="col-md-3">
        <a href="<?php the_permalink(); ?>">
          <img src="<?php the_field( 'project_image' ); ?>" class="img-responsive" alt="Responsive image">
        </a>
      </div>

    <?php endwhile; ?>
  </div>
</div>

<?php get_footer(); ?>