export class Values {
  lan = {
    en: {

    }
  };

  locales = [];

  updateLan(lan) {
    Object.assign(lan, this.lan)
  }

  updateLocales(locales) {
    Object.assign(locales, this.locales)
  }

  currentLang() {
    //
  }
}
