export default class CSpinner
  def initialize(parent)
    @parent = parent
    @element_spinner = @parent.query_selector('elm-spinner')
  end

  def set_display(is_disabled)
    @element_spinner.style.display = is_disabled ? '' : :none
  end

  def set_display_with_id(is_disabled, id)
    elm_spinner = @parent.query_selector(id)
    elm_spinner.style.display = is_disabled ? '' : :none
  end
end