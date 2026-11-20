<?php
/**
 * Native Meta Boxes for MVGL Headless CMS
 * Renders custom field controls in WordPress admin without requiring ACF.
 */

if (!defined('ABSPATH')) {
    exit;
}

/**
 * Register Meta Boxes
 */
add_action('add_meta_boxes', function () {
    // 1. Product Meta Box
    add_meta_box(
        'mvgl_product_details',
        __('Product Specifications & Partner Info', 'mvgl-headless-cms'),
        'mvgl_render_product_metabox',
        'product',
        'normal',
        'high'
    );

    // 2. Event Meta Box
    add_meta_box(
        'mvgl_event_details',
        __('Event Logistics & Dates', 'mvgl-headless-cms'),
        'mvgl_render_event_metabox',
        'event',
        'normal',
        'high'
    );

    // 3. Career Meta Box
    add_meta_box(
        'mvgl_career_details',
        __('Career Opening Details & Requirements', 'mvgl-headless-cms'),
        'mvgl_render_career_metabox',
        'career',
        'normal',
        'high'
    );

    // 4. Post & Insight Meta Box
    foreach (['post', 'insight'] as $screen) {
        add_meta_box(
            'mvgl_article_details',
            __('Article Settings & Reading Time', 'mvgl-headless-cms'),
            'mvgl_render_article_metabox',
            $screen,
            'side',
            'default'
        );
    }
});

/**
 * Render Product Meta Box
 */
function mvgl_render_product_metabox($post) {
    wp_nonce_field('mvgl_save_meta', 'mvgl_meta_nonce');

    $partner    = get_post_meta($post->ID, '_mvgl_partner', true) ?: 'Rockwell Automation';
    $solution   = get_post_meta($post->ID, '_mvgl_solution', true) ?: 'Automation & Control';
    $tag        = get_post_meta($post->ID, '_mvgl_tag', true);
    $category   = get_post_meta($post->ID, '_mvgl_category', true);
    $specs      = get_post_meta($post->ID, '_mvgl_specs', true);
    $exploreUrl = get_post_meta($post->ID, '_mvgl_explore_url', true);
    $brochure   = get_post_meta($post->ID, '_mvgl_brochure_url', true);
    $isFeatured = (bool) get_post_meta($post->ID, '_mvgl_is_featured', true);

    $partners = [
        'Kirloskar Powergen',
        'Kirloskar Pneumatic',
        'Kirloskar Chillers',
        'SPP Pumps',
        'Rockwell Automation',
        'Fuji Electronics',
        'Xoog',
        'EPP Composites',
        'HMS Networks',
        'ProSoft Technology'
    ];

    $solutions = [
        'Power Generation',
        'Air & Gas',
        'Industrial Refrigeration',
        'HVAC & Process Cooling',
        'Industrial Pumping',
        'Industrial Automation',
        'Power Electronics',
        'Warehouse & Material Handling',
        'Air & Gas Solutions',
        'Refrigeration & HVAC Solutions',
        'Automation & Control',
        'Non Metallic Solutions',
        'Fire Pump Solutions'
    ];
    ?>
    <div class="mvgl-metabox-grid">
        <div class="mvgl-field-group">
            <label for="mvgl_partner"><strong><?php _e('OEM Partner Brand', 'mvgl-headless-cms'); ?>:</strong></label>
            <select name="mvgl_partner" id="mvgl_partner" class="widefat">
                <?php foreach ($partners as $p): ?>
                    <option value="<?php echo esc_attr($p); ?>" <?php selected($partner, $p); ?>><?php echo esc_html($p); ?></option>
                <?php endforeach; ?>
            </select>
        </div>

        <div class="mvgl-field-group">
            <label for="mvgl_solution"><strong><?php _e('Engineering Solution Category', 'mvgl-headless-cms'); ?>:</strong></label>
            <select name="mvgl_solution" id="mvgl_solution" class="widefat">
                <?php foreach ($solutions as $s): ?>
                    <option value="<?php echo esc_attr($s); ?>" <?php selected($solution, $s); ?>><?php echo esc_html($s); ?></option>
                <?php endforeach; ?>
            </select>
        </div>

        <div class="mvgl-field-group">
            <label for="mvgl_tag"><strong><?php _e('Badge / Tag Label', 'mvgl-headless-cms'); ?>:</strong></label>
            <input type="text" name="mvgl_tag" id="mvgl_tag" class="widefat" value="<?php echo esc_attr($tag); ?>" placeholder="e.g. ROCKWELL AUTOMATION or INDUSTRIAL CHILLER" />
        </div>

        <div class="mvgl-field-group">
            <label for="mvgl_category"><strong><?php _e('Filter Subcategory', 'mvgl-headless-cms'); ?>:</strong></label>
            <input type="text" name="mvgl_category" id="mvgl_category" class="widefat" value="<?php echo esc_attr($category); ?>" placeholder="e.g. pumps, drives, chillers, compression" />
        </div>

        <div class="mvgl-field-group full-width">
            <label for="mvgl_specs"><strong><?php _e('Technical Specifications', 'mvgl-headless-cms'); ?>:</strong></label>
            <textarea name="mvgl_specs" id="mvgl_specs" rows="4" class="widefat" placeholder="Enter specifications line by line or separated by pipe (|)&#10;e.g.&#10;Power Rating: 15 kW to 355 kW&#10;Flow Rate: up to 1200 m³/hr&#10;Compliance: NFPA 20 / UL-FM"><?php echo esc_textarea($specs); ?></textarea>
            <p class="description"><?php _e('Each line will automatically be formatted as a specification point on the frontend.', 'mvgl-headless-cms'); ?></p>
        </div>

        <div class="mvgl-field-group">
            <label for="mvgl_explore_url"><strong><?php _e('External Product / OEM URL', 'mvgl-headless-cms'); ?>:</strong></label>
            <input type="url" name="mvgl_explore_url" id="mvgl_explore_url" class="widefat" value="<?php echo esc_attr($exploreUrl); ?>" placeholder="https://..." />
        </div>

        <div class="mvgl-field-group">
            <label for="mvgl_brochure_url"><strong><?php _e('Technical Brochure (PDF File)', 'mvgl-headless-cms'); ?>:</strong></label>
            <div style="display: flex; gap: 8px;">
                <input type="text" name="mvgl_brochure_url" id="mvgl_brochure_url" class="widefat" value="<?php echo esc_attr($brochure); ?>" placeholder="https://..." />
                <button type="button" class="button mvgl-upload-btn" data-target="#mvgl_brochure_url"><?php _e('Upload PDF', 'mvgl-headless-cms'); ?></button>
            </div>
        </div>

        <div class="mvgl-field-group full-width">
            <label>
                <input type="checkbox" name="mvgl_is_featured" value="1" <?php checked($isFeatured, true); ?> />
                <strong><?php _e('Feature this product prominently on solution showcases', 'mvgl-headless-cms'); ?></strong>
            </label>
        </div>
    </div>
    <?php
}

