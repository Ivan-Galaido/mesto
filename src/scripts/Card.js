export default class Card {
  constructor({ name, link }, cardSelector, handleCardClick) {
    this._name = name;
    this._link = link;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this._card = this._getTemplate();
    this._likeButton = this._card.querySelector('.button_like_default');
    this._deleteButton = this._card.querySelector('.button_delete');
    this._cardImage = this._card.querySelector('.card__preview');
    this._cardHeading = this._card.querySelector('.card__heading');
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content
      .querySelector('.card')
      .cloneNode(true);

    return cardElement;
  }

  _setEventListeners() {
    this._likeButton.addEventListener('click', () => {
      this._likeButton.classList.toggle('button_like_liked');
    });

    this._deleteButton.addEventListener('click', () => 
        this._card.remove();
    });

    this._cardImage.addEventListener('click', (evt) => {
      evt.preventDefault();
      this._cardImage.getAttribute('href').replace('');
      this._handleCardClick(this._name, this._link);
    });
  }

  generateCard() {
    this._setEventListeners();

    this._cardHeading.textContent = this._name;
    this._cardImage.style.backgroundImage = `url(${this._link})`;

    return this._card;
  }
}
