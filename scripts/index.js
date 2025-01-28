const cardTemplate = document.querySelector("#card-template").content;
const placesList = document.querySelector(".places__list");

function createCard({ name, link }, deleteCard) {
  const cardElement = cardTemplate
    .querySelector(".places__item")
    .cloneNode(true);

  cardElement.querySelector(".card__title").textContent = name;
  cardElement.querySelector(".card__image").src = link;

  const deleteBtn = cardElement.querySelector(".card__delete-button");
  deleteBtn.addEventListener("click", deleteCard);

  return cardElement;
}

function deleteCard() {
  const card = this.parentElement;
  card.remove();
}

initialCards
  .map((x) => createCard(x, deleteCard))
  .forEach((el) => placesList.append(el));
