import ElmSettings from "../packages/bef-client-rjs-0.1.1/elements/elm_settings";
import CDatabase from "../components/elm-user-type-settings/database";

export default class ElmUserTypeSettings extends ElmSettings {
  get userId() {
    return this._userId
  };

  constructor() {
    super();
    this._cDatabase = new CDatabase(this)
  };

  protectedCallback() {
    if (!this._categories) {
      return this._cDatabase.getUserType((userType) => {
        this._categories = Settings.getUserTypeCategories(
          this.userId,
          userType.id
        );

        return super.protectedCallback()
      })
    }
  };

  connectedCallback() {
    return null
  };

  disconnectedCallback() {
    return null
  }
}