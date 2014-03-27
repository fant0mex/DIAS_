
<div class="container-fluid" id="contact">
  <div class="row">
    <div class="col-sm-12">
      <div id="map"></div>
        <a id="navigate"
          target="_blank"
          href="http://maps.google.com/maps?daddr=3rd+Floor,+6-8+Bonhill+Street,+London,+EC2A+4BX&amp;saddr=">
          <i class="icon navigate"></i>
        </a>
    </div>
    <div class="address">
        <p>DIAS Creative<br>3rd Floor,<br>6-8 Bonhill Street<br>London, EC2A 4BX<br>United Kingdom</p><br>
        <p><a href="callto:+442079935746">+44 (0) 20 7993 5746</a></p>
        <p><a href="mailto:info@diascreative.com">info@diascreative.com</a></p>
        <p>#dias_creative</p>
    </div>

    <div id="contact-form">
      <?php
        $my_id = 137;
        $post_id_137 = get_post($my_id);
        $content = $post_id_137->post_content;
        $content = apply_filters('the_content', $content);
        echo $content;
      ?>
    </div>
  </div>
</div>
