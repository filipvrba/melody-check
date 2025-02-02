import CInputsEventsSettings from "../components/elm-events-settings/inputs";
import ElmContentSwitcher from "./elm_content_switcher";

export default class ElmEventsViewer extends ElmContentSwitcher {
  constructor() {
    super();
    this._hEventsSettingsBtnClick1 = e => this.buttonClick(e.detail.value)
  };

  connectedCallback() {
    super.connectedCallback();

    return Events.connect(
      "#app",
      CInputsEventsSettings.ENVS.btnClick1,
      this._hEventsSettingsBtnClick1
    )
  };

  disconnectedCallback() {
    super.disconnectedCallback();

    return Events.disconnect(
      "#app",
      CInputsEventsSettings.ENVS.btnClick1,
      this._hEventsSettingsBtnClick1
    )
  };

  buttonClick(eventId) {
    super.buttonClick(eventId);
    return this.innerHTML = `${`\n    <elm-event-settings user-id='${this._userId}' event-id='${eventId}'></elm-event-settings>\n    `}`
  };

  initElm() {
    super.initElm();
    let template = `${`\n    <elm-events-settings user-id='${this._userId}'></elm-events-settings>\n    `}`;
    return this.innerHTML = template
  }
}