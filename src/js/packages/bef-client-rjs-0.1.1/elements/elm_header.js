export default class ElmChatHeader extends HTMLElement {
  constructor() {
    super();
    this._endpoint = location.hash.replace("#", "");
    this._title = Language.relevant.elmRoutes.titles[this._endpoint];
    this._userId = this.getAttribute("user-id");
    this.initElm()
  };

  connectedCallback() {
    return null
  };

  disconnectedCallback() {
    return null
  };

  initElm() {
    let template = `${`
<nav class='navbar navbar-light bg-light'>
  <div class='container-fluid mx-auto'>
    <div class='col-4'>
      ${this.subinitElm(this._endpoint)}
    </div>
    <div class='col-4 text-center'>
      <h3 class='m-0 text-truncate'>${this._title}</h3>
    </div>
    <div class='col-4 d-flex'>
      <div class='ms-auto'>
        <elm-header-account user-id='${this._userId}'></elm-header-account>
      </div>
    </div>
  </div>
</nav>
    `}`;
    return this.innerHTML = template
  };

  subinitElm(endpoint) {
    switch (endpoint) {
    case "settings":
      return `${`
      <a class='btn navbar-brand' href='#dashboard'>
        <i class='bi bi-arrow-left'></i>
      </a>
      `}`;

    default:
      return ""
    }
  }
}