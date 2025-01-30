export default class CInputs
  ENVS = {
    btn_click_0: 'eesu-btn-click-0'
  }

  def initialize(parent)
    @parent = parent

    @h_input_full_name_keypress = lambda { input_full_name_keypress() }
    @h_input_email_keypress     = lambda { input_email_keypress() }

    @input_event_name = @parent.query_selector('#eventSignupEventName')
    @input_full_name  = @parent.query_selector('#eventSignupFullName')
    @input_email      = @parent.query_selector('#eventSignupEmail')
    @input_btn_signup = @parent.query_selector('#eventSignupBtnSignup')

    window.event_signup_btn_signup_click = btn_signup_click
  end

  def connected_callback()
    @input_full_name.add_event_listener('keypress', @h_input_full_name_keypress)
    @input_email.add_event_listener('keypress', @h_input_email_keypress)
  end

  def disconnected_callback()
    @input_full_name.remove_event_listener('keypress', @h_input_full_name_keypress)
    @input_email.remove_event_listener('keypress', @h_input_email_keypress)
  end

  def btn_signup_click()
    is_full_name = have_full_name()
    is_email     = have_email()

    Bootstrap.change_valid_element(@input_full_name, is_full_name)
    change_valid_email(is_email)

    unless is_full_name && is_email
      return
    end

    Events.emit('#app', ENVS.btn_click_0, {
      full_name: @input_full_name.value,
      email:     @input_email.value
    })
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

    @input_btn_signup.click()
  end

  def set_event_name(name)
    @input_event_name.value = name
  end

  def change_valid_email(is_email)
    Bootstrap.change_valid_element(@input_email, is_email)
  end

  def get_event_name()
    @input_event_name.value
  end

  # Private

  def have_full_name()
    @input_full_name.value.length > 0
  end

  def have_email()
    email_regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    @input_email.value.length > 0 &&
    email_regex.test(@input_email.value)
  end
end