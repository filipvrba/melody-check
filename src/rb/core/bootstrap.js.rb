export default class Bootstrap
  def self.change_valid_element(element, is_valid)
    if is_valid
      element.class_list.remove('is-invalid')
    else
      element.class_list.add('is-invalid')
    end
  end

  def self.change_valid_green_element(element, is_valid)
    if is_valid
      element.class_list.remove('is-valid')
    else
      element.class_list.add('is-valid')
    end
  end

  def self.change_visible_element(element, is_visible)
    if is_visible
      element.class_list.remove('d-none')
    else
      element.class_list.add('d-none')
    end
  end

  def self.change_disable_element(element, is_disabled)
    if is_disabled
      element.set_attribute('disabled', '')
    else
      element.remove_attribute('disabled', '')
    end
  end
end
window.Bootstrap = Bootstrap