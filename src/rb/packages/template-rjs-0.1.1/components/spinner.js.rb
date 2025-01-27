export default class CSpinner
  def initialize(parent)
    @element_spinner = parent.query_selector('elm-spinner')
  end

  def set_display(is_disabled)
    @element_spinner.style.display = is_disabled ? '' : :none
  end
end