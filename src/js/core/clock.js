// https://www.gafferongames.com/post/fix_your_timestep/
class Clock {
  constructor() {
    this._time = Date.now();
    this._fpsTime = 1_000;
    this._fixDt = Number((1 / 60).toFixed(6))
  };

  deltaTime(callback) {
    let currentTime = Date.now();
    let dt = (currentTime - this._time) / this._fpsTime;

    if (dt > this._fixDt) {
      let dtCount = Math.round(dt / this._fixDt);

      for (let _ = 0; _ < dtCount; _++) {
        if (callback) return callback(this._fixDt)
      }
    } else if (callback) {
      callback(this._fixDt)
    };

    this._time = currentTime;
    return dt
  }
};

window.Clock = Clock;
let clock = new Clock;

function tick() {
  Events.emit("#app", "tick", clock.deltaTime());
  return requestAnimationFrame(() => tick())
};

tick()