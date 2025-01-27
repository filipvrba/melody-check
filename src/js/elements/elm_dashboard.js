import AProtected from "../packages/bef-client-rjs-0.1.1/elements/abstracts/protected";

export default class ElmDashboard extends AProtected {
  constructor() {
    super()
  };

  protectedCallback() {
    return this.initElm()
  };

  connectedCallback() {
    return null
  };

  disconnectedCallback() {
    return null
  };

  initElm() {
    let template = `${`\n    <elm-header user-id='${this._userId}'></elm-header>\n    `}`;
    return this.innerHTML = template
  }
}