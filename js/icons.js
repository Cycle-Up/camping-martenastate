/* ==========================================================================
   Martenastate icons
   --------------------------------------------------------------------------
   Bespoke icon set in the style of the brand book (page 54): bold, single-
   color, geometric, rounded line caps & joins. Stroke weight ~12% of bounding
   box (3 of 32). Color via currentColor so any context can recolor.

   Usage:
     1. Static HTML — drop a span with [data-ms-icon="<name>"]:
          <span class="ms-icon" data-ms-icon="cup"></span>
        The DOMContentLoaded sweep fills it with the SVG.
     2. Dynamic JS — call window.msIcon('<name>') -> SVG string.
     3. Leaflet markers — call window.msIconSVG('<name>', {color, strokeWidth})
        which returns the SVG with hard-coded color (no currentColor).
   ========================================================================== */
(function () {
  'use strict';

  // helper: wrap path markup in a stylable SVG
  function svg(paths, opts) {
    opts = opts || {};
    const vb = opts.viewBox || '0 0 32 32';
    const sw = opts.sw || 2.6;
    return (
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="' + vb + '" ' +
      'fill="none" stroke="currentColor" stroke-width="' + sw + '" ' +
      'stroke-linecap="round" stroke-linejoin="round" ' +
      'aria-hidden="true" focusable="false">' + paths + '</svg>'
    );
  }

  const ICONS = {

    /* ---------- Brand-book core four (camperen, speuren, drinken, eten) ---- */

    // Tent / camping — splayed M-tent
    tent: svg(
      '<path d="M3.5 27 L12 6 L16 14 L20 6 L28.5 27 Z"/>' +
      '<path d="M12 6 L12 14 M20 6 L20 14"/>'
    ),

    // Walking / speuren — wandering M-path
    walk: svg(
      '<path d="M4 23 C 4 11, 11 11, 11 23 M 11 23 C 11 11, 18 11, 18 23 M 18 23 C 18 11, 25 11, 25 23"/>',
      { sw: 2.8 }
    ),

    // Cup / drinking
    cup: svg(
      '<path d="M6.5 9 L6.5 21 Q 6.5 25, 10.5 25 L18.5 25 Q 22.5 25, 22.5 21 L22.5 9 Z"/>' +
      '<path d="M22.5 12 Q 27 12, 27 15.5 Q 27 19, 22.5 19"/>'
    ),

    // Fork + knife / eating
    fork_knife: svg(
      '<path d="M9 6 L9 13 Q 9 15.5, 11 15.5 L11 26"/>' +
      '<path d="M7 6 L7 11 M11 6 L11 11 M9 6 L9 11"/>' +
      '<path d="M22 6 Q 18 8, 18 14 Q 18 16, 22 16 L22 26 Z"/>'
    ),

    /* ---------- Activities / things to do ---------------------------------- */

    // Bike — two wheels + frame
    bike: svg(
      '<circle cx="8.5" cy="22" r="4.5"/>' +
      '<circle cx="23.5" cy="22" r="4.5"/>' +
      '<path d="M8.5 22 L14 12 L20 22 M14 12 L19 12 M23.5 22 L20 12"/>' +
      '<path d="M19 9 L22 9"/>'
    ),

    // Beer mug
    beer: svg(
      '<path d="M9 9 Q 12 6, 16 9 Q 20 6, 23 9"/>' +
      '<path d="M9 9 L9 25 Q 9 27, 11 27 L21 27 Q 23 27, 23 25 L23 9"/>' +
      '<path d="M23 13 L26 13 L26 22 L23 22"/>'
    ),

    // Cake slice
    cake: svg(
      '<path d="M5 15 L16 6 L27 15 Z"/>' +
      '<path d="M5 15 L5 23 Q 5 26, 8 26 L24 26 Q 27 26, 27 23 L27 15"/>' +
      '<path d="M5 19 L27 19"/>'
    ),

    // Cheese wedge
    cheese: svg(
      '<path d="M5 22 L5 16 L22 7 L29 16 L29 22 Z"/>' +
      '<circle cx="13" cy="18" r="1.4" fill="currentColor" stroke="none"/>' +
      '<circle cx="21" cy="16" r="1.4" fill="currentColor" stroke="none"/>'
    ),

    // Wheat / korenaar (markt, oogst)
    wheat: svg(
      '<path d="M16 28 L16 7"/>' +
      '<path d="M16 12 Q 11 11, 9 6 M 16 12 Q 21 11, 23 6"/>' +
      '<path d="M16 18 Q 11 17, 9 12 M 16 18 Q 21 17, 23 12"/>' +
      '<path d="M16 24 Q 11 23, 9 18 M 16 24 Q 21 23, 23 18"/>'
    ),

    // Croissant / bakery
    croissant: svg(
      '<path d="M4 24 Q 4 6, 22 8 Q 28 9, 28 14 Q 28 28, 10 28 Q 4 28, 4 24 Z"/>' +
      '<path d="M10 16 L22 16 M14 12 L18 20 M18 12 L14 20"/>'
    ),

    // Fries
    fries: svg(
      '<path d="M8 13 L24 13 L22 28 L10 28 Z"/>' +
      '<path d="M11 7 L11 13 M16 4 L16 13 M21 7 L21 13"/>'
    ),

    // Salad bowl
    salad: svg(
      '<path d="M4 15 L28 15 Q 28 26, 16 26 Q 4 26, 4 15 Z"/>' +
      '<path d="M11 15 Q 11 9, 16 9 Q 21 9, 21 15"/>' +
      '<circle cx="12" cy="12" r="1.6" fill="currentColor" stroke="none"/>' +
      '<circle cx="20" cy="12" r="1.6" fill="currentColor" stroke="none"/>'
    ),

    // Pizza
    pizza: svg(
      '<path d="M5 26 L16 5 L27 26 Z"/>' +
      '<path d="M5 26 Q 16 30, 27 26"/>' +
      '<circle cx="12" cy="18" r="1.6" fill="currentColor" stroke="none"/>' +
      '<circle cx="20" cy="18" r="1.6" fill="currentColor" stroke="none"/>' +
      '<circle cx="16" cy="12" r="1.4" fill="currentColor" stroke="none"/>'
    ),

    /* ---------- Seasons / nature ------------------------------------------ */

    sunrise: svg(
      '<path d="M16 14 Q 8 14, 8 22 L24 22 Q 24 14, 16 14 Z"/>' +
      '<path d="M3 26 L29 26"/>' +
      '<path d="M16 8 L16 5 M9 11 L7.5 9.5 M23 11 L24.5 9.5 M5 18 L2.5 18 M27 18 L29.5 18"/>'
    ),

    sun: svg(
      '<circle cx="16" cy="16" r="6"/>' +
      '<path d="M16 3 L16 6 M16 26 L16 29 M3 16 L6 16 M26 16 L29 16 ' +
      'M7 7 L9 9 M23 23 L25 25 M7 25 L9 23 M23 9 L25 7"/>'
    ),

    snowflake: svg(
      '<path d="M16 3 L16 29 M5 9 L27 23 M5 23 L27 9"/>' +
      '<path d="M13 6 L16 9 L19 6 M13 26 L16 23 L19 26 ' +
      'M8 13 L12 13 L10 9.5 M22 13 L24 9.5 L20 13 ' +
      'M8 19 L10 22.5 L12 19 M20 19 L22 19 L24 22.5"/>'
    ),

    // Blossom — 5-petal stinzenflower
    blossom: svg(
      '<circle cx="16" cy="16" r="2.6"/>' +
      '<path d="M16 13.4 Q 13 5, 16 5 Q 19 5, 16 13.4"/>' +
      '<path d="M18.6 16 Q 27 13, 27 16 Q 27 19, 18.6 16"/>' +
      '<path d="M16 18.6 Q 19 27, 16 27 Q 13 27, 16 18.6"/>' +
      '<path d="M13.4 16 Q 5 19, 5 16 Q 5 13, 13.4 16"/>' +
      '<path d="M14.1 14.1 Q 8 8, 10.1 6 Q 12.2 4, 14.1 14.1"/>'
    ),

    // Leaf
    leaf: svg(
      '<path d="M6 26 Q 6 6, 26 6 Q 26 26, 6 26 Z"/>' +
      '<path d="M6 26 L24 8"/>'
    ),

    // Autumn leaf — maple-ish, simplified
    autumn_leaf: svg(
      '<path d="M16 5 L19 11 L25 9 L22 15 L27 18 L21 20 L22 26 L16 23 L10 26 L11 20 L5 18 L10 15 L7 9 L13 11 Z"/>' +
      '<path d="M16 23 L16 28"/>'
    ),

    // Sea wave (Waddenzee)
    wave: svg(
      '<path d="M2 11 Q 6 7, 10 11 T 18 11 T 26 11 T 30 11"/>' +
      '<path d="M2 17 Q 6 13, 10 17 T 18 17 T 26 17 T 30 17"/>' +
      '<path d="M2 23 Q 6 19, 10 23 T 18 23 T 26 23 T 30 23"/>'
    ),

    // Anchor
    anchor: svg(
      '<circle cx="16" cy="6.5" r="2.5"/>' +
      '<path d="M16 9 L16 27"/>' +
      '<path d="M11 13.5 L21 13.5"/>' +
      '<path d="M5.5 19 Q 6.5 27, 16 27 Q 25.5 27, 26.5 19"/>' +
      '<path d="M3 21 L5.5 19 L7.5 21.5 M29 21 L26.5 19 L24.5 21.5"/>'
    ),

    /* ---------- Landmarks / places ---------------------------------------- */

    // Greek column / museum (cultural)
    column: svg(
      '<path d="M4 5 L28 5 L28 9 L4 9 Z"/>' +
      '<path d="M4 23 L28 23 M4 27 L28 27"/>' +
      '<path d="M8 9 L8 23 M16 9 L16 23 M24 9 L24 23"/>'
    ),

    // Castle silhouette
    castle: svg(
      '<path d="M4 27 L4 13 L8 13 L8 9 L12 9 L12 13 L14 13 L14 9 L18 9 L18 13 L20 13 L20 9 L24 9 L24 13 L28 13 L28 27 Z"/>' +
      '<path d="M13 27 L13 20 Q 13 18, 16 18 Q 19 18, 19 20 L19 27"/>' +
      '<path d="M4 17 L28 17"/>'
    ),

    // Leaning tower (Oldehove)
    tower: svg(
      '<path d="M10 28 L12 6 L19 6 L21 28"/>' +
      '<path d="M10 28 L21 28"/>' +
      '<path d="M11.4 12 L20 12 M11 18 L20.4 18 M10.6 24 L20.8 24"/>'
    ),

    // Vase / Princessehof
    vase: svg(
      '<path d="M11 5 L11 9 Q 6 12, 6 17 L6 24 Q 6 27, 9 27 L23 27 Q 26 27, 26 24 L26 17 Q 26 12, 21 9 L21 5 Z"/>' +
      '<path d="M11 5 L21 5"/>'
    ),

    // Gear (Woudagemaal)
    gear: svg(
      '<circle cx="16" cy="16" r="4"/>' +
      '<path d="M16 3 L16 7 M16 25 L16 29 M3 16 L7 16 M25 16 L29 16 ' +
      'M7 7 L10 10 M22 22 L25 25 M7 25 L10 22 M22 10 L25 7"/>'
    ),

    /* ---------- Map / utility --------------------------------------------- */

    // Map pin (drop)
    pin: svg(
      '<path d="M16 29 Q 5 18, 5 12 Q 5 4, 16 4 Q 27 4, 27 12 Q 27 18, 16 29 Z"/>' +
      '<circle cx="16" cy="12" r="3"/>'
    ),

    // Shopping basket / cart
    cart: svg(
      '<path d="M3 6 L7 6 L10 22 L25 22"/>' +
      '<path d="M7 10 L27 10 L24.5 19 L10 19"/>' +
      '<circle cx="12" cy="26" r="1.8" fill="currentColor" stroke="none"/>' +
      '<circle cx="22" cy="26" r="1.8" fill="currentColor" stroke="none"/>'
    ),

    // 5-pt star (sight)
    star: svg(
      '<path d="M16 4 L20 13 L29 14 L22 20.5 L24 29 L16 24.5 L8 29 L10 20.5 L3 14 L12 13 Z"/>'
    ),

    // Parking (P in rounded square)
    parking: svg(
      '<rect x="4" y="4" width="24" height="24" rx="4"/>' +
      '<path d="M12 9 L12 23 M12 9 L18 9 Q 22 9, 22 13 Q 22 17, 18 17 L12 17"/>'
    ),

    // Clock
    clock: svg(
      '<circle cx="16" cy="16" r="12"/>' +
      '<path d="M16 9 L16 16 L21 19"/>'
    ),

    /* ---------- Weather --------------------------------------------------- */

    cloud: svg(
      '<path d="M9 23 Q 4 23, 4 18 Q 4 13, 10 13 Q 12 8, 17 8 Q 23 8, 24 14 Q 28 14, 28 18 Q 28 23, 23 23 Z"/>'
    ),

    cloud_sun: svg(
      '<circle cx="11" cy="11" r="4"/>' +
      '<path d="M11 3 L11 5 M11 17 L11 19 M3 11 L5 11 M17 11 L19 11 M5.5 5.5 L7 7 M16.5 16.5 L15 15 M5.5 16.5 L7 15 M16.5 5.5 L15 7"/>' +
      '<path d="M14 25 Q 9 25, 9 21 Q 9 17, 14 17 Q 16 13, 21 14 Q 27 14, 27 19 Q 27 25, 22 25 Z"/>'
    ),

    rain: svg(
      '<path d="M9 18 Q 4 18, 4 13 Q 4 8, 10 8 Q 12 4, 17 4 Q 23 4, 23 10 Q 28 10, 28 14 Q 28 18, 23 18 Z"/>' +
      '<path d="M10 23 L8 28 M16 23 L14 28 M22 23 L20 28"/>'
    ),

    snow: svg(
      '<path d="M9 18 Q 4 18, 4 13 Q 4 8, 10 8 Q 12 4, 17 4 Q 23 4, 23 10 Q 28 10, 28 14 Q 28 18, 23 18 Z"/>' +
      '<path d="M9 23 L9 27 M7 25 L11 25 M16 23 L16 27 M14 25 L18 25 M23 23 L23 27 M21 25 L25 25"/>'
    ),

    thunder: svg(
      '<path d="M9 18 Q 4 18, 4 13 Q 4 8, 10 8 Q 12 4, 17 4 Q 23 4, 23 10 Q 28 10, 28 14 Q 28 18, 23 18 Z"/>' +
      '<path d="M16 20 L11 27 L16 26 L13 31"/>'
    ),

    fog: svg(
      '<path d="M4 9 L20 9 M8 16 L28 16 M4 23 L24 23 M14 30 L30 30"/>'
    ),

    wind: svg(
      '<path d="M3 10 L20 10 Q 25 10, 25 6 Q 25 2.5, 21 2.5 Q 18 2.5, 17.5 5"/>' +
      '<path d="M3 17 L24 17 Q 29 17, 29 21 Q 29 25, 25 25 Q 22 25, 21.5 22"/>' +
      '<path d="M3 24 L17 24"/>'
    ),

    thermometer: svg(
      '<path d="M14 4 Q 14 2, 16 2 Q 18 2, 18 4 L18 19 Q 21 21, 21 24 Q 21 28, 16 28 Q 11 28, 11 24 Q 11 21, 14 19 Z"/>' +
      '<circle cx="16" cy="24" r="2" fill="currentColor" stroke="none"/>' +
      '<path d="M16 9 L16 19"/>'
    ),

    /* ---------- UI / decorative ------------------------------------------- */

    heart: svg(
      '<path d="M16 27 Q 4 19, 4 11.5 Q 4 6, 9.5 6 Q 13.5 6, 16 10 Q 18.5 6, 22.5 6 Q 28 6, 28 11.5 Q 28 19, 16 27 Z"/>'
    ),

    check: svg(
      '<path d="M5 17 L13 24 L27 9"/>'
    ),

    clipboard: svg(
      '<path d="M9 7 L7 7 Q 5 7, 5 9 L5 26 Q 5 28, 7 28 L25 28 Q 27 28, 27 26 L27 9 Q 27 7, 25 7 L23 7"/>' +
      '<rect x="11" y="3.5" width="10" height="6" rx="1.5"/>'
    ),

    close: svg(
      '<path d="M7 7 L25 25 M25 7 L7 25"/>'
    ),

    // Decorative arch (replaces flower divider)
    arch: svg(
      '<path d="M6 28 L6 14 Q 6 4, 16 4 Q 26 4, 26 14 L26 28"/>',
      { sw: 2.4 }
    ),
  };

  // Public: render an SVG string for a given icon, optionally overriding
  // size / extra class / stroke color.
  function msIcon(name, opts) {
    let s = ICONS[name];
    if (!s) return '';
    opts = opts || {};
    if (opts.className) {
      s = s.replace('<svg ', '<svg class="' + opts.className + '" ');
    }
    if (opts.size) {
      s = s.replace('<svg ', '<svg width="' + opts.size + '" height="' + opts.size + '" ');
    }
    if (opts.color) {
      s = s.replace(/stroke="currentColor"/g, 'stroke="' + opts.color + '"');
      // also replace fill="currentColor" on solid dots
      s = s.replace(/fill="currentColor"/g, 'fill="' + opts.color + '"');
    }
    if (opts.strokeWidth) {
      s = s.replace(/stroke-width="[^"]+"/, 'stroke-width="' + opts.strokeWidth + '"');
    }
    return s;
  }

  // Public: same but URL-encoded data URL (for CSS mask-image / Leaflet)
  function msIconDataURL(name, opts) {
    const s = msIcon(name, opts);
    if (!s) return '';
    return 'data:image/svg+xml;utf8,' + encodeURIComponent(s);
  }

  // DOM sweep: any element with [data-ms-icon="<name>"] gets its inner HTML
  // replaced by the SVG. Empty out existing emoji content first.
  function sweep(root) {
    (root || document).querySelectorAll('[data-ms-icon]').forEach(el => {
      if (el.__msIconDone) return;
      const name = el.getAttribute('data-ms-icon');
      const html = ICONS[name];
      if (!html) return;
      el.innerHTML = html;
      el.classList.add('ms-icon-host');
      el.__msIconDone = true;
    });
  }

  // Expose globals
  window.MS_ICONS = ICONS;
  window.msIcon = msIcon;
  window.msIconDataURL = msIconDataURL;
  window.msIconSweep = sweep;

  // Auto-run on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => sweep());
  } else {
    sweep();
  }
})();
