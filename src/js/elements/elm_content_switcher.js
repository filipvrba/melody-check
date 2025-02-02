import ElmSettings from "../packages/bef-client-rjs-0.1.1/elements/elm_settings";

export default class ElmContentSwitcher extends HTMLElement {
  get categoryIndex() {
    return 0
  };

  constructor() {
    super();

    this._hCategoryClick = () => {
      return this.categoryClick()
    };

    this._userId = this.getAttribute("user-id");
    this.initElm()
  };

  connectedCallback() {
    return Events.connect(
      "#app",
      ElmSettings.ENVS.categoryClick,
      this._hCategoryClick
    )
  };

  disconnectedCallback() {
    return Events.disconnect(
      "#app",
      ElmSettings.ENVS.categoryClick,
      this._hCategoryClick
    )
  };

  buttonClick(eventId) {
    this._isSwitched = true;
    return this._isSwitched
  };

  categoryClick() {
    if (URLParams.getIndex("sc-index") === this.categoryIndex) {
      return this.initElm()
    } else {
      this._isSwitched = false;
      return this._isSwitched
    }
  };

  initElm() {
    this._isSwitched = false;
    return this._isSwitched
  }
}