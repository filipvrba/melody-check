
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
