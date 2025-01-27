import csObj from "../../json/languages/cs.json";

export default class Language {
  static get relevant() {
    let codeLang = Language.getCode();

    switch (codeLang) {
    case Language.LIST[0]:
      Language.setDocumentLang(codeLang);
      return csObj;

    default:
      return csObj
    }
  };

  static getCode() {
    return Language.get || navigator.language.split("-")[0]
  };

  static get get() {
    return URLParams.get("lang") || localStorage.getItem("lang")
  };

  static set(codeLang) {
    URLParams.set("lang", codeLang);
    localStorage.setItem("lang", codeLang);
    return Events.emit("#app", Language.ENVS.languageChange)
  };

  static setDocumentLang(langCode) {
    return document.documentElement.lang = langCode
  }
};

Language.ENVS = {languageChange: "lang0"};
Language.LIST = ["cs"];
window.Language = Language