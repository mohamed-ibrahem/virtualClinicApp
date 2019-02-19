import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Functions} from "./functions";
import 'rxjs/add/operator/finally';
import {Events} from "ionic-angular";

@Injectable()
export class HttpProvider {
  public url;

  public options = {
    headers: new HttpHeaders({
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, GET, PATCH, DELETE, PUT',
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    })
  };

  constructor(public http: HttpClient, protected events: Events, protected functions: Functions) {
    this.events.subscribe('user:loggedIn', (token) => this.setTokenToHeaders(token));
  }

  setTokenToHeaders(token?) {
    if (token)
      this.options.headers = this.options.headers.append('Authorization', `Bearer ${token}`);
    else
      this.options.headers = this.options.headers.delete('Authorization');
  }

  setUrl() {
    return new Promise(res => {
      this.functions.presentAlert('Enter Your base URL', '', {
        inputs: [
          {
            name: 'url',
            placeholder: 'Url'
          },
        ],
        buttons: [
          {
            text: 'Save',
            handler: data => {
              // this.url = 'https://' + data.url + '.ngrok.io';
              this.url = data.url;

              res();
            }
          }
        ]
      })
    })
  }

  private sendRequest(type, uri, data, options) {
    this.functions.loading(uri);

    if (type === 'get')
      return this.http.get(
        this.url + '/' + uri,
        Object.assign(options, this.options)
      )._finally(() => {
        this.functions.clearLoading(uri)
      });

    return this.http[type](
      this.url + '/' + uri,
      data,
      Object.assign(options, this.options)
    )._finally(() => {
      this.functions.clearLoading(uri)
    });
  }

  public post(uri, data, options = {}) {
    return this.sendRequest('post', uri, data, options);
  }

  public put(uri, data, options = {}) {
    return this.sendRequest('put', uri, data, options);
  }

  public delete(uri, data, options = {}) {
    return this.sendRequest('delete', uri, data, options);
  }

  public get(uri, options = {}) {
    return this.sendRequest('get', uri, {}, options);
  }
}
