// Menambahkan bayangan pada header saat halaman digulir lebih dari 8 piksel.
const header = document.getElementById('siteHeader');
if (header){
  window.addEventListener('scroll', () => {
    header.classList.toggle('is-scrolled', window.scrollY > 8);
  });
}

// Membuka atau menutup panel pencarian dan memperbarui status aksesibilitas tombol.
const searchToggle = document.getElementById('searchToggle');
const searchPanel  = document.getElementById('searchPanel');
if (searchToggle && searchPanel){
  searchToggle.addEventListener('click', () => {
    const open = searchPanel.classList.toggle('is-open');
    searchToggle.setAttribute('aria-expanded', open);
  });
}

// Membuka atau menutup menu navigasi versi mobile.
const navToggle = document.getElementById('navToggle');
const navMobile  = document.getElementById('navMobile');
if (navToggle && navMobile){
  navToggle.addEventListener('click', () => {
    const open = navMobile.classList.toggle('is-open');
    navToggle.setAttribute('aria-expanded', open);
  });
}

// Menampilkan pesan sementara, lalu menyembunyikannya setelah 2,4 detik.
function showToast(message){
  const toast = document.getElementById('toast');
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add('is-visible');
  clearTimeout(showToast._t);
  showToast._t = setTimeout(() => toast.classList.remove('is-visible'), 2400);
}

// Membuat URL berbagi berdasarkan platform dan membuka halaman berbagi di tab baru.
function shareTo(platform){
  const url   = encodeURIComponent(window.location.href);
  const title = encodeURIComponent(document.title);

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

// Menyalin alamat halaman saat ini, lalu memberi tahu pengguna melalui toast.
function copyLink(){
  navigator.clipboard.writeText(window.location.href).then(() => {
    showToast('Tautan disalin!');
  });
}

// Mengisi gambar pada lightbox dan menampilkan lightbox.
function openLightbox(src){
  const img = document.getElementById('lightboxImg');
  const box = document.getElementById('lightbox');
  if (!img || !box) return;
  img.src = src;
  box.classList.add('is-open');
}

// Menutup lightbox dengan menghapus kelas yang membuatnya terlihat.
function closeLightbox(){
  const box = document.getElementById('lightbox');
  if (box) box.classList.remove('is-open');
}

// Menutup lightbox jika pengguna mengeklik area latar di luar gambar.
const lightboxEl = document.getElementById('lightbox');
if (lightboxEl){
  lightboxEl.addEventListener('click', (e) => {
    if (e.target.id === 'lightbox') closeLightbox();
  });
}

// Mencegah formulir newsletter berpindah halaman, menampilkan pesan sukses, lalu mengosongkan formulir.
const newsletterForm = document.getElementById('newsletterForm');
if (newsletterForm){
  newsletterForm.addEventListener('submit', function(e){
    e.preventDefault();
    const ok = document.getElementById('newsletterOk');
    if (ok) ok.style.display = 'block';
    this.reset();
  });
}