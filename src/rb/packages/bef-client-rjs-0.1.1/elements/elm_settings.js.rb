import 'AProtected', './abstracts/protected'

export default class ElmSettings < AProtected
  ENVS = {
    category_click: 'ess-cbc-0',
  }

  def initialize
    super

    @categories = nil

    window.profile_settings_category_btn_click = category_btn_click
  end

  def protected_callback()
    unless @categories
      @categories = Settings.get_categories(@user_id)
    end

    init_elm()
  end

  def connected_callback()
  end

  def disconnected_callback()
  end

  def category_btn_click(index)
    URLParams.set('sc-index', index)
    Events.emit('#app', ENVS.category_click)
  end

  def init_elm()
    template = """
    <elm-header user-id='#{@user_id}'></elm-header>

    #{subinit_elm()}
    """

    self.innerHTML = template
  end

  def subinit_elm()
    a_lis = []
    a_contents = []

    l_init_template = lambda do
      return """
      <ul class='nav nav-pills justify-content-center mt-3 mb-3' id='pills-tab' role='tablist'>
        #{a_lis.join('')}
      </ul>
      <div class='tab-content' id='pills-tabContent'>
        #{a_contents.join('')}
      </div>
      """
    end

    @categories.each_with_index do |category, i|
      is_activated = i == category_index

      li_template = """
      <li class='nav-item' role='presentation'>
        <button onclick='profileSettingsCategoryBtnClick(#{i})' class='nav-link #{'active' if is_activated}' id='pills-#{category.index}-tab' data-bs-toggle='pill' data-bs-target='#pills-#{category.index}' type='button' role='tab' aria-controls='pills-#{category.index}' aria-selected='true'>#{category.name}</button>
      </li>
      """
      content_template = """
      <div class='tab-pane fade #{'show active' if is_activated}' id='pills-#{category.index}' role='tabpanel' aria-labelledby='pills-#{category.index}-tab' tabindex='0'>#{category.content}</div>
      """

      a_lis.push(li_template)
      a_contents.push(content_template)
    end

    return l_init_template()
  end

  def category_index
    index           = URLParams.get_index('sc-index') || 0
    resulting_index = Math.max(Math.min(index, @categories.length - 1), 0)

    return resulting_index
  end
end