import 'CContentsEventSignup', '../elm-event-signup/contents'

export default class CContents
  def initialize(parent)
    @parent = parent

    @c_contents = CContentsEventSignup.new(@parent)
  end

  def get_noevent()
    @c_contents.get_noevent()
  end

  def get_noparams()
    @c_contents.get_noparams()
  end

  def get_page_candidates(event_name)
    """
<div class='container col-lg-8 my-5'>
  <h1 class='text-center mb-4'>#{event_name}</h1>
  <h2 class='text-center mb-3'>Účastnící</h2>
  <elm-dashboard-candidates event-id='#{@parent.event_id}' no-emails></elm-dashboard-candidates>
</div>
    """
  end
end