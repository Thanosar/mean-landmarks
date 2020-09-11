import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {IUser} from '../interfaces/IUser';
import {environment} from '../../../environments/environment';
import {ToastrService} from 'ngx-toastr';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  readonly _url: string = environment.serverUrl + 'auth';

  public sessionToken: string;
  public user: IUser;


  constructor(public httpClient: HttpClient, private toastr: ToastrService) {
  }

  public login(username: string, password: string): Observable<any> {
    try {
      return this.httpClient.post(this._url + "/login", {username, password});
    } catch (e) {
      this.toastr.error("Something has gone wrong")
    }
  }


  public logout(token: string): Observable<any> {
    try {
      return this.httpClient.post(this._url + "/logout", {token});
    } catch (e) {
      this.toastr.error("Something has gone wrong")
    }
  }

  public isLoggedIn(token: string): Observable<any> {
    try {
      return this.httpClient.post(this._url + "/isLoggedIn", {token});
    } catch (e) {
      this.toastr.error("Something has gone wrong")
    }
  }

}
