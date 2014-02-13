<?php get_header(); ?>

 <div class= "container">
  <div class="row page">
    <div class="col-md-12 blog8">

  <h1>DIAS__SAID</h1>

<?php
if ( have_posts() ) :
  while ( have_posts() ):
    the_post();
?>
    <h2><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h2>

    <ul class="info">
      <li>Posted in: <?php the_category(', ') ;?></li>
      <li>Written by: <?php the_author( );?></li>
      <li>On: <em><?php the_time('l, F jS, Y'); ?></em></li>
    </ul>

    <div class="excerpt">

      <?php the_excerpt(); ?>

    </div>

      <p><a class= "post-link" href="<?php the_permalink() ;?>">Continue Reading &rarr;</a></p>



    <hr>

<?php
  endwhile;
else:
?>
  <p>“Sorry, there are no posts.”</p>

<?php endif; ?>

    </div>
  </div>
</div>

<?php get_footer(); ?>