/**
 * Render Event Meta Box
 */
function mvgl_render_event_metabox($post) {
    wp_nonce_field('mvgl_save_meta', 'mvgl_meta_nonce');

    $eventType       = get_post_meta($post->ID, '_mvgl_event_type', true) ?: 'Industrial Expo';
    $eventStatus     = get_post_meta($post->ID, '_mvgl_event_status', true) ?: 'Upcoming';
    $dateDisplay     = get_post_meta($post->ID, '_mvgl_date_display', true);
    $startDate       = get_post_meta($post->ID, '_mvgl_start_date', true);
    $endDate         = get_post_meta($post->ID, '_mvgl_end_date', true);
    $location        = get_post_meta($post->ID, '_mvgl_location', true) ?: 'Nairobi, Kenya';
    $boothNumber     = get_post_meta($post->ID, '_mvgl_booth_number', true);
    $registrationUrl = get_post_meta($post->ID, '_mvgl_registration_url', true);

    $types = ['Industrial Expo', 'Trade Exhibition', 'Technical Conference', 'Webinar & Workshop'];
    $statuses = ['Upcoming', 'Ongoing', 'Completed'];
    ?>
    <div class="mvgl-metabox-grid">
        <div class="mvgl-field-group">
            <label for="mvgl_event_type"><strong><?php _e('Event Type', 'mvgl-headless-cms'); ?>:</strong></label>
            <select name="mvgl_event_type" id="mvgl_event_type" class="widefat">
                <?php foreach ($types as $t): ?>
                    <option value="<?php echo esc_attr($t); ?>" <?php selected($eventType, $t); ?>><?php echo esc_html($t); ?></option>
                <?php endforeach; ?>
            </select>
        </div>

        <div class="mvgl-field-group">
            <label for="mvgl_event_status"><strong><?php _e('Event Status', 'mvgl-headless-cms'); ?>:</strong></label>
            <select name="mvgl_event_status" id="mvgl_event_status" class="widefat">
                <?php foreach ($statuses as $s): ?>
                    <option value="<?php echo esc_attr($s); ?>" <?php selected($eventStatus, $s); ?>><?php echo esc_html($s); ?></option>
                <?php endforeach; ?>
            </select>
        </div>

        <div class="mvgl-field-group">
            <label for="mvgl_date_display"><strong><?php _e('Date Display Text', 'mvgl-headless-cms'); ?>:</strong></label>
            <input type="text" name="mvgl_date_display" id="mvgl_date_display" class="widefat" value="<?php echo esc_attr($dateDisplay); ?>" placeholder="e.g. October 14 - 16, 2026" />
        </div>

        <div class="mvgl-field-group">
            <label for="mvgl_location"><strong><?php _e('Location / Venue', 'mvgl-headless-cms'); ?>:</strong></label>
            <input type="text" name="mvgl_location" id="mvgl_location" class="widefat" value="<?php echo esc_attr($location); ?>" placeholder="e.g. KICC, Nairobi, Kenya" />
        </div>

        <div class="mvgl-field-group">
            <label for="mvgl_start_date"><strong><?php _e('Start Date', 'mvgl-headless-cms'); ?>:</strong></label>
            <input type="date" name="mvgl_start_date" id="mvgl_start_date" class="widefat" value="<?php echo esc_attr($startDate); ?>" />
        </div>

        <div class="mvgl-field-group">
            <label for="mvgl_end_date"><strong><?php _e('End Date', 'mvgl-headless-cms'); ?>:</strong></label>
            <input type="date" name="mvgl_end_date" id="mvgl_end_date" class="widefat" value="<?php echo esc_attr($endDate); ?>" />
        </div>

        <div class="mvgl-field-group">
            <label for="mvgl_booth_number"><strong><?php _e('Booth / Stand Number', 'mvgl-headless-cms'); ?>:</strong></label>
            <input type="text" name="mvgl_booth_number" id="mvgl_booth_number" class="widefat" value="<?php echo esc_attr($boothNumber); ?>" placeholder="e.g. Stand B12, Hall 3" />
        </div>

        <div class="mvgl-field-group">
            <label for="mvgl_registration_url"><strong><?php _e('Registration / Info URL', 'mvgl-headless-cms'); ?>:</strong></label>
            <input type="url" name="mvgl_registration_url" id="mvgl_registration_url" class="widefat" value="<?php echo esc_attr($registrationUrl); ?>" placeholder="https://..." />
        </div>
    </div>
    <?php
}

