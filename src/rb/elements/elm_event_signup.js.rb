import 'CInputs',   '../components/elm-event-signup/inputs'
import 'CContents', '../components/elm-event-signup/contents'
import 'CDatabase', '../components/elm-event-signup/database'

import 'CDatabaseEventSettings', '../components/elm-event-settings/database'
import 'CSpinner', '../packages/template-rjs-0.1.1/components/spinner'

export default class ElmEventSignup < HTMLElement
  attr_reader :event_id, :c_spinner

  def initialize
    super

    @event_id    = URLParams.get_index('event_id') || nil
    @have_params = @event_id && @event_id != 0

    @h_btn_click_0 = lambda {|e| btn_click_0(e.detail.value) }

    @c_database                = CDatabase.new(self)
    @c_database_event_settings = CDatabaseEventSettings.new(self)
    @c_contents                = CContents.new(self)

    init_elm()
  end

  def initialize_event(event)
    self.innerHTML = @c_contents.get_registration_form()

    @c_spinner = CSpinner.new(self)
    @c_spinner.set_display(false)

    @c_inputs = CInputs.new(self)
    @c_inputs.connected_callback()
    @c_inputs.set_event_name(event.name)
  end

  def connected_callback()
    Events.connect('#app', CInputs::ENVS.btn_click_0, @h_btn_click_0)
  end

  def disconnected_callback()
    @c_inputs.disconnected_callback() if @c_inputs

    Events.disconnect('#app', CInputs::ENVS.btn_click_0, @h_btn_click_0)
  end

  def btn_click_0(options)
    @c_database_event_settings.add_candidate(
        options.full_name, options.email) do |fn_token|
      
      case fn_token
      when 'tADDED'
        @c_inputs.disconnected_callback()

        self.innerHTML = @c_contents.get_registration_successful(
          @c_inputs.get_event_name())
      when 'tNOADDED'
        @c_inputs.change_valid_email(false)
      end
    end
  end

  def init_elm()
    if @have_params
      @c_database.get_event() do |event|
        if event
          initialize_event(event)
        else
          self.innerHTML = @c_contents.get_noevent()
        end
      end
    else
      self.innerHTML = @c_contents.get_noparams()
    end
  end
end