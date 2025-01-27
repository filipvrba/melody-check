export default class ElmNointernet extends HTMLElement {
  constructor() {
    super();
    this._language = Language.relevant.elmNointernet;
    this.initElm();
    window.nointernetBtnReloadClick = this.buttonReloadClick.bind(this)
  };

  nointernetUpdate(isConnected) {
    if (isConnected) return this.buttonReloadClick()
  };

  buttonReloadClick() {
    let locationHashHistory = localStorage.getItem("hashHistory");
    return locationHashHistory ? location.hash = locationHashHistory : location.hash = "dashboard"
  };

  initElm() {
    let template = `${`
<div class='d-flex justify-content-center align-items-center vh-100'>
  <div class='text-center'>
    <i class='bi bi-wifi-off display-1 text-danger'></i>
    <h1 class='mt-3'>${this._language[0]}</h1>
    <p class='text-muted'>${this._language[1]}</p>
    <button class='btn btn-primary' onclick='nointernetBtnReloadClick()'>
      <i class='bi bi-arrow-clockwise'></i> ${this._language[2]}
    </button>
  </div>
</div>
    `}`;
    return this.innerHTML = template
  }
}