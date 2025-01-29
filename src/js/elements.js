import "./packages/template-rjs-0.1.1/elements";
import "./packages/bef-client-rjs-0.1.1/elements";
import ElmDashboard from "./elements/elm_dashboard";
window.customElements.define("elm-dashboard", ElmDashboard);
import ElmEventSettings from "./elements/elm_event_settings";
window.customElements.define("elm-event-settings", ElmEventSettings);
import ElmDashboardCandidates from "./elements/dashboard/elm_candidates";

window.customElements.define(
  "elm-dashboard-candidates",
  ElmDashboardCandidates
);

import ElmDashboardInformation from "./elements/dashboard/elm_information";

window.customElements.define(
  "elm-dashboard-information",
  ElmDashboardInformation
);

import ElmEmailSettings from "./elements/elm_email_settings";
window.customElements.define("elm-email-settings", ElmEmailSettings);
import ElmConfirm from "./elements/elm_confirm";
window.customElements.define("elm-confirm", ElmConfirm)