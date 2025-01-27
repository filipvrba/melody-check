import 'routesObj', '../../json/routes.json'

window.ROUTES_JSON = routes_obj

import 'errorHTML', '../../html/error.html?raw'
import 'nointernetHTML', '../../html/nointernet.html?raw'
import 'introductionHTML', '../../html/introduction.html?raw'
import 'signinHTML', '../../html/signin.html?raw'
import 'signupHTML', '../../html/signup.html?raw'

window.PAGES = {
  error:        errorHTML,
  nointernet:   nointernetHTML,
  introduction: introductionHTML,
  signin:       signinHTML,
  signup:       signupHTML,
}

class Routes
  def self.priority_pages(priority = 1)
    ROUTES_JSON.pages.select {|o| o.priority == priority}
  end
end
window.Routes = Routes