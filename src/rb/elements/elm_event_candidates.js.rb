import 'CContents', '../components/elm-event-candidates/contents'
import 'CDatabase', '../components/elm-event-candidates/database'

export default class ElmEventCandidates < HTMLElement
  attr_reader :event_id

  def initialize
    super
    
    @event_id = URLParams.get_index('event_id') || nil
    @have_params = @event_id && @event_id != 0

    @c_contents = CContents.new(self)
    @c_database = CDatabase.new(self)

    init_elm()
  end

  def connected_callback()
  end

  def disconnected_callback()
  end

  def init_elm()
    if @have_params
      @c_database.get_event() do |event|
        if event
          initialize_event(event.name)
        else
          self.innerHTML = @c_contents.get_noevent()
        end
      end
    else
      self.innerHTML = @c_contents.get_noparams()
    end
  end

  def initialize_event(event_name)
    self.innerHTML = @c_contents.get_page_candidates(event_name)
  end
end