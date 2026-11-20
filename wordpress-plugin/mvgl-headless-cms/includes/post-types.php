<?php
/**
 * Register Custom Post Types for Headless CMS
 */

if (!defined('ABSPATH')) {
    exit;
}

function mvgl_register_post_types() {
    // 1. Products CPT
    register_post_type('product', [
        'labels' => [
            'name'                  => __('Products', 'mvgl-headless-cms'),
            'singular_name'         => __('Product', 'mvgl-headless-cms'),
            'menu_name'             => __('Products', 'mvgl-headless-cms'),
            'name_admin_bar'        => __('Product', 'mvgl-headless-cms'),
            'add_new'               => __('Add New', 'mvgl-headless-cms'),
            'add_new_item'          => __('Add New Product', 'mvgl-headless-cms'),
            'new_item'              => __('New Product', 'mvgl-headless-cms'),
            'edit_item'             => __('Edit Product', 'mvgl-headless-cms'),
            'view_item'             => __('View Product', 'mvgl-headless-cms'),
            'all_items'             => __('All Products', 'mvgl-headless-cms'),
            'search_items'          => __('Search Products', 'mvgl-headless-cms'),
        ],
        'public'              => true,
        'has_archive'         => true,
        'publicly_queryable'  => true,
        'show_ui'             => true,
        'show_in_menu'        => true,
        'show_in_rest'        => true,
        'show_in_graphql'     => true,
        'graphql_single_name' => 'product',
        'graphql_plural_name' => 'products',
        'menu_icon'           => 'dashicons-products',
        'menu_position'       => 20,
        'supports'            => ['title', 'editor', 'thumbnail', 'excerpt'],
    ]);

    // 2. Events CPT
    register_post_type('event', [
        'labels' => [
            'name'                  => __('Events', 'mvgl-headless-cms'),
            'singular_name'         => __('Event', 'mvgl-headless-cms'),
            'menu_name'             => __('Events', 'mvgl-headless-cms'),
            'name_admin_bar'        => __('Event', 'mvgl-headless-cms'),
            'add_new'               => __('Add New', 'mvgl-headless-cms'),
            'add_new_item'          => __('Add New Event', 'mvgl-headless-cms'),
            'new_item'              => __('New Event', 'mvgl-headless-cms'),
            'edit_item'             => __('Edit Event', 'mvgl-headless-cms'),
            'view_item'             => __('View Event', 'mvgl-headless-cms'),
            'all_items'             => __('All Events', 'mvgl-headless-cms'),
            'search_items'          => __('Search Events', 'mvgl-headless-cms'),
        ],
        'public'              => true,
        'has_archive'         => true,
        'publicly_queryable'  => true,
        'show_ui'             => true,
        'show_in_menu'        => true,
        'show_in_rest'        => true,
        'show_in_graphql'     => true,
        'graphql_single_name' => 'event',
        'graphql_plural_name' => 'events',
        'menu_icon'           => 'dashicons-calendar-alt',
        'menu_position'       => 21,
        'supports'            => ['title', 'editor', 'thumbnail', 'excerpt'],
    ]);

    // 3. Careers CPT
    register_post_type('career', [
        'labels' => [
            'name'                  => __('Careers', 'mvgl-headless-cms'),
            'singular_name'         => __('Career Position', 'mvgl-headless-cms'),
            'menu_name'             => __('Careers', 'mvgl-headless-cms'),
            'name_admin_bar'        => __('Career Position', 'mvgl-headless-cms'),
            'add_new'               => __('Add New', 'mvgl-headless-cms'),
            'add_new_item'          => __('Add New Career Position', 'mvgl-headless-cms'),
            'new_item'              => __('New Position', 'mvgl-headless-cms'),
            'edit_item'             => __('Edit Position', 'mvgl-headless-cms'),
            'view_item'             => __('View Position', 'mvgl-headless-cms'),
            'all_items'             => __('All Positions', 'mvgl-headless-cms'),
            'search_items'          => __('Search Positions', 'mvgl-headless-cms'),
        ],
        'public'              => true,
        'has_archive'         => true,
        'publicly_queryable'  => true,
        'show_ui'             => true,
        'show_in_menu'        => true,
        'show_in_rest'        => true,
        'show_in_graphql'     => true,
        'graphql_single_name' => 'career',
        'graphql_plural_name' => 'careers',
        'menu_icon'           => 'dashicons-id',
        'menu_position'       => 22,
        'supports'            => ['title', 'editor', 'excerpt'],
    ]);

    // 4. Insights CPT (in addition to standard Posts)
    register_post_type('insight', [
        'labels' => [
            'name'                  => __('Insights', 'mvgl-headless-cms'),
            'singular_name'         => __('Insight', 'mvgl-headless-cms'),
            'menu_name'             => __('Insights', 'mvgl-headless-cms'),
            'name_admin_bar'        => __('Insight', 'mvgl-headless-cms'),
            'add_new'               => __('Add New', 'mvgl-headless-cms'),
            'add_new_item'          => __('Add New Insight', 'mvgl-headless-cms'),
            'new_item'              => __('New Insight', 'mvgl-headless-cms'),
            'edit_item'             => __('Edit Insight', 'mvgl-headless-cms'),
            'view_item'             => __('View Insight', 'mvgl-headless-cms'),
            'all_items'             => __('All Insights', 'mvgl-headless-cms'),
            'search_items'          => __('Search Insights', 'mvgl-headless-cms'),
        ],
        'public'              => true,
        'has_archive'         => true,
        'publicly_queryable'  => true,
        'show_ui'             => true,
        'show_in_menu'        => true,
        'show_in_rest'        => true,
        'show_in_graphql'     => true,
        'graphql_single_name' => 'insight',
        'graphql_plural_name' => 'insights',
        'menu_icon'           => 'dashicons-format-aside',
        'menu_position'       => 23,
        'supports'            => ['title', 'editor', 'thumbnail', 'excerpt', 'author'],
        'taxonomies'          => ['category', 'post_tag'],
    ]);
}
add_action('init', 'mvgl_register_post_types');

