import Net from "../../../core/net";

export default class CTimer {
  constructor(clockDelay) {
    this._clockDelay = clockDelay;
    this._hTick = e => this.update(e.detail.value);
    this._clock = 0
  };

  connectedCallback() {
    return Events.connect("#app", "tick", this._hTick)
  };

  disconnectedCallback() {
    return Events.disconnect("#app", "tick", this._hTick)
  };

  update(dt) {
    if (this._clock >= this._clockDelay) {
      Net.checkInternet(isConnected => (
        Events.emit("#app", "updateDelay", isConnected)
      ));

      this._clock = 0
    };

    return this._clock += dt
  }
}