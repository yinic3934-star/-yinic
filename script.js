// 簡易幻燈片切換腳本：左右鍵換頁、點擊下一頁
(() => {
  const slides = Array.from(document.querySelectorAll('.slide'));
  const counters = Array.from(document.querySelectorAll('.slide-counter'));
  if (!slides.length) return;

  let idx = 0;
  function show(i) {
    idx = (i + slides.length) % slides.length;
    slides.forEach((s, si) => s.style.display = (si === idx) ? 'flex' : 'none');
    // 更新 visible slide-counter (若同一頁有多個 counter，控制顯示第一個)
    counters.forEach((c, ci) => {
      // 將 counter 內容替換為 (index + 1) / total
      c.textContent = `${idx + 1} / ${slides.length}`;
    });
    // smooth scroll to top of slide
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  show(0);

  // 鍵盤左右換頁
  window.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight' || e.key === 'PageDown') { show(idx + 1); }
    if (e.key === 'ArrowLeft' || e.key === 'PageUp') { show(idx - 1); }
  });

  // 點擊 slide 本體切下一頁（手機友好）
  slides.forEach(s => s.addEventListener('click', (e) => {
    // 若點到互動元素（例如連結），不要切頁
    if (['A', 'BUTTON', 'INPUT'].includes(e.target.tagName)) return;
    show(idx + 1);
  }));
})();
