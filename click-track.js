/* ADHD Field Guide — Cadence outbound-click counter.
   Logs an anonymous row to Supabase whenever a visitor clicks a link to
   cadenceadhd.com. Records ONLY: which placement (utm_campaign), the page
   language, and the page path. No cookies, no IP, no personal data.
   Read the totals in your Supabase dashboard (SQL at the bottom of this file).
   Fails silently until the `cadence_clicks` table exists. */
(function () {
  "use strict";
  var cfg = window.ADHD_CONFIG || {};
  // anon key is public by design — security is the table's Row Level Security.
  var SB  = cfg.SUPABASE_URL || "https://sxrwebtwxbluogduqqru.supabase.co";
  var KEY = cfg.SUPABASE_ANON_KEY ||
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN4cndlYnR3eGJsdW9nZHVxcXJ1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODg1MDUyNzcsImV4cCI6MjEwNDA4MTI3N30.oiK1vmvH8XVN_3ejjY2WpmmKpUJRY1IzqcZ7kfuyh9I";
  if (!SB || !KEY) return;

  function campaignOf(href) {
    try { return new URL(href, location.href).searchParams.get('utm_campaign') || 'other'; }
    catch (e) { return 'other'; }
  }

  document.addEventListener('click', function (e) {
    var a = e.target && e.target.closest ? e.target.closest('a[href]') : null;
    if (!a) return;
    var href = a.getAttribute('href') || '';
    if (href.indexOf('cadenceadhd.com') === -1) return;

    var lang = document.documentElement.lang;
    var body = JSON.stringify({
      campaign: String(campaignOf(href)).slice(0, 60),
      lang: (lang === 'ar' || lang === 'he') ? lang : 'en',
      path: String(location.pathname || '/').slice(0, 120)
    });
    try {
      fetch(SB + '/rest/v1/cadence_clicks', {
        method: 'POST',
        keepalive: true,
        headers: {
          'apikey': KEY,
          'Authorization': 'Bearer ' + KEY,
          'Content-Type': 'application/json',
          'Prefer': 'return=minimal'
        },
        body: body
      }).catch(function () {});
    } catch (e) {}
  }, true);
})();

/* ---------------------------------------------------------------------------
   ONE-TIME SETUP — run this in Supabase → SQL Editor → New query → Run:

   create table if not exists public.cadence_clicks (
     id         bigint generated always as identity primary key,
     campaign   text check (char_length(campaign) <= 60),
     lang       text check (lang in ('en','ar','he')),
     path       text check (char_length(path) <= 120),
     created_at timestamptz not null default now()
   );
   alter table public.cadence_clicks enable row level security;
   create policy "anon insert cadence clicks"
     on public.cadence_clicks for insert to anon with check (true);

   READ YOUR NUMBERS anytime (Supabase → SQL Editor):

   -- total clicks to Cadence
   select count(*) as total_clicks from public.cadence_clicks;

   -- broken down by placement + language
   select campaign, lang, count(*) as clicks,
          min(created_at) as first_click, max(created_at) as last_click
   from public.cadence_clicks
   group by campaign, lang
   order by clicks desc;
--------------------------------------------------------------------------- */
