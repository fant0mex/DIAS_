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
                'category_name' => 'Homepage Slider',
                'posts_per_page' => 1
                ));
               while ( $the_query->have_posts() ) :
               $the_query->the_post();
            ?>
          <div class="item active">
           <?php the_post_thumbnail('full-size');?>
              <div class="carousel-caption">
               <h4><?php the_title();?></h4>
               <p><?php the_excerpt();?></p>
              </div>
             </div>
            <?php
             endwhile;
             wp_reset_postdata();
            ?>

            <?php
               $the_query = new WP_Query(array(
                'category_name' => 'Homepage Slider',
                'posts_per_page' => 3,
                'offset' => 1
                ));
               while ( $the_query->have_posts() ) :
               $the_query->the_post();
              ?>
              <div class="item">
               <?php the_post_thumbnail('full-size');?>
               <div class="carousel-caption">
                <h4><?php the_title();?></h4>
                <p><?php the_excerpt();?></p>
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
          <div class="col-md-3">
              <a href="#"><img src="<?php bloginfo('template_directory'); ?>/images/iphone.jpg" class="img-responsive" alt="Responsive image"></a>
          </div>

          <div class="col-md-3">
              <a href="#"><img src="<?php bloginfo('template_directory'); ?>/images/two_screen.jpg" class="img-responsive" alt="Responsive image"></a>
          </div>

            <div class="col-md-3">
              <a href="#"><img src="<?php bloginfo('template_directory'); ?>/images/ipad.jpg" class="img-responsive" alt="Responsive image"></a>
          </div>

           <div class="col-md-3">
              <a href="#"><img src="<?php bloginfo('template_directory'); ?>/images/headphones.jpg" class="img-responsive" alt="Responsive image"></a>
          </div>
        </div>

        <div class="row widgets">
           <div class="col-md-4 footer_left">
            <?php if( dynamic_sidebar( 'footer_left' )): ?>

            <?php else: ;?>


            <h4>Twitter</h4><hr>
            <p>Install Twiget Plugin  and place widget here.</p>

            <?php endif; ?>
           </div>

           <div class="col-md-4 footer_middle">
              <?php if( dynamic_sidebar( 'footer_middle' )): ?>

             <?php else: ;?>


             <h4>Recent Posts</h4><hr>
             <p>Install Recent Posts Widget and place here.</p>

           <?php endif; ?>
           </div>

           <div class="col-md-4 footer_right">
            <?php if( dynamic_sidebar( 'footer_right' )): ?>

            <?php else: ;?>


            <h4>Instagram</h4><hr>
            <p>Install WPInstagram Images Widget and place here.</p>

            <?php endif; ?>

           </div>
        </div>
    </div>

<?php get_footer(); ?>