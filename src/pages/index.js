import './index.css';
import Card from '../scripts/Card.js';
import Section from '../scripts/Section.js';
import FormValidator from '../scripts/FormValidator.js';
import { VALIDATION_SETTINGS } from '../scripts/FormValidator.js';
import PopupWithForm from '../scripts/PopupWithForm.js';
import PopupWithImage from '../scripts/PopupWithImage.js';
import UserInfo from '../scripts/UserInfo.js';

export { CardPopup };
const profileEditButton = document.querySelector('.button_edit');
const profileAddButton = document.querySelector('.button_add');
const profileName = document.querySelector('.profile__name');
const profileDesc = document.querySelector('.profile__description');

const popups = document.querySelectorAll('.popup');
const editProfilePopup = document.querySelector('#editProfilePopup');
const addCardPopup = document.querySelector('#addCardPopup');
const showCardPopup = document.querySelector('#showCardPopup');
const popupCloseButtons = document.querySelectorAll('.button_close');

const profileForm = document.forms.editProfileForm;
const profileNameInput = profileForm.elements.heading;
const profileDescInput = profileForm.elements.subheading;
const cardForm = document.forms.addCardForm;
const cardNameInput = cardForm.elements.imageCaption;
const cardLinkInput = cardForm.elements.imageLink;


const photoPic = document.querySelector('.photo__pic');
const photoCaption = document.querySelector('.photo__caption');


const openPopup = (popup) => {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupOnEsc);
};

const closePopup = (popup) => {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupOnEsc);
};

const closePopupOnButton = (evt) => {
  const popup = evt.target.closest(".popup");
  closePopup(popup);
};

const closePopupOnOverlay = (evt) => {
  if (evt.target === evt.currentTarget) closePopup(evt.target);
};

const closePopupOnEsc = (evt) => {
  if (evt.key === 'Escape') {
    const popup = document.querySelector('.popup_opened');
    closePopup(popup);
  }
};

const CardPopup = (name, link) => {
 
    photoPic.alt = name;
    photoCaption.textContent = name;
    photoPic.src = link;
    openPopup(showCardPopup);
 
};

const renderCard = card => cardsList.prepend(card);

const openProfileForm = () => {
  profileNameInput.value = profileName.textContent;
  profileDescInput.value = profileDesc.textContent;
  openPopup(editProfilePopup);
};

const submitProfileForm = () => {
  profileName.textContent = profileNameInput.value;
  profileDesc.textContent = profileDescInput.value;
  closePopup(editProfilePopup);
};

const openCardForm = () => openPopup(addCardPopup);

const createCard = (cardData) => {
  const card = new Card(cardData, '.template-card');
  return card.generateCard();
};


const submitCardForm = () => {
  const cardData = {
    name: cardNameInput.value,
    link: cardLinkInput.value
  }

  renderCard(createCard(cardData));
  closePopup(addCardPopup);
  cardForm.reset();
  cardFormSubmitButton.classList.add('form__submit-btn_disabled');
  cardFormSubmitButton.disabled = true;
};

popups.forEach((popup) => popup.addEventListener('mousedown', closePopupOnOverlay));
popupCloseButtons.forEach((button) => button.addEventListener('click', closePopupOnButton));
profileEditButton.addEventListener('click', openProfileForm);
profileAddButton.addEventListener('click', openCardForm);
profileForm.addEventListener('submit', submitProfileForm);
cardForm.addEventListener('submit', submitCardForm);

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

const cardsList = document.querySelector('.cards__list');
const cardTemplate = document.querySelector('.template-card');

INITIAL_CARDS.forEach((card) => renderCard(createCard(card)));


const profileFormValidator = new FormValidator(VALIDATION_SETTINGS, profileForm);
profileFormValidator.enableValidation();

const cardFormValidator = new FormValidator(VALIDATION_SETTINGS, cardForm);
cardFormValidator.enableValidation();
editProfileButton.addEventListener('click', openUserProfileForm);
addCardButton.addEventListener('click', openCardForm);
