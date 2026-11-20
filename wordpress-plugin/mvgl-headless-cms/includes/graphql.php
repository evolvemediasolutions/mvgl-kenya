<?php
/**
 * WPGraphQL Schema Extensions for MVGL Headless CMS
 * Maps WordPress post meta to clean GraphQL fields matching the React frontend.
 */

if (!defined('ABSPATH')) {
    exit;
}

add_action('graphql_register_types', function () {
    // -------------------------------------------------------------
    // 1. PRODUCTS SCHEMA
    // -------------------------------------------------------------
    register_graphql_object_type('MvglBrochureType', [
        'description' => 'Product PDF Brochure details',
        'fields' => [
            'mediaItemUrl' => ['type' => 'String'],
            'url'          => ['type' => 'String'],
        ],
    ]);

    register_graphql_object_type('MvglProductAcfType', [
        'description' => 'Custom fields for Product',
        'fields' => [
            'partner'     => ['type' => 'String'],
            'solution'    => ['type' => 'String'],
            'specs'       => ['type' => 'String'],
            'tag'         => ['type' => 'String'],
            'category'    => ['type' => 'String'],
            'exploreUrl'  => ['type' => 'String'],
            'isFeatured'  => ['type' => 'Boolean'],
            'brochure'    => [
                'type' => 'MvglBrochureType',
                'resolve' => function ($source) {
                    $post_id = $source['post_id'] ?? 0;
                    $url = get_post_meta($post_id, '_mvgl_brochure_url', true);
                    return $url ? ['mediaItemUrl' => $url, 'url' => $url] : null;
                }
            ],
        ],
    ]);

    register_graphql_field('Product', 'acf', [
        'type' => 'MvglProductAcfType',
        'description' => 'Product custom fields matching frontend queries',
        'resolve' => function ($post) {
            $post_id = $post->databaseId;
            return [
                'post_id'    => $post_id,
                'partner'    => get_post_meta($post_id, '_mvgl_partner', true) ?: 'Rockwell Automation',
                'solution'   => get_post_meta($post_id, '_mvgl_solution', true) ?: 'Automation & Control',
                'specs'      => get_post_meta($post_id, '_mvgl_specs', true) ?: '',
                'tag'        => get_post_meta($post_id, '_mvgl_tag', true) ?: '',
                'category'   => get_post_meta($post_id, '_mvgl_category', true) ?: 'all',
                'exploreUrl' => get_post_meta($post_id, '_mvgl_explore_url', true) ?: '',
                'isFeatured' => (bool) get_post_meta($post_id, '_mvgl_is_featured', true),
            ];
        },
    ]);

    // -------------------------------------------------------------
    // 2. EVENTS SCHEMA
    // -------------------------------------------------------------
    register_graphql_object_type('MvglEventAcfType', [
        'description' => 'Custom fields for Event',
        'fields' => [
            'eventType'       => ['type' => 'String'],
            'dateDisplay'     => ['type' => 'String'],
            'startDate'       => ['type' => 'String'],
            'endDate'         => ['type' => 'String'],
            'location'        => ['type' => 'String'],
            'boothNumber'     => ['type' => 'String'],
            'registrationUrl' => ['type' => 'String'],
            'eventStatus'     => ['type' => 'String'],
            'description'     => ['type' => 'String'],
        ],
    ]);

    register_graphql_field('Event', 'acf', [
        'type' => 'MvglEventAcfType',
        'description' => 'Event custom fields matching frontend queries',
        'resolve' => function ($post) {
            $post_id = $post->databaseId;
            return [
                'eventType'       => get_post_meta($post_id, '_mvgl_event_type', true) ?: 'Industrial Expo',
                'dateDisplay'     => get_post_meta($post_id, '_mvgl_date_display', true) ?: '',
                'startDate'       => get_post_meta($post_id, '_mvgl_start_date', true) ?: '',
                'endDate'         => get_post_meta($post_id, '_mvgl_end_date', true) ?: '',
                'location'        => get_post_meta($post_id, '_mvgl_location', true) ?: 'Nairobi, Kenya',
                'boothNumber'     => get_post_meta($post_id, '_mvgl_booth_number', true) ?: '',
                'registrationUrl' => get_post_meta($post_id, '_mvgl_registration_url', true) ?: '',
                'eventStatus'     => get_post_meta($post_id, '_mvgl_event_status', true) ?: 'Upcoming',
                'description'     => $post->content ?: '',
            ];
        },
    ]);

    // -------------------------------------------------------------
    // 3. CAREERS SCHEMA
    // -------------------------------------------------------------
    register_graphql_object_type('MvglCareerAcfType', [
        'description' => 'Custom fields for Career Position',
        'fields' => [
            'jobCode'          => ['type' => 'String'],
            'department'       => ['type' => 'String'],
            'location'         => ['type' => 'String'],
            'jobType'          => ['type' => 'String'],
            'experienceLevel'  => ['type' => 'String'],
            'deadline'         => ['type' => 'String'],
            'isActive'         => ['type' => 'Boolean'],
            'summary'          => ['type' => 'String'],
            'responsibilities' => ['type' => 'String'],
            'requirements'     => ['type' => 'String'],
        ],
    ]);

    register_graphql_field('Career', 'acf', [
        'type' => 'MvglCareerAcfType',
        'description' => 'Career custom fields matching frontend queries',
        'resolve' => function ($post) {
            $post_id = $post->databaseId;
            $isActive = get_post_meta($post_id, '_mvgl_is_active', true);
            return [
                'jobCode'          => get_post_meta($post_id, '_mvgl_job_code', true) ?: '',
                'department'       => get_post_meta($post_id, '_mvgl_department', true) ?: 'Engineering & Technical',
                'location'         => get_post_meta($post_id, '_mvgl_location', true) ?: 'Nairobi, Kenya',
                'jobType'          => get_post_meta($post_id, '_mvgl_job_type', true) ?: 'Full-time',
                'experienceLevel'  => get_post_meta($post_id, '_mvgl_experience_level', true) ?: '3+ Years Exp',
                'deadline'         => get_post_meta($post_id, '_mvgl_deadline', true) ?: '',
                'isActive'         => ($isActive === '') ? true : (bool) $isActive,
                'summary'          => get_post_meta($post_id, '_mvgl_summary', true) ?: '',
                'responsibilities' => get_post_meta($post_id, '_mvgl_responsibilities', true) ?: '',
                'requirements'     => get_post_meta($post_id, '_mvgl_requirements', true) ?: '',
            ];
        },
    ]);

    // -------------------------------------------------------------
    // 4. POSTS & INSIGHTS SCHEMA (Articles / Blogs)
    // -------------------------------------------------------------
    register_graphql_object_type('MvglPostAcfType', [
        'description' => 'Custom fields for Articles & Posts',
        'fields' => [
            'readTime'   => ['type' => 'String'],
            'isFeatured' => ['type' => 'Boolean'],
        ],
    ]);

    foreach (['Post', 'Insight'] as $type_name) {
        register_graphql_field($type_name, 'acf', [
            'type' => 'MvglPostAcfType',
            'description' => 'Article metadata matching frontend queries',
            'resolve' => function ($post) {
                $post_id = $post->databaseId;
                return [
                    'readTime'   => get_post_meta($post_id, '_mvgl_read_time', true) ?: '5 min read',
                    'isFeatured' => (bool) get_post_meta($post_id, '_mvgl_is_featured', true),
                ];
            },
        ]);
    }
});

