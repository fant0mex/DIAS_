<?php if( get_field('hero_image') ): ?>
<div id="hero">
  <img src="<?php the_field('hero_image'); ?>">

  <div class="container">
    <div id="hero-caption">
      <?php the_field("hero_description");?>
    </div>
  </div>

</div>
<?php else: ?>
<div class="heroless-padding"></div>
<?php endif; ?>