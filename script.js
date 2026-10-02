const header = document.getElementById('siteHeader');
if (header){
  window.addEventListener('scroll', () => {
    header.classList.toggle('is-scrolled', window.scrollY > 8);
  });
}

const searchToggle = document.getElementById('searchToggle');
const searchPanel  = document.getElementById('searchPanel');
if (searchToggle && searchPanel){
  searchToggle.addEventListener('click', () => {
    const open = searchPanel.classList.toggle('is-open');
    searchToggle.setAttribute('aria-expanded', open);
  });
}

const navToggle = document.getElementById('navToggle');
const navMobile  = document.getElementById('navMobile');
if (navToggle && navMobile){
  navToggle.addEventListener('click', () => {
    const open = navMobile.classList.toggle('is-open');
    navToggle.setAttribute('aria-expanded', open);
  });
}

function showToast(message){
  const toast = document.getElementById('toast');
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add('is-visible');
  clearTimeout(showToast._t);
  showToast._t = setTimeout(() => toast.classList.remove('is-visible'), 2400);
}

function shareTo(platform){
  const url   = encodeURIComponent(window.location.href);
  const title = encodeURIComponent(document.title);


  const links = {
    instagram:`=${url}`,
    facebook: `=${url}`,
    twitter:  `=${url}&text=${title}`,
    whatsapp: `https://wa.me/?text=${title}%20${url}`
  };
  if (links[platform]){
    window.open(links[platform], '_blank', 'noopener,width=600,height=500');
  }
}

function copyLink(){
  navigator.clipboard.writeText(window.location.href).then(() => {
    showToast('Tautan disalin!');
  });
}

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

const newsletterForm = document.getElementById('newsletterForm');
if (newsletterForm){
  newsletterForm.addEventListener('submit', function(e){
    e.preventDefault();
    const ok = document.getElementById('newsletterOk');
    if (ok) ok.style.display = 'block';
    this.reset();
  });
}