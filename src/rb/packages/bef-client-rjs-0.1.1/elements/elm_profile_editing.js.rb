import 'CInput', '../components/elm-profile-editing/inputs'
import 'CInputChangePassword', '../components/elm-profile-editing/inputs_change_password'
import 'CDatabase', '../components/elm-profile-editing/database'
import 'CSpinner', '../../template-rjs-0.1.1/components/spinner'

export default class ElmProfileEditing < HTMLElement
  attr_reader :user_id, :c_database, :language, :c_spinner

  def initialize
    super

    @language = Language.relevant.elm_profile_editing
    
    @user_id = self.get_attribute('user-id')

    init_elm()

    @c_spinner               = CSpinner.new(self)
    @c_database              = CDatabase.new(self)
    @c_inputs                = CInput.new(self)
    @c_input_change_password = CInputChangePassword.new(self)
  end

  def connected_callback()
    @c_input_change_password.connected_callback()
  end

  def disconnected_callback()
    @c_input_change_password.disconnected_callback()
  end

  def settings_update(is_connected)
    @c_inputs.disable_update(is_connected)
    @c_input_change_password.disable_update(is_connected)
  end

  def init_elm()
    template = """
<div class='container col-lg-6 my-5'>
  <!-- Sekce pro změnu hesla -->
  <div class='card mb-4'>
    <elm-spinner class='spinner-overlay'></elm-spinner>

    <div class='card-header'>
      <h5><i class='bi bi-key-fill'></i> #{@language[4]}</h5>
    </div>
    <div class='card-body'>
      <div class='mb-3'>
        <label for='profileEditingCurrentPassword' class='form-label'>#{@language[5]}</label>
        <input type='password' id='profileEditingCurrentPassword' class='form-control' required autocomplete='new-password'>
        <div id='profileEditingCurrentPasswordFeedback' class='invalid-feedback'>
          #{@language[6]}
        </div>
      </div>
      <div class='mb-3'>
        <label for='profileEditingNewPassword' class='form-label'>#{@language[7]}</label>
        <input type='password' id='profileEditingNewPassword' class='form-control' required autocomplete='new-password'>
        <div id='profileEditingNewPasswordFeedback' class='invalid-feedback'>
          #{@language[8]}
        </div>
      </div>
      <div class='mb-3'>
        <label for='profileEditingConfirmNewPassword' class='form-label'>#{@language[9]}</label>
        <input type='password' id='profileEditingConfirmNewPassword' class='form-control' required autocomplete='new-password'>
        <div id='profileEditingConfirmNewPasswordFeedback' class='invalid-feedback'>
          #{@language[10]}
        </div>
        <div id='profileEditingConfirmNewPasswordValidFeedback' class='valid-feedback'>
          #{@language[11]}
        </div>
      </div>
      <button id='profileEditingChangePasswordBtn' onclick='profileEditingChangePasswordBtnClick()' class='btn btn-primary'><i class='bi bi-save-fill'></i> #{@language[12]}</button>
    </div>
  </div>

  <!-- Sekce pro vymazání účtu -->
  <div class='card'>
    <div class='card-header'>
      <h5><i class='bi bi-trash-fill'></i> #{@language[0]}</h5>
    </div>
    <div class='card-body'>
      <p>#{@language[1]}</p>
      <button id='profileEditingAccountDeletionBtn' onclick='profileEditingAccountDeletion()' class='btn btn-danger'><i class='bi bi-exclamation-triangle-fill'></i> #{@language[2]}</button>
    </div>
  </div>
</div>
    """

    self.innerHTML = template
  end
end