/* "On this page" list for long articles: built from the article's own h2 headings so
   readers can skim and jump. Inserted after the "Last updated" line; open on wide
   screens, collapsed on phones. Skips homepages and short pages. */
(function () {
  "use strict";
  if (document.querySelector(".hero-grid") || document.querySelector(".toc-otp")) return;
  var heads = [].slice.call(document.querySelectorAll(".wrap h2")).filter(function (h) {
    return !h.closest(".keep") && h.textContent.trim();
  });
  if (heads.length < 4) return;
  var labels = { en: "On this page", ar: "في هذه الصفحة", he: "בעמוד זה", hu: "Ezen az oldalon" };
  var lang = document.documentElement.lang;
  var used = {};
  var box = document.createElement("details");
  box.className = "toc-otp";
  if (window.matchMedia("(min-width: 761px)").matches) box.open = true;
  var sum = document.createElement("summary");
  sum.textContent = labels[lang] || labels.en;
  box.appendChild(sum);
  var ol = document.createElement("ol");
  heads.forEach(function (h, i) {
    if (!h.id) {
      var base = "s-" + (i + 1);
      h.id = used[base] ? base + "-" + i : base;
    }
    used[h.id] = 1;
    var li = document.createElement("li");
    var a = document.createElement("a");
    a.href = "#" + h.id;
    a.textContent = h.textContent.trim();
    li.appendChild(a);
    ol.appendChild(li);
  });
  box.appendChild(ol);
  var anchor = document.querySelector(".wrap .updated") || document.querySelector(".wrap h1");
  if (!anchor) return;
  anchor.parentNode.insertBefore(box, anchor.nextSibling);
})();
