export default class CContents
  def initialize(parent)
    @parent = parent

    @list_container = @parent.query_selector('#eventSettingsListContainer')
  end

  def update_list_container()
    @parent.c_database.get_date_with_time() do |rows|
      elm_lis = []
      rows.each do |row|
        date = row['arrival_date'].split('-').reverse().join('. ')
        time = row['arrival_time']

        template = """
<li class='list-group-item d-flex justify-content-between align-items-center'>
  <span>
    <p class='card-title mb-0'>Čas: <strong>#{time}</strong></p>
    <small>Datum: <strong>#{date}</strong></small>
  </span>
  <button type='button' class='btn btn-danger btn-sm' onclick='elmConfirmDateInputRemoveBtnClick(#{row.id})'>
    <i class='bi bi-trash'></i>
  </button>
</li>
        """
        elm_lis.push(template)
      end

      @list_container.innerHTML = elm_lis.join('')
    end
  end
end