export default class CInputs
  ENVS = {
    btn_click_0: 'eesss-ci-btnc-0'
  }

  def initialize(parent)
    @parent = parent

    window.emails_settings_list_input_edit_btn_click = input_edit_btn_click
  end

  def input_edit_btn_click(event_id)
    Events.emit('#app', ENVS.btn_click_0, event_id)
  end
end