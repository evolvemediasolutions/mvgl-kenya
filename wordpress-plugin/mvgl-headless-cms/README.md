# MVGL Kenya Headless CMS Plugin

Production-ready Headless CMS engine built specifically for MVGL Kenya.

## Features
- **Custom Post Types**: Products, Events, Careers, and Insights/Articles.
- **WPGraphQL Native Schema**: Seamless integration with the MVGL Kenya React frontend.
- **0-Second Delay Updates**:
  - Automatically sends cache-busting headers (`Cache-Control: no-store, no-cache, max-age=0`) on all GraphQL requests.
  - Automatically purges WordPress object caches, LiteSpeed, WP Rocket, W3 Total Cache, and WP Super Cache whenever any post is saved or published.
- **Full CORS Handling**: Allows queries from the frontend without cross-origin blockage.
- **Integrated Admin UI**: Clean, customized meta boxes with one-click PDF brochure media uploads.

## Installation
1. Zip the `mvgl-headless-cms` folder (or use `mvgl-headless-cms.zip`).
2. In your WordPress Admin (`kenyacms.multivistaprintsolutions.com`), go to **Plugins > Add New > Upload Plugin**.
3. Choose `mvgl-headless-cms.zip` and click **Install Now**.
4. Click **Activate Plugin**.
5. Make sure the free **WPGraphQL** plugin is also installed and activated.

