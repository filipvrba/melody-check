import AProtected from "./abstracts/protected";

export default class ElmSettings extends AProtected {
  constructor() {
    super();
    this._categories = null;
    window.profileSettingsCategoryBtnClick = this.categoryBtnClick.bind(this)
  };

  protectedCallback() {
    if (!this._categories) this._categories = Settings.getCategories(this._userId);
    return this.initElm()
  };

  connectedCallback() {
    return null
  };

  disconnectedCallback() {
    return null
  };

  categoryBtnClick(index) {
    URLParams.set("sc-index", index);
    return Events.emit("#app", ElmSettings.ENVS.categoryClick)
  };

  initElm() {
    let template = `${`
    <elm-header user-id='${this._userId}'></elm-header>

    ${this.subinitElm()}
    `}`;
    return this.innerHTML = template
  };

  subinitElm() {
    let aLis = [];
    let aContents = [];

    let lInitTemplate = () => (
      `${`
      <ul class='nav nav-pills justify-content-center mt-3 mb-3' id='pills-tab' role='tablist'>
        ${aLis.join("")}
      </ul>
      <div class='tab-content' id='pills-tabContent'>
        ${aContents.join("")}
      </div>
      `}`
    );

    this._categories.forEach((category, i) => {
      let isActivated = i === this.categoryIndex;
      let liTemplate = `${`
      <li class='nav-item' role='presentation'>
        <button onclick='profileSettingsCategoryBtnClick(${i})' class='nav-link ${isActivated ? "active" : null}' id='pills-${category.index}-tab' data-bs-toggle='pill' data-bs-target='#pills-${category.index}' type='button' role='tab' aria-controls='pills-${category.index}' aria-selected='true'>${category.name}</button>
      </li>
      `}`;
      let contentTemplate = `${`\n      <div class='tab-pane fade ${isActivated ? "show active" : null}' id='pills-${category.index}' role='tabpanel' aria-labelledby='pills-${category.index}-tab' tabindex='0'>${category.content}</div>\n      `}`;
      aLis.push(liTemplate);
      return aContents.push(contentTemplate)
    });

    return lInitTemplate()
  };

  get categoryIndex() {
    let index = URLParams.getIndex("sc-index") || 0;

    let resultingIndex = Math.max(
      Math.min(index, this._categories.length - 1),
      0
    );

    return resultingIndex
  }
};

ElmSettings.ENVS = {categoryClick: "ess-cbc-0"}