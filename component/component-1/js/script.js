/* ヘッダー：スクロール80px以上でヘッダーが縮小する（.is-small クラスを付与） */
window.addEventListener('scroll', function () {
  var hdr = document.getElementById('header');
  hdr.classList.toggle('is-small', window.scrollY > 80);
});

/* スムーススクロール：ページ内リンク（href="#〇〇"）をなめらかにスクロール */
document.querySelectorAll('a[href^="#"]').forEach(function (a) {
  a.addEventListener('click', function (e) {
    var target = document.querySelector(this.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - 80, behavior: 'smooth' });
  });
});

/* スクロールフェードイン：画面内に入った要素に .is-visible を付与してアニメーション発火 */
var observer = new IntersectionObserver(function (entries) {
  entries.forEach(function (entry) {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
    }
  });
}, { threshold: 0.1 });
document.querySelectorAll('.anim-fade-up, .anim-fade-left, .anim-fade-right').forEach(function (el) {
  observer.observe(el);
});

/* バーガーメニュー：SP でハンバーガーアイコンをタップするとメニューが開閉 */
var burgerBtn  = document.getElementById('js-burger');
var burgerMenu = document.getElementById('js-burger-menu');
var burgerClose = document.getElementById('js-burger-close');

if (burgerBtn && burgerMenu) {
  burgerBtn.addEventListener('click', function () {
    burgerMenu.classList.toggle('is-open');
    burgerBtn.classList.toggle('is-open');
  });
  burgerClose.addEventListener('click', function () {
    burgerMenu.classList.remove('is-open');
    burgerBtn.classList.remove('is-open');
  });
  burgerMenu.querySelectorAll('a').forEach(function (a) {
    a.addEventListener('click', function () {
      burgerMenu.classList.remove('is-open');
      burgerBtn.classList.remove('is-open');
    });
  });
}