/**
 * Render Career Meta Box
 */
function mvgl_render_career_metabox($post) {
    wp_nonce_field('mvgl_save_meta', 'mvgl_meta_nonce');

    $jobCode          = get_post_meta($post->ID, '_mvgl_job_code', true);
    $department       = get_post_meta($post->ID, '_mvgl_department', true) ?: 'Engineering & Technical';
    $location         = get_post_meta($post->ID, '_mvgl_location', true) ?: 'Nairobi, Kenya';
    $jobType          = get_post_meta($post->ID, '_mvgl_job_type', true) ?: 'Full-time';
    $experienceLevel  = get_post_meta($post->ID, '_mvgl_experience_level', true) ?: '3+ Years Exp';
    $deadline         = get_post_meta($post->ID, '_mvgl_deadline', true);
    $isActive         = get_post_meta($post->ID, '_mvgl_is_active', true);
    $isActive         = ($isActive === '') ? true : (bool) $isActive;
    $summary          = get_post_meta($post->ID, '_mvgl_summary', true);
    $responsibilities = get_post_meta($post->ID, '_mvgl_responsibilities', true);
    $requirements     = get_post_meta($post->ID, '_mvgl_requirements', true);

    $jobTypes = ['Full-time', 'Contract', 'Part-time', 'Internship'];
    ?>
    <div class="mvgl-metabox-grid">
        <div class="mvgl-field-group">
            <label for="mvgl_job_code"><strong><?php _e('Job Code / Reference', 'mvgl-headless-cms'); ?>:</strong></label>
            <input type="text" name="mvgl_job_code" id="mvgl_job_code" class="widefat" value="<?php echo esc_attr($jobCode); ?>" placeholder="e.g. VM153" />
        </div>

        <div class="mvgl-field-group">
            <label for="mvgl_department"><strong><?php _e('Department', 'mvgl-headless-cms'); ?>:</strong></label>
            <input type="text" name="mvgl_department" id="mvgl_department" class="widefat" value="<?php echo esc_attr($department); ?>" placeholder="e.g. Engineering & Technical, Operations, Sales" />
        </div>

        <div class="mvgl-field-group">
            <label for="mvgl_location"><strong><?php _e('Office / Deployment Location', 'mvgl-headless-cms'); ?>:</strong></label>
            <input type="text" name="mvgl_location" id="mvgl_location" class="widefat" value="<?php echo esc_attr($location); ?>" placeholder="e.g. Nairobi, Kenya" />
        </div>

        <div class="mvgl-field-group">
            <label for="mvgl_job_type"><strong><?php _e('Employment Type', 'mvgl-headless-cms'); ?>:</strong></label>
            <select name="mvgl_job_type" id="mvgl_job_type" class="widefat">
                <?php foreach ($jobTypes as $jt): ?>
                    <option value="<?php echo esc_attr($jt); ?>" <?php selected($jobType, $jt); ?>><?php echo esc_html($jt); ?></option>
                <?php endforeach; ?>
            </select>
        </div>

        <div class="mvgl-field-group">
            <label for="mvgl_experience_level"><strong><?php _e('Experience Requirement', 'mvgl-headless-cms'); ?>:</strong></label>
            <input type="text" name="mvgl_experience_level" id="mvgl_experience_level" class="widefat" value="<?php echo esc_attr($experienceLevel); ?>" placeholder="e.g. 3+ Years Exp or 5+ Years in Industrial HVAC" />
        </div>

        <div class="mvgl-field-group">
            <label for="mvgl_deadline"><strong><?php _e('Application Deadline', 'mvgl-headless-cms'); ?>:</strong></label>
            <input type="date" name="mvgl_deadline" id="mvgl_deadline" class="widefat" value="<?php echo esc_attr($deadline); ?>" />
        </div>

        <div class="mvgl-field-group full-width">
            <label>
                <input type="checkbox" name="mvgl_is_active" value="1" <?php checked($isActive, true); ?> />
                <strong><?php _e('This job position is active and accepting applications', 'mvgl-headless-cms'); ?></strong>
            </label>
        </div>

        <div class="mvgl-field-group full-width">
            <label for="mvgl_summary"><strong><?php _e('Position Summary (Role Overview)', 'mvgl-headless-cms'); ?>:</strong></label>
            <textarea name="mvgl_summary" id="mvgl_summary" rows="3" class="widefat" placeholder="Short description of the role and impact at MVGL Kenya"><?php echo esc_textarea($summary); ?></textarea>
        </div>

        <div class="mvgl-field-group full-width">
            <label for="mvgl_responsibilities"><strong><?php _e('Key Responsibilities (One item per line or bullet points)', 'mvgl-headless-cms'); ?>:</strong></label>
            <textarea name="mvgl_responsibilities" id="mvgl_responsibilities" rows="5" class="widefat" placeholder="Execute installation and field commissioning&#10;Conduct vibration and thermal audits on machinery&#10;Provide technical client consultation"><?php echo esc_textarea($responsibilities); ?></textarea>
        </div>

        <div class="mvgl-field-group full-width">
            <label for="mvgl_requirements"><strong><?php _e('Candidate Requirements & Qualifications (One item per line)', 'mvgl-headless-cms'); ?>:</strong></label>
            <textarea name="mvgl_requirements" id="mvgl_requirements" rows="5" class="widefat" placeholder="Bachelor’s Degree in Mechanical or Electrical Engineering&#10;3+ years in industrial field services&#10;Familiarity with PLC control systems"><?php echo esc_textarea($requirements); ?></textarea>
        </div>
    </div>
    <?php
}

