// Adiciona animação suave de fade-in logo na abertura, sem depender do scroll.
const revealElements = document.querySelectorAll(".reveal");
revealElements.forEach((element) => element.classList.add("active"));

// Galeria com visualização em modal
const galleryImages = document.querySelectorAll(".gallery-grid img");
const modal = document.getElementById("gallery-modal");
const modalImage = document.getElementById("gallery-modal-img");
const modalClose = document.querySelector(".gallery-modal__close");
const modalNavButtons = document.querySelectorAll(".gallery-modal__arrow");
let currentIndex = 0;
let scrollPosition = 0;

const lockBodyScroll = () => {
  scrollPosition = window.scrollY;
  document.body.style.position = "fixed";
  document.body.style.top = `-${scrollPosition}px`;
  document.body.style.left = "0";
  document.body.style.right = "0";
  document.body.style.width = "100%";
};

const unlockBodyScroll = () => {
  document.body.style.position = "";
  document.body.style.top = "";
  document.body.style.left = "";
  document.body.style.right = "";
  document.body.style.width = "";
  window.scrollTo(0, scrollPosition);
};

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
    lockBodyScroll();
    modal.classList.add("active");
    modal.removeAttribute("aria-hidden");
    modal.scrollIntoView({ block: "center" });
  };

  const closeModal = () => {
    modal.classList.remove("active");
    modal.setAttribute("aria-hidden", "true");
    unlockBodyScroll();
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
