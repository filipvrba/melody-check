import 'CInputs', '../components/elm-signin/inputs'
import 'CDatabase', '../components/elm-signin/database'
import 'CProtect', '../components/elm-signin/protect'
import 'CSpinner', '../../template-rjs-0.1.1/components/spinner'

export default class ElmSignin < HTMLElement
  def initialize
    super

    @h_btn_click_0 = lambda {|e| btn_click_values_are_valid(
      e.detail.value.email, e.detail.value.password)}

    @language = Language.relevant.elm_signin
    
    init_elm()

    @c_inputs   = CInputs.new(self)
    @c_protect  = CProtect.new()
    @c_spinner  = CSpinner.new(self)
    @c_spinner.set_display(false)
    @c_database = CDatabase.new(@c_spinner)
  end

  def connected_callback()
    Events.connect('#app', CInputs::ENVS.btn_click_0, @h_btn_click_0)
    @c_inputs.connected_callback()
  end

  def disconnected_callback()
    Events.disconnect('#app', CInputs::ENVS.btn_click_0, @h_btn_click_0)
    @c_inputs.disconnected_callback()
  end

  def signin_update(is_connected)
    Bootstrap.change_disable_element(@c_inputs.input_login, !is_connected)
  end

  def btn_click_values_are_valid(email, password)
    @c_database.signin({email: email, password: password}) do |user_id|

      if user_id
        token, date = @c_protect.write_new_token()

        @c_database.add_token({id: user_id, token: token, date: date}) do
          location.hash = "dashboard"
        end
      else
        @c_inputs.remove_values_from_inputs()
      end
    end
  end

  def init_elm()
    self.innerHTML = """
<elm-spinner class='spinner-overlay'></elm-spinner>

<div class='container d-flex justify-content-center align-items-center vh-100'>
  <div class='card shadow p-4' style='width: 100%; max-width: 400px;'>
    <div class='card-body'>
      <h2 class='card-title text-center mb-4'>#{@language[0]}</h2>
      <!-- email -->
      <div class='mb-3'>
        <label for='emailSignin' class='form-label'>#{@language[1]}</label>
        <div class='input-group'>
          <span class='input-group-text'><i class='bi bi-person-fill'></i></span>
          <input type='email' id='emailSignin' class='form-control' placeholder='#{@language[2]}' required>
          <div id='emailSigninFeedback' class='invalid-feedback'>
            #{@language[3]}
          </div>
        </div>
      </div>
      <!-- Heslo -->
      <div class='mb-3'>
        <label for='passwordSignin' class='form-label'>#{@language[4]}</label>
        <div class='input-group'>
          <span class='input-group-text'><i class='bi bi-lock-fill'></i></span>
          <input type='password' id='passwordSignin' class='form-control' placeholder='#{@language[5]}' required>
          <div id='passwordSigninFeedback' class='invalid-feedback'>
            #{@language[6]}
          </div>
        </div>
      </div>
      <!-- Tlačítko Přihlásit se -->
      <div class='d-grid mb-3'>
        <button id='loginSigninBtn' class='btn btn-primary' onclick='btnSignInClick()'>#{@language[7]}</button>
      </div>
      <!-- Odkaz na registraci -->
      <div class='text-center'>
        <p class='mb-0'>#{@language[8]} <a href='#signup' class='text-primary'>#{@language[9]}</a></p>
      </div>
    </div>
  </div>
</div>
    """
  end
end