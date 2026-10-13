/* Wave-weighted headline: the homepage's highlighted phrase ("regulated differently.")
   is set with each letter's weight following a wave, echoing the attention-profile
   curve beside it - attention that rises and falls with interest. Static, no motion.
   English and Hungarian only: Arabic letters must stay joined, and the Hebrew font has
   only fixed weights. Screen readers get the plain text. */
(function () {
  "use strict";
  var lang = document.documentElement.lang;
  if (lang !== "en" && lang !== "hu") return; // needs Figtree's variable weights
  var el = document.querySelector(".hero h1 .hl");
  if (!el || el.dataset.wave) return;
  var text = el.textContent;
  var lo = 340;
  var hi = 860;
  var letters = text.replace(/\s/g, "").length;
  var frag = document.createDocumentFragment();
  var i = 0;
  for (var c = 0; c < text.length; c++) {
    var ch = text[c];
    if (/\s/.test(ch)) { frag.appendChild(document.createTextNode(ch)); continue; }
    // two crests across the phrase, like the profile's uneven peaks
    var t = letters > 1 ? i / (letters - 1) : 0;
    var w = 0.5 + 0.5 * Math.sin(t * Math.PI * 4.6 + 0.4);
    var s = document.createElement("span");
    s.textContent = ch;
    s.style.fontWeight = String(Math.round(lo + (hi - lo) * w));
    s.setAttribute("aria-hidden", "true");
    frag.appendChild(s);
    i++;
  }
  el.setAttribute("aria-label", text);
  el.setAttribute("role", "text");
  el.textContent = "";
  el.appendChild(frag);
  el.dataset.wave = "1";
})();
