export default class ElmMenu extends HTMLElement {
  constructor() {
    super();
    this._priority = this.getAttribute("priority");
    this.initElm()
  };

  connectedCallback() {
    return null
  };

  disconnectedCallback() {
    return null
  };

  initElm() {
    let lLi = () => {
      let aLi = [];

      for (let page of ROUTES_JSON.pages) {
        if (page.priority !== parseInt(this._priority) && !(this._priority === null && page.priority > 0)) {
          continue
        };

        let hash = page.endpoint.replaceAll("/", "-");
        aLi.push(`${`
        <li class='list-group-item'>
          <a class='nav-link' href='#${hash}'>${page.title}</a>
        </li>
        `}`)
      };

      return aLi.join("")
    };

    let template = `${`
<ul class='list-group list-group-flush'>
  ${lLi()}
</ul>
    `}`;
    return this.innerHTML = template
  }
}