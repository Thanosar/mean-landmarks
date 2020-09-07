import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LandmarkService {

  readonly _url: string = 'http://localhost:5000/landmark';

  constructor(public httpClient: HttpClient) {
  }

  public retrieve() {
    try {
      return this.httpClient.get(this._url);
    } catch (e) {
      console.log(e);
    }
  }
}
