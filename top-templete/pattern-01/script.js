/* ============================================
   HAMBURGER MENU
   ============================================ */
const hamburger = document.getElementById('hamburger');
const nav = document.querySelector('.header__nav');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  nav.classList.toggle('open');
});

// メニュー外クリックで閉じる
document.addEventListener('click', (e) => {
  if (!hamburger.contains(e.target) && !nav.contains(e.target)) {
    hamburger.classList.remove('active');
    nav.classList.remove('open');
  }
});

/* ============================================
   CAROUSEL
   ============================================ */
(function () {
  const track = document.querySelector('.carousel__track');
  const slides = Array.from(track.children);
  const dotsContainer = document.getElementById('carousel-dots');
  const prevBtn = document.getElementById('carousel-prev');
  const nextBtn = document.getElementById('carousel-next');

  // 1度に表示する枚数をブレークポイントごとに取得
  function getVisible() {
    if (window.innerWidth <= 480) return 1;
    if (window.innerWidth <= 768) return 2;
    return 3;
  }

  let current = 0;
  let visible = getVisible();
  let total = slides.length;

  // ドットを生成
  function buildDots() {
    dotsContainer.innerHTML = '';
    const dotCount = total - visible + 1;
    for (let i = 0; i < dotCount; i++) {
      const btn = document.createElement('button');
      btn.classList.add('carousel__dot');
      btn.setAttribute('aria-label', `スライド ${i + 1}`);
      btn.addEventListener('click', () => goTo(i));
      dotsContainer.appendChild(btn);
    }
    updateDots();
  }

  function updateDots() {
    const dots = dotsContainer.querySelectorAll('.carousel__dot');
    dots.forEach((d, i) => d.classList.toggle('active', i === current));
  }

  function goTo(index) {
    const maxIndex = total - visible;
    current = Math.max(0, Math.min(index, maxIndex));
    const slideWidth = slides[0].offsetWidth;
    track.style.transform = `translateX(-${current * slideWidth}px)`;
    updateDots();
  }

  prevBtn.addEventListener('click', () => goTo(current - 1));
  nextBtn.addEventListener('click', () => goTo(current + 1));

  // ブレークポイント変更時にリセット
  window.addEventListener('resize', () => {
    visible = getVisible();
    current = 0;
    buildDots();
    goTo(0);
  });

  // 初期化
  buildDots();
})();