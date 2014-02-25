<?php get_header(); ?>
<div class="container">
  <div class="row">
  <?php
  if ( have_posts() ) :
    while ( have_posts() ):
      the_post();
  ?>
      <div class="article-bg" style="background-image: url(<?php bloginfo('template_directory'); ?>/images/big_test.jpg)"></div>

      <article class="splash container">
          <div id="intro">
            <h2><?php the_title(); ?></h2>

            <ul>
              <li><?php the_field( 'client' ); ?></li>
              <li><?php the_field( 'project_type' ); ?></li>
              <li><a href="<?php the_permalink() ;?>">Visit the site</a></li>
            </ul>

            <p><?php the_field( 'description' ); ?></p>
          </div>
      </article>

    </div>

    <div class="row white">
      <div class="col-md-6 details">
        <h2>Extra Stuff</h2>
        <p>
          Aenean suscipit mi non dolor consequat lobortis. Quisque at lorem at nibh tincidunt consequat.
          Sed scelerisque turpis eu mattis pharetra. Fusce eget ante justo. Maecenas dignissim, tellus vel vulputate hendrerit,
          erat justo pharetra lacus, sed rutrum enim lacus sollicitudin enim. Pellentesque eu suscipit dolor.
          Nunc suscipit ultricies risus aliquet accumsan. Mauris facilisis tortor eget augue hendrerit, nec interdum mi pretium.
          Aenean varius hendrerit metus ut faucibus.
        </p>
      </div>

      <div class="col-md-6 detail">
        <img src="<?php bloginfo('template_directory'); ?>/images/single_test.jpg">
      </div>
    </div>


    <div class="action">
      <img src="<?php bloginfo('template_directory'); ?>/images/big_test_last.png">
    </div>

    <div class="row white quote">
      <h3><em>Client Testimonial - Very Brief</em></h3>
    </div>

     <div class="row">
      <div id="skills">
        <h3>Showing off our Skills in:</h3>
        <canvas id="myChart" width="400" height="400"></canvas>
      </div>
    </div>
  <?php
    endwhile;
  endif;
  ?>
<?php get_footer(); ?>