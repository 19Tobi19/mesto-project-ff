export function createCard({ name, link }, deleteCard, toggleLike, openImg) {
  const cardTemplate = document.querySelector("#card-template").content;
  const cardElement = cardTemplate
    .querySelector(".places__item")
    .cloneNode(true);

  cardElement.querySelector(".card__title").textContent = name;
  cardElement.querySelector(".card__image").src = link;

  const deleteBtn = cardElement.querySelector(".card__delete-button");
  deleteBtn.addEventListener("click", deleteCard);

  const likeButton = cardElement.querySelector(".card__like-button");
  likeButton.addEventListener("click", () => toggleLike(likeButton));

  const imageElement = cardElement.querySelector(".card__image");
  imageElement.addEventListener("click", () => openImg(link, name));

  return cardElement;
}

export function deleteCard() {
  const card = this.parentElement;
  card.remove();
}

export function toggleLike(likeButton) {
  likeButton.classList.toggle("card__like-button_is-active");
}

export function openImg(imageLink, imageName) {
  const popupImage = document.querySelector(".popup__image");
  const popupCaption = document.querySelector(".popup__caption");
  const popup = document.querySelector(".popup_type_image");

  popupImage.src = imageLink;
  popupCaption.textContent = imageName;

  popup.classList.add("popup_is-opened");
}
