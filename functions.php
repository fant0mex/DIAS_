<?php

if (!current_user_can(‘edit_posts’)) {
show_admin_bar(false);
}

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

if(function_exists("register_field_group"))
{
  register_field_group(array (
    'id' => 'acf_contact-page-bottom-info-boxes',
    'title' => 'Contact page bottom info boxes',
    'fields' => array (
      array (
        'key' => 'field_530f1bd9864c2',
        'label' => 'Contact page left box',
        'name' => 'contact_page_left_box',
        'type' => 'wysiwyg',
        'instructions' => 'Left box text',
        'default_value' => '',
        'toolbar' => 'full',
        'media_upload' => 'no',
      ),
      array (
        'key' => 'field_530f1bee864c3',
        'label' => 'Contact page right box',
        'name' => 'contact_page_right_box',
        'type' => 'wysiwyg',
        'instructions' => 'Right box text',
        'default_value' => '',
        'toolbar' => 'full',
        'media_upload' => 'no',
      ),
    ),
    'location' => array (
      array (
        array (
          'param' => 'page',
          'operator' => '==',
          'value' => '29',
          'order_no' => 0,
          'group_no' => 0,
        ),
      ),
    ),
    'options' => array (
      'position' => 'normal',
      'layout' => 'no_box',
      'hide_on_screen' => array (
      ),
    ),
    'menu_order' => 0,
  ));
  register_field_group(array (
    'id' => 'acf_hero-image',
    'title' => 'Hero Image',
    'fields' => array (
      array (
        'key' => 'field_530e0348c4bf1',
        'label' => 'Hero image',
        'name' => 'hero_image',
        'type' => 'image',
        'save_format' => 'object',
        'preview_size' => 'thumbnail',
        'library' => 'all',
      ),
      array (
        'key' => 'field_530e0359c4bf2',
        'label' => 'Hero Image Description',
        'name' => 'hero_description',
        'type' => 'textarea',
        'default_value' => '',
        'placeholder' => '',
        'maxlength' => '',
        'formatting' => 'br',
      ),
      array (
        'key' => 'field_5329a7fca0686',
        'label' => 'Video Loop',
        'name' => 'video_loop',
        'type' => 'file',
        'instructions' => 'Upload an optional video loop.',
        'save_format' => 'url',
        'library' => 'all',
      ),
    ),
    'location' => array (
      array (
        array (
          'param' => 'post_type',
          'operator' => '!=',
          'value' => 'post',
          'order_no' => 0,
          'group_no' => 0,
        ),
      ),
    ),
    'options' => array (
      'position' => 'normal',
      'layout' => 'no_box',
      'hide_on_screen' => array (
      ),
    ),
    'menu_order' => 0,
  ));
  register_field_group(array (
    'id' => 'acf_homepage-company-logos',
    'title' => 'Homepage Company Logos',
    'fields' => array (
      array (
        'key' => 'field_530e11b5f9d0b',
        'label' => 'Company Logos',
        'name' => 'company_logos',
        'type' => 'wysiwyg',
        'default_value' => '',
        'toolbar' => 'full',
        'media_upload' => 'yes',
      ),
    ),
    'location' => array (
      array (
        array (
          'param' => 'page',
          'operator' => '==',
          'value' => '133',
          'order_no' => 0,
          'group_no' => 0,
        ),
      ),
    ),
    'options' => array (
      'position' => 'normal',
      'layout' => 'no_box',
      'hide_on_screen' => array (
      ),
    ),
    'menu_order' => 0,
  ));
  register_field_group(array (
    'id' => 'acf_work',
    'title' => 'Work',
    'fields' => array (
      array (
        'key' => 'field_533008522b899',
        'label' => 'Date',
        'name' => 'date',
        'type' => 'text',
        'instructions' => 'Publish Date of Project.',
        'default_value' => '',
        'placeholder' => 'day/month/year',
        'prepend' => '',
        'append' => '',
        'formatting' => 'none',
        'maxlength' => '',
      ),
      array (
        'key' => 'field_5335641dbaa2a',
        'label' => 'Project Title',
        'name' => 'project_title',
        'type' => 'text',
        'instructions' => 'Enter the project title.',
        'default_value' => '',
        'placeholder' => '',
        'prepend' => '',
        'append' => '',
        'formatting' => 'none',
        'maxlength' => '',
      ),
      array (
        'key' => 'field_533008c02b89b',
        'label' => 'Client',
        'name' => 'client',
        'type' => 'text',
        'instructions' => 'Enter the name of the client.',
        'default_value' => '',
        'placeholder' => '',
        'prepend' => '',
        'append' => '',
        'formatting' => 'none',
        'maxlength' => '',
      ),
      array (
        'key' => 'field_53354da4e00bb',
        'label' => 'Client Logo',
        'name' => 'client_logo',
        'type' => 'image',
        'instructions' => 'Please upload an image of the company\'s logo.',
        'save_format' => 'url',
        'preview_size' => 'thumbnail',
        'library' => 'all',
      ),
      array (
        'key' => 'field_533008882b89a',
        'label' => 'Type of Project',
        'name' => 'project_type',
        'type' => 'checkbox',
        'instructions' => 'Check the type of project.',
        'choices' => array (
          'Website' => 'Website',
          'Mobile' => 'Mobile',
          'Design' => 'Design',
          'Moving Image' => 'Moving Image',
          'Identity' => 'Identity',
        ),
        'default_value' => '',
        'layout' => 'vertical',
      ),
      array (
        'key' => 'field_533008e22b89c',
        'label' => 'URL to Website',
        'name' => 'url',
        'type' => 'text',
        'instructions' => 'Enter in the URL for the project.',
        'default_value' => '',
        'placeholder' => '',
        'prepend' => '',
        'append' => '',
        'formatting' => 'none',
        'maxlength' => '',
      ),
      array (
        'key' => 'field_53355c67aa656',
        'label' => 'Project Image for Homepage',
        'name' => 'project_image_home',
        'type' => 'image',
        'instructions' => 'Upload an image to be displayed on the homepage case studies section.',
        'save_format' => 'object',
        'preview_size' => 'medium',
        'library' => 'all',
      ),
      array (
        'key' => 'field_5330090c2b89d',
        'label' => 'Brief',
        'name' => 'brief',
        'type' => 'textarea',
        'instructions' => 'Enter a description of the project brief.',
        'default_value' => '',
        'placeholder' => '',
        'maxlength' => '',
        'formatting' => 'br',
      ),
      array (
        'key' => 'field_5330094e2b89e',
        'label' => 'Project Images',
        'name' => 'project_images',
        'type' => 'wysiwyg',
        'instructions' => 'Upload any project images.',
        'default_value' => '',
        'toolbar' => 'basic',
        'media_upload' => 'yes',
      ),
      array (
        'key' => 'field_5335568bbccd4',
        'label' => 'Our Approach',
        'name' => 'our_approach',
        'type' => 'textarea',
        'instructions' => 'Enter a description of the approach taken.',
        'default_value' => '',
        'placeholder' => '',
        'maxlength' => '',
        'formatting' => 'br',
      ),
      array (
        'key' => 'field_533009882b89f',
        'label' => 'Approach Images',
        'name' => 'approach_images',
        'type' => 'wysiwyg',
        'instructions' => 'Add any approach images.',
        'default_value' => '',
        'toolbar' => 'basic',
        'media_upload' => 'yes',
      ),
      array (
        'key' => 'field_5335563babbce',
        'label' => 'What We Delivered',
        'name' => 'delivered',
        'type' => 'textarea',
        'instructions' => 'Enter a brief description of what was delivered.',
        'default_value' => '',
        'placeholder' => '',
        'maxlength' => '',
        'formatting' => 'br',
      ),
      array (
        'key' => 'field_53354e5080d9a',
        'label' => 'Delivery Images',
        'name' => 'delivery_images',
        'type' => 'wysiwyg',
        'instructions' => 'Upload any images of the final product.',
        'default_value' => '',
        'toolbar' => 'basic',
        'media_upload' => 'yes',
      ),
      array (
        'key' => 'field_53354f0883140',
        'label' => 'Results',
        'name' => 'results',
        'type' => 'textarea',
        'instructions' => 'Enter a brief description of the final result and any lessons learned.',
        'default_value' => '',
        'placeholder' => '',
        'maxlength' => '',
        'formatting' => 'br',
      ),
      array (
        'key' => 'field_53354f2fc6d1e',
        'label' => 'Testimonial',
        'name' => 'testimonial',
        'type' => 'textarea',
        'instructions' => 'Enter a testimonial from the client.',
        'default_value' => '',
        'placeholder' => '',
        'maxlength' => '',
        'formatting' => 'br',
      ),
      array (
        'key' => 'field_53354f5296da2',
        'label' => 'Testimonial Giver',
        'name' => 'testimonial_giver',
        'type' => 'textarea',
        'instructions' => 'Please give the details of the testimonial giver.',
        'default_value' => 'Name
  Job Title
  Organisation',
        'placeholder' => '',
        'maxlength' => '',
        'formatting' => 'br',
      ),
    ),
    'location' => array (
      array (
        array (
          'param' => 'post_type',
          'operator' => '==',
          'value' => 'work',
          'order_no' => 0,
          'group_no' => 0,
        ),
      ),
    ),
    'options' => array (
      'position' => 'normal',
      'layout' => 'no_box',
      'hide_on_screen' => array (
        0 => 'the_content',
        1 => 'excerpt',
        2 => 'custom_fields',
        3 => 'discussion',
        4 => 'comments',
        5 => 'revisions',
        6 => 'slug',
        7 => 'author',
        8 => 'format',
        9 => 'featured_image',
        10 => 'categories',
        11 => 'tags',
        12 => 'send-trackbacks',
      ),
    ),
    'menu_order' => 0,
  ));
}
