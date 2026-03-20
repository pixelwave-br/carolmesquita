// Adiciona animação suave de fade-in quando os elementos aparecem na tela.
const revealElements = document.querySelectorAll(".reveal");

const observerOptions = {
  threshold: 0.2,
};

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("active");
      revealObserver.unobserve(entry.target);
    }
  });
}, observerOptions);

revealElements.forEach((element) => revealObserver.observe(element));

// Galeria com visualização em modal
const galleryImages = document.querySelectorAll(".gallery-grid img");
const modal = document.getElementById("gallery-modal");
const modalImage = document.getElementById("gallery-modal-img");
const modalClose = document.querySelector(".gallery-modal__close");
const modalNavButtons = document.querySelectorAll(".gallery-modal__arrow");
let currentIndex = 0;

if (modal && modalImage && galleryImages.length) {
  const images = Array.from(galleryImages);

  const setImage = (index) => {
    const image = images[index];
    modalImage.src = image.src;
    modalImage.alt = image.alt;
    currentIndex = index;
  };

  const openModal = (index) => {
    setImage(index);
    modal.classList.add("active");
    modal.removeAttribute("aria-hidden");
  };

  const closeModal = () => {
    modal.classList.remove("active");
    modal.setAttribute("aria-hidden", "true");
  };

  images.forEach((img, index) => {
    img.addEventListener("click", () => openModal(index));
  });

  if (modalClose) {
    modalClose.addEventListener("click", closeModal);
  }
  modal.addEventListener("click", (event) => {
    if (event.target === modal) closeModal();
  });

  modalNavButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const direction = button.dataset.direction;
      if (direction === "prev") {
        const nextIndex = (currentIndex - 1 + images.length) % images.length;
        setImage(nextIndex);
      } else if (direction === "next") {
        const nextIndex = (currentIndex + 1) % images.length;
        setImage(nextIndex);
      }
    });
  });

  document.addEventListener("keydown", (event) => {
    if (!modal.classList.contains("active")) return;
    if (event.key === "Escape") closeModal();
    if (event.key === "ArrowRight") {
      const nextIndex = (currentIndex + 1) % images.length;
      setImage(nextIndex);
    }
    if (event.key === "ArrowLeft") {
      const nextIndex = (currentIndex - 1 + images.length) % images.length;
      setImage(nextIndex);
    }
  });
}
