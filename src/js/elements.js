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
window.customElements.define("elm-confirm", ElmConfirm);
import ElmEventSignup from "./elements/elm_event_signup";
window.customElements.define("elm-event-signup", ElmEventSignup);
import ElmEventsSettings from "./elements/elm_events_settings";

window.customElements.define(
  "elm-events-settings",
  ElmEventsSettings
);

import ElmUserTypeSettings from "./elements/elm_user_type_settings";

window.customElements.define(
  "elm-user-type-settings",
  ElmUserTypeSettings
);

import ElmEventsViewer from "./elements/elm_events_viewer";
window.customElements.define("elm-events-viewer", ElmEventsViewer);
import ElmEmailsSettings from "./elements/elm_emails_settings";

window.customElements.define(
  "elm-emails-settings",
  ElmEmailsSettings
);

import ElmEmailsViewer from "./elements/elm_emails_viewer";
window.customElements.define("elm-emails-viewer", ElmEmailsViewer);
import ElmContentSwitcher from "./elements/elm_content_switcher";

window.customElements.define(
  "elm-content-switcher",
  ElmContentSwitcher
);

import ElmUserTypeDashboard from "./elements/elm_user_type_dashboard";

window.customElements.define(
  "elm-user-type-dashboard",
  ElmUserTypeDashboard
);

import ElmRejection from "./elements/elm_rejection";
window.customElements.define("elm-rejection", ElmRejection);
import ElmEventCandidates from "./elements/elm_event_candidates";

window.customElements.define(
  "elm-event-candidates",
  ElmEventCandidates
);

import ElmEventSettingsModal from "./elements/elm_event_settings_modal";

window.customElements.define(
  "elm-event-settings-modal",
  ElmEventSettingsModal
);

import ElmConfirmDate from "./elements/elm_confirm_date";
window.customElements.define("elm-confirm-date", ElmConfirmDate);
import ElmConfirmModal from "./elements/elm_confirm_modal";
window.customElements.define("elm-confirm-modal", ElmConfirmModal)