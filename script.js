window.__aksaraLoaded = true;
console.log('script loaded');

const form = document.getElementById('newsletter-form');
const emailInput = document.getElementById('email');
const msg = document.getElementById('form-msg');
const toast = document.getElementById('toast');
const menuToggle = document.querySelector('.menu-toggle');
const nav = document.getElementById('site-nav');
const filterButtons = document.querySelectorAll('.filter-button');
const cards = document.querySelectorAll('.coffee-card');
const emptyState = document.querySelector('.filter-empty');
const detailButtons = document.querySelectorAll('.detail-button');

const showToast = (message) => {
  toast.textContent = message;
  toast.classList.add('is-visible');
  window.clearTimeout(showToast.timeoutId);
  showToast.timeoutId = window.setTimeout(() => {
    toast.classList.remove('is-visible');
  }, 2200);
};

if (form && emailInput && msg) {
  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const email = emailInput.value.trim();
    if (!email) {
      msg.textContent = 'Isi email dulu ya supaya kita bisa kirim batch baru.';
      msg.style.color = '#8a3d32';
      emailInput.focus();
      return;
    }

    const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!isValid) {
      msg.textContent = 'Format email-nya belum benar, cek lagi ya.';
      msg.style.color = '#8a3d32';
      emailInput.focus();
      return;
    }

    msg.textContent = 'Terima kasih! Kabar batch baru bakal masuk ke ' + email + '.';
    msg.style.color = '#45533a';
    form.reset();
    showToast('Email tersimpan');
  });
}

if (menuToggle && nav) {
  menuToggle.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('is-open');
    menuToggle.setAttribute('aria-expanded', String(isOpen));
    menuToggle.querySelectorAll('span').forEach((line, index) => {
      if (isOpen) {
        line.style.transform = index === 0 ? 'translateY(8px) rotate(45deg)' : index === 1 ? 'scaleX(0)' : 'translateY(-8px) rotate(-45deg)';
      } else {
        line.style.transform = 'none';
      }
    });
  });

  nav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      nav.classList.remove('is-open');
      menuToggle.setAttribute('aria-expanded', 'false');
      menuToggle.querySelectorAll('span').forEach((line) => {
        line.style.transform = 'none';
      });
    });
  });
}

const updateFilter = (selectedFilter) => {
  let visibleCount = 0;

  cards.forEach((card) => {
    const methods = card.dataset.methods || '';
    const shouldShow = selectedFilter === 'all' || methods.includes(selectedFilter);

    card.classList.toggle('is-hidden', !shouldShow);
    if (shouldShow) visibleCount += 1;
  });

  emptyState.hidden = visibleCount !== 0;
};

filterButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const filter = button.dataset.filter;

    filterButtons.forEach((item) => {
      const isActive = item === button;
      item.classList.toggle('is-active', isActive);
      item.setAttribute('aria-pressed', String(isActive));
    });

    updateFilter(filter);
  });
});

if (cards.length) {
  updateFilter('all');
}

detailButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const card = button.closest('.coffee-card');
    const detail = card?.querySelector('.coffee-detail');
    const isExpanded = button.getAttribute('aria-expanded') === 'true';

    button.setAttribute('aria-expanded', String(!isExpanded));
    button.innerHTML = isExpanded ? 'Catatan rasa <span aria-hidden="true">+</span>' : 'Tutup <span aria-hidden="true">−</span>';

    if (detail) {
      detail.hidden = isExpanded;
    }
  });
});
