import 'ElmDashboard', './elm_dashboard'
import 'CDatabaseUserType', '../components/elm-user-type-dashboard/database'
import 'CContentsUserType', '../components/elm-user-type-dashboard/contents'
import 'CSpinner',   '../packages/template-rjs-0.1.1/components/spinner'

export default class ElmUserTypeDashboard < ElmDashboard
  def initialize
    super

    @c_database_user_type = CDatabaseUserType.new(self)
  end

  def connected_callback()
    super
  end

  def disconnected_callback()
    super
  end

  def protected_callback()
    init_elm()
    @c_spinner = CSpinner.new(self)

    @c_database_user_type.get_user_type() do |user_type|
      case user_type.id
      when 1
        super
      when 2
        @c_contents_user_type = CContentsUserType.new(self)
        fetch_and_update_events()
      end
    end
  end

  def fetch_and_update_events()
    @c_database_user_type.get_event_details() do |event_details|
      @c_spinner.set_display(false)

      unless event_details
        @c_contents_user_type.init_elm_informations()
        return
      end

      @c_contents_user_type.init_elm_events(event_details)
    end
  end

  def init_elm()
    super
  end
end