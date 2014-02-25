<?php
  get_header();

  $sliderImages = new WP_Query(array(
                'post_type' => 'slider',
                'posts_per_page' => 4
                ));

  $imageCount = $sliderImages->post_count;

  $recentWork = new WP_Query(array(
        'post_type' => 'work'
      ));

?>

<div id="myCarousel" class="carousel slide">
  <ol class="carousel-indicators">
    <?php for ( $i = 0; $i < $imageCount; $i++ ) : ?>
    <li data-target="#myCarousel" data-slide-to="<?= $i ?>" <?= $i === 0 ? ' class="active"': '' ?>></li>
    <?php endfor; ?>
  </ol>

  <div class="carousel-inner">
    <?php
    $count = 0;

    while ( $sliderImages->have_posts() ) :
      $sliderImages->the_post();
      $count++;
    ?>
      <div class="item<?= $count === 1 ? ' active' : '' ?>">
        <img src="<?php the_field('slide');?>">

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
      <h3>Mobile First</h3><hr>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.<br>
      Maecenas consequat consequat pharetra.</p>
    </div>

    <div class="col-md-3">
      <h3>Clean Code</h3><hr>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.<br>
      Maecenas consequat consequat pharetra.</p>
    </div>

    <div class="col-md-3">
      <h3>User Experience</h3><hr>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.<br>
      Maecenas consequat consequat pharetra.</p>
    </div>

    <div class="col-md-3">
      <h3>Social Strategy</h3><hr>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.<br>
      Maecenas consequat consequat pharetra.</p>
    </div>
  </div>
</div>


<div class="container">
  <h2 id="work">Recent Work</h2>
  <div class="row recent">
    <?php
    while ($recentWork->have_posts() ):
      $recentWork->the_post();
    ?>
      <div class="col-xs-6 col-sm-3">
        <a href="<?php the_permalink(); ?>">
          <img src="<?php the_field( 'project_image' ); ?>" class="img-responsive" alt="Responsive image">
        </a>
      </div>
    <?php endwhile; ?>
  </div>
</div>

<?php get_template_part( 'content', 'widgets' ); ?>

<?php get_footer(); ?>