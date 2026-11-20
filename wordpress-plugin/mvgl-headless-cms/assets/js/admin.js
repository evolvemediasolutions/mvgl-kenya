/**
 * MVGL Kenya Headless CMS Admin JavaScript
 * Handles WordPress media uploader integration for PDF brochures and images.
 */

jQuery(document).ready(function ($) {
    $('.mvgl-upload-btn').on('click', function (e) {
        e.preventDefault();

        var button = $(this);
        var targetInput = $(button.data('target'));

        var customUploader = wp.media({
            title: 'Select or Upload Technical Brochure (PDF)',
            button: {
                text: 'Use this file'
            },
            multiple: false
        });

        customUploader.on('select', function () {
            var attachment = customUploader.state().get('selection').first().toJSON();
            targetInput.val(attachment.url);
        });

        customUploader.open();
    });
});

