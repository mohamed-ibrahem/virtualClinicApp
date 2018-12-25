export class Values {
  lan: any = {};
  locales = [];
  private lang = 'en';
  private _countries;

  update(data) {
    this.lan = data.lan;
    this.locales = data.locales;
    this._countries = data.supported_countries;
  }

  get(key, _default?) {
    let values = {},
      keys = Object.keys(this.lan[this.lang]).filter((_key) => {
        return _key.toLowerCase().startsWith(key);
      });

    if (! keys.length)
      return _default;

    if (keys.length === 1)
      return this.lan[this.lang][key];

    for (let key of keys) {
      values[key] = this.lan[this.lang][key];
    }

    return values;
  }

  setLocale(lang) {
    this.lang = lang;
  }

  validations() {
    return this.get('validation');
  }

  get countries() {
    return Array.of(this._countries.countries)[0];
  }
}
