<?php get_header(); ?>





 <div class="blog">

 </div>

  <?php
if ( have_posts() ) :
  while ( have_posts() ):
    the_post();
?>

<?php
if($stripe == 'dark') {
  $stripe = 'bright';
} else {
  $stripe = 'dark'; }
  ?>


    <div class="post <?php echo $stripe; ?> row entry">



        <h2><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h2>

          <?php
            if ( has_post_thumbnail() ) {
              the_post_thumbnail('full', array('class' => 'img-responsive entry'));
            }
            ?>
      <!--   <?php the_content(); ?> -->



              <ul class="info">
                <li>Posted in: <?php the_category(', ') ;?></li>
                <li>Written by: <?php the_author( );?></li>
                <li>On: <em><?php the_time('l, F jS, Y'); ?></em></li>
              </ul>

              <div class="container excerpt">

                <?php the_excerpt(); ?>

              </div>

                <p><a class= "post-link" href="<?php the_permalink() ;?>">Continue Reading &rarr;</a></p>
        </div>



<?php
  endwhile;
else:
?>
  <p>“Sorry, there are no posts.”</p>

<?php endif; ?>



</div>

<?php get_footer(); ?>