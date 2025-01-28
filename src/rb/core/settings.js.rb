export default class Settings
  def self.get_categories(user_id)
    return [
      {
        index: 'event',
        name: 'Událost',
        content: "<elm-event-settings user-id='#{user_id}'></elm-event-settings>"
      },
      {
        index: 'profile',
        name: 'Profil',
        content: "<elm-profile-editing user-id='#{user_id}'></elm-profile-editing>"
      }
    ]
  end
end
window.Settings = Settings