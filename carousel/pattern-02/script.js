(function () {
  const track = document.getElementById('track');
  const viewport = document.getElementById('viewport');
  const dotsEl = document.getElementById('dots');
  const prevBtn = document.getElementById('prev');
  const nextBtn = document.getElementById('next');
  const counter = document.getElementById('counter');
  const slides = Array.from(track.children);
  const total = slides.length;
  const GAP = 16;
  const PEEK = 48; /* carousel-outerのpadding分だけ常に左にずらす */
  let current = 0;
  let startX = 0, startY = 0, isDragging = false, dragDelta = 0;
  let autoTimer;

  const dots = Array.from({ length: total }, (_, i) => {
    const d = document.createElement('button');
    d.className = 'carousel-dot' + (i === 0 ? ' active' : '');
    d.setAttribute('role', 'tab');
    d.setAttribute('aria-label', `スライド ${i + 1}`);
    d.setAttribute('aria-selected', i === 0 ? 'true' : 'false');
    d.addEventListener('click', () => goTo(i));
    dotsEl.appendChild(d);
    return d;
  });

  function getSlideWidth() {
    return slides[0].offsetWidth;
  }

  function update(animated) {
    const slideW = getSlideWidth();
    const offset = current * (slideW + GAP) - PEEK;
    track.style.transition = animated === false
      ? 'none'
      : 'transform 0.38s cubic-bezier(0.4,0,0.2,1)';
    track.style.transform = `translateX(${-offset}px)`;
    counter.textContent = `${current + 1} / ${total}`;
    slides.forEach((s, i) => s.classList.toggle('active', i === current));
    dots.forEach((d, i) => {
      d.classList.toggle('active', i === current);
      d.setAttribute('aria-selected', i === current ? 'true' : 'false');
    });
    prevBtn.disabled = current === 0;
    nextBtn.disabled = current === total - 1;
  }

  function goTo(idx) {
    current = Math.max(0, Math.min(total - 1, idx));
    update(true);
  }

  function resetAuto() {
    clearInterval(autoTimer);
    autoTimer = setInterval(() => {
      goTo(current < total - 1 ? current + 1 : 0);
    }, 4500);
  }

  prevBtn.addEventListener('click', () => { goTo(current - 1); resetAuto(); });
  nextBtn.addEventListener('click', () => { goTo(current + 1); resetAuto(); });

  function onStart(clientX, clientY) {
    isDragging = true;
    startX = clientX;
    startY = clientY;
    dragDelta = 0;
    track.style.transition = 'none';
  }

  function onMove(clientX, clientY) {
    if (!isDragging) return;
    const dx = clientX - startX;
    const dy = clientY - startY;
    if (Math.abs(dy) > Math.abs(dx) + 5) { isDragging = false; return; }
    dragDelta = dx;
    const slideW = getSlideWidth();
    const offset = current * (slideW + GAP) - PEEK;
    track.style.transform = `translateX(${-offset + dragDelta}px)`;
  }

  function onEnd() {
    if (!isDragging) return;
    isDragging = false;
    const threshold = getSlideWidth() * 0.22;
    if (dragDelta < -threshold && current < total - 1) goTo(current + 1);
    else if (dragDelta > threshold && current > 0) goTo(current - 1);
    else update(true);
    resetAuto();
  }

  viewport.addEventListener('mousedown', e => onStart(e.clientX, e.clientY));
  window.addEventListener('mousemove', e => { if (isDragging) onMove(e.clientX, e.clientY); });
  window.addEventListener('mouseup', onEnd);

  viewport.addEventListener('touchstart', e => {
    const t = e.touches[0]; onStart(t.clientX, t.clientY);
  }, { passive: true });
  viewport.addEventListener('touchmove', e => {
    const t = e.touches[0]; onMove(t.clientX, t.clientY);
  }, { passive: true });
  viewport.addEventListener('touchend', onEnd);

  viewport.addEventListener('keydown', e => {
    if (e.key === 'ArrowLeft') { goTo(current - 1); resetAuto(); }
    if (e.key === 'ArrowRight') { goTo(current + 1); resetAuto(); }
  });

  update(false);
  resetAuto();
})();