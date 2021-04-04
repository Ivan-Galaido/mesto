export default class UserInfo {
  constructor(usernameSelector, userDescSelector) {
    this._username = document.querySelector(usernameSelector);
    this._userDesc = document.querySelector(userDescSelector);
  }

  getUserInfo() {
    const userData = {
      username: this._username.textContent,
      description: this._userDesc.textContent
    };
    return userData;
  }

  setUserInfo({ username, description }) {
    this._username.textContent = username;
    this._userDesc.textContent = description;
  }
}
