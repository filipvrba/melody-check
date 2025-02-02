
import './packages/template-rjs-0.1.1/elements'
import './packages/bef-client-rjs-0.1.1/elements'

import 'ElmDashboard', './elements/elm_dashboard'
window.custom_elements.define('elm-dashboard', ElmDashboard)

import 'ElmEventSettings', './elements/elm_event_settings'
window.custom_elements.define('elm-event-settings', ElmEventSettings)

import 'ElmDashboardCandidates', './elements/dashboard/elm_candidates'
window.custom_elements.define('elm-dashboard-candidates', ElmDashboardCandidates)

import 'ElmDashboardInformation', './elements/dashboard/elm_information'
window.custom_elements.define('elm-dashboard-information', ElmDashboardInformation)

import 'ElmEmailSettings', './elements/elm_email_settings'
window.custom_elements.define('elm-email-settings', ElmEmailSettings)

import 'ElmConfirm', './elements/elm_confirm'
window.custom_elements.define('elm-confirm', ElmConfirm)

import 'ElmEventSignup', './elements/elm_event_signup'
window.custom_elements.define('elm-event-signup', ElmEventSignup)

import 'ElmEventsSettings', './elements/elm_events_settings'
window.custom_elements.define('elm-events-settings', ElmEventsSettings)

import 'ElmUserTypeSettings', './elements/elm_user_type_settings'
window.custom_elements.define('elm-user-type-settings', ElmUserTypeSettings)

import 'ElmEventsViewer', './elements/elm_events_viewer'
window.custom_elements.define('elm-events-viewer', ElmEventsViewer)

import 'ElmEmailsSettings', './elements/elm_emails_settings'
window.custom_elements.define('elm-emails-settings', ElmEmailsSettings)

import 'ElmEmailsViewer', './elements/elm_emails_viewer'
window.custom_elements.define('elm-emails-viewer', ElmEmailsViewer)

import 'ElmContentSwitcher', './elements/elm_content_switcher'
window.custom_elements.define('elm-content-switcher', ElmContentSwitcher)
