import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(selector) {
    super(selector);
    this._image = this._popup.querySelector('.photo__pic');
    this._capture = this._popup.querySelector('.photo__caption');
  }

  open(name, link) {
    this._capture.textContent = name;
    this._image.alt = name;
    this._image.src = link;
    super.open();
  }
}
