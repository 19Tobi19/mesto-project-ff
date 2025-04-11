import "./pages/index.css";
import { createCard, deleteCard, toggleLike } from "./scripts/card.js";
import {
  openModal,
  closeModal,
  handleCloseModalByClick,
} from "./scripts/modal.js";
import { enableValidation, clearValidation } from "./scripts/validation.js";
import {
  getInitialCards,
  getUser,
  updateUser,
  addCard,
  deleteCardApi,
  addLike,
  deleteLike,
  updateAvatar,
} from "./scripts/api.js";
import { loaderRender } from "./scripts/utils.js";

const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

const cardsContainer = document.querySelector(".places__list");
const popupImageModal = document.querySelector(".popup_type_image");
const popupImage = popupImageModal.querySelector(".popup__image");
const popupCaption = popupImageModal.querySelector(".popup__caption");

const addBtnCard = document.querySelector(".profile__add-button");
const popupNewCard = document.querySelector(".popup_type_new-card");
const formCard = popupNewCard.querySelector(".popup__form");
const cardNameInput = formCard.querySelector(".popup__input_type_card-name");
const cardLinkInput = formCard.querySelector(".popup__input_type_url");

const profileAvatar = document.querySelector(".profile__image");
const popupDeleteCard = document.querySelector(".popup_type_deleteCard");
const formDeleteCard = popupDeleteCard.querySelector(".popup__form_deleteCard");

const profileEditIcon = document.querySelector(".profile__edit-icon");
const popupUpdateAvatar = document.querySelector(".popup_type_update-avatar");
const formUpdateAvatar = popupUpdateAvatar.querySelector(".popup__form");
const avatarInput = formUpdateAvatar.querySelector(".popup__input_type_url");

const editBtnProfile = document.querySelector(".profile__edit-button");
const editPopupProfile = document.querySelector(".popup_type_edit");
const nameInput = editPopupProfile.querySelector(".popup__input_type_name");
const jobInput = editPopupProfile.querySelector(
  ".popup__input_type_description"
);
const profileName = document.querySelector(".profile__title");
const profileJob = document.querySelector(".profile__description");
const formProfile = editPopupProfile.querySelector(".popup__form");

let cardToDelete;
let cardIdToDelete;
let currentUserId;

function renderCard(cardData, prepend = false) {
  const cardElement = createCard(
    cardData,
    deleteCard,
    toggleLike,
    openImg,
    currentUserId,
    openDeletePopup
  );
  if (prepend) {
    cardsContainer.prepend(cardElement);
  } else {
    cardsContainer.append(cardElement);
  }
}

Promise.all([getUser(), getInitialCards()])
  .then(([userData, cards]) => {
    profileName.textContent = userData.name;
    profileJob.textContent = userData.about;
    profileAvatar.style.backgroundImage = `url('${userData.avatar}')`;
    currentUserId = userData._id;

    cards.forEach((cardData) => renderCard(cardData));
  })
  .catch((err) => {
    console.error("Ошибка при загрузке данных:", err);
  });

function openImg(imageLink, imageName) {
  popupImage.src = imageLink;
  popupImage.alt = imageName;
  popupCaption.textContent = imageName;
  openModal(popupImageModal);
}

function openEditProfilePopup() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  clearValidation(formProfile, validationConfig);
  openModal(editPopupProfile);
}

formProfile.addEventListener("submit", (event) => {
  event.preventDefault();
  const submitBtn = formProfile.querySelector(".popup__button");
  loaderRender(true, submitBtn);

  const newUserData = {
    name: nameInput.value,
    about: jobInput.value,
  };

  updateUser(newUserData)
    .then((updatedUser) => {
      profileName.textContent = updatedUser.name;
      profileJob.textContent = updatedUser.about;
      closeModal(editPopupProfile);
    })
    .catch((err) => {
      console.error("Ошибка обновления профиля:", err);
    })
    .finally(() => {
      loaderRender(false, submitBtn);
    });
});

formCard.addEventListener("submit", function (event) {
  event.preventDefault();
  const submitBtn = formCard.querySelector(".popup__button");
  loaderRender(true, submitBtn);

  const newCard = {
    name: cardNameInput.value,
    link: cardLinkInput.value,
  };

  addCard(newCard)
    .then((createdCard) => {
      renderCard(createdCard, true);
      formCard.reset();
      closeModal(popupNewCard);
    })
    .catch((err) => {
      console.error("Ошибка добавления карточки:", err);
    })
    .finally(() => {
      loaderRender(false, submitBtn);
      // Местные изменения, перенесены сюда
      clearValidation(formCard, validationConfig); // Очистка валидации
      addBtnCard.disabled = false; // Разблокировка кнопки добавления карточки
    });
});

function openDeletePopup(cardElement, cardId) {
  cardToDelete = cardElement;
  cardIdToDelete = cardId;
  openModal(popupDeleteCard);
}

formDeleteCard.addEventListener("submit", (event) => {
  event.preventDefault();
  if (!cardIdToDelete) return;

  deleteCardApi(cardIdToDelete)
    .then(() => {
      cardToDelete.remove();
      closeModal(popupDeleteCard);
      cardToDelete = null;
      cardIdToDelete = null;
    })
    .catch((err) => {
      console.error("Ошибка удаления карточки:", err);
    });
});

formUpdateAvatar.addEventListener("submit", (event) => {
  event.preventDefault();
  const submitBtn = formUpdateAvatar.querySelector(".popup__button");
  loaderRender(true, submitBtn);

  const avatarUrl = avatarInput.value;

  updateAvatar(avatarUrl)
    .then((updatedUser) => {
      profileAvatar.style.backgroundImage = `url('${updatedUser.avatar}')`;
      formUpdateAvatar.reset();
      closeModal(popupUpdateAvatar);
    })
    .catch((err) => {
      console.error("Ошибка обновления аватара:", err);
    })
    .finally(() => {
      loaderRender(false, submitBtn);
    });
});

editBtnProfile.addEventListener("click", openEditProfilePopup);
addBtnCard.addEventListener("click", () => {
  clearValidation(formCard, validationConfig);
  openModal(popupNewCard);
});

profileEditIcon.addEventListener("click", () => {
  clearValidation(formUpdateAvatar, validationConfig);
  openModal(popupUpdateAvatar);
});

[
  editPopupProfile,
  popupImageModal,
  popupDeleteCard,
  popupUpdateAvatar,
  popupNewCard,
].forEach((popup) => {
  popup.addEventListener("click", handleCloseModalByClick);
});

enableValidation(validationConfig);

document.querySelectorAll(".popup__button").forEach((btn) => {
  btn.dataset.defaultText = btn.textContent;
});
