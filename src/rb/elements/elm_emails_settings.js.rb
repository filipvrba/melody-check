import 'CDatabase', '../components/elm-emails-settings/database'
import 'CSpinner',  '../packages/template-rjs-0.1.1/components/spinner'
import 'CContents', '../components/elm-emails-settings/contents'
import 'CInputs',   '../components/elm-emails-settings/inputs'

export default class ElmEmailsSettings < HTMLElement
  attr_reader :user_id, :c_spinner, :c_database

  def initialize
    super

    @user_id = self.get_attribute('user-id')
    
    init_elm()

    @c_spinner  = CSpinner.new(self)
    @c_database = CDatabase.new(self)
    @c_contents = CContents.new(self)
    @c_inputs   = CInputs.new(self)
  end

  def connected_callback()
    @c_contents.update_list_container()
  end

  def disconnected_callback()
  end

  def init_elm()
    template = """
<div class='container my-5'>
  <div id='emailsSettingsListEmails' class='card'>
    <elm-spinner id='spinnerOne' class='spinner-overlay'></elm-spinner>

    <div class='card-body'>
      <div class='d-flex justify-content-between align-items-center'>
        <h5 class='card-title'>Emailové šablony</h5>
      </div>

      <ul id='emailsSettingsListContainer' class='list-group mt-4'></ul>
    </div>
  </div>
</div>
    """

    self.innerHTML = template
  end
end