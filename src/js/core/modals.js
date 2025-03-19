import CInputsConfirmModal from "../components/elm-confirm-modal/inputs";
import ElmEventCandidateModal from "../elements/elm_event_candidate_modal";

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
  };

  static eventCandidate(options, callback) {
    return Events.emit(
      "#app",
      ElmEventCandidateModal.ENVS.show,
      {params: options, callback}
    )
  }
};

window.Modals = Modals