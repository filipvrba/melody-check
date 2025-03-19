import 'CInputsConfirmModal', '../components/elm-confirm-modal/inputs'
import 'ElmEventCandidateModal', '../elements/elm_event_candidate_modal'

export default class Modals
  def self.confirm(options)
    default_options = {
      title: nil,
      message: nil,
      fn_true: nil,
      fn_false: nil
    }
    options = Object.assign(default_options, options)

    Events.emit('#app', CInputsConfirmModal::ENVS.show, options)
  end

  def self.event_candidate(options, &callback)
    Events.emit('#app', ElmEventCandidateModal::ENVS.show, {
      params: options,
      callback: callback,
    })
  end
end
window.Modals = Modals