<?php get_header(); ?>

      <div id="myCarousel" class="carousel slide">

        <ol class="carousel-indicators">
          <li data-target="#myCarousel" data-slide-to="0" class="active"></li>
          <li data-target="#myCarousel" data-slide-to="1"></li>
          <li data-target="#myCarousel" data-slide-to="2"></li>

        </ol>

        <div class="carousel-inner">

            <?php
               $the_query = new WP_Query(array(
                'post_type' => 'slider',
                'posts_per_page' => 1
                ));
               while ( $the_query->have_posts() ) :
               $the_query->the_post();
            ?>
          <div class="item active">
           <img src="<?php the_field("slide");?>">
              <div class="carousel-caption">
               <h1><?php the_title();?></h1>
               <p><?php the_field("excerpt");?></p>
               <p><a class="btn btn-large btn-primary" href="#">View More</a></p>
              </div>
             </div>
            <?php
             endwhile;
             wp_reset_postdata();
            ?>

            <?php
               $the_query = new WP_Query(array(
                'post_type' => 'slider',
                'posts_per_page' => 3,
                'offset' => 1
                ));
               while ( $the_query->have_posts() ) :
               $the_query->the_post();
              ?>
              <div class="item">
               <img src="<?php the_field("slide");?>">
               <div class="carousel-caption">
                <h1><?php the_title();?></h1>
                <p><?php the_field("excerpt");?></p>
                <p><a class="btn btn-large btn-primary" href="#">View More</a></p>
               </div>
              </div>
              <?php
               endwhile;
               wp_reset_postdata();
            ?>

        </div>
          <a class="left carousel-control" href="#myCarousel" data-slide="prev">
            <span class="glyphicon glyphicon-chevron-left"></span>
          </a>

           <a class="right carousel-control" href="#myCarousel" data-slide="next">
            <span class="glyphicon glyphicon-chevron-right"></span>
          </a>
      </div>

 <div class="container">
      <div class="row about">
          <div class="col-md-3">
            <img src="<?php bloginfo('template_directory'); ?>/images/tablet.png" alt="Responsive image">
              <h3>Mobile First</h3><hr>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.<br>
                Maecenas consequat consequat pharetra.</p>
          </div>

          <div class="col-md-3">
            <img src="<?php bloginfo('template_directory'); ?>/images/wrench.png" alt="Responsive image">
              <h3>Clean Code</h3><hr>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.<br>
                Maecenas consequat consequat pharetra.</p>
          </div>

          <div class="col-md-3">
            <img src="<?php bloginfo('template_directory'); ?>/images/user.png" alt="Responsive image">
              <h3>User Experience</h3><hr>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.<br>
                Maecenas consequat consequat pharetra.</p>
          </div>

          <div class="col-md-3">
            <img src="<?php bloginfo('template_directory'); ?>/images/thumb.png"alt="Responsive image">
              <h3>Social Strategy</h3><hr>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.<br>
                Maecenas consequat consequat pharetra.</p>
          </div>
        </div>






      <h2>Recent Work</h2>
        <div class="row recent">

    <?php

      $args = array(
          'post_type' => 'work'
        );

      $the_query = new WP_Query( $args );
    ?>

    <?php
        if ( have_posts() ) :
        while ($the_query->have_posts() ):
        $the_query->the_post();
    ?>

      <div class="col-md-3">

          <a href="<?php the_permalink(); ?>"><img src="<?php the_field( 'project_image' ); ?>" class="img-responsive" alt="Responsive image"></a>


      </div>

              <?php
              endwhile; endif; ?>
    </div>
</div>

<?php get_template_part( 'content', 'widgets' ); ?>

<?php get_footer(); ?>