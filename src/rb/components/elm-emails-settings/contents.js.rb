export default class CContents
  def initialize(parent)
    @parent = parent

    @list_container = @parent.query_selector('#emailsSettingsListContainer')
  end

  def update_list_container()
    @parent.c_database.get_event_details() do |event_details|
      unless event_details      
        return
      end

      elements = []

      event_details.each do |event|
        date = Date(event.date).new.to_locale_date_string("cs-CZ")

        template = """
        <li class='list-group-item d-flex justify-content-between align-items-center'>
          <span style='cursor: pointer;' onclick='emailsSettingsListInputEditBtnClick(#{event.id})'>
            <h5 class='card-title mb-0'><ins>#{event.name}</ins></h5>
            <small class='text-muted'>Datum: #{date}</small>
          </span>
        </li>
        """

        elements.push(template)
      end

      @list_container.innerHTML = elements.join('')
    end
  end
end