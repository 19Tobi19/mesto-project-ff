import "./pages/index.css";
import { initialCards } from "./scripts/cards.js";
import { createCard, deleteCard, toggleLike } from "./scripts/card.js";
import {
  openModal,
  closeModal,
  closeEsc,
  handleCloseModalByClick,
} from "./scripts/modal.js";

const cardsContainer = document.querySelector(".places__list");

initialCards.forEach((cardData) => {
  const cardElement = createCard(cardData, deleteCard, toggleLike, openImg);
  cardsContainer.append(cardElement);
});

const popupImage = document.querySelector(".popup__image");
const popupCaption = document.querySelector(".popup__caption");
const popup = document.querySelector(".popup_type_image");
const popupImg = document.querySelector(".popup_type_image");
const addBtnCard = document.querySelector(".profile__add-button");
const popupNewCard = document.querySelector(".popup_type_new-card");
const formCard = popupNewCard.querySelector(".popup__form");
const cardNameInput = formCard.querySelector(".popup__input_type_card-name");
const cardLinkInput = formCard.querySelector(".popup__input_type_url");

function openImg(imageLink, imageName) {
  popupImage.src = imageLink;
  popupCaption.textContent = imageName;
  popupImage.alt = imageName;

  openModal(popup);
}

formCard.addEventListener("submit", function (event) {
  event.preventDefault();

  const cardData = {
    name: cardNameInput.value,
    link: cardLinkInput.value,
  };

  const cardElement = createCard(cardData, deleteCard, toggleLike, openImg);

  cardsContainer.prepend(cardElement);

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

editPopupProfile.addEventListener("click", handleCloseModalByClick);

popupImg.addEventListener("click", handleCloseModalByClick);

addBtnCard.addEventListener("click", () => {
  openModal(popupNewCard);
});

popupNewCard.addEventListener("click", handleCloseModalByClick);
