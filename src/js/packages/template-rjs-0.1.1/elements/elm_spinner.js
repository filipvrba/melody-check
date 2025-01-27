export default class ElmSpinner extends HTMLElement {
  constructor() {
    super();
    this._classAttr = this.getAttribute("class");
    this.initElm()
  };

  initElm() {
    let template = `${`
<div class='${this._classAttr}'>
  <div class='spinner-border text-secondary' role='status'>
    <span class='visually-hidden'>Loading...</span>
  </div>
</div>
    `}`;
    return this.innerHTML = template
  }
}