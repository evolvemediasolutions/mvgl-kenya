<?php
/**
 * CORS and 0-Second Real-Time Cache Bypassing Engine
 * Guarantees that any edit in WordPress goes live immediately to the frontend.
 */

if (!defined('ABSPATH')) {
    exit;
}

/**
 * Enable Full CORS Headers on GraphQL and REST API
 */
add_action('init', function () {
    // Send CORS headers for all requests
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
    header("Access-Control-Allow-Headers: Authorization, Content-Type, X-Requested-With, X-Apollo-Tracing");
    header("Access-Control-Allow-Credentials: true");

    // Handle preflight OPTIONS request
    if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
        status_header(200);
        exit();
    }
}, 1);

/**
 * Enforce Zero-Cache Headers on GraphQL Responses
 */
add_filter('graphql_response_headers_to_send', function ($headers) {
    $headers['Cache-Control'] = 'no-store, no-cache, must-revalidate, max-age=0, post-check=0, pre-check=0';
    $headers['Pragma'] = 'no-cache';
    $headers['Expires'] = 'Wed, 11 Jan 1984 05:00:00 GMT';
    $headers['X-Accel-Expires'] = '0'; // For NGINX microcaching bypass
    return $headers;
});

/**
 * Disable WPGraphQL Smart Cache if active to prevent stale query caching
 */
add_filter('wpgraphql_cache_enable', '__return_false');
add_filter('wpgraphql_cache_max_age', '__return_zero');

/**
 * 0-Second Delay Cache Purging Engine
 * Fires when any product, event, career, or article is created, updated, or deleted.
 */
function mvgl_purge_all_caches($post_id = null) {
    // 1. Core WordPress Object Cache
    if (function_exists('wp_cache_flush')) {
        wp_cache_flush();
    }

    // 2. LiteSpeed Cache
    if (defined('LSCWP_V')) {
        do_action('litespeed_purge_all');
    }

    // 3. WP Rocket
    if (function_exists('rocket_clean_domain')) {
        rocket_clean_domain();
    }

    // 4. W3 Total Cache
    if (function_exists('w3tc_flush_all')) {
        w3tc_flush_all();
    }

    // 5. WP Super Cache
    if (function_exists('wp_cache_clear_cache')) {
        wp_cache_clear_cache();
    }

    // 6. Autoptimize
    if (class_exists('autoptimizeCache') && method_exists('autoptimizeCache', 'clearall')) {
        autoptimizeCache::clearall();
    }

    // 7. WP-Optimize
    if (class_exists('WP_Optimize') && method_exists('WP_Optimize', 'get_page_cache')) {
        $page_cache = WP_Optimize()->get_page_cache();
        if ($page_cache && method_exists($page_cache, 'purge')) {
            $page_cache->purge();
        }
    }
}

// Hook purge engine to post lifecycle events
add_action('save_post', 'mvgl_purge_all_caches', 999);
add_action('edit_post', 'mvgl_purge_all_caches', 999);
add_action('post_updated', 'mvgl_purge_all_caches', 999);
add_action('trashed_post', 'mvgl_purge_all_caches', 999);
add_action('deleted_post', 'mvgl_purge_all_caches', 999);

