export class Values {
  lan : any = {};
  locales = [];
  private lang = 'en';
  private _countries;

  update(data) {
    this.lan = data.lan;
    this.locales = data.locales;
    this._countries = data.supported_countries;
  }

  get(key, _default) {
    let value = this.lan[this.lang][key];

    if (value) return value;

    return _default;
  }

  setLocale(lang) {
    this.lang = lang;
  }

  get countries() {
    return Array.of(this._countries.countries)[0];
  }
}
