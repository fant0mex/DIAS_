<?php get_header(); ?>

      <div id="myCarousel" class="carousel slide">

        <ol class="carousel-indicators">
          <li data-target="#myCarousel" data-slide-to="0" class="active"></li>
          <li data-target="#myCarousel" data-slide-to="1"></li>
          <li data-target="#myCarousel" data-slide-to="2"></li>

        </ol>

        <div class="carousel-inner">
          <div class="item active">
            <img src="<?php bloginfo('template_directory'); ?>/images/slide_placeholder_01c.jpg" class="img-responsive" alt="Responsive image">
            <div class="container">
              <div class="carousel-caption pull-left">
                <h1>Project Title</h1>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.<br> Cras euismod mi felis, quis suscipit velit sodales nec.</p>
                <p><a class="btn btn-large btn-primary" href="#">View More</a></p>
              </div>
            </div>
          </div>

          <div class="item">
            <img src="<?php bloginfo('template_directory'); ?>/images/slide_placeholder_02c.jpg" class="img-responsive" alt="Responsive image">
            <div class="container">
              <div class="carousel-caption pull-left">
                <h1>Project Title</h1>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.<br> Cras euismod mi felis, quis suscipit velit sodales nec.</p>
                <p><a class="btn btn-large btn-primary" href="#">View More</a></p>
              </div>
            </div>
          </div>

          <div class="item">
            <img src="<?php bloginfo('template_directory'); ?>/images/slide_placeholder_03c.jpg" class="img-responsive" alt="Responsive image">
            <div class="container">
              <div class="carousel-caption pull-left">
                <h1>Project Title</h1>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.<br> Cras euismod mi felis, quis suscipit velit sodales nec.</p>
                <p><a class="btn btn-large btn-primary" href="#">View More</a></p>
              </div>
            </div>
          </div>

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


            <h3>Twitter</h3>
            <p>Install Twiget Plugin  and place widget here.</p>

            <?php endif; ?>
           </div>

           <div class="col-md-4 footer_middle">
              <?php if( dynamic_sidebar( 'footer_middle' )): ?>

             <?php else: ;?>


             <h3>Recent Posts</h3>
             <p>Install Recent Posts Widget and place here.</p>

           <?php endif; ?>
           </div>

           <div class="col-md-4 footer_right">
            <?php if( dynamic_sidebar( 'footer_right' )): ?>

            <?php else: ;?>


            <h3>Instagram</h3>
            <p>Install WPInstagram Images Widget and place here.</p>

            <?php endif; ?>

           </div>
        </div>
    </div>

<?php get_footer(); ?>