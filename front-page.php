<?php
  get_header();
  the_post();
  get_template_part('content', 'hero-image');

  $recentWork = new WP_Query(array(
    'post_type' => 'work',
    'posts_per_page' => 4,
  ));

  wp_reset_postdata();
?>


<div class="box-secondary box-full-width" id="case">
  <div class="container">
    <div class="method">
      <?php echo get_the_content(); ?>
    </div>
    <div>
      <a class="show-me top" href="how-we-work">Find Out More About How We Work</a>
    </div>
  </div>
</div>


<div class="container">
  <h3 class="join">PROJECTS</h3>
</div>

<div class="container-fluid">
  <div class="row">
    <div id="our-projects">
      <?php
        while( $recentWork->have_posts() ):
          $recentWork->the_post();

          $image = get_field('project_image_home');
          $project_type = get_field( 'project_type' );
      ?>
      <a href="<?php the_permalink(); ?>">
        <img src="<?= $image['sizes']['large'] ?>">
          <div>
            <h3><span><?php the_field( 'client' ); ?></span></h3>
            <p><span><?php the_field('project_blurb');?></span></p>
            <?php foreach($project_type as $item): ?>
              <button disabled class="btn <?php echo strtolower($item); ?> single"><?php echo $item; ?></button>
            <?php endforeach; ?>
          </div>
      </a>
      <?php endwhile; wp_reset_postdata(); ?>
    </div>
  </div>
</div>

<div class= "box-secondary" id= "our-work">
  <div class="container">
      <a class="show-me middle" href="work">See more of our projects</a>
  </div>
</div>

<div class="box-tertiary box-full-width">
  <div class="container">
    <h3 class="join client">CLIENTS</h3>
    <div id="company-logos">
      <?php the_field("company_logos");?>
      <hr>
    </div>

    <div class="row" id="testimonial">

      <?php
        $args = array('post_type' => 'work', 'orderby' => 'rand');
        $random_posts = get_posts($args); ?>

        <?php
        foreach($random_posts as $post) {
          setup_postdata($post);
          $tests = get_field('testimonial');
          $givers = get_field('testimonial_giver');

          if (!empty( $tests) && !empty( $givers)) {
          ?>
            <div class="rotate">
              <blockquote><?= $tests ?></blockquote>
              <p><?= $givers ?></p>
            </div>
          <?php
          }
        }
        wp_reset_postdata();
      ?>
    </div>
  </div>
</div>

<div class= "box-secondary jobs">
  <div class="container">
    <h3 class="join">WORK WITH US</h3>
      <h2>Be you a designer, a developer, a producer or a storyteller, we're always looking for talented,
        inspired people and potential collaborators. Drop us a line and let's chat. (Though no recruiters, thanks.)</h2>
  </div>

  <div class="container">
    <div class="row jobs">
      <?php query_posts('category_name=job&showposts=3'); ?>
        <?php while (have_posts()) : the_post(); ?>
          <div class="col-xs-6 col-md-4 job">
            <h3><?php the_title(); ?></h3>
            <?php the_excerpt(); ?>
            <a class="show-me" href="<?php the_permalink(); ?>">Is This You?</a>
          </div>
        <?php endwhile;?>
    </div>
  </div>
</div>


<div class= "box-secondary find">
  <div class="container">
    <h3 class="join">FIND US</h3>
  </div>
</div>

<?php
  get_template_part( 'content','contact' );
?>

<?php get_footer(); ?>