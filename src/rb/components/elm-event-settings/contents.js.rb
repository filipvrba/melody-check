export default class CContents
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
  <span>#{candidate.full_name} (#{candidate.email})</span>
  <div class='d-flex gap-2'>
    <button type='button' class='btn btn-warning btn-sm' onclick='eventSettingsListEditBtnClick(#{i})'>
      <i class='bi bi-pen'></i>
    </button>
    <button type='button' class='btn btn-danger btn-sm' onclick='eventSettingsListRemoveBtnClick(#{candidate.id})'>
      <i class='bi bi-trash'></i>
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
end