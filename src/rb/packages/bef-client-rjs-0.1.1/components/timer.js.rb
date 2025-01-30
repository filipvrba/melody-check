import 'Net', '../../../core/net'

export default class CTimer
  def initialize(clock_delay)
    @clock_delay = clock_delay  # sec

    @h_tick = lambda {|e| update(e.detail.value)}

    @clock  = 0
  end

  def connected_callback()
    Events.connect('#app', 'tick', @h_tick)
  end

  def disconnected_callback()
    Events.disconnect('#app', 'tick', @h_tick)
  end

  def update(dt)
    if @clock >= @clock_delay
      Net.check_internet() do |is_connected|
        Events.emit('#app', 'updateDelay', is_connected)
      end
      @clock = 0
    end

    @clock += dt
  end
end