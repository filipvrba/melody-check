import 'CInputs', '../components/elm-email-settings/inputs'
import 'CDatabase', '../components/elm-email-settings/database'
import 'CSpinner', '../packages/template-rjs-0.1.1/components/spinner'

import 'ElmEventSettings', './elm_event_settings'

export default class ElmEmailSettings < HTMLElement
  attr_reader :event_id, :c_spinner, :c_inputs

  def initialize
    super

    @h_btn_click_0    = lambda do |e|
      btn_click_0(e.detail.value)
    end
    @h_event_callback = lambda {|e| event_callback(e.detail.value) if !@no_fetch }

    @event_id = self.get_attribute('event-id')
    @no_fetch = self.get_attribute('no-fetch') == ''
    
    init_elm()

    @c_spinner  = CSpinner.new(self)
    @c_inputs   = CInputs.new(self)
    @c_database = CDatabase.new(self)

    if @no_fetch
      event_callback(@event_id)
    end
  end

  def connected_callback()
    Events.connect('#app', CInputs::ENVS.btn_click_0, @h_btn_click_0)
    Events.connect('#app', ElmEventSettings::ENVS.event_callback, @h_event_callback)
  end

  def disconnected_callback()
    Events.disconnect('#app', CInputs::ENVS.btn_click_0, @h_btn_click_0)
    Events.disconnect('#app', ElmEventSettings::ENVS.event_callback, @h_event_callback)
  end

  def event_callback(event_id)
    @event_id = event_id

    if @event_id
      @c_inputs.set_disable_btn(false)

      @c_database.get_email_templates() do |templates|
        @c_inputs.set_value_inputs(templates) if templates
      end
    end
  end

  def btn_click_0(templates)
    @c_database.set_email_templates(templates)
  end

  def init_elm()
    template = """
<div class='container col-lg-8 my-5'>
  <!-- Šablona pro registrované účastníky -->
  <div class='card mb-4'>
    <elm-spinner id='spinnerOne' class='spinner-overlay'></elm-spinner>

    <div class='card-body'>
      <h5 class='card-title'><i class='bi bi-person-check-fill'></i> Šablona pro Registrované Účastníky</h5>
      <p class='text-muted'>Tento e-mail se odesílá účastníkům, kteří byli přidáni do události.</p>
      
      <!-- Předmět e-mailu -->
      <div class='mb-3'>
        <label for='mailSettingsRegisteredSubject' class='form-label'>Předmět e-mailu</label>
        <input type='text' class='form-control' id='mailSettingsRegisteredSubject' placeholder='Zadejte předmět e-mailu'>
      </div>

      <!-- Obsah e-mailu -->
      <textarea class='form-control' id='mailSettingsRegisteredTemplate' rows='10' placeholder='Vložte HTML šablonu pro registrované účastníky'></textarea>
      <div class='form-text'>Použijte HTML kód pro vytvoření e-mailu. Můžete využít značky jako <code>FULLNAME</code>, <code>EVENTNAME</code>, <code>EVENTDATE</code>, <code>CONFIRMBTN</code> a <code>REJECTIONBTN</code>.</div>
    </div>
  </div>

  <!-- Šablona pro nepotvrzené účastníky -->
  <div class='card mb-4'>
    <elm-spinner id='spinnerTwo' class='spinner-overlay'></elm-spinner>

    <div class='card-body'>
      <h5 class='card-title'><i class='bi bi-person-x-fill'></i> Šablona pro Nepotvrzené Účastníky</h5>
      <p class='text-muted'>Tento e-mail se odesílá účastníkům, kteří ještě nepotvrdili účast, týden před koncertem.</p>
      
      <!-- Předmět e-mailu -->
      <div class='mb-3'>
        <label for='mailSettingsUnconfirmedSubject' class='form-label'>Předmět e-mailu</label>
        <input type='text' class='form-control' id='mailSettingsUnconfirmedSubject' placeholder='Zadejte předmět e-mailu'>
      </div>

      <!-- Obsah e-mailu -->
      <textarea class='form-control' id='mailSettingsUnconfirmedTemplate' rows='10' placeholder='Vložte HTML šablonu pro nepotvrzené účastníky'></textarea>
      <div class='form-text'>Použijte HTML kód pro vytvoření e-mailu. Můžete využít značky jako <code>FULLNAME</code>, <code>EVENTNAME</code>, <code>EVENTDATE</code>, <code>CONFIRMBTN</code> a <code>REJECTIONBTN</code>.</div>
    </div>
  </div>

  <!-- Tlačítka pro uložení -->
  <div class='row justify-content-center mt-4'>
    <div class='col-sm-12 col-md-3 d-flex align-item-end'>
      <button id='emailSettingsSaveBtn' type='button' class='btn btn-success w-100' onclick='emailSettingsSaveBtnClick()'>
        <i class='bi bi-save'></i> Uložit Změny
      </button>
    </div>
  </div>
</div>
    """

    self.innerHTML = template
  end
end