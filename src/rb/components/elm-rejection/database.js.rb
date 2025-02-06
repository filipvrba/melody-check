import 'Net',              '../../core/net'
import 'CDatabaseConfirm', '../elm-confirm/database'

export default class CDatabase
  def initialize(parent)
    @parent = parent
    @c_database_confirm = CDatabaseConfirm.new(@parent)
  end

  def get_informations(&callback)
    @c_database_confirm.get_informations() do |rows|
      callback(rows) if callback
    end
  end

  def update_confirmed_attendance(&callback)
    @c_database_confirm.update_confirmed_attendance(2) do |message|
      callback(message) if callback
    end
  end
end