import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ILandMark} from '../interfaces/ΙLandMark';

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

  public findById(id: string) {
    try {
      return this.httpClient.get(this._url + "/" + id);
    } catch (e) {
      console.log(e);
    }
  }

  public update(id: string, data: ILandMark) {

    console.log(id);
    try {
      return this.httpClient.put(this._url + "/update/" + id, data);
    } catch (e) {
      console.log(e);
    }
  }
}
