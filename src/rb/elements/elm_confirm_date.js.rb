import 'CInputs',   '../components/elm-confirm-date/inputs'
import 'CDatabase', '../components/elm-confirm-date/database'
import 'CContents', '../components/elm-confirm-date/contents'

import 'CSpinner', '../packages/template-rjs-0.1.1/components/spinner'

export default class ElmConfirmDate < HTMLElement
  attr_reader :candidate_id, :event_id, :c_database, :c_spinner

  def initialize
    super

    @candidate_id = URLParams.get_index('candidate_id')
    @event_id     = URLParams.get_index('event_id')
    
    init_elm()

    @c_inputs   = CInputs.new(self)
    @c_database = CDatabase.new(self)
    @c_contents = CContents.new(self)
    @c_spinner  = CSpinner.new(self)
  end

  def connected_callback()
    @c_inputs.connected_callback()

    @c_contents.update_list_container()
  end

  def disconnected_callback()
    @c_inputs.disconnected_callback()
  end

  def input_add_btn_click(options)
    @c_database.add_date_with_time(options) do |message|
      if message
        @c_inputs.clear_inputs()
        @c_contents.update_list_container()
      end
    end
  end

  def input_remove_btn_click(arrival_id)
    @c_database.remove_row(arrival_id) do |message|
      @c_contents.update_list_container() if message
    end
  end

  def set_visible_spinner(is_visible)
    @c_spinner.set_display_with_id(is_visible, '#spinnerOne')
  end

  def init_elm()
    template = """
<div class='card'>
  <elm-spinner id='spinnerOne' class='spinner-overlay'></elm-spinner>

  <div class='card-body'>
    <div class='d-flex justify-content-between align-items-center'>
      <h5 class='card-title'>Čas příchodu</h5>
    </div>

    <div class='row g-3'>
      <div class='col-md-5'>
        <label for='elmConfirmDateInputDate' class='form-label'>Datum</label>
        <input type='date' class='form-control' id='elmConfirmDateInputDate' data-button-id='elmConfirmDateInputAddBtn'>
        <div id='elmConfirmDateInputDateFeedback' class='invalid-feedback'>
          Zadaný datum je nesprávný.
        </div>
      </div>
      <div class='col-md-5'>
        <label for='elmConfirmDateInputTime' class='form-label'>Čas</label>
        <input type='time' class='form-control' id='elmConfirmDateInputTime' data-button-id='elmConfirmDateInputAddBtn'>
        <div id='elmConfirmDateInputTimeFeedback' class='invalid-feedback'>
          Zadaný čas je nesprávný.
        </div>
      </div>
      <div class='col-md-2 mt-md-5'>
        <button id='elmConfirmDateInputAddBtn' type='button' class='btn btn-primary w-100' onclick='elmConfirmDateInputAddBtnClick()'>
          <i class='bi bi-plus-lg'></i> Přidat
        </button>
      </div>
    </div>

    <ul id='eventSettingsListContainer' class='list-group mt-4'>
      <!-- Místo pro seznam účastníků -->
    </ul>
  </div>
</div>
    """

    self.innerHTML = template
  end
end