import {HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Functions} from "./functions";
import 'rxjs/add/operator/finally';

@Injectable()
export class HttpProvider {
  public url;

  public options = {};

  constructor(public http: HttpClient, protected functions: Functions) {}

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
      )._finally(() => {this.functions.clearLoading(uri)});

    return this.http[type](
      this.url + '/' + uri,
      data,
      Object.assign(options, this.options)
    )._finally(() => {this.functions.clearLoading(uri)});
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
