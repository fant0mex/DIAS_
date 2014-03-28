<?php

$image = get_field('hero_image');

if( $image ): ?>
<div id="hero" style="background-image: url(<?= $image['url']; ?>)">
  <img src="<?= $image['url']; ?>" height="<?= $image['height'] ?>" width="<?= $image['width'] ?>"
    <?= !get_field('hero_description') ? '' : ' class="no-text"' ?>>
  <?php if( get_field('hero_description') ): ?>
  <div class="container">
    <div id="hero-caption">
      <?php the_field('hero_description');?>
     </div>
  </div>
  <?php endif; ?>

</div>
<?php else: ?>
<div class="heroless-padding"></div>
<?php endif; ?>