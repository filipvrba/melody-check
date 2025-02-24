import 'CInputs', '../components/elm-confirm-modal/inputs'

export default class ElmConfirmModal < HTMLElement
  attr_reader   :default_options, :bs_modal_confirm
  attr_accessor :options

  def initialize
    super

    @l_popstate = lambda { popstate() }

    @default_options = {
      title: "<i class='bi bi-question-circle'></i> Potvrzení",
      message: '<p>Opravdu chcete provést tuto akci?</p>',
      fn_true: nil,
      fn_false: nil
    }
    @options = structured_clone(@default_options)
    
    init_elm()

    modal_confirm     = self.query_selector('#confirmModal')
    @bs_modal_confirm = bootstrap.Modal.new(modal_confirm)

    @c_inputs = CInputs.new(self)
  end

  def connected_callback()
    @c_inputs.connected_callback()

    window.add_event_listener('popstate', @l_popstate)
  end

  def disconnected_callback()
    @c_inputs.disconnected_callback()

    window.remove_event_listener('popstate', @l_popstate)
  end

  def popstate()
    @bs_modal_confirm.hide()
  end

  def init_elm()
    template = """
<div class='modal fade' id='confirmModal' tabindex='-1' aria-labelledby='confirmModalLabel' aria-hidden='true'>
  <div class='modal-dialog'>
    <div class='modal-content'>
      <div class='modal-header'>
        <h5 class='modal-title' id='confirmModalLabel'></h5>
        <button type='button' class='btn-close' data-bs-dismiss='modal' aria-label='Zavřít'></button>
      </div>
      <div id='confirmModalMessage' class='modal-body'></div>
      <div class='modal-footer'>
        <button type='button' class='btn btn-secondary' data-bs-dismiss='modal' onclick='confirmModalNoBtnClick()'>Ne</button>
        <button type='button' class='btn btn-danger' data-bs-dismiss='modal' onclick='confirmModalYesBtnClick()'>Ano</button>
      </div>
    </div>
  </div>
</div>
    """

    self.innerHTML = template
  end
end