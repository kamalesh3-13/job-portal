/* =============================================
   JOBPORTAL — Main JS
   ============================================= */

// ── MOBILE MENU FUNCTIONS (global scope so onclick works) ──
function openMenu() {
  var menu = document.getElementById('mobileMenu');
  var icon = document.getElementById('hamburgerIcon');
  if (menu) {
    menu.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
  if (icon) icon.className = 'fa-solid fa-xmark';
}

function closeMenu() {
  var menu = document.getElementById('mobileMenu');
  var icon = document.getElementById('hamburgerIcon');
  if (menu) {
    menu.classList.remove('open');
    document.body.style.overflow = '';
  }
  if (icon) icon.className = 'fa-solid fa-bars';
}

function scrollToSection(id) {
  closeMenu();
  setTimeout(function() {
    var el = document.getElementById(id);
    if (el) {
      var top = el.getBoundingClientRect().top + window.scrollY - 70;
      window.scrollTo({ top: top, behavior: 'smooth' });
    }
  }, 380);
}

// ── AUTH STATE SYNC ──
function applyAuthState() {
  var name = localStorage.getItem('stackly_user_name');
  var signin = document.querySelector('.nav-actions a[href="signin.html"]');
  var mobSignin = document.querySelector('.mob-signin');
  var mobSignup = document.querySelector('.mob-signup');
  var mobLogout = document.querySelector('.mob-logout');
  if (name) {
    if (signin) { signin.textContent = 'Hi, ' + name; signin.href = 'welcome.html'; }
    if (mobSignin) mobSignin.style.display = 'none';
    if (mobSignup) mobSignup.style.display = 'none';
  } else if (mobLogout) {
    mobLogout.style.display = 'none';
  }
}

// ── INIT ──
document.addEventListener('DOMContentLoaded', function() {

  applyAuthState();

  // LOADER
  var loader = document.getElementById('loader');
  var mainSite = document.getElementById('main-site');

  setTimeout(function() {
    if (loader) loader.classList.add('fade-out');
    setTimeout(function() {
      if (loader) loader.style.display = 'none';
      if (mainSite) mainSite.style.display = 'block';
      document.title = 'JobPortal — Find Your Dream Job';
      triggerReveal();
    }, 600);
  }, 2200);

  // NAVBAR SCROLL
  var navbar = document.getElementById('navbar');
  window.addEventListener('scroll', function() {
    if (navbar) navbar.classList.toggle('scrolled', window.scrollY > 40);
  });

  // SCROLL REVEAL
  function triggerReveal() {
    var els = document.querySelectorAll(
      '.category-card,.job-card,.step-card,.company-card,.testimonial-card,.stat-card'
    );
    var s = document.createElement('style');
    s.textContent = '.revealed{opacity:1!important;transform:translateY(0)!important;}';
    document.head.appendChild(s);

    var obs = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry, i) {
        if (entry.isIntersecting) {
          entry.target.style.transitionDelay = (i % 6 * 0.07) + 's';
          entry.target.classList.add('revealed');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    els.forEach(function(el) {
      el.style.opacity = '0';
      el.style.transform = 'translateY(20px)';
      el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
      obs.observe(el);
    });
  }

});
