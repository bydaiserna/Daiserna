const els = document.querySelectorAll('.reveal');
  const io = new IntersectionObserver((entries)=>{
    entries.forEach(e=>{
      if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); }
    });
  }, {threshold:0.15});
  els.forEach(el=>io.observe(el));

  // Hero video carousel: rotates through hero-video clips, crossfading on each 'ended' event
  const heroVideos = document.querySelectorAll('.hero-video');
  if(heroVideos.length){
    let heroIndex = 0;
    const playHero = (i) => {
      heroVideos.forEach((v, idx) => {
        if(idx === i){
          v.classList.add('active');
          v.currentTime = 0;
          v.play().catch(()=>{});
        } else {
          v.classList.remove('active');
          v.pause();
        }
      });
    };
    heroVideos.forEach((v, idx) => {
      v.addEventListener('ended', () => {
        heroIndex = (idx + 1) % heroVideos.length;
        playHero(heroIndex);
      });
    });
    playHero(0);
  }
