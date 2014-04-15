<?php
  get_header();
  the_post();
  get_template_part('content', 'hero-image');

  $recentWork = new WP_Query(array(
    'post_type' => 'work',
    'posts_per_page' => 2,
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
  <h3 class="join">CASE STUDIES</h3>
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
    <div class="row" id="company-logos">
      <?php the_field("company_logos");?>

    </div>
    <div class="row" id="testimonial">
      <h1>........................................</h1>
      <h2>"I THINK THE SUSTAINABLE ARENA NEEDS MORE COMPANIES LIKE YOURS; WIRED TO MAKE COMPLEX SOLUTIONS SEEM EASY."</h2>
      <p>Etienne Mcmanus White,<br>
         Chief Marketing Officer,<br>
         Fsc (Forest Stewardship Council) US
      </p>

    </div>
  </div>
</div>

<div class= "box-secondary jobs">
  <div class="container">
    <h3 class="join">WORK WITH US</h3>
      <h2>WE ARE ALWAYS ON THE LOOK OUT FOR TALENT, INSPIRED PEOPLE AND
        COLLABORATORS.<br> SEND US YOUR CV. WE DO NOT DEAL WITH RECRUITERS.</h2>
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

<div class="box-full-width shout-out">
  <img src="<?php bloginfo('template_directory'); ?>/images/microphone.jpg">
</div>

<?php get_footer(); ?>