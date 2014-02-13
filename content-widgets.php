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