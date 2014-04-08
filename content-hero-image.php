<?php

$image = get_field('hero_image');

if( $image ): ?>
<div id="hero" style="background-image: url(<?= $image['url']; ?>)">
  <img src="<?= $image['url']; ?>" height="<?= $image['height'] ?>" width="<?= $image['width'] ?>"
    <?= !get_field('hero_description') ? '' : ' class="no-text"' ?>>

  <?php if( get_field('video_loop') ): ?>
    <div class="video-container dias-video-filler">
      <video src="<?php the_field('video_loop');?>"></video>
    </div>
  <?php endif; ?>

  <?php if( get_field('hero_description') ): ?>
  <div class="container">
    <div id="hero-caption">
      <div class="box-secondary">
        <?php the_field('hero_description');?>
        <?php if(is_home() || is_front_page()): ?>
        <div><a class="show-me scroll" href="#case">Find Out More About Us</a></div>
        <?php endif; ?>
      </div>
     </div>
  </div>
  <?php endif; ?>

</div>
<?php else: ?>
<div class="heroless-padding"></div>
<?php endif; ?>