<?php
  get_header();
  get_template_part('content', 'hero-image');
?>

<div class="box-secondary">
  <div class="container">
    <div class="row">
    <?php
    if ( have_posts() ) :
      while ( have_posts() ):
        the_post();
    ?>

      <div class="col-xs-3">
        <div class="sidebar">
          <img src="<?php the_field('client_logo'); ?>">
          <h5>Client</h5>
          <p><?php the_field('client'); ?></p>
          <h5>Product</h5>
          <p><?php the_field('project_title'); ?></p>
          <h5>Project</h5>
          <p><?php the_title(); ?></p>
          <h5>Links</h5>
          <p><?php the_field('url'); ?></p>
          <p><?php the_field('project_type'); ?></p>
        </div>
      </div>
      <div class="col-xs-9">
        <div class="brief">
          <p><?php the_field('brief'); ?></p>
        </div>
      </div>
    </div>
  </div>
</div>

<div class="container-fluid">
  <div class="row">
    <div class="projects">
      <?php the_field('project_images'); ?>
    </div>
  </div>
</div>

<div class="box-secondary">
  <div class="container">
    <div id="textual">
      <h3>Our Approach</h3>
      <p><?php the_field('our_approach'); ?></p>
    </div>
  </div>
</div>

<div class="container-fluid">
  <div class="row">
    <div class="projects">
      <?php the_field('approach_images'); ?>
    </div>
  </div>
</div>

<div class="box-secondary">
  <div class="container">
    <div id="textual">
      <h3>What We Delivered</h3>
      <p><?php the_field('delivered'); ?></p>
    </div>
  </div>
</div>

<div class="container-fluid">
  <div class="row">
    <div class="delivery">
     <?php the_field('delivery_images'); ?>
    </div>
  </div>
</div>

<div class="box-secondary">
  <div class="container">
    <div id="textual">
      <h3>Results</h3>
      <p><?php the_field('results'); ?></p>
        <a class="show-me" href="<?php the_field('url'); ?>">View Project Website</a>
     </div>
  </div>
</div>

<div class="box-secondary">
  <div class="container">
    <div id="testimonial">
      <h2>"<?php the_field('testimonial'); ?>"</h2>
      <p><?php the_field('testimonial_giver'); ?></p>
  </div>
</div>

<div class="container-fluid">
  <div class="next-post pull-right">
    <?php next_post_link(); ?>
  </div>

  <div class="prev-post pull-left">
    <?php previous_post_link(); ?>
  </div>
</div>
  <?php
    endwhile;
  endif;
  ?>
</div>
<?php get_footer(); ?>