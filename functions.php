<?php

if (!current_user_can(‘edit_posts’)) {
show_admin_bar(false);
}

function wpbootstrap_scripts_with_jquery() {
  // Register the script like this for a theme:
  wp_register_script( 'custom-script', get_template_directory_uri() . '/bootstrap/js/bootstrap.js', array( 'jquery' ) );
  // For either a plugin or a theme, you can then enqueue the script:
  wp_enqueue_script( 'custom-script' );
}

add_action( 'wp_enqueue_scripts', 'wpbootstrap_scripts_with_jquery' );

add_theme_support( 'menus');

add_theme_support( 'post-thumbnails' );

add_image_size( $name, $width, $height, $crop );


function create_widget( $name, $id, $description ) {

  $args = array(
      'name'          => __( $name ),
      'id'            => $id,
      'description'   => $description,
      'before_widget' => '',
      'after_widget'  => '',
      'before_title'  => '<h3>',
      'after_title'   => '</h3>',
  );

  register_sidebar( $args   );

}

create_widget( 'Blog page sidebar', "sidebar_single_blog", "Sidebar widget for single blog page");
create_widget( 'Blog listings sidebar', "sidebar_blog", "Sidebar widget for blog listings page");

add_action('init', 'create_custom_post_types');

function create_custom_post_types() {
  register_post_type( 'work',
    array(
      'labels' => array(
        'name' => __( 'Projects' ),
        'singular_name' => __( 'Project' )
      ),
      'public' => true,
      'menu_icon' => get_stylesheet_directory_uri() . '/images/admin-work.png',
      'menu_position' => 7,
      'has_archive' => true,
    )
  );

  register_post_type( 'hero',
    array(
      'labels' => array(
        'name' => __( 'Homepage Hero' ),
        'singular_name' => __( 'Homepage Hero' )
      ),
      'public' => true,
      'menu_icon' => get_stylesheet_directory_uri() . '/images/admin-hero.png',
      'menu_position' => 8
    )
  );
}