import {Injectable} from "@angular/core";
import {HttpHeaders} from "@angular/common/http";

@Injectable()
export class Config {
  public url;

  public httpHeaders = {
    headers: new HttpHeaders({
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, GET, PATCH, DELETE, PUT',
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    })
  };

  constructor () {
  }
}
