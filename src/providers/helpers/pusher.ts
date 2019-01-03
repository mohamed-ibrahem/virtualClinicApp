import {Injectable} from '@angular/core';
import {Echo} from 'laravel-echo-ionic';
import {Pusher as client} from 'pusher-js';

@Injectable()
export class PusherProvider {
  public init() {
    new Echo({
      broadcaster: 'pusher',
      key: '683632',
      cluster: 'eu',
      encrypted: true,
      client
    });
  }
}
