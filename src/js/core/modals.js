import CInputsConfirmModal from "../components/elm-confirm-modal/inputs";

export default class Modals {
  static confirm(options) {
    let defaultOptions = {
      title: null,
      message: null,
      fnTrue: null,
      fnFalse: null
    };

    options = Object.assign(defaultOptions, options);
    return Events.emit("#app", CInputsConfirmModal.ENVS.show, options)
  }
};

window.Modals = Modals