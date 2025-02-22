import 'CDatabase', '../../components/elm-dashboard-candidates/database'

export default class ElmDashboardCandidates < HTMLElement
  attr_reader :event_id

  def initialize
    super
    
    @h_update_delay = lambda {|e| update_delay(e.detail.value) }

    @event_id  = self.get_attribute('event-id')
    @no_emails = self.get_attribute('no-emails') == ''

    init_elm()

    @list_body = self.query_selector('#dashboardCandidatesListBody')

    @c_database = CDatabase.new(self)
  end

  def connected_callback()
    Events.connect('#app', 'updateDelay', @h_update_delay)

    update_list_body()
  end

  def disconnected_callback()
    Events.disconnect('#app', 'updateDelay', @h_update_delay)
  end

  def update_delay(is_connected)
    update_list_body() if is_connected
  end

  def get_confirm_icon_element(confirmed_attendance)
    case confirmed_attendance.to_i
    when 0
      return "<i class='bi bi-hourglass-split text-warning'></i>"
    when 1 
      return "<i class='bi bi-check-circle-fill text-success'></i>"
    when 2
      return "<i class='bi bi-x-circle-fill text-danger'></i>"
    end
  end

  def update_list_body()
    @c_database.get_candidates() do |candidates|
      elements = []
      have_candidates = candidates.length > 0
      
      if have_candidates
        candidates.each do |candidate|
          icon = get_confirm_icon_element(candidate.confirmed_attendance)
          td_email   = @no_emails ? '<td></td>' : "<td>#{candidate.email}</td>"
          td_arrival = @no_emails ? '<td></td>' : "<td>#{candidate.arrival_times.join(' / ')}</td>"

          template = """
          <tr>
            <th scope='row'>#{candidate.id}</th>
            <td>#{candidate.full_name}</td>
            #{td_arrival}
            #{td_email}
            <td class='text-center'>
              #{icon}
            </td>
          </tr>
          """

          elements.push(template)
        end

        @list_body.innerHTML = elements.join('')
      else
        td_empty   = @no_emails ? '' : "<td class='text-center'>---</td>"

        @list_body.innerHTML = """
        <tr>
          <th scope='row'></th>
          <td class='text-center'>---</td>
          <td class='text-center'>---</td>
          #{td_empty}
          #{td_empty}
        </tr>
        """
      end
    end
  end

  def init_elm()
    th_email   = @no_emails ? "" : "<th scope='col'>Email</th>"
    th_arrival = @no_emails ? "" : "<th scope='col'>Příchod</th>"
    td_empty   = @no_emails ? '' : "<td class='text-center'>~~~</td>"

    template = """
<!-- Tabulka kandidátů -->
<div class='table-responsive rounded shadow'>
  <table class='table table-striped table-hover align-middle mb-0'>
    <thead class='table-dark'>
      <tr>
        <th scope='col'>#</th>
        <th scope='col'>Celé Jméno</th>
        #{th_arrival}
        #{th_email}
        <th scope='col' class='text-center'>Potvrzená Účast</th>
      </tr>
    </thead>
    <tbody id='dashboardCandidatesListBody'>
      <tr>
        <th scope='row'></th>
        <td class='text-center'>~~~</td>
        <td class='text-center'>~~~</td>
        #{td_empty}
        #{td_empty}
      </tr>
    </tbody>
  </table>
</div>
    """

    self.innerHTML = template
  end
end