<?php
  get_header();
  get_template_part('content', 'hero-image');

  $project_type = get_field( 'project_type' );
  $currentID = get_the_ID();
  $args = array('post_type' => 'work', 'orderby' => 'date', 'order' => 'DESC', 'posts_per_page'=>2, 'exclude' => $currentID);
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

      <div class="col-md-3">
        <div class="sidebar">
          <?php $client_logo = get_field('client_logo');
            if(!empty($client_logo)) { ?>
              <img src = "<?php echo $client_logo; ?>" />
           <?php } else {} ?>
          <h5>Client</h5>
          <p><?php the_field('client'); ?></p>
          <h5>Project</h5>
          <p><?php the_title(); ?></p>
          <h5>Links</h5>
          <?php the_field('url'); ?>
          <?php foreach($project_type as $item): ?>
            <button disabled class="btn <?php echo strtolower($item); ?>"><?php echo $item; ?></button>
          <?php endforeach; ?>
        </div>
      </div>
      <div class="col-md-9">
        <div class="brief">
          <?php the_content(); ?>
        </div>
      </div>
    </div>
  </div>
</div>

<div id="project-page">
  <?php the_field('in_depth'); ?>
</div>

<div id="carousel" class="carousel">
  <?php $images = get_post_meta($post->ID, 'slider', false);
    $n=0;
    foreach($images as $image): $n++;
  ?>
  <div class="item<?php if($n==1) echo ' active' ?>">
    <img src="<?php echo $image; ?>" />
  </div>
  <?php endforeach ?>
</div>

<div class="box-secondary">
  <div class="container">
    <div class="row">
      <div id="testimonial">
          <?php
            $tests = get_field('testimonial');
            $givers = get_field('testimonial_giver');
              if (!empty( $tests) && !empty( $givers)) {
                echo '<blockquote>' . $tests . '</blockquote>';
                echo '<p>' . $givers . '</p>';
              } else {}
          ?>
      </div>
    </div>
  </div>
</div>

<div class="container">
  <h3 class="join other">OTHER PROJECTS</h3>
</div>

<div class="container-fluid">
  <div class="row">
    <div id="our-projects">
      <?php
        foreach($random_posts as $post) { setup_postdata($post) ?>
         <?php $project_type = get_field( 'project_type' ); ?>
          <a href="<?php the_permalink(); ?>">
            <?php $image = get_field('project_image_home'); ?>
              <img src="<?= $image['sizes']['large'] ?>">
                <div>
                  <h3><span><?php the_field( 'client' ); ?></span></h3>
                  <p><span><?php the_field('project_blurb');?></span></p>
                    <?php foreach($project_type as $item): ?>
                      <button class="btn <?php echo strtolower($item); ?>"><?php echo $item; ?></button>
                    <?php endforeach; ?>
                </div>
          </a>
      <?php }
        wp_reset_postdata();
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
    <a class="show-me middle" href="../">See more of our projects</a>
  </div>
</div>
</div>
<?php get_footer(); ?>