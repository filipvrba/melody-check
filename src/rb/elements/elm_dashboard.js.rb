import 'AProtected', '../packages/bef-client-rjs-0.1.1/elements/abstracts/protected'
import 'CTimer',     '../packages/bef-client-rjs-0.1.1/components/timer'
import 'CDatabase',  '../components/elm-dashboard/database'
import 'CSpinner',   '../packages/template-rjs-0.1.1/components/spinner'

export default class ElmDashboard < AProtected
  attr_reader :user_id, :c_database

  def initialize
    super

    @event_id   = nil
    @contents   = nil
    @c_database = CDatabase.new(self)
    @c_timer    = CTimer.new(60)
  end

  def protected_callback()
    init_elm()
    @dashboard_container = self.query_selector('#dashboardContainer')
    @c_spinner = CSpinner.new(self)

    fetch_and_update_event()
  end

  def fetch_and_update_event()
    @c_database.get_event_id() do |event_id|
      @c_spinner.set_display(false)
      
      @event_id = event_id
      update_content_container()
    end
  end

  def connected_callback()
    @c_timer.connected_callback()
  end

  def disconnected_callback()
    @c_timer.disconnected_callback()
  end

  def update_content_container()
    template = nil
    if @event_id
      template = """
      <div class='container my-5'>
        <h1 class='text-center mb-4'>Účastníci</h1>
        <elm-dashboard-candidates event-id='#{@event_id}'></elm-dashboard-candidates>
      </div>
      """
    else
      template = "<elm-dashboard-information></elm-dashboard-information>"
    end

    @dashboard_container.innerHTML = template
  end

  def init_elm()
    template = """
    <elm-spinner id='spinnerOne' class='spinner-overlay'></elm-spinner>
    <elm-header user-id='#{@user_id}'></elm-header>
    <div id='dashboardContainer'></div>
    """

    self.innerHTML = template
  end
end