<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="description" content="We make things worth making. Digital + Motion + Interaction.">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">

    <title><?php wp_title('|',1,'right'); ?> <?php bloginfo('name'); ?></title>

    <link href="http://netdna.bootstrapcdn.com/font-awesome/4.0.3/css/font-awesome.css" rel="stylesheet">
    <link rel="stylesheet" type="text/css" href="<?php bloginfo('template_url'); ?>/css/style.css" media="all" />
    <link rel="icon" type="image/png" href="<?php bloginfo('template_directory'); ?>/images/avatar_50fb2d27989a_128.png">

    <?php wp_enqueue_script("jquery"); ?>
    <?php wp_head(); ?>
    <script>
      (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
      (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
      m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
      })(window,document,'script','//www.google-analytics.com/analytics.js','ga');
      ga('create', 'UA-45469521-1', 'diascreative.com');
      ga('send', 'pageview');
    </script>
  </head>

  <body <?php if (is_page('home')) { echo 'onload="initialize()" onunload="GUnload()"'; } ?> class="<?= (is_home() || is_front_page()) ? 'home' : 'not-home' ?>">
    <header id="header" class="navbar navbar-default navbar-fixed-top" role="navigation">
      <div class="container" id="float-header">
        <div class="navbar-header">
          <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button>

          <h1 id="logo">
            <a href="<?php echo site_url(); ?>">
              <img src="<?php bloginfo('template_directory'); ?>/images/logo.svg" />
            </a>
          </h1>

          <h2 id="strap" class="hidden-sm hidden-xs"><?php bloginfo('description') ?></h2>

        </div>

        <div class="navbar-collapse collapse">
          <ul class="nav navbar-nav">
            <li><?php wp_nav_menu( array('menu' => 'Primary' )); ?></li>
          </ul>
        </div>
      </div>
    </header>