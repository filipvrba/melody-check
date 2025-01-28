export default class Settings {
  static getCategories(userId) {
    return [
      {
        index: "event",
        name: "Událost",
        content: `<elm-event-settings user-id='${userId}'></elm-event-settings>`
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