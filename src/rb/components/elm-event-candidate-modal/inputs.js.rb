export default class CInputs
  def initialize(parent)
    @parent = parent

    @h_event_candidate_moda_full_name_keypress = lambda { event_candidate_moda_full_name_keypress() }
    @h_event_candidate_moda_email_keypress = lambda { event_candidate_moda_email_keypress() }

    @event_candidate_moda_full_name = @parent.query_selector('#eventCandidateModaFullName')
    @event_candidate_moda_email = @parent.query_selector('#eventCandidateModaEmail')
    @event_candidate_moda_btn_save = @parent.query_selector('#eventCandidateModaBtnSave')

    window.event_candidate_modal_btn_save_click = event_candidate_modal_btn_save_click
  end

  def connected_callback()
    @event_candidate_moda_full_name.add_event_listener('keypress', @h_event_candidate_moda_full_name_keypress)
    @event_candidate_moda_email.add_event_listener('keypress', @h_event_candidate_moda_email_keypress)
  end

  def disconnected_callback()
    @event_candidate_moda_full_name.remove_event_listener('keypress', @h_event_candidate_moda_full_name_keypress)
    @event_candidate_moda_email.remove_event_listener('keypress', @h_event_candidate_moda_email_keypress)
  end

  def event_candidate_modal_btn_save_click()
    is_event_candidate_moda_full_name = have_event_candidate_moda_full_name()
    is_event_candidate_moda_email = have_event_candidate_moda_email()

    Bootstrap.change_valid_element(@event_candidate_moda_full_name, is_event_candidate_moda_full_name)
    Bootstrap.change_valid_element(@event_candidate_moda_email, is_event_candidate_moda_email)

    unless is_event_candidate_moda_full_name && is_event_candidate_moda_email
      return
    end

    @parent.btn_save_click({
      full_name: @event_candidate_moda_full_name.value,
      email: @event_candidate_moda_email.value,
    })
  end
  
  def event_candidate_moda_full_name_keypress()
    return unless event.key == 'Enter'

    @event_candidate_moda_email.focus()
  end
  
  def event_candidate_moda_email_keypress()
    return unless event.key == 'Enter'

    @event_candidate_moda_btn_save.click()
  end
  
  def have_event_candidate_moda_full_name()
    @event_candidate_moda_full_name.value.length > 0
  end

  def have_event_candidate_moda_email()
    email_regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$/

    @event_candidate_moda_email.value.length > 0 &&
      email_regex.test(@event_candidate_moda_email.value)
  end
end
