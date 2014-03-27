<?php
  get_header();
  the_post();
  get_template_part('content', 'hero-image');

  $recentWork = new WP_Query(array(
    'post_type' => 'work'
  ));

  wp_reset_postdata();
?>

<div class="box-secondary box-full-width" id="case">
  <div class="container">
    <?php the_content(); ?>
      <a class="show-me" href="#">Find Out More About How We Work</a>
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

          $image = get_field('project_image');
      ?>
          <a href="<?php the_permalink(); ?>">
            <img src="<?= $image['sizes']['large'] ?>">
              <div>
                <h3><?php the_field( 'client' ); ?></h3>
                <?php the_content();?>
              </div>
          </a>
      <?php endwhile; wp_reset_postdata(); ?>
    </div>
  </div>
</div>

<div class= "box-secondary" id= "our-work">
  <div class="container">
    <div class="project-type">
      <button type="button" class="btn web">Website_4</button>
      <button type="button" class="btn mobile">Mobile_2</button>
      <button type="button" class="btn design">Design_4</button>
      <button type="button" class="btn motion">Moving Image_1</button>
      <button type="button" class="btn identity">Identity_1</button>
    </div>
      <a class="show-me" href="#">See more of our projects</a>
  </div>
</div>

<div class= "box-secondary box-full-width" id="our-thoughts">
  <div class="container">
    <h3 class="join">OUR THOUGHTS</h3>
    <div class="row">
      <div class="col-xs-6">
        <p>Duis ac tempor lectus, id egestas orci.
          Maecenas orci turpis, rhoncus ornare fermentum sit amet, accumsan eget magna.
        </p>
      </div>
      <div class="col-xs-6">
        <p>Duis ac tempor lectus, id egestas orci.
          Maecenas orci turpis, rhoncus ornare fermentum sit amet, accumsan eget magna.
        </p>
      </div>
    </div>
    <a class="show-me" href="#">Read some of our blogs</a>
  </div>
</div>


<div class="box-tertiary box-full-width">
  <div class="container">
    <h3 class="join client">CLIENTS</h3>
    <div class="row" id="company-logos">
      <?php the_field("company_logos");?>
    </div>
    <div class="row" id="testimonial">

      <h2>"I THINK THE SUSTAINABLE ARENA NEEDS MORE<br>COMPANIES LIKE YOURS; WIRED TO MAKE COMPLEX<br>SOLUTIONS SEEM EASY."</h2>
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
      <h2>WE ARE ALWAYS ON THE LOOK OUT FOR TALENT, INSPIRED PEOPLE AND<br>
        COLLABORATORS. SEND US YOUR CV. WE DO NOT DEAL WITH RECRUITERS.</h2>
  </div>

  <div class="container">
    <div class="row jobs">
      <div class="col-xs-6 col-md-4 job">
        <h3>A Job</h3>
        <p>In eget nisl eget neque ultrices accumsan molestie nec metus.<br>
           Cras tincidunt malesuada arcu, eu scelerisque augue egestas ac.<br>
           Morbi tempor id nulla ac feugiat.</p>
        <a class="show-me" href="#">Is This You?</a>
      </div>
      <div class="col-xs-6 col-md-4 job">
        <h3>A Job</h3>
        <p>In eget nisl eget neque ultrices accumsan molestie nec metus.<br>
           Cras tincidunt malesuada arcu, eu scelerisque augue egestas ac.<br>
           Morbi tempor id nulla ac feugiat.</p>
        <a class="show-me" href="#">Is This You?</a>
      </div>
      <div class="col-xs-6 col-md-4 job">
        <h3>A Job</h3>
        <p>In eget nisl eget neque ultrices accumsan molestie nec metus.<br>
           Cras tincidunt malesuada arcu, eu scelerisque augue egestas ac.<br>
           Morbi tempor id nulla ac feugiat.</p>
        <a class="show-me" href="#">Is This You?</a>
      </div>
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
  <img src="<?php bloginfo('template_directory'); ?>/images/microphone.jpg" />
</div>

<?php get_footer(); ?>