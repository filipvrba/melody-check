import 'CDatabase', '../../components/elm-dashboard-candidates/database'

export default class ElmDashboardCandidates < HTMLElement
  attr_reader :event_id

  def initialize
    super
    
    @event_id = self.get_attribute('event-id')

    init_elm()

    @list_body = self.query_selector('#dashboardCandidatesListBody')

    @c_database = CDatabase.new(self)
  end

  def connected_callback()
    @c_database.get_candidates() do |candidates|
      elements = []
      have_candidates = candidates.length > 0
      
      if have_candidates
        candidates.each do |candidate|
          template_check = "<i class='bi bi-check-circle-fill text-success'></i>"
          template_x     = "<i class='bi bi-x-circle-fill text-danger'></i>"
          template = """
          <tr>
            <th scope='row'>#{candidate.id}</th>
            <td>#{candidate.full_name}</td>
            <td>#{candidate.email}</td>
            <td class='text-center'>
              #{candidate.confirmed_attendance ? template_check : template_x}
            </td>
          </tr>
          """

          elements.push(template)
        end

        @list_body.innerHTML = elements.join('')
      else
        @list_body.innerHTML = """
        <tr>
          <th scope='row'></th>
          <td class='text-center'>---</td>
          <td class='text-center'>žádní účastníci</td>
          <td class='text-center'>---</td>
        </tr>
        """
      end
    end
  end

  def disconnected_callback()
  end

  def init_elm()
    template = """
<div class='container my-5'>
  <h1 class='text-center mb-4'>Účastníci</h1>

  <!-- Tabulka kandidátů -->
  <div class='table-responsive rounded shadow'>
    <table class='table table-striped table-hover align-middle mb-0'>
      <thead class='table-dark'>
        <tr>
          <th scope='col'>#</th>
          <th scope='col'>Celé Jméno</th>
          <th scope='col'>Email</th>
          <th scope='col' class='text-center'>Potvrzená Účast</th>
        </tr>
      </thead>
      <tbody id='dashboardCandidatesListBody'>
        <tr>
          <th scope='row'></th>
          <td class='text-center'>---</td>
          <td class='text-center'>načítání</td>
          <td class='text-center'>---</td>
        </tr>
      </tbody>
    </table>
  </div>
</div>
    """

    self.innerHTML = template
  end
end