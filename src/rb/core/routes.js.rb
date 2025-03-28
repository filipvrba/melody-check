import 'routesObj', '../../json/routes.json'

window.ROUTES_JSON = routes_obj

import 'errorHTML', '../../html/error.html?raw'
import 'nointernetHTML', '../../html/nointernet.html?raw'
import 'confirmHTML', '../../html/confirm.html?raw'
import 'rejectionHTML', '../../html/rejection.html?raw'
import 'eventSignupHTML', '../../html/event_signup.html?raw'
import 'eventCandidatesHTML', '../../html/event_candidates.html?raw'
import 'introductionHTML', '../../html/introduction.html?raw'
import 'signinHTML', '../../html/signin.html?raw'
import 'signupHTML', '../../html/signup.html?raw'
import 'dashboardHTML', '../../html/dashboard.html?raw'
import 'settingsHTML', '../../html/settings.html?raw'

window.PAGES = {
  error:              errorHTML,
  nointernet:         nointernetHTML,
  confirm:            confirmHTML,
  rejection:          rejectionHTML,
  'event/signup':     event_signupHTML,
  'event/candidates': event_candidatesHTML,
  introduction:       introductionHTML,
  signin:             signinHTML,
  signup:             signupHTML,
  dashboard:          dashboardHTML,
  settings:           settingsHTML,
}

class Routes
  def self.priority_pages(priority = 1)
    ROUTES_JSON.pages.select {|o| o.priority == priority}
  end
end
window.Routes = Routes