export default class CEventInputs
  ENVS = {
    btn_click_0: 'ees-cei-btn-click-0'
  }

  def initialize(parent)
    @parent = parent

    @h_input_title_keypress = lambda { input_title_keypress() }
    @h_input_date_keypress  = lambda { input_date_keypress() }

    @input_title = @parent.query_selector('#eventSettingsEventTitle')
    @input_date  = @parent.query_selector('#eventSettingsEventDate')

    window.event_settings_event_save_details_btn_click = save_details_btn_click
  end

  def connected_callback()
    @input_title.add_event_listener('keypress', @h_input_title_keypress)
    @input_date.add_event_listener('keypress', @h_input_date_keypress)
  end

  def disconnected_callback()
    @input_title.remove_event_listener('keypress', @h_input_title_keypress)
    @input_date.remove_event_listener('keypress', @h_input_date_keypress)
  end

  def save_details_btn_click()
    is_title = have_title()
    is_date  = have_date()

    Bootstrap.change_valid_element(@input_title, is_title)
    Bootstrap.change_valid_element(@input_date, is_date)

    unless is_title && is_date
      return
    end

    Events.emit('#app', ENVS.btn_click_0, {
      title: @input_title.value,
      date:  @input_date.value
    })
  end

  def input_title_keypress()
    unless event.key == 'Enter'
      return
    end

    @input_date.focus()
  end

  def input_date_keypress()
    unless event.key == 'Enter'
      return
    end

    save_details_btn_click()
  end

  def have_title()
    @input_title.value.length > 0
  end

  def have_date()
    @input_date.value != ''
  end

  def update_event_details()
    @parent.c_database.get_event_details() do |event_details|

      if event_details

        if @parent.event_id
          relevant_event_detail = event_details.find() {|e| e.id == @parent.event_id}

          @parent.event_callback(relevant_event_detail.id)

          @input_title.value = relevant_event_detail.name
          @input_date.value  = relevant_event_detail.date
        else
          @parent.event_callback(event_details[0].id)

          @input_title.value = event_details[0].name
          @input_date.value  = event_details[0].date
        end
      end
    end
  end
end