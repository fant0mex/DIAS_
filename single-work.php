<?php
  get_header();
  get_template_part('content', 'hero-image');

  $project_type = get_field( 'project_type' );
  $currentID = get_the_ID();
  $args = array('post_type' => 'work', 'orderby' => 'rand', 'posts_per_page'=>2, 'exclude' => $currentID);
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

      <div class="col-xs-4">
        <div class="sidebar">
          <img src="<?php the_field('client_logo'); ?>">
          <h5>Client</h5>
          <p><?php the_field('client'); ?></p>
          <h5>Product</h5>
          <p><?php the_field('product_title'); ?></p>
          <h5>Project</h5>
          <p><?php the_title(); ?></p>
          <h5>Links</h5>
          <a href="<?php the_permalink(); ?>"><?php the_field('url'); ?></a>
          <?php foreach($project_type as $item): ?>
            <button disabled class="btn <?php echo strtolower($item); ?>"><?php echo $item; ?></button>
          <?php endforeach; ?>
        </div>
      </div>
      <div class="col-xs-8">
        <div class="brief">
          <?php the_field('brief'); ?>
        </div>
      </div>
    </div>
  </div>
</div>

<div id="project-page">
    <?php the_content(); ?>
</div>

<div id="myCarousel" class="carousel slide">
  <div class="carousel-inner">
    <?php
    $the_query = new WP_Query(array(
    'post_type' => 'work',
    'posts_per_page' => 1
    ));
    while ( $the_query->have_posts() ) :
    $the_query->the_post();

    $image = get_field('slider_image');
    ?>

    <div class="item active">
      <img src="<?= $image ?>">
   </div><!-- item active -->

  <?php
    endwhile;
   wp_reset_postdata();
  ?>

  <?php
    $the_query = new WP_Query(array(
    'post_type' => 'work',
    'posts_per_page' => 3,
    'offset' => 1
  ));
    while ( $the_query->have_posts() ) :
    $the_query->the_post();

    $image = get_field('slider_image');
  ?>

    <div class="item">
      <img src="<?= $image ?>">
    </div><!-- item -->

  <?php
    endwhile;
    wp_reset_postdata();
  ?>
 </div><!-- carousel-inner -->

 <a class="left carousel-control" href="#myCarousel" data-slide="prev">‹</a>
 <a class="right carousel-control" href="#myCarousel" data-slide="next">›</a>
</div><!-- #myCarousel -->


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
               <div class="container">
                <h3><?php the_field( 'client' ); ?></h3>
                  <p><?php the_field('project_blurb');?></p>
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
    <a class="show-me middle" href="#our-projects">See more of our projects</a>
  </div>
</div>
</div>
<?php get_footer(); ?>