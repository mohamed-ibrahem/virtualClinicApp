import {Injectable} from "@angular/core";
import {HttpHeaders} from "@angular/common/http";

@Injectable()
export class Config {
  private _config = {
    http: {
      options: {
        headers: new HttpHeaders({
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'POST, GET, PATCH, DELETE, PUT',
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        })
      }
    },
    auth: {
      data: {
        'client_id': 2,
        'client_secret': 'EGJ1LEibWWbIzg8QywtLPFPBkshCw8ncSUPDxaQA',
        'grant_type': 'password'
      }
    }
  };

  set(config) {
    Object.assign(config, this._config);
  }

  get(key, _default?) {
    if (! this._config)
      return _default;

    let configs = this._config,
      keys = key.split('.');

    for (let i = 0; i <= keys.length; i++) {
      if (configs[keys[i]])
        configs = configs[keys[i]];
      else configs = _default;
    }

    return configs;
  }

}
