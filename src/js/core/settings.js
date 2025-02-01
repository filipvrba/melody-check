export default class Settings {
  static getCategories(userId) {
    return [
      {
        index: "event",
        name: "Událost",
        content: `<elm-event-settings user-id='${userId}'></elm-event-settings>`
      },

      {
        index: "templates",
        name: "Šablony",
        content: `<elm-email-settings user-id='${userId}'></elm-email-settings>`
      },

      {
        index: "profile",
        name: "Profil",
        content: `<elm-profile-editing user-id='${userId}'></elm-profile-editing>`
      }
    ]
  };

  static getUserTypeCategories(userId, userType) {
    switch (userType) {
    case 1:
      return Settings.getCategories(userId);

    case 2:

      return [
        {
          index: "events",
          name: "Události",
          content: `<elm-events-viewer user-id='${userId}'></elm-events-viewer>`
        },

        ...Settings.getCategories(userId).slice(1)
      ]
    }
  }
};

window.Settings = Settings