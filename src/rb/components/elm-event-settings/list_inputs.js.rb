export default class CListInputs
  ENVS = {
    btn_click_1: 'ees-cli-btn-click-1'
  }

  def initialize(parent)
    @parent = parent

    @h_input_full_name_keypress = lambda { input_full_name_keypress() }
    @h_input_email_keypress     = lambda { input_email_keypress() }

    @input_full_name = @parent.query_selector('#eventSettingsListInputFullname')
    @input_email     = @parent.query_selector('#eventSettingsListInputEmail')

    @parent.c_spinner.set_display_with_id(false, '#spinnerTwo')

    window.event_settings_list_add_btn_click    = add_btn_click
    window.event_settings_list_remove_btn_click = remove_btn_click
    window.event_settings_list_btn_form_click   = btn_form_click
    window.event_settings_list_btn_share_click  = btn_share_click
  end

  def connected_callback()
    @input_full_name.add_event_listener('keypress', @h_input_full_name_keypress)
    @input_email.add_event_listener('keypress', @h_input_email_keypress)
  end

  def disconnected_callback()
    @input_full_name.remove_event_listener('keypress', @h_input_full_name_keypress)
    @input_email.remove_event_listener('keypress', @h_input_email_keypress)
  end

  def change_valid_email(is_valid)
    Bootstrap.change_valid_element(@input_email, is_valid)
  end

  def add_btn_click()
    is_full_name = have_full_name()
    is_email     = have_email()

    Bootstrap.change_valid_element(@input_full_name, is_full_name)
    Bootstrap.change_valid_element(@input_email, is_email)

    unless is_full_name && is_email
      return
    end

    Events.emit('#app', ENVS.btn_click_1, {
      full_name: @input_full_name.value,
      email:     @input_email.value
    })
  end

  def remove_btn_click(candidate_id)
    @parent.c_database.remove_candidate(candidate_id) do |message|
      if message
        @parent.c_contents.update_list_container()
      end
    end
  end

  def btn_form_click()
    window.open("/?event_id=#{@parent.event_id}#event-signup", '_blank')
  end

  def btn_share_click()
    window.open("/?event_id=#{@parent.event_id}#event-candidates", '_blank')
  end

  def input_full_name_keypress()
    unless event.key == 'Enter'
      return
    end

    @input_email.focus()
  end

  def input_email_keypress()
    unless event.key == 'Enter'
      return
    end

    add_btn_click()
  end

  def have_full_name()
    @input_full_name.value.length > 0
  end

  def have_email()
    email_regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    @input_email.value.length > 0 &&
    email_regex.test(@input_email.value)
  end

  def clean()
    @input_full_name.value = ''
    @input_email.value    = ''
  end
end