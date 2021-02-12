const profileEditButton = document.querySelector('.button_edit');
const profileAddButton = document.querySelector('.button_add');
const profileName = document.querySelector('.profile__name');
const profileDesc = document.querySelector('.profile__description');


const editProfilePopup = document.querySelector('#editProfilePopup');
const addCardPopup = document.querySelector('#addCardPopup');
const showCardPopup = document.querySelector('#showCardPopup');
const popupCloseButtons = document.querySelectorAll('.button_close');

const profileForm = document.querySelector('form[name="editProfileForm"]');
const profileNameInput = profileForm.querySelector('.form__input_el_heading');
const profileDescInput = profileForm.querySelector('.form__input_el_subheading');
const cardForm = document.querySelector('form[name="addCardForm"]');
const cardNameInput = cardForm.querySelector('.form__input_el_image-caption');
const cardLinkInput = cardForm.querySelector('.form__input_el_image-link');

const photoPic = document.querySelector('.photo__pic');
const photoCaption = document.querySelector('.photo__caption');

const createCard = (name, link) => {
  const cardElement = cardTemplate.content.cloneNode(true);

  cardElement.querySelector('.card__heading').textContent = name;

  const cardPreview = cardElement.querySelector('.card__preview');
  cardPreview.style.backgroundImage = `url(${link})`;
  cardPreview.addEventListener('click', handleFullView);

  function handleFullView(evt) {
    evt.preventDefault();
    cardPreview.getAttribute('href').replace('');
    photoPic.src = link;
    photoPic.alt = name;
    photoCaption.textContent = name;
    openPopup(showCardPopup);
  }

  const likeButton = cardElement.querySelector('.button_like_null');
  likeButton.addEventListener('click', handleLike);

  function handleLike(evt) {
    evt.target.classList.toggle('button_like');
  }

  const deleteButton = cardElement.querySelector('.button_delete');
  deleteButton.addEventListener('click', handleDelete);

  function handleDelete() {
    const cardItem = deleteButton.closest('.card');
    cardItem.remove();
    cardPreview.removeEventListener('click', handleFullView);
    likeButton.removeEventListener('click', handleLike);
    deleteButton.removeEventListener('click', handleDelete);
  }

  return cardElement;
};

const renderCard = card => cardsList.prepend(card);

const openPopup = popup => popup.classList.add('popup_opened');

const closePopup = popup => popup.classList.remove('popup_opened');

const closePopupOnButton = (evt) => {
  const popup = evt.target.closest(".popup");
  closePopup(popup);
};

const openProfileForm = () => {
  profileNameInput.value = profileName.textContent;
  profileDescInput.value = profileDesc.textContent;
  openPopup(editProfilePopup);
};

const submitProfileForm = (evt) => {
  evt.preventDefault();
  profileName.textContent = profileNameInput.value;
  profileDesc.textContent = profileDescInput.value;
  closePopup(editProfilePopup);
};

const openCardForm = () => openPopup(addCardPopup);

const submitCardForm = (evt) => {
  evt.preventDefault();
  renderCard(createCard(cardNameInput.value, cardLinkInput.value));
  closePopup(addCardPopup);
  cardNameInput.value = '';
  cardLinkInput.value = '';
};

popupCloseButtons.forEach(button => button.addEventListener('click', closePopupOnButton));
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

INITIAL_CARDS.forEach(card => renderCard(createCard(card.name, card.link)));
