// Mobile nav toggle
(function () {
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.querySelector('.site-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var open = nav.classList.toggle('open');
      toggle.classList.toggle('open', open);
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  }
})();

// Image slider
(function () {
  var slider = document.querySelector('.slider');
  if (!slider) return;

  var slides = slider.querySelectorAll('.slide');
  var dotsWrap = slider.querySelector('.slider-dots');
  var prev = slider.querySelector('.prev');
  var next = slider.querySelector('.next');
  var index = 0;
  var timer;

  function show(i) {
    index = (i + slides.length) % slides.length;
    slides.forEach(function (s, n) {
      s.classList.toggle('active', n === index);
    });
    dotsWrap.querySelectorAll('button').forEach(function (d, n) {
      d.classList.toggle('active', n === index);
    });
  }

  // Build dots
  slides.forEach(function (_, n) {
    var b = document.createElement('button');
    b.setAttribute('aria-label', 'Go to slide ' + (n + 1));
    b.addEventListener('click', function () { show(n); reset(); });
    dotsWrap.appendChild(b);
  });

  function start() { timer = setInterval(function () { show(index + 1); }, 4000); }
  function reset() { clearInterval(timer); start(); }

  if (next) next.addEventListener('click', function () { show(index + 1); reset(); });
  if (prev) prev.addEventListener('click', function () { show(index - 1); reset(); });

  show(0);
  start();
})();
