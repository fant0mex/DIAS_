<?php

if (!current_user_can(‘edit_posts’)) {
show_admin_bar(false);
}

function wpbootstrap_scripts_with_jquery()
{
  // Register the script like this for a theme:
  wp_register_script( 'custom-script', get_template_directory_uri() . '/bootstrap/js/bootstrap.js', array( 'jquery' ) );
  // For either a plugin or a theme, you can then enqueue the script:
  wp_enqueue_script( 'custom-script' );
}
add_action( 'wp_enqueue_scripts', 'wpbootstrap_scripts_with_jquery' );


add_theme_support( 'menus');

add_theme_support( 'post-thumbnails' );


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

  create_widget( 'Left Footer', "footer_left", "Displays in the bottom left footer");
  create_widget( 'Middle Footer', "footer_middle", "Displays in the bottom middle footer");
  create_widget( 'Right Footer', "footer_right", "Displays in the bottom right footer");

  add_filter( 'pre_get_posts', 'my_get_posts' );

//     function my_get_posts( $query ) {

//     if ( is_home() && $query->is_main_query() )
//     $query->set( 'post_type', array( 'homepage-slider' ) );

//     return $query;
// }

?>




