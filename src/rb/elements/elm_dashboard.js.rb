import 'AProtected', '../packages/bef-client-rjs-0.1.1/elements/abstracts/protected'
import 'CTimer',     '../packages/bef-client-rjs-0.1.1/components/timer'
import 'CDatabase',  '../components/elm-dashboard/database'

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
    @c_database.get_event_id() do |event_id|
      @event_id = event_id
      update_content_container()
    end

    init_elm()

    @dashboard_container = self.query_selector('#dashboardContainer')
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
      template = "<elm-dashboard-candidates event-id='#{@event_id}'></elm-dashboard-candidates>"
    else
      template = "<elm-dashboard-information></elm-dashboard-information>"
    end

    @dashboard_container.innerHTML = template
  end

  def init_elm()
    template = """
    <elm-header user-id='#{@user_id}'></elm-header>
    <div id='dashboardContainer'></div>
    """

    self.innerHTML = template
  end
end