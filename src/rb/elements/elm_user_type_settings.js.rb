import 'ElmSettings', '../packages/bef-client-rjs-0.1.1/elements/elm_settings'
import 'CDatabase', '../components/elm-user-type-settings/database'

export default class ElmUserTypeSettings < ElmSettings
  attr_reader :user_id

  def initialize
    super

    @c_database = CDatabase.new(self)
  end

  def protected_callback()
    unless @categories
      @c_database.get_user_type() do |user_type|
        @categories = Settings.get_user_type_categories(user_id, user_type.id)

        super
      end
    end
  end

  def connected_callback()
  end

  def disconnected_callback()
  end
end