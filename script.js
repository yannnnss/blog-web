/* =========================================================
   script.js — logika bersama untuk seluruh halaman
   (index.html, kesenian.html, tradisi.html, pariwisata.html)

   File ini di-load lewat <script src="script.js"></script>
   di setiap halaman, jadi semua fungsi di sini otomatis bisa
   dipakai di halaman manapun selama markup-nya memakai
   id/class yang sama (siteHeader, searchToggle, navToggle, dst).
   ========================================================= */

// 1) Bayangan header saat halaman discroll
const header = document.getElementById('siteHeader');
if (header){
  window.addEventListener('scroll', () => {
    header.classList.toggle('is-scrolled', window.scrollY > 8);
  });
}

// 2) Toggle panel pencarian
const searchToggle = document.getElementById('searchToggle');
const searchPanel  = document.getElementById('searchPanel');
if (searchToggle && searchPanel){
  searchToggle.addEventListener('click', () => {
    const open = searchPanel.classList.toggle('is-open');
    searchToggle.setAttribute('aria-expanded', open);
  });
}

// 3) Toggle menu mobile
const navToggle = document.getElementById('navToggle');
const navMobile  = document.getElementById('navMobile');
if (navToggle && navMobile){
  navToggle.addEventListener('click', () => {
    const open = navMobile.classList.toggle('is-open');
    navToggle.setAttribute('aria-expanded', open);
  });
}

// 4) Toast notifikasi kecil (dipakai oleh copyLink & shareTo)
function showToast(message){
  const toast = document.getElementById('toast');
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add('is-visible');
  clearTimeout(showToast._t);
  showToast._t = setTimeout(() => toast.classList.remove('is-visible'), 2400);
}

// 5) Tombol bagikan
//    - Twitter/X & WhatsApp punya URL share resmi, jadi dibuka di jendela baru.
//    - Instagram TIDAK punya URL share untuk halaman web, jadi tautan
//      disalin otomatis dan pengguna tinggal tempel di caption/bio/DM.
function shareTo(platform){
  const url   = encodeURIComponent(window.location.href);
  const title = encodeURIComponent(document.title);

  if (platform === 'instagram'){
    navigator.clipboard.writeText(window.location.href).then(() => {
      showToast('Tautan disalin! Tempel di Instagram Anda.');
    });
    return;
  }

  const links = {
    instagram:`https://www.instagram.com/reogsingomanggolo_?stkn=aWphMTB5Mnl3cTFi=${url}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
    twitter:  `https://x.com/cahayabudaya_tat=${title}&url=${url}`,
    whatsapp: `https://wa.me/?text=${title}%20${url}`
  };
  if (links[platform]){
    window.open(links[platform], '_blank', 'noopener,width=600,height=500');
  }
}

// 6) Salin tautan halaman
function copyLink(){
  navigator.clipboard.writeText(window.location.href).then(() => {
    showToast('Tautan disalin!');
  });
}

// 7) Lightbox galeri foto (aktif otomatis kalau halaman punya .gallery)
function openLightbox(src){
  const img = document.getElementById('lightboxImg');
  const box = document.getElementById('lightbox');
  if (!img || !box) return;
  img.src = src;
  box.classList.add('is-open');
}
function closeLightbox(){
  const box = document.getElementById('lightbox');
  if (box) box.classList.remove('is-open');
}
const lightboxEl = document.getElementById('lightbox');
if (lightboxEl){
  lightboxEl.addEventListener('click', (e) => {
    if (e.target.id === 'lightbox') closeLightbox();
  });
}

// 8) Form newsletter — tanpa backend, cukup tampilkan pesan sukses.
//    Ganti bagian ini dengan fetch() ke API/email service Anda kalau
//    sudah siap terhubung ke layanan sungguhan.
const newsletterForm = document.getElementById('newsletterForm');
if (newsletterForm){
  newsletterForm.addEventListener('submit', function(e){
    e.preventDefault();
    const ok = document.getElementById('newsletterOk');
    if (ok) ok.style.display = 'block';
    this.reset();
  });
}
