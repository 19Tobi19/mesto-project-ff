function openModal(modal) {
  modal.classList.add("popup_is-opened");
  document.addEventListener("keydown", closeEsc);
}

function closeModal(modal) {
  modal.classList.remove("popup_is-opened");

  document.removeEventListener("keydown", closeEsc);
}

function closeEsc(event) {
  if (event.key === "Escape") {
    const openModal = document.querySelector(".popup_is-opened");
    if (openModal) closeModal(openModal);
  }
}

function handleCloseModalByClick(event) {
  if (event.target.classList.contains("popup_is-opened")) {
    closeModal(event.target);
  }

  if (event.target.closest(".popup__close")) {
    closeModal(event.target.closest(".popup"));
  }
}

export { openModal, closeModal, closeEsc, handleCloseModalByClick };
