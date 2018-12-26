export class Values {
  lan: any;
  locales : any = [];
  private lang = 'en';
  private _countries;

  update(data) {
    this.lan = data.lan;
    this.locales = data.locales;
    this._countries = data.supported_countries;
  }

  get(key, _default?) {
    if (! this.lan)
      return _default;

    let lan = this.lan[this.lang],
      values = {},
      keys = Object.keys(lan).filter((_key) => {
        return _key.toLowerCase().startsWith(key);
      });

    if (! keys.length)
      return _default;

    if (keys.length === 1)
      return lan[key];

    for (let key of keys) {
      values[key] = lan[key];
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
