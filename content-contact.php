
<div class="container-fluid" id="contact">

  <iframe width="100%" height="500" frameborder="0" style="border:0"
  src="https://www.google.com/maps/embed/v1/place?q=Bonhill%20Street%2C%20London%20EC2A%204BX%2C%20United%20Kingdom&key=AIzaSyDgEEGJBk9TLjtb-VAvAk4Y0riBWm9mvjY">
  </iframe>

    <div class="address">
        <p>DIAS Creative<br>3rd Floor,<br>6-8 Bonhill Street<br>London, EC2A 4BX<br>United Kingdom</p><br>
        <p><a href="callto:+442079935746">+44 (0) 20 7993 5746</a></p>
        <p><a href="mailto:info@diascreative.com">info@diascreative.com</a></p>
        <p>#dias_creative</p>
    </div>

    <div id="contact-form">
      <?php query_posts('pagename=contact'); ?>
        <?php if (have_posts()) :
          while (have_posts()) : the_post(); ?>
            <?php the_content(); ?>
    </div>
      <?php endwhile; endif; ?>
</div>

