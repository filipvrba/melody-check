export default class CContents
  def initialize(parent)
    @parent = parent

    @list_candidates = @parent.query_selector('#eventSettingsListCandidates')
    @list_container  = @parent.query_selector('#eventSettingsListContainer')

    change_visibility(false)
  end

  def update_list_container()
    @parent.c_database.get_candidates() do |candidates|
      elm_lis = []

      candidates.each do |candidate|
        template = """
<li class='list-group-item d-flex justify-content-between align-items-center'>
  <span>#{candidate.full_name} (#{candidate.email})</span>
  <button type='button' class='btn btn-danger btn-sm' onclick='eventSettingsListRemoveBtnClick(#{candidate.id})'>
    <i class='bi bi-trash'></i>
  </button>
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