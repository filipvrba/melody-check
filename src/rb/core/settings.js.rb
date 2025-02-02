export default class Settings
  def self.get_categories(user_id)
    return [
      {
        index: 'event',
        name: 'Událost',
        content: "<elm-event-settings user-id='#{user_id}'></elm-event-settings>"
      },
      {
        index: 'templates',
        name: 'Šablony',
        content: "<elm-email-settings user-id='#{user_id}'></elm-email-settings>"
      },
      {
        index: 'profile',
        name: 'Profil',
        content: "<elm-profile-editing user-id='#{user_id}'></elm-profile-editing>"
      }
    ]
  end

  def self.get_user_type_categories(user_id, user_type)
    case user_type
    when 1
      return Settings.get_categories(user_id)
    when 2
      return [{
        index: 'events',
        name: 'Události',
        content: "<elm-events-viewer user-id='#{user_id}'></elm-events-viewer>"
      },
      {
        index: 'templates',
        name: 'Šablony',
        content: "<elm-emails-viewer user-id='#{user_id}'></elm-emails-viewer>"
      }, Settings.get_categories(user_id).last]
    end
  end
end
window.Settings = Settings