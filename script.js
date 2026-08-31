/* daiserna.com
   1. reveal al hacer scroll
   2. carrusel del hero
   3. carga y reproduccion de video solo cuando entra en pantalla
*/
(function () {
  'use strict';

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var canObserve = 'IntersectionObserver' in window;

  /* ---------- 1. REVEAL ----------
     El CSS deja todo visible por defecto. Solo si podemos observar y animar
     agregamos .js-reveal, que es lo que activa el estado oculto inicial.
     Asi, si este script no corre, la pagina se ve completa igual. */
  if (canObserve && !reduceMotion) {
    document.documentElement.classList.add('js-reveal');

    var revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add('in');
          revealObserver.unobserve(e.target);
        }
      });
    }, { threshold: 0.15 });

    document.querySelectorAll('.reveal').forEach(function (el) {
      revealObserver.observe(el);
    });

    /* Red de seguridad: si algo sale mal, a los 3s se muestra todo. */
    setTimeout(function () {
      document.querySelectorAll('.reveal:not(.in)').forEach(function (el) {
        var r = el.getBoundingClientRect();
        if (r.top < window.innerHeight) { el.classList.add('in'); }
      });
    }, 3000);
  }

  /* ---------- 2. VIDEO BAJO DEMANDA ----------
     Todos los videos van con preload="none" en el HTML. Aqui les damos
     el src solo cuando estan cerca de la pantalla, arrancamos al entrar
     y pausamos al salir. Antes se descargaban los 10 de una (~12 MB). */
  function activate(video) {
    if (!video.dataset.src) { return; }
    if (video.getAttribute('src') !== video.dataset.src) {
      video.setAttribute('src', video.dataset.src);
      video.load();
    }
  }

  /* Los del hero se excluyen: estan en position:absolute cubriendo todo el
     viewport, asi que el observer los daria por visibles y cargaria los 4 de
     una (~2 MB). El carrusel de mas abajo los maneja aparte. */
  var lazyVideos = document.querySelectorAll('video[data-src]:not(.hero-video)');

  if (canObserve) {
    /* Descarga anticipada: 300px antes de que se vea */
    var loadObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          activate(e.target);
          loadObserver.unobserve(e.target);
        }
      });
    }, { rootMargin: '300px 0px' });

    /* Play / pause: solo mientras este realmente visible */
    var playObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        var v = e.target;
        if (v.classList.contains('hero-video')) { return; }
        if (e.isIntersecting) {
          activate(v);
          var p = v.play();
          if (p && p.catch) { p.catch(function () {}); }
        } else if (!v.paused) {
          v.pause();
        }
      });
    }, { threshold: 0.25 });

    lazyVideos.forEach(function (v) {
      loadObserver.observe(v);
      playObserver.observe(v);
    });
  } else {
    lazyVideos.forEach(activate);
  }

  /* ---------- 3. CARRUSEL DEL HERO ----------
     Solo el primer clip carga de entrada. Los demas se traen despues del
     load, para no competir con el primer render. */
  var heroVideos = document.querySelectorAll('.hero-video');

  if (heroVideos.length) {
    var heroIndex = 0;

    var prefetchTimer = null;

    var playHero = function (i) {
      heroVideos.forEach(function (v, idx) {
        if (idx === i) {
          activate(v);
          v.classList.add('active');
          try { v.currentTime = 0; } catch (err) {}
          var p = v.play();
          if (p && p.catch) { p.catch(function () {}); }
        } else {
          v.classList.remove('active');
          v.pause();
        }
      });

      /* Traemos SOLO el siguiente clip, y con retraso, para no competir con
         el primer render. Precargar los 4 de una costaba ~2 MB de entrada. */
      if (heroVideos.length > 1) {
        clearTimeout(prefetchTimer);
        prefetchTimer = setTimeout(function () {
          activate(heroVideos[(i + 1) % heroVideos.length]);
        }, 1500);
      }
    };

    heroVideos.forEach(function (v, idx) {
      v.addEventListener('ended', function () {
        heroIndex = (idx + 1) % heroVideos.length;
        playHero(heroIndex);
      });
      /* Si un clip no carga, saltamos al siguiente en vez de quedarnos pegados */
      v.addEventListener('error', function () {
        heroIndex = (idx + 1) % heroVideos.length;
        if (heroIndex !== idx) { playHero(heroIndex); }
      });
    });

    playHero(0);

    /* No gastar bateria ni datos con la pestana en segundo plano */
    document.addEventListener('visibilitychange', function () {
      if (document.hidden) {
        document.querySelectorAll('video').forEach(function (v) { v.pause(); });
      } else {
        playHero(heroIndex);
      }
    });
  }

  /* ---------- 4. ANO DEL FOOTER ----------
     Estaba escrito a mano en 8 archivos. */
  var y = new Date().getFullYear();
  document.querySelectorAll('[data-year]').forEach(function (el) {
    el.textContent = y;
  });
})();
