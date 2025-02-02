import ElmContentSwitcher from "./elm_content_switcher";
import CInputsEmailsSettings from "../components/elm-emails-settings/inputs";

export default class ElmEmailsViewer extends ElmContentSwitcher {
  get categoryIndex() {
    return 1
  };

  constructor() {
    super();
    this._hEmailsSettingsBtnClick0 = e => this.buttonClick(e.detail.value)
  };

  connectedCallback() {
    super.connectedCallback();

    return Events.connect(
      "#app",
      CInputsEmailsSettings.ENVS.btnClick0,
      this._hEmailsSettingsBtnClick0
    )
  };

  disconnectedCallback() {
    super.disconnectedCallback();

    return Events.disconnect(
      "#app",
      CInputsEmailsSettings.ENVS.btnClick0,
      this._hEmailsSettingsBtnClick0
    )
  };

  buttonClick(eventId) {
    super.buttonClick(eventId);
    return this.innerHTML = `${`\n    <elm-email-settings user-id='${this._userId}' event-id='${eventId}' no-fetch></elm-email-settings>\n    `}`
  };

  initElm() {
    super.initElm();
    let template = `${`\n    <elm-emails-settings user-id='${this._userId}'></elm-emails-settings>\n    `}`;
    return this.innerHTML = template
  }
}