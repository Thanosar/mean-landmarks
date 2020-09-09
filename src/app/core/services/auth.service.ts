import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  readonly _url: string = 'http://localhost:5000/auth';

  public sessionToken: string;

  constructor(public httpClient: HttpClient) {
  }

  public login(username: string, password: string) {
    try {
      return this.httpClient.post(this._url + "/login", {username, password});
    } catch (e) {
      console.log(e);
    }
  }

  public isLoggedIn(token: string) {
    try {
      return this.httpClient.post(this._url + "/isLoggedIn", {token});
    } catch (e) {
      console.log(e);
    }
  }

}
