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

  /* ---------- Hero: cycling data-viz stage (bar / donut / line / scatter) ---------- */
  var vizStage = document.getElementById('viz-stage');
  if (vizStage) {
    var SVG_NS = 'http://www.w3.org/2000/svg';

    function buildBars() {
      var values = [42, 68, 96, 58, 80, 50];
      var colors = ['var(--teal)', 'var(--teal)', 'var(--signal)', 'var(--teal)', 'var(--teal)', 'var(--teal)'];
      var barW = 44, gap = 18, baseline = 190;
      var startX = (400 - (values.length * barW + (values.length - 1) * gap)) / 2;
      var svg = '<svg viewBox="0 0 400 220">';
      values.forEach(function (v, i) {
        var h = v * 1.5;
        var x = startX + i * (barW + gap);
        svg += '<rect class="viz-bar" data-h="' + h + '" data-y="' + (baseline - h) + '" x="' + x + '" y="' + baseline + '" width="' + barW + '" height="0" rx="4" style="fill:' + colors[i] + '"></rect>';
        svg += '<text class="viz-axis-label" x="' + (x + barW / 2) + '" y="212" text-anchor="middle">Q' + (i + 1) + '</text>';
      });
      svg += '</svg>';
      return svg;
    }
    function animateBars() {
      vizStage.querySelectorAll('.viz-bar').forEach(function (el, i) {
        setTimeout(function () {
          el.setAttribute('height', el.getAttribute('data-h'));
          el.setAttribute('y', el.getAttribute('data-y'));
        }, i * 90);
      });
    }

    function buildDonut() {
      var segs = [
        { p: 42, color: 'var(--teal)' },
        { p: 28, color: 'var(--signal)' },
        { p: 18, color: 'var(--slate-dim)' },
        { p: 12, color: 'var(--teal-dim)' }
      ];
      var r = 68, C = 2 * Math.PI * r;
      var cumulative = 0;
      var svg = '<svg viewBox="0 0 220 220"><g transform="translate(110,110) rotate(-90)">';
      segs.forEach(function (s) {
        var len = C * (s.p / 100);
        var offsetFinal = -cumulative;
        svg += '<circle class="viz-donut-seg" r="' + r + '" style="stroke:' + s.color + '" stroke-dasharray="' + len + ' ' + (C - len) + '" data-offset="' + offsetFinal + '" stroke-dashoffset="' + C + '"></circle>';
        cumulative += len;
      });
      svg += '</g>';
      var lx = 168;
      segs.forEach(function (s, i) {
        svg += '<circle class="viz-legend-dot" cx="' + lx + '" cy="' + (60 + i * 26) + '" r="5" style="fill:' + s.color + ';opacity:0"></circle>';
        svg += '<text class="viz-axis-label viz-legend-dot" x="' + (lx + 12) + '" y="' + (64 + i * 26) + '" style="opacity:0">' + s.p + '%</text>';
      });
      svg += '</svg>';
      return svg;
    }
    function animateDonut() {
      vizStage.querySelectorAll('.viz-donut-seg').forEach(function (el, i) {
        setTimeout(function () { el.setAttribute('stroke-dashoffset', el.getAttribute('data-offset')); }, i * 160);
      });
      vizStage.querySelectorAll('.viz-legend-dot').forEach(function (el, i) {
        setTimeout(function () { el.style.opacity = 1; }, 500 + i * 120);
      });
    }

    function buildLine() {
      var pts = [[20, 150], [80, 110], [140, 130], [200, 70], [260, 95], [340, 40]];
      var d = 'M' + pts.map(function (p) { return p.join(','); }).join(' L');
      var area = d + ' L340,200 L20,200 Z';
      var svg = '<svg viewBox="0 0 380 220">';
      svg += '<path class="viz-line-area" d="' + area + '" style="fill:var(--teal-dim);opacity:0"></path>';
      svg += '<path id="viz-line-path" class="viz-line-path" d="' + d + '" style="fill:none;stroke:var(--teal);stroke-width:3;stroke-linecap:round"></path>';
      pts.forEach(function (p) {
        svg += '<circle class="viz-line-dot" cx="' + p[0] + '" cy="' + p[1] + '" r="5" style="fill:var(--signal);opacity:0;transform:scale(0)"></circle>';
      });
      svg += '</svg>';
      return svg;
    }
    function animateLine() {
      var path = vizStage.querySelector('#viz-line-path');
      if (path && path.getTotalLength) {
        var len = path.getTotalLength();
        path.style.strokeDasharray = len;
        path.style.strokeDashoffset = len;
        requestAnimationFrame(function () {
          requestAnimationFrame(function () {
            path.style.transition = 'stroke-dashoffset 1.4s var(--ease)';
            path.style.strokeDashoffset = 0;
          });
        });
      }
      setTimeout(function () {
        var areaEl = vizStage.querySelector('.viz-line-area');
        if (areaEl) areaEl.style.opacity = 1;
      }, 900);
      vizStage.querySelectorAll('.viz-line-dot').forEach(function (el, i) {
        setTimeout(function () {
          el.style.opacity = 1;
          el.style.transform = 'scale(1)';
        }, 1000 + i * 90);
      });
    }

    function buildScatter() {
      var pts = [
        [40, 60, 14], [110, 130, 22], [190, 80, 10], [250, 150, 18],
        [310, 60, 12], [70, 170, 9], [230, 40, 8], [340, 120, 16]
      ];
      var svg = '<svg viewBox="0 0 380 220">';
      pts.forEach(function (p, i) {
        var color = i % 3 === 0 ? 'var(--signal)' : 'var(--teal)';
        svg += '<circle class="viz-scatter-dot" cx="' + p[0] + '" cy="' + p[1] + '" r="' + p[2] + '" style="fill:' + color + ';opacity:0;transform:scale(0)"></circle>';
      });
      svg += '</svg>';
      return svg;
    }
    function animateScatter() {
      vizStage.querySelectorAll('.viz-scatter-dot').forEach(function (el, i) {
        setTimeout(function () {
          el.style.opacity = 0.85;
          el.style.transform = 'scale(1)';
        }, i * 100);
      });
    }

    var visuals = [
      { build: buildBars, animate: animateBars },
      { build: buildDonut, animate: animateDonut },
      { build: buildLine, animate: animateLine },
      { build: buildScatter, animate: animateScatter }
    ];
    var vIndex = 0;

    function cycleViz() {
      vizStage.style.opacity = 0;
      setTimeout(function () {
        vizStage.innerHTML = visuals[vIndex].build();
        vizStage.style.opacity = 1;
        requestAnimationFrame(function () {
          requestAnimationFrame(function () {
            visuals[vIndex].animate();
          });
        });
        vIndex = (vIndex + 1) % visuals.length;
      }, 350);
    }

    cycleViz();
    setInterval(cycleViz, 5200);
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
