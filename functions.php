<?php

//Load the Theme Css

function theme_styles() {

  wp_enqueue_style( 'bootstrap', get_template_directory_uri() . '/css/bootstrap.css');
  wp_enqueue_style( 'main', get_template_directory_uri() . '/style.css');


}

// function theme_js() {

//   wp_register_scripts( 'carousel', get_template_directory_uri() . 'js/bootstrap.js', array('jquery'), '', true);

//   if( is_page( 'home' )) {
//     wp_enqueue_script( 'carousel' );
//   }
//   wp_enqueue_script( 'theme_js', get_template_directory_uri() . 'js/theme.js', array('jquery'), '', true);
// }

// add_action( 'wp_enqueue_scripts', 'theme_js' );

add_action( 'wp_enqueue_scripts', 'theme_styles' );

// Enable cutom menus
add_theme_support( 'menus' );

?>

