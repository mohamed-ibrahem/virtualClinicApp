import {Injectable} from '@angular/core';
import Pusher from 'pusher-js';
import {HttpProvider} from "./http";

@Injectable()
export class PusherProvider {
  options;

  constructor(protected http: HttpProvider) {
    Pusher.logToConsole = true;
  }

  public init(options) {
    this.options = options;

    return new Pusher(this.options.app, {
      cluster: this.options.cluster,
      encrypted: this.options.encrypted,
      authEndpoint: this.options.authEndpoint,
      auth: {
        headers: {
          'Authorization': this.http.options.headers.get('Authorization')
        }
      }
    });
  }
}
