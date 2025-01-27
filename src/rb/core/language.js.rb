import 'csObj', '../../json/languages/cs.json'

export default class Language
  ENVS = {
    language_change: 'lang0'
  }

  LIST = [
    :cs,
  ]

  def self.relevant
    code_lang = Language.get_code()

    case code_lang
    when LIST[0]
      Language.set_document_lang(code_lang)
      return cs_obj
    else
      return cs_obj
    end
  end

  def self.get_code()
    Language.get || navigator.language.split('-').first
  end

  def self.get
    URLParams.get('lang') || local_storage.get_item('lang')
  end

  def self.set(code_lang)
    URLParams.set("lang", code_lang)
    local_storage.set_item('lang', code_lang)

    Events.emit('#app', ENVS.language_change)
  end

  def self.set_document_lang(lang_code)
    document.document_element.lang = lang_code
  end
end
window.Language = Language