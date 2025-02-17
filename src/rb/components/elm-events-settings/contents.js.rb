export default class CContents
  def initialize(parent)
    @parent = parent

    @list_container = @parent.query_selector('#eventsSettingsListContainer')
  end

  def update_list_container(&callback)
    @parent.c_database.get_event_details() do |event_details|
      elm_lis = []

      if event_details
        event_details.each_with_index do |event, i|
          date = Date(event.date).new.to_locale_date_string("cs-CZ")
          template = """
<li class='list-group-item d-flex justify-content-between align-items-center'>
  <span style='cursor: pointer;' onclick='eventsSettingsListInputEditBtnClick(#{event.id})'>
    <h5 class='card-title mb-0'><ins>#{event.name}</ins></h5>
    <small class='text-muted'>Datum: #{date}</small>
  </span>
  <button type='button' class='btn btn-danger btn-sm' onclick='eventsSettingsListInputRemoveBtnClick(#{event.id})'>
    <i class='bi bi-trash'></i>
  </button>
</li>
          """
          elm_lis.push(template)
        end
      end

      @list_container.innerHTML = elm_lis.join('')

      callback.call() if callback
    end
  end
end