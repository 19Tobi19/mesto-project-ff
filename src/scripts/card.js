import { config } from "./api";

function createCard(
  { name, link, likes, owner, _id },
  deleteCard,
  toggleLike,
  openImg,
  currentUserId,
  openDeletePopup
) {
  const cardTemplate = document.querySelector("#card-template").content;
  const cardElement = cardTemplate
    .querySelector(".places__item")
    .cloneNode(true);

  cardElement.querySelector(".card__title").textContent = name;
  const cardImage = cardElement.querySelector(".card__image");
  cardImage.src = link;
  cardImage.alt = name;

  const likeCount = cardElement.querySelector(".card__like-count");
  likeCount.textContent = likes.length;

  const deleteBtn = cardElement.querySelector(".card__delete-button");
  if (owner._id !== currentUserId) {
    deleteBtn.remove();
  } else {
    deleteBtn.addEventListener("click", () =>
      openDeletePopup(cardElement, _id)
    );
  }

  const likeButton = cardElement.querySelector(".card__like-button");
  if (likes.some((like) => like._id === currentUserId)) {
    likeButton.classList.add("card__like-button_is-active");
  }
  likeButton.addEventListener("click", () =>
    toggleLike(likeButton, _id, likes)
  );

  const imageElement = cardElement.querySelector(".card__image");
  imageElement.addEventListener("click", () => openImg(link, name));

  return cardElement;
}

function deleteCard(event) {
  const cardElement = event.target.closest(".places__item");
  if (cardElement) {
    cardElement.remove();
  }
}

function toggleLike(likeButton, cardId, likes) {
  const isLiked = likeButton.classList.contains("card__like-button_is-active");

  if (isLiked) {
    deleteLike(cardId)
      .then((updatedCard) => {
        likeButton.classList.remove("card__like-button_is-active");
        likeButton.nextElementSibling.textContent = updatedCard.likes.length;
      })
      .catch((err) => {
        console.error("Ошибка лайка:", err);
      });
  } else {
    addLike(cardId)
      .then((updatedCard) => {
        likeButton.classList.add("card__like-button_is-active");
        likeButton.nextElementSibling.textContent = updatedCard.likes.length;
      })
      .catch((err) => {
        console.error("Ошибка лайка", err);
      });
  }
}

function deleteLike(cardId) {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: "DELETE",
    headers: config.headers,
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  });
}

function addLike(cardId) {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: "PUT",
    headers: config.headers,
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  });
}

export { createCard, deleteCard, toggleLike };
