export default class CInputs
  attr_reader :register_signup_btn

  ENVS = {
    btn_click_0: 'ci-signup-btn-click-0'
  }

  def initialize(parent)
    @parent = parent

    @h_input_email_keypress       = lambda { input_email_keypress() }
    @h_input_password_keypress    = lambda { input_password_keypress() }
    @h_confirm_password_keypress  = lambda { confirm_password_keypress() }

    @email_signup            = @parent.query_selector('#emailSignup')
    @password_signup         = @parent.query_selector('#passwordSignup')
    @confirm_password_signup = @parent.query_selector('#confirmPasswordSignup')
    @register_signup_btn     = @parent.query_selector('#registerSignupBtn')

    window.btn_sign_up_click = btn_sign_up_click
  end

  def connected_callback()
    @email_signup.add_event_listener('keypress', @h_input_email_keypress)
    @password_signup.add_event_listener('keypress', @h_input_password_keypress)
    @confirm_password_signup.add_event_listener('keypress', @h_confirm_password_keypress)
  end

  def disconnected_callback()
    @email_signup.remove_event_listener('keypress', @h_input_email_keypress)
    @password_signup.remove_event_listener('keypress', @h_input_password_keypress)
    @confirm_password_signup.remove_event_listener('keypress', @h_confirm_password_keypress)
  end

  def btn_sign_up_click()
    is_email         = have_email()
    is_password      = have_password()
    is_same_password = have_same_passwords()

    Bootstrap.change_valid_element(@email_signup, is_email)
    Bootstrap.change_valid_element(@password_signup, is_password)
    Bootstrap.change_valid_element(@confirm_password_signup, is_same_password)

    unless is_email && is_password && is_same_password
      return
    end

    Events.emit('#app', ENVS.btn_click_0, {
      email:      @email_signup.value,
      password:   @password_signup.value,
    })
  end

  def input_email_keypress()
    unless event.key == 'Enter'
      return
    end

    @password_signup.focus()
  end

  def input_password_keypress()
    unless event.key == 'Enter'
      return
    end

    @confirm_password_signup.focus()
  end

  def confirm_password_keypress()
    unless event.key == 'Enter'
      return
    end

    @register_signup_btn.click()
  end

  def have_email()
    email_regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    @email_signup.value.length > 0 &&
    email_regex.test(@email_signup.value)
  end

  def have_password()
    @password_signup.value.length > 0
  end

  def have_same_passwords()
    @password_signup.value == @confirm_password_signup.value
  end

  def remove_values_from_inputs(confirm_button = true)
    @email_signup.value = ''

    if @email_signup.value == ''
      @register_signup_btn.click() if confirm_button
    end
  end
end