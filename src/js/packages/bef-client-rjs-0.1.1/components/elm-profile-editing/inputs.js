export default class CInputs {
  constructor(parent) {
    this._parent = parent;
    this._deletionBtn = this._parent.querySelector("#profileEditingAccountDeletionBtn");
    window.profileEditingAccountDeletion = this.accountDeletion.bind(this)
  };

  accountDeletion() {
    if (confirm(this._parent.language[3])) {
      return this._parent.cDatabase.accountDeletion(() => {
        Cookie.erase("l-token");
        localStorage.removeItem("hashHistory");
        Events.emit("#app", "signout");
        return location.hash = "#"
      })
    }
  };

  disableUpdate(isConnected) {
    return Bootstrap.changeDisableElement(
      this._deletionBtn,
      !isConnected
    )
  }
}