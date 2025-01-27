export default class ElmSpinner < HTMLElement
  def initialize
    super
    
    @class_attr = self.get_attribute('class')

    init_elm()
  end

  def init_elm()
    template = """
<div class='#{@class_attr}'>
  <div class='spinner-border text-secondary' role='status'>
    <span class='visually-hidden'>Loading...</span>
  </div>
</div>
    """

    self.innerHTML = template
  end
end