export default class CInputs
  def initialize(parent)
    @parent = parent

    @h_elm_confirm_date_input_date_keypress = lambda { elm_confirm_date_input_date_keypress() }
    @h_elm_confirm_date_input_time_keypress = lambda { elm_confirm_date_input_time_keypress() }

    @elm_confirm_date_input_date    = @parent.query_selector('#elmConfirmDateInputDate')
    @elm_confirm_date_input_time    = @parent.query_selector('#elmConfirmDateInputTime')
    @elm_confirm_date_input_add_btn = @parent.query_selector('#elmConfirmDateInputAddBtn')

    window.elm_confirm_date_input_add_btn_click    = elm_confirm_date_input_add_btn_click
    window.elm_confirm_date_input_remove_btn_click = elm_confirm_date_input_remove_btn_click
  end

  def connected_callback()
    @elm_confirm_date_input_date.add_event_listener('keypress', @h_elm_confirm_date_input_date_keypress)
    @elm_confirm_date_input_time.add_event_listener('keypress', @h_elm_confirm_date_input_time_keypress)
  end

  def disconnected_callback()
    @elm_confirm_date_input_date.remove_event_listener('keypress', @h_elm_confirm_date_input_date_keypress)
    @elm_confirm_date_input_time.remove_event_listener('keypress', @h_elm_confirm_date_input_time_keypress)
  end

  def elm_confirm_date_input_add_btn_click()
    is_elm_confirm_date_input_date = have_elm_confirm_date_input_date()
    is_elm_confirm_date_input_time = have_elm_confirm_date_input_time()

    Bootstrap.change_valid_element(@elm_confirm_date_input_date, is_elm_confirm_date_input_date)
    Bootstrap.change_valid_element(@elm_confirm_date_input_time, is_elm_confirm_date_input_time)

    unless is_elm_confirm_date_input_date && is_elm_confirm_date_input_time
      return
    end

    @parent.input_add_btn_click({
      date: @elm_confirm_date_input_date.value,
      time: @elm_confirm_date_input_time.value,
    })
  end

  def elm_confirm_date_input_remove_btn_click(arrival_id)
    @parent.input_remove_btn_click(arrival_id)
  end
  
  def elm_confirm_date_input_date_keypress()
    return unless event.key == 'Enter'

    @elm_confirm_date_input_time.focus()
  end
  
  def elm_confirm_date_input_time_keypress()
    return unless event.key == 'Enter'

    @elm_confirm_date_input_add_btn.click()
  end
  
  def have_elm_confirm_date_input_date()
    @elm_confirm_date_input_date.value.length > 0
  end

  def have_elm_confirm_date_input_time()
    @elm_confirm_date_input_time.value.length > 0
  end

  def clear_inputs()
    @elm_confirm_date_input_date.value = ''
    @elm_confirm_date_input_time.value = ''
  end
end
