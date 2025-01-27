import 'AProtected', '../packages/bef-client-rjs-0.1.1/elements/abstracts/protected'

export default class ElmDashboard < AProtected
  def initialize
    super
  end

  def protected_callback()
    init_elm()
  end

  def connected_callback()
  end

  def disconnected_callback()
  end

  def init_elm()
    template = """
    <elm-header user-id='#{@user_id}'></elm-header>
    """

    self.innerHTML = template
  end
end