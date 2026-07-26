document.addEventListener('DOMContentLoaded', function () {

  /* ---------- Navbar scroll state + mobile toggle ---------- */
  var navbar = document.querySelector('.navbar');
  var navToggle = document.querySelector('.nav-toggle');
  var navLinks = document.querySelector('.nav-links');

  function onScroll() {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    var backToTop = document.getElementById('back-to-top');
    if (backToTop) {
      backToTop.classList.toggle('show', window.scrollY > 400);
    }
  }
  window.addEventListener('scroll', onScroll);
  onScroll();

  if (navToggle) {
    navToggle.addEventListener('click', function () {
      navToggle.classList.toggle('open');
      navLinks.classList.toggle('open');
    });
    // Close menu on link click (mobile)
    navLinks.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        navToggle.classList.remove('open');
        navLinks.classList.remove('open');
      });
    });
  }

  /* ---------- Back to top ---------- */
  var backToTop = document.getElementById('back-to-top');
  if (backToTop) {
    backToTop.addEventListener('click', function (e) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ---------- Scroll reveal (IntersectionObserver) ---------- */
  var revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    revealEls.forEach(function (el) { revealObserver.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('in-view'); });
  }

  /* ---------- Animated stat counters ---------- */
  var counters = document.querySelectorAll('[data-count]');
  function animateCounter(el) {
    var target = parseFloat(el.getAttribute('data-count'));
    var suffix = el.getAttribute('data-suffix') || '';
    var duration = 1400;
    var startTime = null;

    function step(timestamp) {
      if (!startTime) startTime = timestamp;
      var progress = Math.min((timestamp - startTime) / duration, 1);
      var eased = 1 - Math.pow(1 - progress, 3);
      var value = target * eased;
      el.textContent = (Number.isInteger(target) ? Math.floor(value) : value.toFixed(1)) + suffix;
      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        el.textContent = target + suffix;
      }
    }
    requestAnimationFrame(step);
  }
  if ('IntersectionObserver' in window && counters.length) {
    var counterObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          counterObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
    counters.forEach(function (el) { counterObserver.observe(el); });
  }

  /* ---------- Hero: typed query + chart draw-in ---------- */
  var queryEl = document.getElementById('hero-query-text');
  var chartBars = document.querySelectorAll('.chart-bars .bar');
  var queryString = 'SELECT insight FROM raw_data WHERE clarity = true;';

  if (queryEl) {
    var i = 0;
    function typeChar() {
      if (i <= queryString.length) {
        queryEl.textContent = queryString.slice(0, i);
        i++;
        setTimeout(typeChar, 28);
      } else {
        // Once typing finishes, draw the chart
        drawChart();
      }
    }
    setTimeout(typeChar, 500);
  }

  function drawChart() {
    var heights = [38, 62, 90, 54, 74, 46];
    chartBars.forEach(function (bar, idx) {
      setTimeout(function () {
        bar.style.height = (heights[idx] || 50) + '%';
      }, idx * 90);
    });
  }

  /* ---------- Project card tilt on mouse move ---------- */
  var cards = document.querySelectorAll('.project-card');
  cards.forEach(function (card) {
    card.addEventListener('mousemove', function (e) {
      var rect = card.getBoundingClientRect();
      var x = (e.clientX - rect.left) / rect.width - 0.5;
      var y = (e.clientY - rect.top) / rect.height - 0.5;
      card.style.transform = 'perspective(900px) rotateY(' + (x * 4) + 'deg) rotateX(' + (-y * 4) + 'deg) translateY(-4px)';
    });
    card.addEventListener('mouseleave', function () {
      card.style.transform = 'perspective(900px) rotateY(0deg) rotateX(0deg) translateY(0)';
    });
  });

  /* ---------- Rotating hero tagline (name page) ---------- */
  var tagEl = document.getElementById('hero-tagline-text');
  if (tagEl) {
    var taglines = [
      'Data & Business Intelligence Analyst',
      'Expert in Power BI & SQL',
      'Transforming Data into Decisions',
      'Building Insightful Dashboards'
    ];
    var tIndex = 0, cIndex = 0, deleting = false;

    function tick() {
      var current = taglines[tIndex];
      if (!deleting) {
        cIndex++;
        tagEl.textContent = current.slice(0, cIndex);
        if (cIndex === current.length) {
          deleting = true;
          setTimeout(tick, 1800);
          return;
        }
        setTimeout(tick, 45);
      } else {
        cIndex--;
        tagEl.textContent = current.slice(0, cIndex);
        if (cIndex === 0) {
          deleting = false;
          tIndex = (tIndex + 1) % taglines.length;
          setTimeout(tick, 300);
          return;
        }
        setTimeout(tick, 22);
      }
    }
    setTimeout(tick, 400);
  }

  /* ---------- Project showcase carousel ---------- */
  var carousel = document.querySelector('.showcase-carousel');
  if (carousel) {
    var track = carousel.querySelector('.carousel-track');
    var slides = carousel.querySelectorAll('.carousel-slide');
    var dotsWrap = carousel.querySelector('.carousel-dots');
    var dots = dotsWrap ? dotsWrap.querySelectorAll('.dot') : [];
    var current = 0;
    var total = slides.length;
    var autoTimer;

    function goTo(idx) {
      current = (idx + total) % total;
      track.style.transform = 'translateX(-' + (current * 100) + '%)';
      dots.forEach(function (d, i) { d.classList.toggle('active', i === current); });
    }
    function startAuto() {
      clearInterval(autoTimer);
      autoTimer = setInterval(function () { goTo(current + 1); }, 4500);
    }

    carousel.querySelector('.carousel-arrow.next').addEventListener('click', function () {
      goTo(current + 1); startAuto();
    });
    carousel.querySelector('.carousel-arrow.prev').addEventListener('click', function () {
      goTo(current - 1); startAuto();
    });
    dots.forEach(function (dot, i) {
      dot.addEventListener('click', function () { goTo(i); startAuto(); });
    });

    // Basic swipe support
    var touchStartX = 0;
    carousel.addEventListener('touchstart', function (e) { touchStartX = e.touches[0].clientX; }, { passive: true });
    carousel.addEventListener('touchend', function (e) {
      var diff = e.changedTouches[0].clientX - touchStartX;
      if (Math.abs(diff) > 40) { goTo(current + (diff < 0 ? 1 : -1)); startAuto(); }
    }, { passive: true });

    goTo(0);
    startAuto();
  }

  /* ---------- Lightbox (carousel images + app gifs) ---------- */
  var lightbox = document.getElementById('lightbox');
  if (lightbox) {
    var lightboxImg = lightbox.querySelector('img');
    var closeBtn = lightbox.querySelector('.lightbox-close');

    function openLightbox(src, alt) {
      lightboxImg.src = src;
      lightboxImg.alt = alt || '';
      lightbox.classList.add('open');
      document.body.style.overflow = 'hidden';
    }
    function closeLightbox() {
      lightbox.classList.remove('open');
      document.body.style.overflow = '';
    }
    document.querySelectorAll('[data-lightbox]').forEach(function (el) {
      el.addEventListener('click', function () {
        var img = el.querySelector('img') || el;
        openLightbox(img.getAttribute('src'), img.getAttribute('alt'));
      });
    });
    closeBtn.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', function (e) {
      if (e.target === lightbox) closeLightbox();
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeLightbox();
    });
  }

  /* ---------- Active nav link based on current page ---------- */
  var currentPath = window.location.pathname.replace(/\/$/, '') || '/';
  document.querySelectorAll('.nav-links a').forEach(function (link) {
    var linkPath = link.getAttribute('href');
    if (linkPath && linkPath.indexOf('#') === -1) {
      var normalized = linkPath.replace(/\/$/, '') || '/';
      if (normalized === currentPath) link.classList.add('active');
    }
  });

});
