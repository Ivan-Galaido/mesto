export default class UserInfo {
  constructor(usernameSelector, userDescSelector, userAvatarSelector) {
    this._username = document.querySelector(usernameSelector);
    this._userDesc = document.querySelector(userDescSelector);
    this._userAvatar = document.querySelector(userAvatarSelector);
  }

  getUserInfo() {
    return {
      username: this._username.textContent,
      description: this._userDesc.textContent
    };
  }

  setUserInfo({ name, about }) {
    this._username.textContent = name;
    this._userDesc.textContent = about;
  }

  setUserId ({ _id }) {
    this._userId = _id;
  }

  setUserAvatar({ avatar }) {
    this._userAvatar.src = avatar;
  }
}
