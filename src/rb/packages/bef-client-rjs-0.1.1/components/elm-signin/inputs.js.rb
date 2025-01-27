export default class CInputs
  attr_reader :input_login

  ENVS = {
    btn_click_0: 'ci-btn-click-0'
  }

  def initialize(parent)
    @parent         = parent
    @input_email    = @parent.query_selector('#emailSignin')
    @input_password = @parent.query_selector('#passwordSignin')
    @input_login    = @parent.query_selector('#loginSigninBtn')

    @h_input_email_keypress = lambda { input_email_keypress() }
    @h_input_password_keypress = lambda { input_password_keypress() }

    window.btn_sign_in_click = btn_sign_in_click
  end

  def connected_callback()
    @input_email.add_event_listener('keypress', @h_input_email_keypress)
    @input_password.add_event_listener('keypress', @h_input_password_keypress)
  end

  def disconnected_callback()
    @input_email.remove_event_listener('keypress', @h_input_email_keypress)
    @input_password.remove_event_listener('keypress', @h_input_password_keypress)
  end

  def btn_sign_in_click()
    is_email    = have_email()
    is_password = have_password()

    Bootstrap.change_valid_element(@input_email, is_email)
    Bootstrap.change_valid_element(@input_password, is_password)

    unless is_email && is_password
      return
    end

    Events.emit('#app', ENVS.btn_click_0, {
      email:    @input_email.value,
      password: @input_password.value
    })
  end

  def have_email()
    email_regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    @input_email.value.length > 0 &&
    email_regex.test(@input_email.value)
  end

  def have_password()
    @input_password.value.length > 0
  end

  def input_email_keypress()
    unless event.key == 'Enter'
      return
    end

    @input_password.focus()
  end

  def input_password_keypress()
    unless event.key == 'Enter'
      return
    end

    @input_login.click()
  end

  def remove_values_from_inputs(confirm_button = true)
    @input_email.value    = ''
    @input_password.value = ''

    if @input_email.value == '' && @input_password.value == ''
      @input_login.click() if confirm_button
    end
  end
end