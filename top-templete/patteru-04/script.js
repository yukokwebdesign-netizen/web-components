/* ==========================================================
    script.js
========================================================== */

const header  = document.querySelector('header');
const hbBtn   = document.querySelector('.hb-btn');
const spNav   = document.querySelector('.sp-nav');
const spLinks = document.querySelectorAll('.sp-nav a');

/* ----------------------------------------------------------
    ハンバーガーメニュー開閉
---------------------------------------------------------- */
function toggleMenu(isOpen) {
    hbBtn.classList.toggle('is-active', isOpen);
    spNav.classList.toggle('is-open', isOpen);
    hbBtn.setAttribute('aria-expanded', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
}

hbBtn.addEventListener('click', () => {
    const isOpen = !spNav.classList.contains('is-open');
    toggleMenu(isOpen);
});

/* SPナビのリンクをクリックしたら閉じる */
spLinks.forEach(link => {
    link.addEventListener('click', () => toggleMenu(false));
});

/* ナビ外をクリックしたら閉じる */
document.addEventListener('click', (e) => {
    if (spNav.classList.contains('is-open') &&
        !spNav.contains(e.target) &&
        !hbBtn.contains(e.target)) {
        toggleMenu(false);
    }
});

/* ----------------------------------------------------------
    スクロール時ヘッダーにクラス付与
    .s-active を追加することでヘッダーのスタイルを変更できる
---------------------------------------------------------- */
window.addEventListener('scroll', () => {
    header.classList.toggle('s-active', window.scrollY > 50);
}, { passive: true });
