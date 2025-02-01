import CInputsEventsSettings from "../components/elm-events-settings/inputs";
import ElmHeader from "../packages/bef-client-rjs-0.1.1/elements/elm_header";
import ElmSettings from "../packages/bef-client-rjs-0.1.1/elements/elm_settings";

export default class ElmEventsViewer extends HTMLElement {
  constructor() {
    super();

    this._hEventsSettingsBtnClick1 = e => (
      this.eventsSettingsBtnClick1(e.detail.value)
    );

    this._hCategoryClick = () => {
      return this.categoryClick()
    };

    this._userId = this.getAttribute("user-id");
    this.initElm()
  };

  connectedCallback() {
    Events.connect(
      "#app",
      CInputsEventsSettings.ENVS.btnClick1,
      this._hEventsSettingsBtnClick1
    );

    return Events.connect(
      "#app",
      ElmSettings.ENVS.categoryClick,
      this._hCategoryClick
    )
  };

  disconnectedCallback() {
    Events.disconnect(
      "#app",
      CInputsEventsSettings.ENVS.btnClick1,
      this._hEventsSettingsBtnClick1
    );

    return Events.disconnect(
      "#app",
      ElmSettings.ENVS.categoryClick,
      this._hCategoryClick
    )
  };

  eventsSettingsBtnClick1(eventId) {
    this._isSwitched = true;
    return this.innerHTML = `${`\n    <elm-event-settings user-id='${this._userId}' event-id='${eventId}'></elm-event-settings>\n    `}`
  };

  categoryClick() {
    if (URLParams.getIndex("sc-index") === 0) {
      return this.initElm()
    } else {
      this._isSwitched = false;
      return this._isSwitched
    }
  };

  initElm() {
    this._isSwitched = false;
    let template = `${`\n    <elm-events-settings user-id='${this._userId}'></elm-events-settings>\n    `}`;
    return this.innerHTML = template
  }
};

ElmEventsViewer.ENVS = {goBack: "eesv-gb-0"}