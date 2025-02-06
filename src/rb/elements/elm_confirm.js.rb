import 'CDatabase', '../components/elm-confirm/database'
import 'CContents', '../components/elm-confirm/contents'

export default class ElmConfirm < HTMLElement
  attr_reader :candidate_id, :event_id, :have_params

  def initialize
    super
    
    @candidate_id = URLParams.get_index('candidate_id')
    @event_id     = URLParams.get_index('event_id')
    @have_params  = @candidate_id != 0 && @event_id != 0

    @c_database = CDatabase.new(self)
    @c_contents = CContents.new(self)

    unless @have_params
      self.innerHTML = @c_contents.error_content()
    else
      @c_database.get_informations() do |informations|

        if informations
          unless informations.confirmed_attendance == 1
            @c_database.update_confirmed_attendance(1) do
              self.innerHTML = @c_contents.confirm_content(informations.full_name, informations.event_name)
            end
          else
            self.innerHTML = @c_contents.confirm_again_content(informations.full_name, informations.event_name)
          end
        else
          self.innerHTML = @c_contents.no_informations_content()
        end
      end
    end
  end

  def connected_callback()
  end

  def disconnected_callback()
  end
end