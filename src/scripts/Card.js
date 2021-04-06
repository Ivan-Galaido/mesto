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

    this._deleteButton.addEventListener('click', () => {
      this._card.style.transition = '0.5s';
      this._card.style.transform = 'scale(0, 0.3) rotate(360deg)';
      this._card.style.opacity = '0';
      setTimeout(() => {
        this._card.remove();
      }, 500);
    });

    this._cardImage.addEventListener('click', (evt) => {
      //prevent the page from scrolling 
      //to the top when click on an anchor
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
