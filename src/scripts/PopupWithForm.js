import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(selector, submitForm) {
    super(selector);
    this._form = this._popup.querySelector('.form');
    this._submitForm = submitForm;
    this._inputList = this._form.querySelectorAll('.form__input');
  }

  _getInputValues() {
    this._formValues = {};
    this._inputList.forEach(input => this._formValues[input.name] = input.value);

    return this._formValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', () => this._submitForm(this._getInputValues()));
  }

  close() {
    super.close();
    this._form.reset();
  }
}
