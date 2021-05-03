const VALIDATION_SETTINGS = {
  inputSelector: '.form__input',
  submitButtonSelector: '.form__submit-btn',
  inactiveButtonClass: 'form__submit-btn_disabled',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'form__error_visible'
};

const API_SETTINGS = {
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-23',
  token: '2b6beafc-e8e7-4379-a94e-86e1cc8c1a2b'
};

const cardListSelector = '.cards__list';
const addCardButton = document.querySelector('.button_add');
const editProfileButton = document.querySelector('.button_edit');
const updateAvatarOverlay = document.querySelector('.profile__avatar-overlay');
const userProfileForm = document.forms.userProfileForm;
const profileNameInput = userProfileForm.elements.username;
const profileDescInput = userProfileForm.elements.description;
const updateAvatarForm = document.forms.updateAvatarForm;
const newCardForm = document.forms.newCardForm;

export { 
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
  newCardForm,
};
