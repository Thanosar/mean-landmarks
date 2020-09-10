import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {IUser} from '../interfaces/IUser';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  readonly _url: string = environment.serverUrl + 'auth';

  public sessionToken: string;
  public user: IUser;


  constructor(public httpClient: HttpClient) {
  }

  public login(username: string, password: string) {
    try {
      return this.httpClient.post(this._url + "/login", {username, password});
    } catch (e) {
      console.log(e);
    }
  }


  public logout(token: string) {
    try {
      return this.httpClient.post(this._url + "/logout", {token});
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
