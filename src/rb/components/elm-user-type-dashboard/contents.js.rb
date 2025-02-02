export default class CContents
  def initialize(parent)
    @parent = parent

    @dashboard_container = @parent.query_selector('#dashboardContainer')
  end

  def init_elm_informations()
    @dashboard_container.innerHTML = "<elm-dashboard-information></elm-dashboard-information>"
  end

  def init_elm_events(event_details)
    elements = [
      "<div class='container my-5'>",
      "<h1 class='text-center mb-4'>Účastníci</h1>",
      "<div class='accordion' id='accordionPanelsStayOpenDashboardEvents'>"
    ]
    
    event_details.each do |event_detail|
      template = """
<div class='accordion-item'>
  <h2 class='accordion-header'>
    <button class='accordion-button fw-semibold text-dark bg-light shadow-sm' type='button' data-bs-toggle='collapse' data-bs-target='#panelsStayOpen-collapse#{event_detail.id}' aria-expanded='true' aria-controls='panelsStayOpen-collapse#{event_detail.id}'>
      <span class='h5 w-100 text-center'>#{event_detail.name}</span>
    </button>
  </h2>
  <div id='panelsStayOpen-collapse#{event_detail.id}' class='accordion-collapse collapse show'>
    <div class='accordion-body'>
      <elm-dashboard-candidates event-id='#{event_detail.id}'></elm-dashboard-candidates>
    </div>
  </div>
</div>
      """
      elements.push(template)
    end

    elements.push('</div>')
    elements.push('</div>')

    @dashboard_container.innerHTML = elements.join('')
  end
end