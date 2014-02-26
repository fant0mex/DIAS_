<?php get_header(); ?>

<?php if( get_field('hero_image') ): ?>
<div id="hero">
  <img src="<?php the_field('hero_image'); ?>">
  <div class="carousel-caption">
    <h1><?php the_title();?></h1>

    <p><?php the_field("hero_description");?></p>
  </div>
</div>
<?php endif; ?>

<div class="container">
  <div class="row">
    <div class="col-md-3">
      <h3 class="page-head"><?php the_title(); ?></h3>
      <p><?php the_content(); ?></p>
    </div>

    <div class="col-md-9">
      <div id="address">
        <h2>Address</h2>

        <p>3rd Floor, 6-8 Bonhill Street, London, EC2A 4BX</p>
        <p>Tel: <a href="callto:+442079935746">+44 (0) 20 7993 5746</a></p>
        <p>Email: <a href="mailto:info@diascreative.com">info@diascreative.com</a></p>
      </div>

      <div id="map"></div>
    </div>
  </div>

  <div class="row jobs">
    <div class="col-xs-6">
      <h2>Work With Us</h2>

      <p>If you’d like to chat about how DIAS can make things worth making with your company or organisation, get in touch.</p>
    </div>

    <div class="col-md-6">
      <h2>Current Jobs</h2>

      <ul>
        <li>Job</li>
          <ul>
            <li>Specs</li>
            <li>Duties</li>
            <li>Info</li>
          </ul>
      </ul>
    </div>
  </div>
</div>

<?php get_footer(); ?>