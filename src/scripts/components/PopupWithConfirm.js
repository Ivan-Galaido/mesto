import Popup from './Popup.js';

export default class PopupWithConfirm extends Popup {
  constructor(selector, handleConfirm) {
    super(selector);
    this._form = this._popup.querySelector('.form');
    this._submitButton = this._form.querySelector('.form__submit-btn');
    this._handleConfirm = handleConfirm;
  }

  setLoading(isLoading) {
    if(isLoading) {
      this._submitButtonInitialText = this._submitButton.textContent;
      this._submitButton.textContent = 'Удаление...';
    } else {
      this._submitButton.textContent = this._submitButtonInitialText;
    }
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {

      this.setLoading(true);
      this._handleConfirm(evt, this._obj, this._id);
    });
  }

  open(obj, id) {
    this._obj = obj;
    this._id = id;
    super.open();
  }
}