
<!DOCTYPE html>

<html lang="en">
  <head>
    <meta charset="utf-8">
    <link href="http://netdna.bootstrapcdn.com/font-awesome/4.0.3/css/font-awesome.css" rel="stylesheet">
    <link rel="stylesheet" type="text/css" href="<?php bloginfo('template_url'); ?>/css/style.css" media="all" />
    <link rel="icon" type="image/png" href="<?php bloginfo('template_directory'); ?>/images/avatar_50fb2d27989a_128.png">

    <title><?php wp_title('|',1,'right'); ?> <?php bloginfo('name'); ?></title>
    <meta name="description" content="We make things worth making. Digital + Motion + Interaction.">

    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">

    <?php wp_enqueue_script("jquery"); ?>



    <?php wp_head(); ?>



  </head>

  <body>

    <!-- Fixed Nav -->

      <div class="navbar navbar-default navbar-fixed-top" role="navigation">
        <div class="container-fluid">
          <div class="navbar-header">
            <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
              <span class="icon-bar"></span>
              <span class="icon-bar"></span>
              <span class="icon-bar"></span>
            </button>
            <ul id="home">
               <li><h1 class="logo"><a href="<?php echo site_url(); ?>"><img src="<?php bloginfo('template_directory'); ?>/images/dias_logo.png"></a></h1></li>
               <li><h1 class="strap"><img src="<?php bloginfo('template_directory'); ?>/images/strapline.png"></h1></li>
            </ul>
          </div>

          <div class="navbar-collapse collapse">
            <ul class="nav navbar-nav">

              <li><?php wp_nav_menu( array('menu' => 'Primary' )); ?></li>

            </ul>
          </div>
        </div>
      </div>