/**
 * Render Article / Insight Meta Box
 */
function mvgl_render_article_metabox($post) {
    wp_nonce_field('mvgl_save_meta', 'mvgl_meta_nonce');

    $readTime   = get_post_meta($post->ID, '_mvgl_read_time', true) ?: '5 min read';
    $isFeatured = (bool) get_post_meta($post->ID, '_mvgl_is_featured', true);
    ?>
    <p>
        <label for="mvgl_read_time"><strong><?php _e('Estimated Read Time', 'mvgl-headless-cms'); ?>:</strong></label>
        <input type="text" name="mvgl_read_time" id="mvgl_read_time" class="widefat" value="<?php echo esc_attr($readTime); ?>" placeholder="e.g. 5 min read" />
    </p>
    <p>
        <label>
            <input type="checkbox" name="mvgl_is_featured" value="1" <?php checked($isFeatured, true); ?> />
            <strong><?php _e('Feature this article as hero/spotlight', 'mvgl-headless-cms'); ?></strong>
        </label>
    </p>
    <?php
}

/**
 * Save Meta Box Data
 */
add_action('save_post', function ($post_id) {
    if (!isset($_POST['mvgl_meta_nonce']) || !wp_verify_nonce($_POST['mvgl_meta_nonce'], 'mvgl_save_meta')) {
        return;
    }

    if (defined('DOING_AUTOSAVE') && DOING_AUTOSAVE) {
        return;
    }

    if (!current_user_can('edit_post', $post_id)) {
        return;
    }

    $post_type = get_post_type($post_id);

    // Save Products
    if ($post_type === 'product') {
        $fields = [
            'mvgl_partner'      => '_mvgl_partner',
            'mvgl_solution'     => '_mvgl_solution',
            'mvgl_tag'          => '_mvgl_tag',
            'mvgl_category'     => '_mvgl_category',
            'mvgl_specs'        => '_mvgl_specs',
            'mvgl_explore_url'  => '_mvgl_explore_url',
            'mvgl_brochure_url' => '_mvgl_brochure_url',
        ];

        foreach ($fields as $post_key => $meta_key) {
            if (isset($_POST[$post_key])) {
                update_post_meta($post_id, $meta_key, sanitize_text_field($_POST[$post_key]));
            }
        }

        // Multiline textarea
        if (isset($_POST['mvgl_specs'])) {
            update_post_meta($post_id, '_mvgl_specs', sanitize_textarea_field($_POST['mvgl_specs']));
        }

        update_post_meta($post_id, '_mvgl_is_featured', isset($_POST['mvgl_is_featured']) ? 1 : 0);
    }

    // Save Events
    if ($post_type === 'event') {
        $fields = [
            'mvgl_event_type'       => '_mvgl_event_type',
            'mvgl_event_status'     => '_mvgl_event_status',
            'mvgl_date_display'     => '_mvgl_date_display',
            'mvgl_start_date'       => '_mvgl_start_date',
            'mvgl_end_date'         => '_mvgl_end_date',
            'mvgl_location'         => '_mvgl_location',
            'mvgl_booth_number'     => '_mvgl_booth_number',
            'mvgl_registration_url' => '_mvgl_registration_url',
        ];

        foreach ($fields as $post_key => $meta_key) {
            if (isset($_POST[$post_key])) {
                update_post_meta($post_id, $meta_key, sanitize_text_field($_POST[$post_key]));
            }
        }
    }

    // Save Careers
    if ($post_type === 'career') {
        $fields = [
            'mvgl_job_code'         => '_mvgl_job_code',
            'mvgl_department'       => '_mvgl_department',
            'mvgl_location'         => '_mvgl_location',
            'mvgl_job_type'         => '_mvgl_job_type',
            'mvgl_experience_level' => '_mvgl_experience_level',
            'mvgl_deadline'         => '_mvgl_deadline',
        ];

        foreach ($fields as $post_key => $meta_key) {
            if (isset($_POST[$post_key])) {
                update_post_meta($post_id, $meta_key, sanitize_text_field($_POST[$post_key]));
            }
        }

        if (isset($_POST['mvgl_summary'])) {
            update_post_meta($post_id, '_mvgl_summary', sanitize_textarea_field($_POST['mvgl_summary']));
        }
        if (isset($_POST['mvgl_responsibilities'])) {
            update_post_meta($post_id, '_mvgl_responsibilities', sanitize_textarea_field($_POST['mvgl_responsibilities']));
        }
        if (isset($_POST['mvgl_requirements'])) {
            update_post_meta($post_id, '_mvgl_requirements', sanitize_textarea_field($_POST['mvgl_requirements']));
        }

        update_post_meta($post_id, '_mvgl_is_active', isset($_POST['mvgl_is_active']) ? 1 : 0);
    }

    // Save Posts & Insights
    if (in_array($post_type, ['post', 'insight'])) {
        if (isset($_POST['mvgl_read_time'])) {
            update_post_meta($post_id, '_mvgl_read_time', sanitize_text_field($_POST['mvgl_read_time']));
        }
        update_post_meta($post_id, '_mvgl_is_featured', isset($_POST['mvgl_is_featured']) ? 1 : 0);
    }
});

