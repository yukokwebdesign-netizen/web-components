const slidesEl = document.getElementById('slides');
  const dotsEl   = document.getElementById('dots');
  const counter  = document.getElementById('counter');
  const total    = document.querySelectorAll('.slide').length;
  let cur = 0;

  // ドットを動的生成
  for (let i = 0; i < total; i++) {
    const d = document.createElement('button');
    d.className = 'dot' + (i === 0 ? ' active' : '');
    d.setAttribute('aria-label', `スライド ${i + 1}`);
    d.addEventListener('click', () => go(i));
    dotsEl.appendChild(d);
  }

  // スライド移動
  function go(n) {
    cur = (n + total) % total;
    slidesEl.style.transform = `translateX(-${cur * 100}%)`;
    document.querySelectorAll('.dot').forEach((d, i) =>
      d.classList.toggle('active', i === cur)
    );
    counter.textContent = `${cur + 1} / ${total}`;
  }

  document.getElementById('prev').addEventListener('click', () => go(cur - 1));
  document.getElementById('next').addEventListener('click', () => go(cur + 1));

  // スワイプ対応
  let startX = 0;
  const c = document.getElementById('carousel');
  c.addEventListener('touchstart', e => { startX = e.touches[0].clientX; }, { passive: true });
  c.addEventListener('touchend',   e => {
    const diff = startX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) go(cur + (diff > 0 ? 1 : -1));
  });