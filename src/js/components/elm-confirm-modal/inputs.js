export default class CInputs {
  constructor(parent) {
    this._parent = parent;
    this._hShow = e => this.show(e.detail.value);
    this._elmLabel = this._parent.querySelector("#confirmModalLabel");
    this._elmMessage = this._parent.querySelector("#confirmModalMessage");
    window.confirmModalNoBtnClick = this.confirmModalNoBtnClick.bind(this);
    window.confirmModalYesBtnClick = this.confirmModalYesBtnClick.bind(this)
  };

  connectedCallback() {
    return Events.connect("#app", CInputs.ENVS.show, this._hShow)
  };

  disconnectedCallback() {
    return Events.disconnect("#app", CInputs.ENVS.show, this._hShow)
  };

  show(options) {
    if (this._parent.bsModalConfirm._isShown) return;
    this._parent.options.title = options.title ? options.title : this._parent.defaultOptions.title;
    this._parent.options.message = options.message ? options.message : this._parent.defaultOptions.message;
    this._parent.options.fnFalse = options.fnFalse ? options.fnFalse : this._parent.defaultOptions.fnFalse;
    this._parent.options.fnTrue = options.fnTrue ? options.fnTrue : this._parent.defaultOptions.fnTrue;
    this._elmLabel.innerHTML = this._parent.options.title;
    this._elmMessage.innerHTML = this._parent.options.message;
    return this._parent.bsModalConfirm.show()
  };

  confirmModalNoBtnClick() {
    if (this._parent.options.fnFalse) return this._parent.options.fnFalse.call()
  };

  confirmModalYesBtnClick() {
    if (this._parent.options.fnTrue) return this._parent.options.fnTrue.call()
  }
};

CInputs.ENVS = {show: "ecm-show-0"}