// Newsletter form: cegah reload halaman, kasih feedback ke user.
// Ini contoh sederhana form handling di frontend — belum nyambung ke
// backend/database beneran, tapi nunjukin pola dasar: validasi,
// preventDefault, dan feedback UI.

const form = document.getElementById('newsletter-form');
const msg = document.getElementById('form-msg');

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const email = document.getElementById('email').value.trim();

  if (email === '') {
    msg.textContent = 'Isi email dulu ya.';
    return;
  }

  // Di project asli, di sini biasanya fetch() ke backend/API buat
  // nyimpen email ke database. Untuk demo, kita cuma kasih konfirmasi.
  msg.textContent = 'Terima kasih! Kabar batch baru bakal masuk ke ' + email + '.';
  form.reset();
});
