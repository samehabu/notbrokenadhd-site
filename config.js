/* ADHD Field Guide — optional accounts config.
 *
 * Accounts are OPTIONAL. If you leave the two values below as-is, the site
 * runs exactly as before (private saving on each visitor's own device, no login).
 *
 * To enable "sign in to save across devices", create a free Supabase project
 * and paste its values here. Full steps are in SUPABASE_SETUP.md.
 *   1. Settings → API → "Project URL"   -> SUPABASE_URL
 *   2. Settings → API → "anon public"   -> SUPABASE_ANON_KEY
 *
 * The anon key is SAFE to expose in the browser — that's what it's designed for.
 * Security comes from the database's Row Level Security policies (see the setup guide).
 */
window.ADHD_CONFIG = {
  SUPABASE_URL: "https://sxrwebtwxbluogduqqru.supabase.co",
  SUPABASE_ANON_KEY: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN4cndlYnR3eGJsdW9nZHVxcXJ1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODg1MDUyNzcsImV4cCI6MjEwNDA4MTI3N30.oiK1vmvH8XVN_3ejjY2WpmmKpUJRY1IzqcZ7kfuyh9I",

  /* Optional ads (Google AdSense). Ads stay OFF until ENABLED is true AND you
   * paste your publisher ID + ad-unit slot IDs below. No ad loads and no ad
   * cookie is set until a visitor accepts the consent banner. See ADS_SETUP.md. */
  ADS: {
    ENABLED: false,                      // flip to true AFTER AdSense approves you
    CLIENT: "ca-pub-1777721543328970",   // your AdSense publisher ID
    SLOTS: {
      mid:  "YOUR_MID_SLOT_ID",          // ad unit shown after the medications section
      foot: "YOUR_FOOTER_SLOT_ID"        // ad unit shown just above the footer
    }
  },

  /* Optional, privacy-friendly analytics (cookieless — no consent banner needed).
   * OFF until ENABLED is true. See SEO_SETUP.md. */
  ANALYTICS: {
    ENABLED: false,
    PROVIDER: "plausible",               // "plausible" | "umami" | "custom"
    DOMAIN: "yourdomain.com",            // Plausible: your site's domain
    SRC: "https://plausible.io/js/script.js", // or your self-hosted analytics script URL
    WEBSITE_ID: ""                       // Umami only
  }
};
