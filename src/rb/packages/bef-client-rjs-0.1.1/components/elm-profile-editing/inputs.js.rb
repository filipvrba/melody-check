export default class CInputs
  def initialize(parent)
    @parent = parent

    @deletion_btn = @parent.query_selector('#profileEditingAccountDeletionBtn')

    window.profile_editing_account_deletion = account_deletion
  end

  def account_deletion()
    if confirm(@parent.language[3])
      @parent.c_database.account_deletion() do
        Cookie.erase('l-token')
        local_storage.remove_item('hashHistory')

        Events.emit('#app', 'signout')
        location.hash = '#'
      end
    end
  end

  def disable_update(is_connected)
    Bootstrap.change_disable_element(@deletion_btn, !is_connected)
  end
end