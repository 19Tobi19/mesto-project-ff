export function createCard({ name, link }, deleteCard, toggleLike, openImg) {
  const cardTemplate = document.querySelector("#card-template").content;
  const cardElement = cardTemplate
    .querySelector(".places__item")
    .cloneNode(true);

  cardElement.querySelector(".card__title").textContent = name;
  cardElement.querySelector(".card__image").src = link;
  cardElement.querySelector(".card__image").alt = name;

  const deleteBtn = cardElement.querySelector(".card__delete-button");
  deleteBtn.addEventListener("click", (event) => deleteCard(event));

  const likeButton = cardElement.querySelector(".card__like-button");
  likeButton.addEventListener("click", () => toggleLike(likeButton));

  const imageElement = cardElement.querySelector(".card__image");
  imageElement.addEventListener("click", () => openImg(link, name));

  return cardElement;
}

export function deleteCard() {
  const cardElement = event.target.closest(".places__item");
  if (cardElement) {
    cardElement.remove();
  }
}

export function toggleLike(likeButton) {
  likeButton.classList.toggle("card__like-button_is-active");
}
