export default class Bootstrap {
  static changeValidElement(element, isValid) {
    return isValid ? element.classList.remove("is-invalid") : element.classList.add("is-invalid")
  };

  static changeValidGreenElement(element, isValid) {
    return isValid ? element.classList.remove("is-valid") : element.classList.add("is-valid")
  };

  static changeVisibleElement(element, isVisible) {
    return isVisible ? element.classList.remove("d-none") : element.classList.add("d-none")
  };

  static changeDisableElement(element, isDisabled) {
    return isDisabled ? element.setAttribute("disabled", "") : element.removeAttribute(
      "disabled",
      ""
    )
  }
};

window.Bootstrap = Bootstrap