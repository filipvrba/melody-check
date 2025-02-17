export default class ElmEventSettingsModal < HTMLElement
  ENVS = {
    view: 'eesm-view-0'
  }

  def initialize
    super
    
    @h_view     = lambda {|e| view(e.detail.value) }
    @l_popstate = lambda { |e| popstate(e) }

    init_elm()

    candidate_imports_modal = self.query_selector('#eventSettingsCandidateImportsModal')
    @container_candidates   = self.query_selector('#eventSettingsCandidateImportsModalContainer') 

    @bootstrap_candidate_imports_modal = bootstrap.Modal.new(candidate_imports_modal)
  end

  def connected_callback()
    Events.connect('#app', ENVS.view, @h_view)
    window.add_event_listener('popstate', @l_popstate)
  end

  def disconnected_callback()
    Events.disconnect('#app', ENVS.view, @h_view)
    window.remove_event_listener('popstate', @l_popstate)
  end

  def popstate(event)
    Events.emit('#eventSettingsCandidateImportsModal', 'modal.hide')
  end

  def view(data)
    if data.length == 0
      return
    end

    element_candidates = []
    candidates = data.map {|h| h.data}
    candidates.each do |candidate|
      template = """
      <li class='list-group-item'>
        <strong>#{candidate.full_name}</strong><br><small>#{candidate.email}</small>
      </li>
      """
      element_candidates.push(template)
    end

    @container_candidates.innerHTML = element_candidates.join('')

    @bootstrap_candidate_imports_modal.show()
  end

  def init_elm()
    template = """
<div class='modal fade' id='eventSettingsCandidateImportsModal' tabindex='-1' aria-labelledby='eventSettingsCandidateImportsModalLabel' aria-hidden='true'>
  <div class='modal-dialog'>
    <div class='modal-content'>
      <div class='modal-header'>
        <h5 class='modal-title' id='eventSettingsCandidateImportsModalLabel'>
          <i class='bi bi-exclamation-triangle-fill text-danger'></i> Neimportovaní kandidáti
        </h5>
        <button type='button' class='btn-close' data-bs-dismiss='modal' aria-label='Zavřít'></button>
      </div>
      <div class='modal-body'>
        <ul id='eventSettingsCandidateImportsModalContainer' class='list-group'>
            <!-- Dynamicky generovaný seznam -->
        </ul>
      </div>
      <div class='modal-footer'>
        <button type='button' class='btn btn-secondary' data-bs-dismiss='modal'>Zavřít</button>
      </div>
    </div>
  </div>
</div>
    """

    self.innerHTML = template
  end
end