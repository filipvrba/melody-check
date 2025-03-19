import 'CEventInputs', '../components/elm-event-settings/event_inputs'
import 'CListInputs',  '../components/elm-event-settings/list_inputs'
import 'CDatabase',    '../components/elm-event-settings/database'
import 'CContents',    '../components/elm-event-settings/contents'

import 'CSpinner', '../packages/template-rjs-0.1.1/components/spinner'
import 'ElmEventSettingsModal', './elm_event_settings_modal'

export default class ElmEventSettings < HTMLElement
  ENVS = {
    event_callback: 'ees-event-callback'
  }

  attr_reader :user_id, :event_id, :c_spinner, :c_database, :c_contents, :c_event_inputs

  def initialize
    super
    
    @h_event_inputs_btn_click_0 = lambda {|e| event_inputs_btn_click_0(
      e.detail.value.title, e.detail.value.date)}
    @h_list_inputs_btn_click_1  = lambda {|e| list_inputs_btn_click_1(
      e.detail.value.full_name, e.detail.value.email)}

    @user_id  = self.get_attribute('user-id')
    @event_id = self.get_attribute('event-id')

    init_elm()

    @c_spinner      = CSpinner.new(self)
    @c_database     = CDatabase.new(self)
    @c_event_inputs = CEventInputs.new(self)
    @c_list_inputs  = CListInputs.new(self)
    @c_contents     = CContents.new(self)

    @c_event_inputs.update_event_details(@event_id)
  end

  def connected_callback()
    @c_event_inputs.connected_callback()
    @c_list_inputs.connected_callback()

    Events.connect('#app', CEventInputs::ENVS.btn_click_0, @h_event_inputs_btn_click_0)
    Events.connect('#app', CListInputs::ENVS.btn_click_1,  @h_list_inputs_btn_click_1)
  end

  def disconnected_callback()
    @c_event_inputs.disconnected_callback()
    @c_list_inputs.disconnected_callback()

    Events.disconnect('#app', CEventInputs::ENVS.btn_click_0, @h_event_inputs_btn_click_0)
    Events.disconnect('#app', CListInputs::ENVS.btn_click_1,  @h_list_inputs_btn_click_1)
  end

  def event_callback(event_id)
    @event_id = event_id

    Events.emit('#app', ENVS.event_callback, @event_id)

    @c_contents.change_visibility(true)
    @c_contents.update_list_container()
  end

  def event_inputs_btn_click_0(title, date)
    @c_contents.change_visibility(false)
    @c_database.set_event_details(title, date) do
      @c_event_inputs.update_event_details()
    end
  end

  def list_inputs_btn_click_1(full_name, email)
    @c_database.add_candidate(full_name, email) do |fn_token|
      case fn_token
      when 'tADDED'
        @c_contents.update_list_container()
        @c_list_inputs.clean()
      when 'tNOADDED'
        @c_list_inputs.change_valid_email(false)
      end
    end
  end

  def send_db_candidates(data)
    if data
      data_added = []

      data.each do |candidate|
        @c_database.add_candidate(candidate.full_name, candidate.email) do |fn_token|
          case fn_token
          when 'tADDED'
            data_added.push({is_added: true, data: candidate})
          when 'tNOADDED'
            data_added.push({is_added: false, data: candidate})
          end

          if data_added.length == data.length
            @c_contents.update_list_container()

            noadded_candidates = data_added.select {|h| h.is_added == false }
            Events.emit('#app', ElmEventSettingsModal::ENVS.view, noadded_candidates)
          end
        end
      end
    end
  end

  def init_elm()
    template = """
<div class='container col-lg-8 my-5'>
  <!-- Formulář pro nastavení události -->
  <div class='card mb-4'>
    <elm-spinner id='spinnerOne' class='spinner-overlay'></elm-spinner>

    <div class='card-body'>
      <h5 class='card-title'>Detaily Události</h5>
      <div class='mb-3'>
        <label for='eventSettingsEventTitle' class='form-label'>Název Události</label>
        <input type='text' class='form-control' id='eventSettingsEventTitle' placeholder='Zadejte název události'>
        <div id='eventSettingsEventTitleFeedback' class='invalid-feedback'>
          Zadaný název události je nesprávný.
        </div>
      </div>
      <div class='mb-3'>
        <label for='eventSettingsEventDate' class='form-label'>Datum Koncertu</label>
        <input type='date' class='form-control' id='eventSettingsEventDate'>
        <div id='eventSettingsEventDateFeedback' class='invalid-feedback'>
          Zadaný datum události je nesprávný.
        </div>
      </div>
      <div class='row justify-content-center'>
        <div class='col-sm-12 col-md-3 d-flex align-items-end'>
          <button type='button' class='btn btn-success w-100' onclick='eventSettingsEventSaveDetailsBtnClick()'>
            <i class='bi bi-save'></i> Uložit Detaily
          </button>
        </div>
      </div>
    </div>
  </div>
    
  <!-- Seznam účastníků -->
  <div id='eventSettingsListCandidates' class='card'>
  <input type='file' id='eventSettingsListCandidatesFileInput' accept='.csv' style='display: none;' />
    <elm-spinner id='spinnerTwo' class='spinner-overlay'></elm-spinner>

    <div class='card-body'>
      <div class='d-flex justify-content-between align-items-center'>
        <h5 class='card-title'>Účastníci</h5>
      
        <div class='d-flex flex-sm-row flex-column gap-2'>
          <button class='btn btn-outline-success btn-sm' onclick='eventSettingUsersBtnSendEmailClick()'>
            <i class='bi bi-envelope'></i> Poslat E-mail
          </button>

          <div class='nav-item dropdown'>
            <button class='btn btn-outline-primary btn-sm dropdown-toggle' href='#' id='eventSettingUsersDropdown' role='button' data-bs-toggle='dropdown' aria-expanded='false'>
              <i class='bi bi-box-arrow-up-right'></i> Možnosti
            </button>
            <ul class='dropdown-menu text-small shadow' aria-labelledby='eventSettingUsersDropdown' style='position: absolute; inset: 0px 0px auto auto; margin: 0px; transform: translate(0px, 34px);' data-popper-placement='bottom-end'>
              <li><button class='dropdown-item' onclick='eventSettingsListBtnShareClick()'>
                Sdílet
              </button></li>
              <li><button class='dropdown-item'onclick='eventSettingsListBtnFormClick()'>
                Formulář
              </button></li>
              <li><hr class='dropdown-divider'></li>
              <li><button class='dropdown-item'onclick='eventSettingsListBtnImportClick()'>
                Import CSV
              </button></li>
              <li><button class='dropdown-item'onclick='eventSettingsListBtnExportClick()'>
                Export CSV
              </button></li>
            </ul>
          </div>
        </div>
      </div>
      

      <div class='row g-3'>
        <div class='col-md-5'>
          <label for='eventSettingsListInputFullname' class='form-label'>Celé Jméno</label>
          <input type='text' class='form-control' id='eventSettingsListInputFullname' placeholder='Zadejte celé jméno'>
          <div id='eventSettingsListInputFullnameFeedback' class='invalid-feedback'>
            Zadané celé jméno je nesprávné.
          </div>
        </div>
        <div class='col-md-5'>
          <label for='eventSettingsListInputEmail' class='form-label'>Email</label>
          <input type='email' class='form-control' id='eventSettingsListInputEmail' placeholder='Zadejte email'>
          <div id='eventSettingsListInputEmailFeedback' class='invalid-feedback'>
            Zadaný email je nesprávný.
          </div>
        </div>
        <div class='col-md-2 mt-md-5'>
          <button type='button' class='btn btn-primary w-100' onclick='eventSettingsListAddBtnClick()'>
            <i class='bi bi-plus-lg'></i> Přidat
          </button>
        </div>
      </div>

      <ul id='eventSettingsListContainer' class='list-group mt-4'>
        <!-- Místo pro seznam účastníků -->
      </ul>
    </div>
  </div>
</div>

<elm-event-settings-modal></elm-event-settings-modal>
<elm-event-candidate-modal></elm-event-candidate-modal>
    """

    self.innerHTML = template
  end
end