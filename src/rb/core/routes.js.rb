import 'routesObj', '../../json/routes.json'

window.ROUTES_JSON = routes_obj

import 'errorHTML', '../../html/error.html?raw'
import 'introductionHTML', '../../html/introduction.html?raw'

window.PAGES = {
  error: errorHTML,
  introduction: introductionHTML,
}

class Routes
  def self.priority_pages(priority = 1)
    ROUTES_JSON.pages.select {|o| o.priority == priority}
  end
end
window.Routes = Routes