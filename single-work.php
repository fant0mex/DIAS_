<?php
  get_header();
  get_template_part('content', 'hero-image');

  $project_type = get_field( 'project_type' );

  $args = array('post_type' => 'work', 'orderby' => 'rand', 'posts_per_page'=>2);
  $random_posts = get_posts($args);

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
          <a href="<?php the_permalink(); ?>"><p><?php the_field('url'); ?></p></a>


          <?php foreach($project_type as $item): ?>
            <button class="btn <?php echo strtolower($item); ?>"><?php echo $item; ?></button>
          <?php endforeach; ?>
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
</DIV>

<div class="container">
  <h3 class="join">OTHER PROJECTS</h3>
</div>

<div class="container-fluid">
  <div class="row">
    <div id="our-projects">
      <?php
        $previous_post = array($random_posts[0]);
        foreach($previous_post as $post) { ?>
          <a href="<?php the_permalink(); ?>">
            <?php $image = get_field('project_image_home'); ?>
              <img src="<?= $image['sizes']['large'] ?>">
                <div>
                  <h3><?php the_field( 'client' ); ?></h3>
                    <?php the_content();?>
                </div>
          </a>
      <?php }
      ?>
      <?php
        $previous_post = array($random_posts[1]);
        foreach($previous_post as $post) { ?>
          <a href="<?php the_permalink(); ?>">
            <?php $image = get_field('project_image_home'); ?>
              <img src="<?= $image['sizes']['large'] ?>">
               <div>
                  <h3><?php the_field( 'client' ); ?></h3>
                    <?php the_content();?>
              </div>
          </a>
      <?php }
      ?>
    </div>
  </div>
</div>
  <?php
    endwhile;
  endif;
  ?>
<div class= "box-secondary" id= "our-work">
  <div class="container">
    <a class="show-me" href="#our-projects">See more of our projects</a>
  </div>
</div>
</div>
<?php get_footer(); ?>