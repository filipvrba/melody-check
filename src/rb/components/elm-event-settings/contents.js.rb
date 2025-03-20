export default class CContents
  attr_reader :list_container

  def initialize(parent)
    @parent = parent

    @list_candidates = @parent.query_selector('#eventSettingsListCandidates')
    @list_container  = @parent.query_selector('#eventSettingsListContainer')

    @candidates = []

    change_visibility(false)
  end

  def get_candidate(index)
    @candidates[index]
  end

  def update_list_container()
    @parent.c_database.get_candidates() do |candidates|
      @candidates = candidates

      elm_lis = []
      @candidates.each_with_index do |candidate, i|
        template = """
<li class='list-group-item d-flex justify-content-between align-items-center'>
  <div class='form-check'>
    <div>
      <input class='form-check-input' type='checkbox' value='' id='eventSettingsListItemCheck-#{candidate.id}'>
      <span>#{candidate.full_name} (#{candidate.email})</span>
    </div>
    <span id='eventSettingsListEmailStatus'>
      #{email_status(candidate)}
    </span>
  </div>
  <div class='d-flex gap-2'>
    <button type='button' class='btn btn-secondary btn-sm' onclick='eventSettingsListEditBtnClick(#{i})'>
      <i class='bi bi-pen'></i>
    </button>
  </div>
</li>
        """
        elm_lis.push(template)
      end

      @list_container.innerHTML = elm_lis.join('')
    end
  end

  def change_visibility(is_visible)
    Bootstrap.change_visible_element(@list_candidates, is_visible)
  end

  def email_status(candidate)
    if candidate.email_sent
      date = DateUtils.convert_to_czech_date(candidate.sent_at)
      "<small class='text-success'><i class='bi bi-envelope-fill'></i> #{date}</small>"
    else
      "<small class='text-danger'><i class='bi bi-envelope-slash-fill'></i> neposláno</small>"
    end
  end
end