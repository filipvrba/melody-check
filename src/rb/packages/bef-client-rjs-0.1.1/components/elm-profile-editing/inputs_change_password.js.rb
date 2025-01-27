export default class CInputsChangePassword
  def initialize(parent)
    @parent = parent

    @h_current_password_keypress     = lambda {current_password_keypress()}
    @h_account_new_password_keypress = lambda {account_new_password_keypress()}
    @h_confirm_new_password_keypress = lambda {confirm_new_password_keypress()}

    @elm_current_password     = @parent.query_selector('#profileEditingCurrentPassword')
    @elm_account_new_password = @parent.query_selector('#profileEditingNewPassword')
    @elm_confirm_new_password = @parent.query_selector('#profileEditingConfirmNewPassword')
    @elm_change_password_btn  = @parent.query_selector('#profileEditingChangePasswordBtn')

    @parent.c_spinner.set_display(false)

    window.profile_editing_change_password_btn_click = change_password_btn_click
  end

  def connected_callback()
    @elm_current_password.add_event_listener('keypress', @h_current_password_keypress)
    @elm_account_new_password.add_event_listener('keypress', @h_account_new_password_keypress)
    @elm_confirm_new_password.add_event_listener('keypress', @h_confirm_new_password_keypress)
  end

  def disconnected_callback()
    @elm_current_password.remove_event_listener('keypress', @h_current_password_keypress)
    @elm_account_new_password.remove_event_listener('keypress', @h_account_new_password_keypress)
    @elm_confirm_new_password.remove_event_listener('keypress', @h_confirm_new_password_keypress)
  end

  def disable_update(is_connected)
    Bootstrap.change_disable_element(@elm_change_password_btn, !is_connected)
  end

  def change_password_btn_click()
    is_current_password     = have_current_password()
    is_account_new_password = have_account_new_password()
    is_confirm_new_password = have_confirm_new_password()

    Bootstrap.change_valid_element(@elm_current_password, is_current_password)
    Bootstrap.change_valid_element(@elm_account_new_password, is_account_new_password)
    Bootstrap.change_valid_element(@elm_confirm_new_password, is_confirm_new_password)
    Bootstrap.change_valid_green_element(@elm_confirm_new_password, true)

    unless is_current_password && is_account_new_password && is_confirm_new_password
      return
    end

    @parent.c_spinner.set_display(true)
    @parent.c_database.compare_current_password(@elm_current_password.value) do |is_same|
      if is_same
        @parent.c_database.set_account_new_password(@elm_account_new_password.value) do |message|
          unless message
            Bootstrap.change_valid_element(@elm_account_new_password, false)
          else
            Bootstrap.change_valid_green_element(@elm_confirm_new_password, false)
          end
          
          @parent.c_spinner.set_display(false)
        end
      else
        Bootstrap.change_valid_element(@elm_current_password, false)
        @parent.c_spinner.set_display(false)
      end
    end
  end

  def current_password_keypress()
    unless event.key == 'Enter'
      return
    end

    @elm_account_new_password.focus()
  end

  def account_new_password_keypress()
    unless event.key == 'Enter'
      return
    end

    @elm_confirm_new_password.focus()
  end

  def confirm_new_password_keypress()
    unless event.key == 'Enter'
      return
    end

    @elm_change_password_btn.click()
  end

  def have_current_password()
    @elm_current_password.value.length > 0
  end

  def have_account_new_password()
    @elm_account_new_password.value.length > 0
  end

  def have_confirm_new_password()
    @elm_account_new_password.value == @elm_confirm_new_password.value
  end
end 