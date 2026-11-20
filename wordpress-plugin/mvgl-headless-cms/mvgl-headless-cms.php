<?php
/**
 * Plugin Name: MVGL Kenya Headless CMS
 * Plugin URI: https://multivistaprintsolutions.com
 * Description: Production-ready Headless CMS engine for MVGL Kenya. Manages Products, Events, Insights/Blogs, and Careers with native WPGraphQL schema, CORS, and 0-second real-time cache bypassing.
 * Version: 1.0.0
 * Author: MVGL Kenya
 * Author URI: https://multivistaprintsolutions.com
 * License: GPL-2.0+
 * Text Domain: mvgl-headless-cms
 */

if (!defined('ABSPATH')) {
    exit; // Exit if accessed directly.
}

define('MVGL_CMS_VERSION', '1.0.0');
define('MVGL_CMS_DIR', plugin_dir_path(__FILE__));
define('MVGL_CMS_URL', plugin_dir_url(__FILE__));

// Require Core Modules
require_once MVGL_CMS_DIR . 'includes/post-types.php';
require_once MVGL_CMS_DIR . 'includes/meta-boxes.php';
require_once MVGL_CMS_DIR . 'includes/graphql.php';
require_once MVGL_CMS_DIR . 'includes/cors-cache.php';

/**
 * Enqueue Admin Assets for Meta Boxes
 */
add_action('admin_enqueue_scripts', function ($hook) {
    global $post;

    if (!in_array($hook, ['post.php', 'post-new.php'])) {
        return;
    }

    $screen = get_current_screen();
    $allowed_types = ['product', 'event', 'career', 'post', 'insight'];
    if (!$screen || !in_array($screen->post_type, $allowed_types)) {
        return;
    }

    // WordPress core media uploader scripts
    wp_enqueue_media();

    // Custom Admin CSS
    wp_enqueue_style(
        'mvgl-cms-admin-css',
        MVGL_CMS_URL . 'assets/css/admin.css',
        [],
        MVGL_CMS_VERSION
    );

    // Custom Admin JS
    wp_enqueue_script(
        'mvgl-cms-admin-js',
        MVGL_CMS_URL . 'assets/js/admin.js',
        ['jquery'],
        MVGL_CMS_VERSION,
        true
    );
});

/**
 * Flush rewrite rules on plugin activation
 */
register_activation_hook(__FILE__, function () {
    mvgl_register_post_types();
    flush_rewrite_rules();
});

register_deactivation_hook(__FILE__, function () {
    flush_rewrite_rules();
});

