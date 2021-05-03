export default class Card {
  constructor({ name, link, likes, _id }, 
    cardSelector, { handleCardClick, handleCardRemoval, handleCardLike }, 
    isCardLiked, isOwner) {
    this._name = name;
    this._link = link;
    this._likes = likes;
    this._cardId = _id;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this._handleCardRemoval = handleCardRemoval;
    this._handleCardLike = handleCardLike;
    this._isCardLiked = isCardLiked;
    this._isOwner = isOwner;
    this._card = this._getTemplate();
    this._showFullImage = this._showFullImage.bind(this);
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
      this._handleCardLike(this._cardId);
    });

    if (this._isOwner) {
      this._deleteButton.addEventListener('click', () => {
        this._handleCardRemoval(this, this._cardId);
      });
    }

    this._cardImage.addEventListener('click', this._showFullImage);
  }

  _showFullImage() {
    this._handleCardClick(this._name, this._link);
  };

  toggleLike({ likes }) {
    this._isCardLiked = !this._isCardLiked;
    this._likeButton.classList.toggle('button_like_liked');
    this._likesQuantity.textContent = likes.length;
  }

  setLoading(isLoading) {
    if (isLoading) {
      this._likeButton.classList.add('heartbeat');
    } else {
      this._likeButton.classList.remove('heartbeat');
    }
  }

  _showLikes() {
    this._likesQuantity.textContent = this._likes.length;
  }

  generateCard() {
    this._likeButton = this._card.querySelector('.button_like_default');
    this._deleteButton = this._card.querySelector('.button_delete');
    this._cardImage = this._card.querySelector('.card__preview');
    this._cardHeading = this._card.querySelector('.card__heading');
    this._likesQuantity = this._card.querySelector('.card__likes-quantity');

    this._cardHeading.textContent = this._name;
    this._cardImage.style.backgroundImage = `url(${this._link})`;

    if (this._isCardLiked) this._likeButton.classList.add('button_like_liked');
    if (!this._isOwner) this._deleteButton.remove();

    this._setEventListeners();
    this._showLikes();

    return this._card;
  }
}
