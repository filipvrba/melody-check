import 'CSpinner', '../../template-rjs-0.1.1/components/spinner'
import 'CInputs', '../components/elm-signup/inputs'
import 'CDatabase', '../components/elm-signup/database'

import 'CDatabaseSignin', '../components/elm-signin/database'
import 'CProtectSignin', '../components/elm-signin/protect'

export default class ElmSignup < HTMLElement
  def initialize
    super
    
    @h_btn_click_0   = lambda {|e| btn_click_values_are_valid(
      e.detail.value.email, e.detail.value.password)}

    @language = Language.relevant.elm_signup

    init_elm()

    @c_inputs  = CInputs.new(self)
    @c_spinner = CSpinner.new(self)
    @c_spinner.set_display(false)
    @c_database = CDatabase.new(@c_spinner)

    @c_database_signin = CDatabaseSignin.new(@c_spinner)
    @c_protect_signin  = CProtectSignin.new()
  end

  def connected_callback()
    @c_inputs.connected_callback()

    Events.connect('#app', CInputs::ENVS.btn_click_0, @h_btn_click_0)
  end

  def disconnected_callback()
    @c_inputs.disconnected_callback()

    Events.disconnect('#app', CInputs::ENVS.btn_click_0, @h_btn_click_0)
  end

  def signup_update(is_connected)
    Bootstrap.change_disable_element(@c_inputs.register_signup_btn, !is_connected)
  end

  def btn_click_values_are_valid(email, password)
    options = { email: email, password: password }
    @c_database.add_new_user(options) do |is_added|
      if is_added
        signin(options)
      else
        @c_inputs.remove_values_from_inputs()
      end
    end
  end

  def signin(options)
    @c_database_signin.signin(options) do |user_id|

      if user_id
        token, date = @c_protect_signin.write_new_token()

        @c_database_signin.add_token({id: user_id, token: token, date: date}) do
          location.hash = "dashboard"
        end
      else
        location.hash = "signin"
      end
    end
  end

  def init_elm()
    template = """
<elm-spinner class='spinner-overlay'></elm-spinner>

<div class='container d-flex justify-content-center align-items-center vh-100'>
  <div class='card shadow p-4' style='width: 100%; max-width: 400px;'>
    <div class='card-body'>
      <h2 class='card-title text-center mb-4'>#{@language[0]}</h2>
      <!-- Email -->
      <div class='mb-3'>
        <label for='emailSignup' class='form-label'>#{@language[1]}</label>
        <div class='input-group'>
          <span class='input-group-text'><i class='bi bi-person-fill'></i></span>
          <input type='email' id='emailSignup' class='form-control' placeholder='#{@language[2]}' required='' autocomplete='off'>
          <div id='emailSignupFeedback' class='invalid-feedback'>
            #{@language[3]}
          </div>
        </div>
      </div>
      <!-- Heslo -->
      <div class='mb-3'>
        <label for='passwordSignup' class='form-label'>#{@language[4]}</label>
        <div class='input-group'>
          <span class='input-group-text'><i class='bi bi-lock-fill'></i></span>
          <input type='password' id='passwordSignup' class='form-control' placeholder='#{@language[5]}' required='' autocomplete='new-password'>
          <div id='passwordSignupFeedback' class='invalid-feedback'>
            #{@language[6]}
          </div>
        </div>
      </div>
      <!-- Ověření hesla -->
      <div class='mb-3'>
        <label for='confirmPasswordSignup' class='form-label'>#{@language[7]}</label>
        <div class='input-group'>
          <span class='input-group-text'><i class='bi bi-lock-fill'></i></span>
          <input type='password' id='confirmPasswordSignup' class='form-control' placeholder='#{@language[8]}' required='' autocomplete='new-password'>
          <div id='confirmPasswordSignupFeedback' class='invalid-feedback'>
            #{@language[9]}
          </div>
        </div>
      </div>
      <!-- Tlačítko Registrovat -->
      <div class='d-grid mb-3'>
        <button id='registerSignupBtn' class='btn btn-primary' onclick='btnSignUpClick()'>#{@language[10]}</button>
      </div>
      <!-- Odkaz na přihlášení -->
      <div class='text-center'>
        <p class='mb-0'>#{@language[11]} <a href='#signin' class='text-primary'>#{@language[12]}</a></p>
      </div>
    </div>
  </div>
</div>
    """

    self.innerHTML = template
  end
end