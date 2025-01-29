export default class Settings {
  static getCategories(userId) {
    return [
      {
        index: "event",
        name: "Událost",
        content: `<elm-event-settings user-id='${userId}'></elm-event-settings>`
      },

      {
        index: "email",
        name: "Email",
        content: `<elm-email-settings user-id='${userId}'></elm-email-settings>`
      },

      {
        index: "profile",
        name: "Profil",
        content: `<elm-profile-editing user-id='${userId}'></elm-profile-editing>`
      }
    ]
  }
};

window.Settings = Settings