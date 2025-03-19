function openModal(modal) {
  modal.classList.remove("popup_is-animated");
  modal.classList.add("popup_is-opened");
  document.addEventListener("keydown", closeEsc);
}

function closeModal(modal) {
  modal.classList.remove("popup_is-opened");
  modal.classList.add("popup_is-animated");

  setTimeout(() => {
    modal.classList.remove("popup_is-animated");
  }, 600);

  document.removeEventListener("keydown", closeEsc);
}

function closeEsc(event) {
  if (event.key === "Escape") {
    const openModal = document.querySelector(".popup_is-opened");
    if (openModal) closeModal(openModal);
  }
}

function closeOverlay(event) {
  if (event.target.classList.contains("popup_is-opened")) {
    closeModal(event.target);
  }

  if (event.target.closest(".popup__close")) {
    closeModal(event.target.closest(".popup"));
  }
}

export { openModal, closeModal, closeEsc, closeOverlay };
