
import './packages/template-rjs-0.1.1/elements'
import './packages/bef-client-rjs-0.1.1/elements'

import 'ElmDashboard', './elements/elm_dashboard'
window.custom_elements.define('elm-dashboard', ElmDashboard)

import 'ElmSettings', './elements/elm_settings'
window.custom_elements.define('elm-settings', ElmSettings)
