
<!DOCTYPE html>

<html lang="en">
  <head>
    <meta charset="utf-8">
    <link href="http://netdna.bootstrapcdn.com/font-awesome/4.0.3/css/font-awesome.css" rel="stylesheet">
    <link href="<?php bloginfo('stylesheet_url');?>" rel="stylesheet">
    <title><?php wp_title('|',1,'right'); ?> <?php bloginfo('name'); ?></title>
    <meta name="description" content="We make things worth making. Digital + Motion + Interaction.">

    <meta name="viewport" content="width=device-width, initial-scale=1">

    <?php wp_enqueue_script("jquery"); ?>



    <?php wp_head(); ?>



  </head>

  <body>

    <!-- Fixed Nav -->

      <div class="navbar navbar-default navbar-fixed-top" role="navigation">
        <div class="container">
          <div class="navbar-header">
            <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
              <span class="icon-bar"></span>
              <span class="icon-bar"></span>
              <span class="icon-bar"></span>
            </button>
            <h1 class="logo"><a href="<?php echo site_url(); ?>"><img src="<?php bloginfo('template_directory'); ?>/images/tumblr_static_dias_logo.gif"></a></h1>
          </div>

          <div class="navbar-collapse collapse">
            <ul class="nav navbar-nav">

              <?php wp_list_pages(array('title_li' => '', 'exclude' => 4)); ?>

            </ul>
          </div>
        </div>
      </div>