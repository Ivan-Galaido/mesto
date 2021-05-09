import './index.css';
import { 
  VALIDATION_SETTINGS,
  API_SETTINGS,
  cardListSelector,
  addCardButton,
  editProfileButton,
  updateAvatarOverlay,
  userProfileForm,
  profileNameInput,
  profileDescInput,
  updateAvatarForm,
  newCardForm
} from '../scripts/utils/constants.js';
import Card from '../scripts/components/Card.js';
import Section from '../scripts/components/Section.js';
import FormValidator from '../scripts/components/FormValidator.js';
import PopupWithForm from '../scripts/components/PopupWithForm.js';
import PopupWithImage from '../scripts/components/PopupWithImage.js';
import PopupWithConfirm from '../scripts/components/PopupWithConfirm.js';
import UserInfo from '../scripts/components/UserInfo.js';
import Api from '../scripts/components/Api.js';

const userInfo = new UserInfo(
  '.profile__name', 
  '.profile__description', 
  '.profile__avatar'
);

const openUserProfileForm = () => {
  const info = userInfo.getUserInfo();
  profileNameInput.value = info.username;
  profileDescInput.value = info.description;

  profileFormValidator.resetValidation();
  userProfilePopup.open();
};

const submitUserProfileForm = ({ username, description }) => {
  api.editUserInfo(username, description)
    .then(data => userInfo.setUserInfo(data))
    .then(() => userProfilePopup.close())
    .catch(err => alert(`Что-то пошло не так... ${err}`))
    .finally(() => userProfilePopup.setLoading(false));
};

const userProfilePopup = new PopupWithForm('#userProfilePopup', submitUserProfileForm);
userProfilePopup.setEventListeners();

const openUpdateAvatarForm = () => {
  updateAvatarFormValidator.resetValidation();
  updateAvatarPopup.open();
};

const submitUpdateAvatarForm = ({ avatar }) => {
  api.updateAvatar(avatar)
    .then(() => userInfo.setUserAvatar({ avatar }))
    .then(() => updateAvatarPopup.close())
    .catch(err => alert(`Что-то пошло не так... ${err}`))
    .finally(() => updateAvatarPopup.setLoading(false));
};

const updateAvatarPopup = new PopupWithForm('#updateAvatarPopup', submitUpdateAvatarForm);
updateAvatarPopup.setEventListeners();

const openCardForm = () => {
  cardFormValidator.resetValidation();
  cardPopup.open();
};

const submitCardForm = ({ name, link }) => {
  api.addCard(name, link)
    .then(cardData => cardList.addItemOnTop(createCard(cardData)))
    .then(() => cardPopup.close())
    .catch(err => alert(`Что-то пошло не так... ${err}`))
    .finally(() => cardPopup.setLoading(false));
};

const cardPopup = new PopupWithForm('#newCardPopup', submitCardForm);
cardPopup.setEventListeners();

const fullImagePopup = new PopupWithImage('#fullImagePopup');
fullImagePopup.setEventListeners();

const submitCardRemoval = (evt, card, cardId) => {
  evt.preventDefault();
  api.deleteCard(cardId)
    .then(() => card.deleteCard())
    .then(() => confirmPopup.close())
    .catch(err => alert(`Что-то пошло не так... ${err}`))
    .finally(() => confirmPopup.setLoading(false));
};

const confirmPopup = new PopupWithConfirm('#confirmPopup', submitCardRemoval);
confirmPopup.setEventListeners();

const createCard = ({ name, link, likes, _id, owner }) => {
  const isOwner = owner._id === userInfo.getUserId;
  const isCardLiked = likes.some(user => user._id === userInfo.getUserId);
  const card = new Card({ 
      name, 
      link, 
      likes, 
      _id,
    }, 
    '.template-card', 
    {
      handleCardClick: (name, link) => {
        fullImagePopup.open(name, link);
      },

      handleCardRemoval: (card, cardId) => {
        confirmPopup.open(card, cardId);
      },

      handleCardLike: (cardId) => {
        if (!card._isCardLiked) {
          card.setLoading(true);
          api.likeCard(cardId)
            .then(res => card.toggleLike(res))
            .catch(err => alert(`Что-то пошло не так... ${err}`))
            .finally(() => card.setLoading(false));
        } else {
          card.setLoading(true);
          api.dislikeCard(cardId)
            .then(res => card.toggleLike(res))
            .catch(err => alert(`Что-то пошло не так... ${err}`))
            .finally(() => card.setLoading(false));
        }
      }
    },
    isCardLiked,
    isOwner);
  return card.generateCard();
};

const cardList = new Section({
  renderer: (cardData) => cardList.addItem(createCard(cardData))
}, cardListSelector);

const api = new Api(API_SETTINGS);

Promise.all([ api.getUserInfo(), api.getInitialCards() ])
  .then(([ userData, InitialCards ]) => {
    userInfo.setUserInfo(userData);
    userInfo.setUserAvatar(userData);
    userInfo.setUserId(userData);
    cardList.renderItems(InitialCards);
  })
  .catch(err => alert(`Что-то пошло не так... ${err}`));

const profileFormValidator = new FormValidator(VALIDATION_SETTINGS, userProfileForm);
profileFormValidator.enableValidation();

const updateAvatarFormValidator = new FormValidator(VALIDATION_SETTINGS, updateAvatarForm);
updateAvatarFormValidator.enableValidation();

const cardFormValidator = new FormValidator(VALIDATION_SETTINGS, newCardForm);
cardFormValidator.enableValidation();

editProfileButton.addEventListener('click', openUserProfileForm);
addCardButton.addEventListener('click', openCardForm);
updateAvatarOverlay.addEventListener('click', openUpdateAvatarForm);
