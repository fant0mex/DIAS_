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
}

// Front end only, don't hack on the settings page
if ( ! is_admin() ) {
    // Hook in early to modify the menu
    // This is before the CSS "selected" classes are calculated
    add_filter( 'wp_get_nav_menu_items', 'replace_placeholder_nav_menu_item_with_latest_post', 10, 3 );
}


// Replaces a custom URL placeholder with the URL to the latest post
function replace_placeholder_nav_menu_item_with_latest_post( $items, $menu, $args ) {

    // Loop through the menu items looking for placeholder(s)
    foreach ( $items as $item ) {

        // Is this the placeholder we're looking for?
        if ( '#latestpost' != $item->url )
            continue;

        // Get the latest post
        $latestpost = get_posts( array(
            'numberposts' => 1,
        ) );

        if ( empty( $latestpost ) )
            continue;

        // Replace the placeholder with the real URL
        $item->url = get_permalink( $latestpost[0]->ID );
    }

    // Return the modified (or maybe unmodified) menu items array
    return $items;
}

function cc_mime_types( $mimes ){
  $mimes['svg'] = 'image/svg+xml';
  return $mimes;
}
add_filter( 'upload_mimes', 'cc_mime_types' );