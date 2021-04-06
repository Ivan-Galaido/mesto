import './index.css';
import Card from '../scripts/Card.js';
import Section from '../scripts/Section.js';
import FormValidator from '../scripts/FormValidator.js';
import PopupWithForm from '../scripts/PopupWithForm.js';
import PopupWithImage from '../scripts/PopupWithImage.js';
import UserInfo from '../scripts/UserInfo.js';

const INITIAL_CARDS = [
  {
    name: 'Дворцовая площадь',
    link: 'https://sun9-43.userapi.com/impf/gz67yP2o8NkStpCV4QuBNx2P3OXVjisGkZQoMQ/39EhGhrVW6Q.jpg?size=2400x1600&quality=96&proxy=1&sign=6ee623378e0ee7c5204a39b3a3be2414&type=album'  },
  {
    name: 'Исаакиевский собор',
    link: 'https://sun9-27.userapi.com/impf/dbl2Yd4invRrtNdREVxu665kcjXTSb59P_jY3w/2-Y4MC1tPIs.jpg?size=1920x1080&quality=96&proxy=1&sign=80e750495a7a2b6ee43d37941c0e02aa&type=album'
  },
  {
    name: 'Казанский собор',
    link: 'https://sun9-58.userapi.com/impf/E7EjGoWAMWV-ppYK3K3LDwnuNKVky5Uq0dxdqw/RqK1Z58RrUk.jpg?size=1920x1080&quality=96&proxy=1&sign=ebb00a474c3e6cf340c1fffc05a355a1&type=album'
  },
  {
    name: 'Петропавловская крепость',
    link: 'https://sun9-20.userapi.com/impf/KpFi6ksieinJJeTJFPsSdiVf1ypYwGiI0TTC6w/CHeIFgP5-nE.jpg?size=1200x1200&quality=96&proxy=1&sign=ccae8918200dd5c9ca4e64efb30bd508&type=album'
  },
  {
    name: 'Смольный собор',
    link: 'https://sun9-44.userapi.com/impf/qWBh1p0UW-MGofXotwnHZAyYcTKysVXF_838_A/Q7kE9EbWyq4.jpg?size=973x1080&quality=96&proxy=1&sign=2d54a9b01befddc38c7497a1d44adbe8&type=album'
  },
  {
    name: 'Спас на Крови',
    link: 'https://sun9-66.userapi.com/impf/kKwvjRopOCyT4tMaSGMOPGtgXWefMiydnE2PMA/Vut-6vCJQUE.jpg?size=2560x1497&quality=96&proxy=1&sign=889a667736dd008d4a0d998689776b8b&type=album'
  }
];

const VALIDATION_SETTINGS = {
    inputSelector: '.form__input',
    submitButtonSelector: '.form__submit-btn',
    inactiveButtonClass: 'form__submit-btn_disabled',
    inputErrorClass: 'form__input_type_error',
    errorClass: 'form__error_visible'
};

const addCardButton = document.querySelector('.button_add');
const editProfileButton = document.querySelector('.button_edit');
const userProfileForm = document.forms.userProfileForm;
const profileNameInput = userProfileForm.elements.username;
const profileDescInput = userProfileForm.elements.description;
const newCardForm = document.forms.newCardForm;

const userInfo = new UserInfo('.profile__name', '.profile__description');

const openUserProfileForm = () => {
  const info = userInfo.getUserInfo();
  profileNameInput.value = info.username;
  profileDescInput.value = info.description;

  profileFormValidator.resetValidation();
  userProfilePopup.open();
};

const submitUserProfileForm = ({ username, description }) => {
  userInfo.setUserInfo({ username, description });
  userProfilePopup.close();
};

const userProfilePopup = new PopupWithForm('#userProfilePopup', submitUserProfileForm);
userProfilePopup.setEventListeners();

const createCard = ({ name, link }) => {
  const card = new Card({ name, link }, '.template-card', handleCardClick);
  return card.generateCard();
};

const openCardForm = () => {
  cardFormValidator.resetValidation();
  cardPopup.open();
};

const submitCardForm = ({ name, link }) => {
  const cardElement = createCard({ name, link });
  cardList.addItem(cardElement);
  cardPopup.close();
};

const cardPopup = new PopupWithForm('#newCardPopup', submitCardForm);
cardPopup.setEventListeners();

const fullImagePopup = new PopupWithImage('#fullImagePopup');
fullImagePopup.setEventListeners();

const handleCardClick = (name, link) => {
  fullImagePopup.open(name, link);
};

const cardList = new Section({
  items: INITIAL_CARDS,
  renderer: ({ name, link }) => {
    const cardElement = createCard({ name, link });
    cardList.addItem(cardElement);
  }
}, '.cards__list');

cardList.renderItems();

const profileFormValidator = new FormValidator(VALIDATION_SETTINGS, userProfileForm);
profileFormValidator.enableValidation();

const cardFormValidator = new FormValidator(VALIDATION_SETTINGS, newCardForm);
cardFormValidator.enableValidation();

editProfileButton.addEventListener('click', openUserProfileForm);
addCardButton.addEventListener('click', openCardForm);

