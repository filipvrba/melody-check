# https://www.gafferongames.com/post/fix_your_timestep/

class Clock
  def initialize
    @time = Date.now()
    @fps_time = 1_000
    @fix_dt = Number((1 / 60).toFixed(6))
  end

  def delta_time(&callback)
    current_time = Date.now()
    dt = (current_time - @time) / @fps_time

    if dt > @fix_dt
      dt_count = Math.round(dt / @fix_dt)
      (0...dt_count).step(1) do |_|
        callback(@fix_dt) if callback
      end
    else
      callback(@fix_dt) if callback
    end

    @time = current_time

    return dt
  end
end
window.Clock = Clock

clock = Clock.new
def tick()
  Events.emit('#app', 'tick', clock.delta_time())
  
  request_animation_frame lambda { tick() }
end
tick()