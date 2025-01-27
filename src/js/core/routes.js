import routesObj from "../../json/routes.json";
window.ROUTES_JSON = routesObj;
import errorHTML from "../../html/error.html?raw";
import nointernetHTML from "../../html/nointernet.html?raw";
import introductionHTML from "../../html/introduction.html?raw";
import signinHTML from "../../html/signin.html?raw";
import signupHTML from "../../html/signup.html?raw";

window.PAGES = {
  error: errorHTML,
  nointernet: nointernetHTML,
  introduction: introductionHTML,
  signin: signinHTML,
  signup: signupHTML
};

class Routes {
  static priorityPages(priority=1) {
    return ROUTES_JSON.pages.filter(o => o.priority === priority)
  }
};

window.Routes = Routes