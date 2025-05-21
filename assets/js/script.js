document.addEventListener("DOMContentLoaded", function () {
  const menuBtn = document.getElementById("menuBtn");
  const dropdownMobile = document.getElementById("dropdownMobile");

  menuBtn.addEventListener("click", function (e) {
    e.stopPropagation();
    dropdownMobile.classList.toggle("active");
  });

  
  document.addEventListener("click", function (e) {
    if (!dropdownMobile.contains(e.target) && !menuBtn.contains(e.target)) {
      dropdownMobile.classList.remove("active");
    }
  });
});


document.addEventListener("DOMContentLoaded", function () {
 
  const dropdownMobile = document.querySelector('.dropdown-mobile');
  const toggleMobile = document.querySelector('.dropdown-toggle-mobile');
  if (dropdownMobile && toggleMobile) {
    toggleMobile.addEventListener('click', function (e) {
      e.preventDefault();
      const isOpen = dropdownMobile.classList.toggle('open');
      toggleMobile.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });
    
    document.addEventListener('click', function (e) {
      if (!dropdownMobile.contains(e.target)) {
        dropdownMobile.classList.remove('open');
        toggleMobile.setAttribute('aria-expanded', 'false');
      }
    });
  }
});


document.addEventListener("DOMContentLoaded", function () {
  
  const track = document.querySelector(".carousel-track");
  const cards = document.querySelectorAll(".depoimento-card");
  const prevBtn = document.querySelector(".carousel-btn.prev");
  const nextBtn = document.querySelector(".carousel-btn.next");
  let current = 0;
  let visible = 2;

  function updateVisible() {
    if (window.innerWidth < 700) visible = 1;
    else if (window.innerWidth < 1100) visible = 1;
    else visible = 2;
  }

  function updateCarousel() {
    updateVisible();
    const cardWidth =
      cards[0].offsetWidth + parseInt(getComputedStyle(track).gap) || 0;
    const offset = current * cardWidth;
    track.style.transform = `translateX(-${offset}px)`;
  }

  function showPrev() {
    current = Math.max(current - 1, 0);
    updateCarousel();
  }

  function showNext() {
    current = Math.min(current + 1, cards.length - visible);
    updateCarousel();
  }

  if (track && cards.length > 0 && prevBtn && nextBtn) {
    prevBtn.addEventListener("click", showPrev);
    nextBtn.addEventListener("click", showNext);
    window.addEventListener("resize", updateCarousel);
    updateCarousel();
  }
});


document.addEventListener("DOMContentLoaded", function () {
  const produtoTrack = document.querySelector('.carousel-produto-track');
  const produtoImgs = document.querySelectorAll('.produto-img');
  const prevBtn = document.querySelector('.carousel-produto-btn.prev');
  const nextBtn = document.querySelector('.carousel-produto-btn.next');
  let current = 0;

  function updateProdutoCarousel() {
    if (!produtoImgs.length) return;
    const imgWidth = produtoImgs[0].offsetWidth;
    produtoTrack.style.transform = `translateX(-${current * imgWidth}px)`;
  }

  if (produtoTrack && produtoImgs.length > 0 && prevBtn && nextBtn) {
    prevBtn.addEventListener('click', () => {
      current = (current - 1 + produtoImgs.length) % produtoImgs.length;
      updateProdutoCarousel();
    });
    nextBtn.addEventListener('click', () => {
      current = (current + 1) % produtoImgs.length;
      updateProdutoCarousel();
    });
    window.addEventListener('resize', updateProdutoCarousel);
    updateProdutoCarousel();
  }
});


document.addEventListener("DOMContentLoaded", function () {
  const produtoImgs = document.querySelectorAll('.produto-img');
  const modal = document.getElementById('modal-produto-img');
  const modalImg = document.getElementById('modalProdutoImgContent');
  const modalClose = document.getElementById('modalProdutoClose');

  produtoImgs.forEach(img => {
    img.style.cursor = "zoom-in";
    img.addEventListener('click', function () {
      if (modal && modalImg) {
        modal.classList.add('open');
        modalImg.src = this.src;
        modalImg.alt = this.alt || "Foto ampliada do produto";
      }
    });
  });

  if (modalClose) {
    modalClose.addEventListener('click', function () {
      modal.classList.remove('open');
      modalImg.src = "";
    });
  }

  
  if (modal) {
    modal.addEventListener('click', function (e) {
      if (e.target === modal) {
        modal.classList.remove('open');
        modalImg.src = "";
      }
    });
  }

  
  document.addEventListener('keydown', function (e) {
    if (e.key === "Escape" && modal.classList.contains('open')) {
      modal.classList.remove('open');
      modalImg.src = "";
    }
  });
});
