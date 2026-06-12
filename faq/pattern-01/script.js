document.querySelectorAll('.faq-q').forEach(dt => {
    dt.addEventListener('click', () => {
        dt.closest('.faq-item').classList.toggle('on-click');
    });
});