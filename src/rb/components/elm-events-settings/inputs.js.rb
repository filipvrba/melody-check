export default class CInputs
  ENVS = {
    btn_click_0: 'eess-ci-btn-click-0',
    btn_click_1: 'eess-ci-btn-click-1',
  }

  attr_reader :event_id_history

  def initialize(parent)
    @parent = parent

    @h_input_event_name_keypress = lambda { input_event_name_keypress() }
    @h_input_date_keypress       = lambda { input_date_keypress() }

    @event_id_history = nil

    @input_event_name = @parent.query_selector('#eventsSettingsListInputEventName')
    @input_date       = @parent.query_selector('#eventsSettingsListInputDate')

    window.events_settings_list_add_btn_click          = add_btn_click
    window.events_settings_list_input_edit_btn_click   = edit_btn_click
    window.events_settings_list_input_remove_btn_click = remove_btn_click
  end

  def connected_callback()
    @input_event_name.add_event_listener('keypress', @h_input_event_name_keypress)
    @input_date.add_event_listener('keypress', @h_input_date_keypress)
  end

  def disconnected_callback()
    @input_event_name.remove_event_listener('keypress', @h_input_event_name_keypress)
    @input_date.remove_event_listener('keypress', @h_input_date_keypress)
  end

  def add_btn_click()
    @event_id_history = nil

    is_event_name = have_event_name()
    is_date       = have_date()

    Bootstrap.change_valid_element(@input_event_name, is_event_name)
    Bootstrap.change_valid_element(@input_date, is_date)

    unless is_event_name && is_date
      return
    end

    Events.emit('#app', ENVS.btn_click_0, {
      name: @input_event_name.value,
      date: @input_date.value
    })
  end

  def edit_btn_click(event_id)
    @event_id_history = event_id

    Events.emit('#app', ENVS.btn_click_1, @event_id_history)
  end

  def remove_btn_click(event_id)
    @event_id_history = event_id

    @parent.c_database.remove_event() do |message|
      @parent.c_contents.update_list_container() if message
    end
  end

  def input_event_name_keypress()
    unless event.key == 'Enter'
      return
    end

    @input_date.focus()
  end

  def input_date_keypress()
    unless event.key == 'Enter'
      return
    end

    add_btn_click()
  end

  def clear_input_values()
    @input_event_name.value = ''
    @input_date.value       = ''
  end

  # Private

  def have_event_name()
    @input_event_name.value.length > 0
  end

  def have_date()
    @input_date.value != ''
  end
end