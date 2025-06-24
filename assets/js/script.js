document.addEventListener("DOMContentLoaded", function () {
  // Menu mobile e dropdowns
  const menuBtn = document.getElementById("menuBtn");
  const dropdownMobile = document.getElementById("dropdownMobile");
  if (menuBtn && dropdownMobile) {
    menuBtn.addEventListener("click", function (e) {
      e.stopPropagation();
      dropdownMobile.classList.toggle("active");
    });
    document.addEventListener("click", function (e) {
      if (!dropdownMobile.contains(e.target) && !menuBtn.contains(e.target)) {
        dropdownMobile.classList.remove("active");
      }
    });
  }

  const dropdownCustom = document.querySelector(".dropdown-mobile");
  const toggleMobile = document.querySelector(".dropdown-toggle-mobile");
  if (dropdownCustom && toggleMobile) {
    toggleMobile.addEventListener("click", function (e) {
      e.preventDefault();
      const isOpen = dropdownCustom.classList.toggle("open");
      toggleMobile.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });
    document.addEventListener("click", function (e) {
      if (!dropdownCustom.contains(e.target)) {
        dropdownCustom.classList.remove("open");
        toggleMobile.setAttribute("aria-expanded", "false");
      }
    });
  }

  // Carrossel depoimentos
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
      cards[0]?.offsetWidth + parseInt(getComputedStyle(track).gap) || 0;
    const offset = current * cardWidth;
    if (track) track.style.transform = `translateX(-${offset}px)`;
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

  // Carrossel e modal para cada produto-card
  document.querySelectorAll('.produto-card').forEach(function(card) {
    const track = card.querySelector('.carousel-produto-track');
    const images = track.querySelectorAll('.produto-img');
    const prevBtn = card.querySelector('.carousel-produto-btn.prev');
    const nextBtn = card.querySelector('.carousel-produto-btn.next');
    let currentIndex = 0;

    function updateProdutoCarousel() {
      track.style.transform = `translateX(-${currentIndex * 260}px)`;
    }

    if (prevBtn && nextBtn) {
      prevBtn.addEventListener('click', function() {
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        updateProdutoCarousel();
      });
      nextBtn.addEventListener('click', function() {
        currentIndex = (currentIndex + 1) % images.length;
        updateProdutoCarousel();
      });
    }

    updateProdutoCarousel();

    // Modal para este card
    images.forEach(function(img, idx) {
      img.style.cursor = "zoom-in";
      img.addEventListener('click', function() {
        openModal(images, idx);
      });
    });
  });

  // Modal global para ampliar imagens dos produtos
  const modal = document.getElementById('modal-produto-img');
  const modalImg = document.getElementById('modalProdutoImgContent');
  const modalClose = document.getElementById('modalProdutoClose');
  const modalPrev = modal.querySelector('.modal-produto-arrow.prev');
  const modalNext = modal.querySelector('.modal-produto-arrow.next');

  let modalImages = [];
  let modalIndex = 0;

  function openModal(images, idx) {
    modalImages = Array.from(images);
    modalIndex = idx;
    modalImg.src = modalImages[modalIndex].src;
    modal.classList.add('open');
  }

  function updateModalImg() {
    if (modalImages.length > 0) {
      modalImg.src = modalImages[modalIndex].src;
    }
  }

  if (modalPrev)
    modalPrev.addEventListener('click', function(e) {
      e.stopPropagation();
      if (modalImages.length > 0) {
        modalIndex = (modalIndex - 1 + modalImages.length) % modalImages.length;
        updateModalImg();
      }
    });
  if (modalNext)
    modalNext.addEventListener('click', function(e) {
      e.stopPropagation();
      if (modalImages.length > 0) {
        modalIndex = (modalIndex + 1) % modalImages.length;
        updateModalImg();
      }
    });

  if (modalClose) {
    modalClose.addEventListener('click', function() {
      modal.classList.remove('open');
      modalImg.src = '';
      modalImages = [];
      modalIndex = 0;
    });
  }

  if (modal) {
    modal.addEventListener('click', function(e) {
      if (e.target === modal) {
        modal.classList.remove('open');
        modalImg.src = '';
        modalImages = [];
        modalIndex = 0;
      }
    });
  }

  document.addEventListener("keydown", function (e) {
    if (!modal.classList.contains("open")) return;
    if (e.key === "Escape") {
      modal.classList.remove('open');
      modalImg.src = '';
      modalImages = [];
      modalIndex = 0;
    }
    if (e.key === "ArrowLeft") {
      modalIndex = (modalIndex - 1 + modalImages.length) % modalImages.length;
      updateModalImg();
    }
    if (e.key === "ArrowRight") {
      modalIndex = (modalIndex + 1) % modalImages.length;
      updateModalImg();
    }
  });

  // Modal de cadastro (caso exista)
  const formCadastro = document.getElementById('formCadastro');
  const modalCadastro = document.getElementById('modalCadastro');
  if (formCadastro && modalCadastro) {
    formCadastro.addEventListener('submit', function() {
      setTimeout(function() {
        modalCadastro.classList.add('open');
        formCadastro.reset();
      }, 1200);
    });
    window.fecharModal = function() {
      modalCadastro.classList.remove('open');
    }
  }
});