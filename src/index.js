import "./pages/index.css";
import { initialCards } from "./scripts/cards.js";
import { createCard, deleteCard, toggleLike, openImg } from "./scripts/card.js";
import {
  openModal,
  closeModal,
  closeEsc,
  closeOverlay,
} from "./scripts/modal.js";

const placesList = document.querySelector(".places__list");

initialCards.forEach((cardData) => {
  const cardElement = createCard(cardData, deleteCard, toggleLike, openImg);
  placesList.append(cardElement);
});

const popupImg = document.querySelector(".popup_type_image");
popupImg.addEventListener("click", closeOverlay);

const addBtnCard = document.querySelector(".profile__add-button");
const popupNewCard = document.querySelector(".popup_type_new-card");
const formCard = popupNewCard.querySelector(".popup__form");

addBtnCard.addEventListener("click", () => {
  openModal(popupNewCard);
});

popupNewCard.addEventListener("click", closeOverlay);

formCard.addEventListener("submit", function (event) {
  event.preventDefault();

  const name = formCard.querySelector(".popup__input_type_card-name").value;
  const link = formCard.querySelector(".popup__input_type_url").value;

  const cardData = { name, link };

  const cardElement = createCard(cardData, deleteCard, toggleLike, openImg);

  placesList.prepend(cardElement);

  closeModal(popupNewCard);

  formCard.reset();
});

const editBtnProfile = document.querySelector(".profile__edit-button");
const editPopupProfile = document.querySelector(".popup_type_edit");
const nameInput = editPopupProfile.querySelector(".popup__input_type_name");
const jobInput = editPopupProfile.querySelector(
  ".popup__input_type_description"
);
const profileName = document.querySelector(".profile__title");
const profileJob = document.querySelector(".profile__description");
const formProfile = editPopupProfile.querySelector(".popup__form");

function openEditProfilePopup() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  openModal(editPopupProfile);
}

formProfile.addEventListener("submit", (event) => {
  event.preventDefault();

  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;

  closeModal(editPopupProfile);
});

editBtnProfile.addEventListener("click", openEditProfilePopup);

editPopupProfile.addEventListener("click", closeOverlay);
