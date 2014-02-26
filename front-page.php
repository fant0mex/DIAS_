<?php
  get_header();
  the_post();
  get_template_part('content', 'hero-image');
?>

<div class="box-secondary box-full-width">
  <div class="container">
    <?php the_content(); ?>
  </div>
</div>

<div class="box-tertiary box-full-width">
  <div class="container">
    <div class="row" id="company-logos">
      <?php the_field("company_logos");?>
    </div>
  </div>
</div>

<?php get_footer(); ?>