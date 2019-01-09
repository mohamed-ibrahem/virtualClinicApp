import {Injectable} from '@angular/core';
import Pusher from 'pusher-js';
import {HttpProvider} from "./http";

@Injectable()
export class PusherProvider {
  channel;

  constructor(protected http: HttpProvider) {
    Pusher.logToConsole = true;
  }

  /**
   * @param uid
   * @param options
   */
  public oldInit(uid) {
    var pusher = new Pusher('790858f6c6dde789ec55', {
      cluster: 'eu',
      forceTLS: true,
    });

    return this.channel = pusher.subscribe(uid);
  }

  public init(uid, options) {
    let pusher = new Pusher(options.app, {
      cluster: options.cluster,
      encrypted: options.encrypted,
      authEndpoint: options.authEndpoint,
      auth: {
        headers: {
          'Authorization': this.http.options.headers.get('Authorization')
        }
      }
    });

    return this.channel = pusher.subscribe(uid);
  }
}
