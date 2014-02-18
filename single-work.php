<?php get_header(); ?>

<div class="container">
  <div class="row work">
    <div class="col-md-6">
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

          <img src="<?php the_field( 'project_image' ); ?>" class="img-responsive" alt="Responsive image">


          <?php $images =& get_children( 'post_type=attachment&post_mime_type=image&post_parent=$post->ID' );

           if ($images) {

            foreach ( $images as $attachment_id => $attachment ) {
            echo wp_get_attachment_image( $attachment_id, 'large' );
            }
            };

      ?>



      </div>

      <div class="col-md-6 single">

        <h1><?php the_title(); ?></h1>

        <ul>

          <li>Client: <?php the_field( 'client' ); ?></li>
          <li><?php the_field( 'project_type' ); ?></li>
          <li><a href="<?php the_permalink() ;?>"><p><?php the_field( 'url' ) ;?></p></a></li>

        </ul>

        <hr>

        <p><?php the_field( 'description' ); ?></p>





        <?php
        endwhile;
      else:
      ?>
        <img src="">

      <?php endif; ?>

       </div>
    </div>
</div>



<?php get_footer(); ?>