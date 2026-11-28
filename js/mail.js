/* Email guard: writes email addresses into the page only once it loads in a browser,
   so bots that scrape the raw HTML never see them.
   Use:   <a data-u="hello" data-d="example.com" href="/contact">Email us</a>
   - The link becomes mailto:hello@example.com and its text becomes the address.
   - data-label="keep"   keeps the link's own text (e.g. "Email us").
   - data-subject="..."  pre-fills the email subject.
   - Put data-email-text on a child element to write the address there instead.
   Without JavaScript the link still works, it just goes to href (a contact page). */
(function () {
  function run() {
    var els = document.querySelectorAll('[data-u][data-d]');
    for (var i = 0; i < els.length; i++) {
      var el = els[i], e = el.getAttribute('data-u') + '@' + el.getAttribute('data-d');
      var subj = el.getAttribute('data-subject');
      if (el.tagName === 'A') el.href = 'mailto:' + e + (subj ? '?subject=' + encodeURIComponent(subj) : '');
      if (el.getAttribute('data-label') !== 'keep') (el.querySelector('[data-email-text]') || el).textContent = e;
      el.removeAttribute('data-u'); el.removeAttribute('data-d');
    }
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', run); else run();
})();
