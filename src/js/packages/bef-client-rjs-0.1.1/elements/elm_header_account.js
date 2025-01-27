import CDatabase from "../components/elm-header-account/database";

export default class ElmHeaderAccount extends HTMLElement {
  get userId() {
    return this._userId
  };

  constructor() {
    super();
    let endpoint = location.hash.replace("#", "");
    this._settingsOff = endpoint === "settings";
    this._language = Language.relevant.elmDashboardHeaderAccount;
    this._userId = this.getAttribute("user-id");
    this._cDatabase = new CDatabase(this);
    this.initElm();
    this._cDatabase.getEmail(email => this.initEmail(email));
    window.dropdownItemSignoutClick = this.dropdownItemSignoutClick.bind(this)
  };

  connectedCallback() {
    return null
  };

  disconnectedCallback() {
    return null
  };

  dropdownItemSignoutClick() {
    Cookie.erase("l-token");
    return Events.emit("#app", "signout")
  };

  initElm() {
    let template = `${`
<ul class='navbar-nav d-flex flex-row'>
  <li class='nav-item dropdown'>
    <a class='nav-link dropdown-toggle' href='#' id='accountDropdown' role='button' data-bs-toggle='dropdown' aria-expanded='false'>
      <i class='bi bi-person-circle'></i> <span class='d-none d-sm-inline'>${this._language[0]}</span>
    </a>
    <ul class='dropdown-menu text-small shadow' aria-labelledby='accountDropdown' style='position: absolute; inset: 0px 0px auto auto; margin: 0px; transform: translate(0px, 34px);' data-popper-placement='bottom-end'>
      <li class='dropdown-header'>
        ${this._language[1]}<br><strong id='dropdownHeaderEmail'></strong>
      </li>
      <li><hr class='dropdown-divider'></li>
      <li><a id='dashboard-header-settings-link' class='dropdown-item ${this._settingsOff ? "disabled" : null}' href='#settings'>${this._language[2]}</a></li>
      <li><a class='dropdown-item'onclick='dropdownItemSignoutClick()' href='#'>${this._language[3]}</a></li>
    </ul>
  </li>
</ul>
    `}`;
    return this.innerHTML = template
  };

  initEmail(email) {
    return this.querySelector("#dropdownHeaderEmail").innerHTML = email
  }
}