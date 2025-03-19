import 'CInputs', '../components/elm-event-candidate-modal/inputs'
import 'CContents', '../components/elm-event-candidate-modal/contents'
import 'CDatabase', '../components/elm-event-candidate-modal/database'

import 'CSpinner', '../packages/template-rjs-0.1.1/components/spinner'

export default class ElmEventCandidateModal < HTMLElement
  ENVS = {
    show: 'ecanm-show-0'
  }

  def candidate_id
    @candidate.id
  end

  def initialize
    super

    @l_popstate = lambda { popstate() }
    @h_show     = lambda {|e| show(e.detail.value) }
    
    @candidate = nil
    @callback  = nil

    init_elm()

    modal_candidate     = self.query_selector('#eventCandidateModal')
    @bs_modal_candidate = bootstrap.Modal.new(modal_candidate)

    @c_spinner  = CSpinner.new(self)
    @c_inputs   = CInputs.new(self)
    @c_contents = CContents.new(self)
    @c_database = CDatabase.new(self)

    @c_spinner.set_display(false)
  end

  def connected_callback()
    window.add_event_listener('popstate', @l_popstate)
    Events.connect('#app', ENVS.show, @h_show)
    @c_inputs.connected_callback()
  end

  def disconnected_callback()
    window.remove_event_listener('popstate', @l_popstate)
    Events.disconnect('#app', ENVS.show, @h_show)
    @c_inputs.disconnected_callback()
  end

  def popstate()
    @bs_modal_candidate.hide()
  end

  def show(candidate)
    if @bs_modal_candidate._is_shown
      return
    end

    @candidate = candidate.params
    @callback  = candidate.callback
  
    @c_contents.set_inputs(@candidate)

    @bs_modal_candidate.show()
  end

  def btn_save_click(params)
    @c_spinner.set_display(true)
    @c_database.update_candidate(params) do |message|
      @c_spinner.set_display(false)

      if message
        @callback.call() if @callback
        @bs_modal_candidate.hide()
      end
    end
  end

  def init_elm()
    template = """
<div class='modal fade' id='eventCandidateModal' tabindex='-1' aria-labelledby='eventCandidateModalLabel' aria-hidden='true'>
  <div class='modal-dialog'>
    <div class='modal-content'>
      <elm-spinner class='spinner-overlay'></elm-spinner>

      <div class='modal-header'>
        <h5 class='modal-title' id='eventCandidateModalLabel'>Upravit uživatele</h5>
        <button type='button' class='btn-close' data-bs-dismiss='modal' aria-label='Zavřít'></button>
      </div>
      <div class='modal-body'>
        <div class='mb-3'>
          <label for='eventCandidateModaFullName' class='form-label'>Plné jméno</label>
          <input type='text' class='form-control' id='eventCandidateModaFullName' placeholder='Zadejte plné jméno' data-button-id='eventCandidateModaBtnSave'>
          <div id='eventCandidateModaFullNameFeedback' class='invalid-feedback'>
            Zadané plné jméno je nesprávné.
          </div>
        </div>
        <div class='mb-3'>
          <label for='eventCandidateModaEmail' class='form-label'>E-mail</label>
          <input type='email' class='form-control' id='eventCandidateModaEmail' placeholder='Zadejte e-mail' data-button-id='eventCandidateModaBtnSave'>
          <div id='eventCandidateModaEmailFeedback' class='invalid-feedback'>
            Zadaný email je nesprávný.
          </div>
        </div>
      </div>
      <div class='modal-footer'>
        <button type='button' class='btn btn-secondary' data-bs-dismiss='modal'>Zavřít</button>
        <button id='eventCandidateModaBtnSave' type='button' class='btn btn-success' onclick='eventCandidateModalBtnSaveClick()'>Uložit</button>
      </div>
    </div>
  </div>
</div>
    """

    self.innerHTML = template
  end
end