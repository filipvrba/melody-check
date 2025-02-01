import 'CInputs',   '../components/elm-events-settings/inputs'
import 'CDatabase', '../components/elm-events-settings/database'
import 'CSpinner',  '../packages/template-rjs-0.1.1/components/spinner'
import 'CContents', '../components/elm-events-settings/contents'

export default class ElmEventsSettings < HTMLElement
  attr_reader :user_id, :c_inputs, :c_spinner, :c_database, :c_contents

  def initialize
    super

    @h_add_btn_click = lambda {|e| add_btn_click(e.detail.value) }

    @user_id = self.get_attribute('user-id')
    
    init_elm()

    @c_inputs   = CInputs.new(self)
    @c_spinner  = CSpinner.new(self)
    @c_database = CDatabase.new(self)
    @c_contents  = CContents.new(self)

    @c_spinner.set_display_with_id(false, '#spinnerOne')

    @c_contents.update_list_container()
  end

  def connected_callback()
    @c_inputs.connected_callback()

    Events.connect('#app', CInputs::ENVS.btn_click_0, @h_add_btn_click)
  end

  def disconnected_callback()
    @c_inputs.disconnected_callback()

    Events.disconnect('#app', CInputs::ENVS.btn_click_0, @h_add_btn_click)
  end

  def add_btn_click(event)
    @c_database.set_event_details(event.name, event.date) do |message|
      if message
        @c_inputs.clear_input_values()
        @c_contents.update_list_container()
      end
    end
  end

  def init_elm()
    template = """
<div class='container my-5'>
  <div id='eventsSettingsListEvents' class='card'>
    <elm-spinner id='spinnerOne' class='spinner-overlay'></elm-spinner>

    <div class='card-body'>
      <div class='d-flex justify-content-between align-items-center'>
        <h5 class='card-title'>Události</h5>
      </div>
      

      <div class='row g-3'>
        <div class='col-md-5'>
          <label for='eventsSettingsListInputEventName' class='form-label'>Název události</label>
          <input type='text' class='form-control' id='eventsSettingsListInputEventName' placeholder='Zadejte název události'>
          <div id='eventsSettingsListInputEventNameFeedback' class='invalid-feedback'>
            Zadaný název události je nesprávný.
          </div>
        </div>
        <div class='col-md-5'>
          <label for='eventsSettingsListInputDate' class='form-label'>Datum</label>
          <input type='date' class='form-control' id='eventsSettingsListInputDate' placeholder='Zadejte datum'>
          <div id='eventsSettingsListInputDateFeedback' class='invalid-feedback'>
            Zadaný datum je nesprávný.
          </div>
        </div>
        <div class='col-md-2 mt-md-5'>
          <button type='button' class='btn btn-primary w-100' onclick='eventsSettingsListAddBtnClick()'>
            <i class='bi bi-plus-lg'></i> Přidat
          </button>
        </div>
      </div>

      <ul id='eventsSettingsListContainer' class='list-group mt-4'>
      </ul>
    </div>
  </div>
</div>
    """

    self.innerHTML = template
  end
end