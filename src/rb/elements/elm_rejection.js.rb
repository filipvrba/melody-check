import 'CDatabase', '../components/elm-rejection/database'
import 'CContents', '../components/elm-rejection/contents'

export default class ElmRejection < HTMLElement
  attr_reader :candidate_id, :event_id

  def initialize
    super

    @candidate_id = URLParams.get_index('candidate_id')
    @event_id     = URLParams.get_index('event_id')
    @have_params  = @candidate_id != 0 && @event_id != 0

    @c_database = CDatabase.new(self)
    @c_contents = CContents.new(self)

    init_elm()
  end

  def connected_callback()
  end

  def disconnected_callback()
  end

  def init_elm()
    unless @have_params
      self.innerHTML = @c_contents.error_content()
    else
      @c_database.get_informations() do |informations|

        if informations
          unless informations.confirmed_attendance == 2
            @c_database.update_confirmed_attendance() do
              self.innerHTML = @c_contents.rejection_content(informations.full_name, informations.event_name)
            end
          else
            self.innerHTML = @c_contents.rejection_again_content(informations.full_name, informations.event_name)
          end
        else
          self.innerHTML = @c_contents.no_informations_content()
        end
      end
    end
  end
end