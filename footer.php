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


      <div class= "navbar navbar-default navbar-fixed-bottom">
          <div class="container">


                <div class="navbar-text pull-left">
                  <a href="#">&copy; <?php echo date( 'Y' ) ;?> <?php bloginfo('name'); ?></a>
                </div>

                 <div class="navbar-text pull-right">
                  <a href="#"><i class="largeIcon fa fa-facebook"></i></a>
                  <a href="#"><i class="largeIcon fa fa-twitter"></i></a>
                  <a href="#"><i class="largeIcon fa fa-instagram"></i></a>
                  <a href="#"><i class="largeIcon fa fa-linkedin"></i></a>
                  <a href="#"><i class="largeIcon fa fa-pinterest"></i></a>

                </div>

              </div>
            </div>
          </div>
          <script type="text/javascript">
              jQuery(document).ready(function($) {
                  $('.carousel').carousel({
                    interval: 2000
                  })
              });
              </script>

           <?php wp_footer(); ?>

       </body>
      </html>