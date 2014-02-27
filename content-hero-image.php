<?php

$image = get_field('hero_image');

if( $image ): ?>
<div id="hero">
  <img src="<?= $image['url']; ?>" height="<?= $image['height'] ?>" width="<?= $image['width'] ?>">

  <?php if( get_field('hero_description') ): ?>
  <div class="container">
    <div id="hero-caption"
      data--50-bottom="padding-bottom:100px" data-top="padding-bottom:10px">
      <div data-center="opacity:1" data-top="opacity:0"><?php the_field('hero_description');?></div>
    </div>
  </div>
  <?php endif; ?>

</div>
<?php else: ?>
<div class="heroless-padding"></div>
<?php endif; ?>