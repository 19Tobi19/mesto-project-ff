import "./pages/index.css";
import { createCard, deleteCard, toggleLike } from "./scripts/card.js";
import {
  openModal,
  closeModal,
  closeEsc,
  handleCloseModalByClick,
} from "./scripts/modal.js";
import { enableValidation, clearValidation } from "./scripts/validation.js";
import {
  getInitialCards,
  getUser,
  updateUser,
  addCard,
} from "./scripts/api.js";

const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};
const cardsContainer = document.querySelector(".places__list");
const popupImage = document.querySelector(".popup__image");
const popupCaption = document.querySelector(".popup__caption");
const popup = document.querySelector(".popup_type_image");
const popupImg = document.querySelector(".popup_type_image");
const addBtnCard = document.querySelector(".profile__add-button");
const popupNewCard = document.querySelector(".popup_type_new-card");
const formCard = popupNewCard.querySelector(".popup__form");
const cardNameInput = formCard.querySelector(".popup__input_type_card-name");
const cardLinkInput = formCard.querySelector(".popup__input_type_url");
const profileAvatar = document.querySelector(".profile__image");

let currentUserId;

Promise.all([getUser(), getInitialCards()])
  .then(([userData, cards]) => {
    profileName.textContent = userData.name;
    profileJob.textContent = userData.about;
    profileAvatar.style.backgroundImage = `url('${userData.avatar}')`;
    currentUserId = userData._id;

    cards.forEach((cardData) => {
      const cardElement = createCard(cardData, deleteCard, toggleLike, openImg);
      cardsContainer.append(cardElement);
    });
  })
  .catch((err) => {
    console.error("Ошибка при загрузке данных:", err);
  });

function openImg(imageLink, imageName) {
  popupImage.src = imageLink;
  popupCaption.textContent = imageName;
  popupImage.alt = imageName;

  openModal(popup);
}

formCard.addEventListener("submit", function (event) {
  event.preventDefault();

  const newCard = {
    name: cardNameInput.value,
    link: cardLinkInput.value,
  };

  addCard(newCard)
    .then((createdCard) => {
      const cardElement = createCard(
        createdCard,
        deleteCard,
        toggleLike,
        openImg
      );
      cardsContainer.prepend(cardElement);
      closeModal(popupNewCard);
      clearValidation(formCard, validationConfig);
      formCard.reset();
    })
    .catch((err) => {
      console.error("Ошибка при добавлении карточки:", err);
    });
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
  clearValidation(formProfile, validationConfig);
  openModal(editPopupProfile);
}

formProfile.addEventListener("submit", (event) => {
  event.preventDefault();

  const newUserData = {
    name: nameInput.value,
    about: jobInput.value,
  };

  updateUser(newUserData)
    .then((updatedUser) => {
      profileName.textContent = updatedUser.name;
      profileJob.textContent = updatedUser.about;
      closeModal(editPopupProfile);
      clearValidation(formProfile, validationConfig);
    })
    .catch((err) => {
      console.error("Ошибка при обновлении профиля:", err);
    });
});

editBtnProfile.addEventListener("click", openEditProfilePopup);

editPopupProfile.addEventListener("click", handleCloseModalByClick);

popupImg.addEventListener("click", handleCloseModalByClick);

addBtnCard.addEventListener("click", () => {
  clearValidation(formCard, validationConfig);
  openModal(popupNewCard);
});

popupNewCard.addEventListener("click", handleCloseModalByClick);

enableValidation(validationConfig);

getUser()
  .then((userData) => {
    profileName.textContent = userData.name;
    profileJob.textContent = userData.about;
    profileAvatar.style.backgroundImage = `url('${userData.avatar}')`;
  })
  .catch((err) => {
    console.error("Ошибка загрузки профиля:", err);
  });
