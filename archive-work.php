<?php
  get_header();
  $project_type = get_field( 'project_type' );
  $args = array('post_type' => 'work', 'posts_per_page' => -1, 'orderby' => 'date');
  $random_posts = get_posts($args);
?>

<div id="hero" style="background-image: url(<?php bloginfo('template_directory'); ?>/images/helmuts.jpg)">
  <div class="container">
    <div id="hero-caption">
      <div class="box-secondary">
        See what happens when we put our thinking caps on and start pedalling…
      </div>
    </div>
  </div>
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
                <button class="btn <?php echo strtolower($item); ?> single"><?php echo $item; ?></button>
                <?php endforeach; ?>
              </div>
          </a>
      <?php }
        wp_reset_postdata();
      ?>
    </div>
  </div>
</div>

<?php get_footer(); ?>