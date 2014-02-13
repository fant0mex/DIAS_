
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